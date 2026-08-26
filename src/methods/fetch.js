import { search } from '@ecomplus/client'
import * as cloneDeep from 'lodash.clonedeep'
import dslMiddlewares from './../lib/dsl-middlewares'

const getSourceValue = (source, field) => {
  // resolve (dotted) field path on item source object
  let value = source
  const fieldKeys = field.split('.')
  for (let i = 0; i < fieldKeys.length; i++) {
    if (Array.isArray(value)) {
      value = value.map(nested => (nested ? nested[fieldKeys[i]] : undefined))
    } else if (value) {
      value = value[fieldKeys[i]]
    } else {
      return undefined
    }
  }
  return value
}

const checkFilterMatch = (rule, source) => {
  // re-apply DSL filter rule on item source client side
  const type = Object.keys(rule)[0]
  const condition = rule[type]
  if (typeof condition !== 'object' || condition === null) {
    return true
  }
  const field = Object.keys(condition)[0]
  if (!field || field === '_id') {
    return true
  }
  const value = getSourceValue(source, field)
  if (value === undefined) {
    // can't verify rule client side, keep item
    return true
  }
  switch (type) {
    case 'term':
    case 'terms': {
      const matchValues = Array.isArray(condition[field]) ? condition[field] : [condition[field]]
      return Array.isArray(value)
        ? value.some(nested => matchValues.indexOf(nested) > -1)
        : matchValues.indexOf(value) > -1
    }
    case 'range': {
      if (typeof value !== 'number') {
        return true
      }
      const { gt, gte, lt, lte } = condition[field]
      return !(gt !== undefined && value <= gt) &&
        !(gte !== undefined && value < gte) &&
        !(lt !== undefined && value >= lt) &&
        !(lte !== undefined && value > lte)
    }
    default:
      return true
  }
}

export default (self, isSimpleSearch, axiosConfig) => {
  // mount axios req options for complex or simpĺe search
  const { storeId } = self
  const reqOptions = {
    url: '/items.json',
    storeId,
    axiosConfig
  }

  // prepare search DSL
  let dsl = cloneDeep(self.dsl)
  dslMiddlewares.forEach(fn => {
    if (typeof fn === 'function') {
      const _dsl = fn(dsl)
      if (_dsl) {
        dsl = _dsl
      }
    }
  })

  // check for filter by product IDs (`setProductIds`)
  // Search API v2 (`/v2/search/_els`) returns no hit filtering `_id` on
  // request body and mishandles composed query string conditions,
  // so `_id` must be searched alone on `q` param with
  // other filters re-applied client side
  // https://github.com/ecomplus/storefront/issues/1306
  let productIds
  const queryFilters = dsl.query && dsl.query.bool && dsl.query.bool.filter
  if (Array.isArray(queryFilters) && (isSimpleSearch === true || !dsl.aggs)) {
    for (let i = 0; i < queryFilters.length; i++) {
      const { term, terms } = queryFilters[i]
      const condition = term || terms
      if (condition && Object.keys(condition)[0] === '_id') {
        const value = condition._id
        productIds = Array.isArray(value) ? value : [value]
        break
      }
    }
  }
  const idsPagination = productIds && {
    from: dsl.from || 0,
    size: dsl.size
  }

  if (productIds) {
    const queryString = `_id:("${productIds.join('" "')}")`
    reqOptions.url += `?q=${encodeURIComponent(queryString)}&size=${productIds.length}`
  } else if (isSimpleSearch === true) {
    // https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-uri-request.html
    const { query } = dsl
    reqOptions.url += '?q='
    if (query && query.bool && Array.isArray(query.bool.filter)) {
      // parse query filters to string
      let queryString = ''
      query.bool.filter.forEach(({ term, terms }) => {
        const condition = term || terms
        if (condition) {
          const field = Object.keys(condition)[0]
          const value = condition[field]
          if (queryString.length) {
            queryString += ' AND '
          }
          queryString += `${field}:${(Array.isArray(value) ? `("${value.join('" "')}")` : value)}`
        }
      })
      reqOptions.url += encodeURIComponent(queryString)
    }
    // handle pagination
    ;['from', 'size'].forEach(field => {
      if (dsl[field]) {
        reqOptions.url += `&${field}=${dsl[field]}`
      }
    })
  } else {
    reqOptions.method = 'post'
    reqOptions.data = dsl
    if (isSimpleSearch && !axiosConfig) {
      // fallback for old reference with `fetch(axiosConfig)`
      reqOptions.axiosConfig = isSimpleSearch
    }
  }

  // request Search API and return promise
  return search(reqOptions).then(({ data }) => {
    if (productIds && data.hits && Array.isArray(data.hits.hits)) {
      // re-apply other query filters and sort by requested IDs client side
      const hits = data.hits.hits
        .filter(({ _source }) => queryFilters.every(rule => checkFilterMatch(rule, _source)))
        .sort((a, b) => productIds.indexOf(a._id) - productIds.indexOf(b._id))
      const { from, size } = idsPagination
      data.hits.total = hits.length
      data.hits.hits = size ? hits.slice(from, from + size) : hits.slice(from)
    }
    // save last result on instance
    self.result = data
    const { dsl, history, localStorage, storageKey } = self
    if (data.hits.total && dsl && dsl.suggest) {
      const { text } = dsl.suggest
      if (text) {
        // add search term to history
        const index = history.indexOf(text)
        if (index > -1) {
          // prevent duplicated term
          history.splice(index, 1)
        }
        history.unshift(text)
        if (localStorage && storageKey) {
          localStorage.setItem(storageKey, history.slice(0, 20).join('||'))
        }
      }
    }
    // resolving with response data
    return data
  })
}

/**
 * @typedef {object} result
 * @property {object} hits - Elasticsearch hits object
 * @property {number} hits.total - Total number of products found
 * @property {array<object>} hits.hits - List of resultant items
 * @property {object} aggregations - Elasticsearch aggregations results
 * @property {object} suggest - Search term suggestions object
 * @property {number} took - Request time in milliseconds
 */

/**
 * @method
 * @name EcomSearch#fetch
 * @description Send POST request to
 * [E-Com Plus Search API]{@link https://developers.e-com.plus/docs/api/#/search/items/items}
 * and returns promise resolved with search result.
 *
 * @param {boolean} [isSimpleSearch=false] - Handle simple (and faster) search without sort and aggregations
 * @param {object} [axiosConfig] - Additional
 * [axios config]{@link https://github.com/axios/axios#request-config} object
 *
 * @returns {Promise<result|error>}
 *
 * @example

// Run search request
search.fetch()
  .then(result => {
    console.log(result.took)
    console.log(`${result.hits.total} items found:`)
    console.log(result.hits.hits)
  })
  .catch(error => {
    console.error(error)
    if (error.response) {
      console.log(error.response)
    }
  })

 */

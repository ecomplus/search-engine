import { merge } from 'lodash'

export default (self, filter) => {
  const type = Object.keys(filter)[0]
  // merge general filter to current Query DSL
  // ensure query.bool.filter is array
  merge(self.dsl, {
    query: {
      bool: {
        filter: []
      }
    }
  })
  const filters = self.dsl.query.bool.filter

  // check if new filter object should be added or replace other
  switch (type) {
    case 'terms':
    case 'term':
    case 'range':
      if (typeof filter[type] === 'object' && filter[type] !== null) {
        const field = Object.keys(filter[type])[0]
        for (let i = 0; i < filters.length; i++) {
          // check if is the same field
          const rule = filters[i][Object.keys(filters[i])[0]]
          if (typeof rule === 'object' && rule !== null && Object.keys(rule)[0] === field) {
            // replace filter object
            filters[i] = filter
            return self
          }
        }
      }
      break

    case 'nested':
      if (filter.nested) {
        for (let i = 0; i < filters.length; i++) {
          const { nested } = filters[i]
          // check if is the same nested object
          if (nested && nested.path === filter.nested.path) {
            // replace filter object
            filters[i] = filter
            return self
          }
        }
      }
  }

  // add new filter object to current list
  filters.push(filter)
  return self
}

/**
 * @method
 * @name EcomSearch#mergeFilter
 * @description Add/update a filter object on current
 * Query DSL filters list for next search request.
 *
 * @param {object} filter - A valid object for Query DSL
 * [filter context]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html}
 * @returns {self}
 *
 * @example

// Add custom filter by product quantity
search.mergeFilter({
  term: {
    quantity: 0
  }
})

 * @example

// Set filter by SKUs and run search request
const filter = { terms: { sku: ['nb-apl-1203', 'hd-csr-303'] } }
search.mergeFilter(filter).fetch()

 */

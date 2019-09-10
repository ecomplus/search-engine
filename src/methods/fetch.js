import { search } from '@ecomplus/client'

// request Search API and return promise
export default self => search({
  url: '/items.json',
  method: 'post',
  data: self.dsl
}).then(({ data }) => {
  // save last result on instance
  self.result = data
  const { dsl, history, localStorage, storageKey } = self
  if (data.hits.total && dsl && dsl.suggest && dsl.suggest.text) {
    // add search term to history
    history.unshift(dsl.suggest.text)
    if (localStorage && storageKey) {
      localStorage.setItem(storageKey, history.slice(0, 20).join('||'))
    }
  }
  // resolving with response data
  return data
})

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

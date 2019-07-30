import { search } from '@ecomplus/client'

// request Search API and return promise
export default self => search({
  url: '/items.json',
  method: 'post',
  data: self.query
})
  // resolving with response data
  .then(({ data }) => data)

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
search.fetch().then(result => {
  console.log(result.took)
  console.log(`{result.hits.total} items found:`)
  console.log(result.hits.hits)
})

 */

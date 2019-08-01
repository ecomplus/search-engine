import query from './../lib/query'
import { cloneDeep } from 'lodash'

export default self => {
  self.query = cloneDeep(query)
  return self
}

/**
 * @method
 * @name EcomSearch#resetQuery
 * @description Setup default
 * [Query DSL]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html}
 * for [Search API]{@link https://developers.e-com.plus/docs/api/#/search/items/items}
 * request body.
 *
 * @returns {self}
 *
 * @example

// Reset instance query object to default
search.resetQuery()

 */

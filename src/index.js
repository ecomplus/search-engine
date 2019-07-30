/**
 * https://github.com/ecomclub/search-engine
 * @author E-Com Club <ti@e-com.club>
 * @license MIT
 */

import { _config } from '@ecomplus/utils'
import fetch from './methods/fetch'
import resetQuery from './methods/reset-query'

/**
 * JS lib to handle products search with E-Com Plus stores.
 * @module @ecomplus/search-engine
 * @see EcomSearch
 *
 * @example
 * // ES import
 * import EcomSearch from '@ecomplus/search-engine'
 *
 * @example
 * // With CommonJS
 * const EcomSearch = require('@ecomplus/search-engine')
 *
 * @example
 * <!-- Global `EcomSearch` from CDN on browser -->
 * <script src="https://cdn.jsdelivr.net/npm/@ecomplus/search-engine/dist/ecom-search.root.min.js"></script>
 */

export default function (storeId = _config.get('store_id')) {
  const self = this

  /**
   * Respective Store ID number
   * @name EcomSearch#storeId
   * @type {number}
   */
  this.storeId = storeId

  /**
   * Current
   * [Query DSL]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html}
   * for [Search API]{@link https://developers.e-com.plus/docs/api/#/search/items/items}
   * request body
   * @name EcomSearch#query
   * @type {object}
   */
  this.query = {}
  resetQuery(self)

  this.fetch = () => fetch(self)
  this.resetQuery = () => resetQuery(self)
}

/**
 * Construct a new search engine instance object.
 * @class EcomSearch
 * @param {number} [storeId=_config.get('store_id')] - Preset Store ID number
 *
 * @example

const search = new EcomSearch()

 *
 * @example

// Defining Store ID other than the configured on `ecomUtils._config`
const storeId = 2000
const search = new EcomSearch(storeId)

 */

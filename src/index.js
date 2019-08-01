/**
 * https://github.com/ecomclub/search-engine
 * @author E-Com Club <ti@e-com.club>
 * @license MIT
 */

import { _config } from '@ecomplus/utils'
import fetch from './methods/fetch'
import resetQuery from './methods/reset-query'
import setSearchTerm from './methods/set-search-term'
import setPageNumber from './methods/set-page-number'
import setPageSize from './methods/set-page-size'
import setSortOrder from './methods/set-sort-order'
import addSpec from './methods/add-spec'
import addCategory from './methods/add-category'
import addBrand from './methods/add-brand'
import addProductId from './methods/add-product-id'
import setPriceRange from './methods/set-price-range'

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
   * Respective Store ID number.
   * @name EcomSearch#storeId
   * @type {number}
   */
  this.storeId = storeId

  /**
   * Current
   * [Query DSL]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html}
   * for [Search API]{@link https://developers.e-com.plus/docs/api/#/search/items/items}
   * request body.
   * <br>
   * You can edit this object to manually set Query DSL properties,
   * or you can use instance methods listed below.
   * @name EcomSearch#dsl
   * @type {object}
   */
  this.dsl = {}

  // instance methods
  this.fetch = () => fetch(self)
  this.resetQuery = () => resetQuery(self)
  this.setSearchTerm = term => setSearchTerm(self, term)
  this.setPageNumber = page => setPageNumber(self, page)
  this.setPageSize = limit => setPageSize(self, limit)
  this.setSortOrder = enumOrder => setSortOrder(self, enumOrder)
  this.addSpec = spec => addSpec(self, spec)
  this.addCategory = category => addCategory(self, category)
  this.addBrand = brand => addBrand(self, brand)
  this.addProductId = _id => addProductId(self, _id)
  this.setPriceRange = pricesObj => setPriceRange(self, pricesObj)

  // preset query object and set default page limit and sort by views
  resetQuery(self).setPageSize().setSortOrder()
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

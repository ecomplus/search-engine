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
import mergeFilter from './methods/merge-filter'
import removeFilter from './methods/remove-filter'
import setSpec from './methods/set-spec'
import setCategoryNames from './methods/set-category-names'
import setCategoryIds from './methods/set-category-ids'
import setBrandNames from './methods/set-brand-names'
import setBrandIds from './methods/set-brand-ids'
import setSkus from './methods/set-skus'
import setProductIds from './methods/set-product-ids'
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
  this.mergeFilter = filter => mergeFilter(self, filter)
  this.removeFilter = field => removeFilter(self, field)
  this.setSpec = (gridId, textOptions) => setSpec(self, gridId, textOptions)
  this.setCategoryNames = categoryNames => setCategoryNames(self, categoryNames)
  this.setCategoryIds = categoryIds => setCategoryIds(self, categoryIds)
  this.setBrandNames = brandNames => setBrandNames(self, brandNames)
  this.setBrandIds = brandIds => setBrandIds(self, brandIds)
  this.setSkus = skus => setSkus(self, skus)
  this.setProductIds = productIds => setProductIds(self, productIds)
  this.setPriceRange = (minPrice, maxPrice) => setPriceRange(self, minPrice, maxPrice)

  // preset query object
  resetQuery(self)
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

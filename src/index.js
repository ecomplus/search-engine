/**
 * https://github.com/ecomclub/search-engine
 * @author E-Com Club <ti@e-com.club>
 * @license MIT
 */

import { _config } from '@ecomplus/utils'
import fetch from './methods/fetch'
import reset from './methods/reset'
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
import getItems from './methods/get-items'
import getTotalCount from './methods/get-total-count'
import getTermSuggestions from './methods/get-term-suggestions'
import getBrands from './methods/get-brands'
import getCategories from './methods/get-categories'
import getPriceRange from './methods/get-price-range'
import getSpecs from './methods/get-specs'

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

const _key = 'ecomSeachHistory'
const _storage = typeof window === 'object' && window.localStorage

export default function (storeId, storageKey = _key, localStorage = _storage) {
  const self = this

  /**
   * Respective Store ID number.
   * @name EcomSearch#storeId
   * @type {number}
   */
  this.storeId = storeId || _config.get('store_id')

  /**
   * Item key to handle persistent [search history]{@link EcomSearch#history} data
   * with [localStorage]{@link EcomSearch#localStorage}.
   * @name EcomSearch#storageKey
   * @type {string|null}
   */
  this.storageKey = storageKey

  /**
   * [Storage interface]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}.
   * @name EcomSearch#localStorage
   * @type {object}
   */
  this.localStorage = localStorage

  /**
   * Search terms history.
   * @name EcomSearch#history
   * @type {array<string>}
   */
  this.history = []

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

  /**
   * Last search result object obtained with the
   * [fetch method]{@link EcomSearch#fetch}.
   * @name EcomSearch#result
   * @type {result|undefined}
   */
  this.result = undefined

  // instance methods
  this.fetch = () => fetch(self)
  this.reset = () => reset(self)
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
  this.getItems = result => getItems(self, result)
  this.getTotalCount = result => getTotalCount(self, result)
  this.getTermSuggestions = result => getTermSuggestions(self, result)
  this.getBrands = result => getBrands(self, result)
  this.getCategories = result => getCategories(self, result)
  this.getPriceRange = result => getPriceRange(self, result)
  this.getSpecs = result => getSpecs(self, result)

  // preset query object
  reset(self)
  if (localStorage && storageKey) {
    // try to preset search history from storage
    const history = localStorage.getItem(storageKey)
    if (typeof history === 'string') {
      self.history = history.split('||')
    }
  }
}

/**
 * Construct a new search engine instance object.
 * @class EcomSearch
 * @param {number} [storeId=_config.get('store_id')] - Preset Store ID number
 * @param {string|null} [storageKey='ecomSeachHistory'] - Item key to persist search history data
 * @param {object} [localStorage=window.localStorage] -
 * [Local Storage interface]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}
 *
 * @example

const search = new EcomSearch()

 *
 * @example

// Defining Store ID other than the configured on `ecomUtils._config`
const storeId = 2000
const search = new EcomSearch(storeId)

 */

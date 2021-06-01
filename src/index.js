/*!
 * @ecomplus/search-engine
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import EcomSearch from './constructor'
import dslMiddlewares from './lib/dsl-middlewares'
import addGlobalFilter from './modifiers/add-global-filter'
import setSalesChannel from './modifiers/set-sales-channel'
import setWarehouse from './modifiers/set-warehouse'

EcomSearch.dslMiddlewares = dslMiddlewares
EcomSearch.addGlobalFilter = addGlobalFilter
EcomSearch.setSalesChannel = setSalesChannel
EcomSearch.setWarehouse = setWarehouse

export default EcomSearch

export {
  EcomSearch,
  dslMiddlewares,
  addGlobalFilter,
  setSalesChannel,
  setWarehouse
}

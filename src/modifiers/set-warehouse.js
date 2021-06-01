import dslMiddlewares from './../lib/dsl-middlewares'

export default warehouseCode => {
  dslMiddlewares.push(dsl => {
    if (!dsl.sort) {
      dsl.sort = []
    }
    dsl.sort.splice(1, 0, {
      'warehouses.in_stock': {
        order: 'desc',
        nested: {
          path: 'warehouses',
          filter: {
            term: {
              'warehouses.code': warehouseCode
            }
          }
        }
      }
    })
  })
}

/**
 * @method
 * @name setWarehouse
 * @description Set warehouse (multi CD) code for searches in all instances.
 * @param {string} warehouseCode - Warehouse code
 *
 * @example
 * import { setWarehouse } from '@ecomplus/search-engine'
 * setWarehouse('MG')
 */

import * as merge from 'lodash.merge'
import dslMiddlewares from './../lib/dsl-middlewares'

const addGlobalFilter = (field, value) => {
  dslMiddlewares.push(dsl => {
    merge(dsl, {
      query: {
        bool: {
          filter: [{
            term: {
              [field]: value
            }
          }]
        }
      }
    })
  })
}

/**
 * @method
 * @name addGlobalFilter
 * @description Add custom fetch DSL middleware with simple term filter for all instances.
 * @param {string} field - Item field to filter with dot notation
 * @param {string|number|boolean} value - Searched field value
 *
 * @example
 * import { addGlobalFilter } from '@ecomplus/search-engine'
 * addGlobalFilter('channel_id', 123)
 */

export default addGlobalFilter

export { addGlobalFilter, dslMiddlewares }

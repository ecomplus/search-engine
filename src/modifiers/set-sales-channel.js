import addGlobalFilter from './add-global-filter'

export default channelId => addGlobalFilter('channel_id', channelId)

/**
 * @method
 * @name setSalesChannel
 * @description Set channel ID for searches in all instances.
 * @param {number} channelId - Sales channel ID
 *
 * @example
 * import { setSalesChannel } from '@ecomplus/search-engine'
 * setSalesChannel(123)
 */

import query from './../lib/query'

export default (self, enumOrder) => {
  // get default sort array
  const sort = query.sort.slice()

  // defines most common sorting options
  switch (enumOrder) {
    case 'sales':
    case 1:
      // sort by sales after relevance
      sort.splice(2, 0, {
        sales: {
          order: 'desc'
        }
      })
      break

    case 'lowest_price':
    case 2:
      // sort by price
      // lowest price -> highest price
      sort.splice(1, 0, {
        price: {
          order: 'asc'
        }
      })
      break

    case 'highest_price':
    case 3:
      // sort by price
      // highest price -> lowest price
      sort.splice(1, 0, {
        price: {
          order: 'desc'
        }
      })
      break

    default:
      // default sort by views after preseted sorting options
      sort.push({
        views: {
          order: 'desc'
        }
      })
  }

  // set instance query sort
  self.query.sort = sort
}

/**
 * @method
 * @name EcomSearch#setSortOrder
 * @description Defines most common sorting options and set
 * on instance query for next search request.
 *
 * @param {('sales'|'lowes_price'|'highest_price')} [enumOrder='views'] - Sort order option
 *
 * @example

// Sort next search result by top selling products
search.setSortOrder('sales')

* @example

// Sort next search result starting by most popular products
// It's the default preseted sort order (views)
search.setSortOrder()

 */

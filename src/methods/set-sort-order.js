import query from './../lib/dsl'

const inStockSort = {
  _script: {
    type: 'number',
    script: {
      lang: 'painless',
      source: "doc['quantity'].value > 0 ? 1 : 0"
    },
    order: 'desc'
  }
}

export default (self, enumOrder) => {
  // get default sort array
  const sort = query.sort.slice()

  // defines most common sorting options
  switch (enumOrder) {
    case 'sales':
      // sort by sales after relevance
      sort.splice(2, 0, inStockSort, {
        sales: {
          order: 'desc'
        }
      })
      break

    case 'news':
      // sort by hex ID after relevance replacing score sort
      sort[sort.length - 1] = inStockSort
      sort.push({
        _id: {
          order: 'desc'
        }
      })
      break

    case 'lowest_price':
    case 'highest_price':
      // sort by price after stock and before relevance
      sort.splice(1, 0, inStockSort, {
        price: {
          order: enumOrder === 'lowest_price' ? 'asc' : 'desc'
        }
      })
      break

    case 'offers':
      // sort by percentage offer price
      sort.splice(1, 0, {
        _script: {
          type: 'number',
          script: {
            lang: 'painless',
            source: "doc['quantity'].value > 0 && doc['price'].value > 0 && doc['base_price'].value > 0" +
              " ? doc['base_price'].value / doc['price'].value : 0"
          },
          order: 'desc'
        }
      })
      break

    case 'views':
    case '':
    case undefined:
    case null:
      // default sort by views after preseted sorting options
      sort.push({
        views: {
          order: 'desc'
        }
      })
      // sort by stock right after relevance
      sort.splice(2, 0, inStockSort)
      break

    default:
      // alphabetical order by 'name', 'sku' or any
      sort.splice(1, 0, inStockSort, {
        [enumOrder]: {
          order: 'asc'
        }
      })
  }

  // set instance query sort
  self.dsl.sort = sort
  return self
}

/**
 * @method
 * @name EcomSearch#setSortOrder
 * @description Defines most common sorting options and set
 * on instance query for next search request.
 *
 * @param {('sales'|'news'|'lowest_price'|'highest_price'|'offers'|'name'|'sku'|'views')} [enumOrder='views'] -
 * Sort option enum or valid sortable item field
 * @returns {self}
 *
 * @example

// Set sort by top selling products and run search request
search.setSortOrder('sales').fetch()

* @example

// Sort next search result starting by most popular products
// It's the default preseted sort order (views)
search.setSortOrder()

 */

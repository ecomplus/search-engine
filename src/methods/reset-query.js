export default self => {
  self.query = {
    query: {
      bool: {
        // condition, only visible products
        filter: [
          {
            term: {
              visible: true
            }
          }
        ]
      }
    },
    sort: [
      {
        available: {
          order: 'desc'
        }
      },
      {
        ad_relevance: {
          order: 'desc'
        }
      },
      '_score',
      // default sort by views after preseted sorting options
      {
        views: {
          order: 'desc'
        }
      }
    ],
    aggs: {
      brands: {
        terms: {
          field: 'brands.name'
        }
      },
      categories: {
        terms: {
          field: 'categories.name'
        }
      },
      // ref.: https://github.com/elastic/elasticsearch/issues/5789
      specs: {
        nested: {
          path: 'specs'
        },
        aggs: {
          grid: {
            terms: {
              field: 'specs.grid',
              size: 30
            },
            aggs: {
              text: {
                terms: {
                  field: 'specs.text'
                }
              }
            }
          }
        }
      },
      // Metric Aggregations
      min_price: {
        min: {
          field: 'price'
        }
      },
      max_price: {
        max: {
          field: 'price'
        }
      },
      avg_price: {
        avg: {
          field: 'price'
        }
      }
    }
  }
}

/**
 * @method
 * @name EcomSearch#resetQuery
 * @description Setup default
 * [Query DSL]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html}
 * for [Search API]{@link https://developers.e-com.plus/docs/api/#/search/items/items}
 * request body.
 *
 * @example

// Reset instance query object to default
search.resetQuery()

 */

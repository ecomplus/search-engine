import * as merge from 'lodash.merge'

export default (self, term) => {
  merge(self.dsl, {
    // match name and/or keyword with term
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
    query: {
      bool: {
        must: {
          multi_match: {
            query: term,
            fields: [
              'name',
              'keywords'
            ]
          }
        }
      }
    },

    // handle terms suggestion
    // 'did you mean?'
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html
    suggest: {
      text: term,
      words: {
        term: {
          field: 'name'
        }
      }
    }
  })

  return self
}

/**
 * @method
 * @name EcomSearch#setSearchTerm
 * @description Defines term to match with product name
 * and/or keywords on next search request.
 *
 * @param {string} term - Term to be searched
 * @returns {self}
 *
 * @example

// Set new search term
search.setSearchTerm('smartphone')

 * @example

// Set new term and run search request
search.setSearchTerm('notebook').fetch()

 */

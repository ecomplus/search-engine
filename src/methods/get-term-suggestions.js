export default (self, result) => {
  // get search term suggestions from result object
  if (!result) {
    result = self.result || {}
  }
  return (result.suggest && result.suggest.words) || []
}

/**
 * @typedef {object} suggest
 * @property {string} text - The original keyword from search term
 * @property {number} offset - Position where the keyword starts on search term
 * @property {number} length - Original keyword length
 * @property {array<suggestion>} options - Suggested options to replace original keyword
 */

/**
 * @typedef {object} suggestion
 * @property {string} text - The suggested keyword
 * @property {number} score - Match score up to 1
 * @property {number} freq - How many items match with the suggested keyword
 */

/**
 * @method
 * @name EcomSearch#getTermSuggestions
 * @description Get list of keyword suggestions based on current
 * search term from result object.
 *
 * @param {result} [result=self.result] - Search result object
 * @returns {array<suggest>}
 *
 * @example

// Run search request and count total items matched
search.fetch().then(() => console.log(search.getTotalCount()))

 * @example

// You can also pass search result object as param
try {
  const result = await search.fetch()
  if (search.getTotalCount(result) > 0) {
    // Listing result items as logic example here
    console.log(search.getItems(result))
  }
} catch (error) {
  console.error(error)
}

 */

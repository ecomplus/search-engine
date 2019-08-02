export default (self, { min, max }) => {
  // price ranges
  const price = {}
  if (typeof min === 'number' && !isNaN(min)) {
    price.gte = min
  }
  if (typeof max === 'number' && !isNaN(max)) {
    price.lte = max
  }

  // add/update filter
  return self.mergeFilter({
    range: {
      price
    }
  })
}

/**
 * @method
 * @name EcomSearch#setPriceRange
 * @description Defines range filter to match with product price
 * for next search request.
 *
 * @param {object} pricesObj - Object with product price range
 * @param {number|null} pricesObj.min - Minimun price value
 * @param {number|null} pricesObj.max - Maximun price value
 * @returns {self}
 *
 * @example

// Set filter by price range and run search request
search.setPriceRange({ min: 10, max: 22.5 }).fetch()

 * @example

// Remove filter by price price for next search
search.setPriceRange({ min: null, max: null })

 */

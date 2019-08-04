import commonAggregation from './../lib/common-aggregations'

// get brand options from aggregations result
export default result => commonAggregation(result, 'brands')

import commonAggregation from './../lib/common-aggregations'

// get category options from aggregations result
export default result => commonAggregation(result, 'categories')

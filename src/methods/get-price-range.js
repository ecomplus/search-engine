// get price aggregations from result object
export default ({ aggregations }) => aggregations
  ? {
    min: aggregations.min_price || 0,
    avg: aggregations.avg_price || 0,
    max: aggregations.max_price || 0
  }
  : {
    min: 0,
    avg: 0,
    max: 0
  }

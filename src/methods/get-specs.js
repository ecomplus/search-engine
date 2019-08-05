export default ({ aggregations }) => {
  // get specs nested aggregations from result object
  if (aggregations) {
    const { specs } = aggregations
    if (specs && specs.grid && Array.isArray(specs.grid.buckets)) {
      // map nested buckets
      return specs.grid.buckets.map(bucket => ({
        key: bucket.key,
        doc_count: bucket.doc_count,
        options: (bucket.text && bucket.text.buckets) || []
      }))
    }
  }
  return []
}

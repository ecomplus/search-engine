export default (self, limit) => {
  self.query.size = limit
  return self
}

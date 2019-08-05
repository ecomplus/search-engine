// get search term suggestions from result object
export default ({ suggest }) => (suggest && suggest.words) || []

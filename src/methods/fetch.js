import { search } from '@ecomplus/client'

// request Search API and return promise
const fetch = self => search({
  url: '/items.json',
  method: 'post',
  data: self.query
})

export default fetch

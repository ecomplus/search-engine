# search-engine

[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/search-engine/badge)](https://www.codefactor.io/repository/github/ecomclub/search-engine)
[![npm version](https://img.shields.io/npm/v/@ecomplus/search-engine.svg)](https://www.npmjs.org/@ecomplus/search-engine)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

JS lib to handle products search with E-Com Plus stores

[Changelog](https://github.com/ecomclub/search-engine/blob/master/CHANGELOG.md)

## Usage

The `@ecomplus/search-engine` package can be used to handle
a full featured products search engine, from simple items
search to applying multiple filters and aggregations.

It's available for both Node.js and browser environments.

- [Get started](https://developers.e-com.plus/search-engine/module-@ecomplus_search-engine.html)
- [Class reference](https://developers.e-com.plus/search-engine/EcomSearch.html)

### Example

```js
// Simple search example
search.setSearchTerm('smartphone').fetch()
  .then(result => {
    search.getItems().forEach(item => {
      console.log(item.name)
    })
  })
  .catch(error => {
    console.error(error)
    if (error.response) {
      console.log(error.response)
    }
  })
```

### Dependencies

It requires and doesn't include:
- [`@ecomplus/utils`](https://github.com/ecomclub/ecomplus-utils)
- [`@ecomplus/client`](https://github.com/ecomclub/ecomplus-client)
- Some [`lodash`](https://lodash.com/) methods:
  + [`_.merge`](https://lodash.com/docs/4.17.15#merge)
  + [`_.cloneDeep`](https://lodash.com/docs/4.17.15#cloneDeep)

It'll be automatically imported if you're developing on Node.js
environment or using a bundler such as Webpack,
**in other case those libraries must be included manually on
window scope**.

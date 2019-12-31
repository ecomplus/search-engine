# search-engine

[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/search-engine/badge)](https://www.codefactor.io/repository/github/ecomclub/search-engine)
[![npm version](https://img.shields.io/npm/v/@ecomplus/search-engine.svg)](https://www.npmjs.org/@ecomplus/search-engine)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

JS lib to handle products search with E-Com Plus stores

[CHANGELOG](https://github.com/ecomclub/search-engine/blob/master/CHANGELOG.md)

## Usage

The `@ecomplus/search-engine` package can be used to handle
a full featured products search engine, from simple items
search to applying multiple filters and aggregations.

It's available for both Node.js and browser environments.

- [Get started](https://developers.e-com.plus/search-engine/module-@ecomplus_search-engine.html)
- [Class reference](https://developers.e-com.plus/search-engine/EcomSearch.html)

### Example

```js
const search = new EcomSearch()
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

It requires and _may not_ include:

- `core-js`;
- [`lodash.clonedeep`](https://lodash.com/docs/4.17.15#cloneDeep);
- [`lodash.merge`](https://lodash.com/docs/4.17.15#merge);
- [`@ecomplus/utils`](https://github.com/ecomclub/ecomplus-utils);
- [`@ecomplus/client`](https://github.com/ecomclub/ecomplus-client);

#### Node.js

```bash
npm i --save @ecomplus/utils @ecomplus/search-engine
```

#### Webpack

```bash
npm i --save core-js @ecomplus/utils @ecomplus/search-engine
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@ecomplus/search-engine/dist/ecom-search.var.min.js"></script>
```

`_.cloneDeep`, `_.merge`, `ecomUtils` and `ecomClient` libraries
**must be included separately** and available on window scope.

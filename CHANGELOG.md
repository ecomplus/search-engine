# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/ecomclub/search-engine/compare/v0.10.0...v1.0.0) (2019-08-12)



## [0.10.0](https://github.com/ecomclub/search-engine/compare/v0.9.0...v0.10.0) (2019-08-06)


### Features

* **history:** handing search terms history list ([e1ab9f1](https://github.com/ecomclub/search-engine/commit/e1ab9f1))



## [0.9.0](https://github.com/ecomclub/search-engine/compare/v0.8.0...v0.9.0) (2019-08-06)


### Features

* **get-brands:** add 'getBrands' method ([fd3171c](https://github.com/ecomclub/search-engine/commit/fd3171c))
* **get-categories:** add 'getCategories' method ([4811243](https://github.com/ecomclub/search-engine/commit/4811243))
* **get-price-range:** add 'getPriceRange' method ([ed1f631](https://github.com/ecomclub/search-engine/commit/ed1f631))
* **get-specs:** add 'getSpecs' method ([75e6588](https://github.com/ecomclub/search-engine/commit/75e6588))
* **get-term-suggestions:** add 'getTermSuggestions' method ([1ec9b12](https://github.com/ecomclub/search-engine/commit/1ec9b12))



## [0.8.0](https://github.com/ecomclub/search-engine/compare/v0.7.0...v0.8.0) (2019-08-05)


### Features

* **get-items:** add 'getItems' method ([4c96b2e](https://github.com/ecomclub/search-engine/commit/4c96b2e))
* **get-total-count:** add 'getTotalCount' method ([a295007](https://github.com/ecomclub/search-engine/commit/a295007))
* **result:** saving last result object as instance member ([8241d41](https://github.com/ecomclub/search-engine/commit/8241d41))


### refactor

* **reset:** also unset instance result, change method name ([860c911](https://github.com/ecomclub/search-engine/commit/860c911))


### BREAKING CHANGES

* **reset:** 'resetQuery' method no more working, renamed to 'reset'



## [0.7.0](https://github.com/ecomclub/search-engine/compare/v0.6.0...v0.7.0) (2019-08-03)


### Features

* **remove-filters:** handling 'removeFilters' method ([425383c](https://github.com/ecomclub/search-engine/commit/425383c))
* **set-brand-ids:** handling 'setBrandIds' method ([cbac95e](https://github.com/ecomclub/search-engine/commit/cbac95e))
* **set-brand-names:** handling 'setBrandNames' method ([caf127f](https://github.com/ecomclub/search-engine/commit/caf127f))
* **set-category-ids:** handling 'setCategoryIds' method ([f775482](https://github.com/ecomclub/search-engine/commit/f775482))
* **set-category-names:** handling 'setCategoryNames' method ([bca22b0](https://github.com/ecomclub/search-engine/commit/bca22b0))
* **set-product-ids:** handling 'setProductIds' method ([23f1871](https://github.com/ecomclub/search-engine/commit/23f1871))
* **set-skus:** handling 'setSkus' method ([13172b2](https://github.com/ecomclub/search-engine/commit/13172b2))



## [0.6.0](https://github.com/ecomclub/search-engine/compare/v0.5.0...v0.6.0) (2019-08-02)


### Bug Fixes

* **merge-filter:** check field and key value for nested object filter ([0d4fc0f](https://github.com/ecomclub/search-engine/commit/0d4fc0f))


### Features

* **merge-filter:** handling 'mergeFilter' method ([b86c96c](https://github.com/ecomclub/search-engine/commit/b86c96c))
* **set-price-range:** handling 'setPriceRange' method ([5b9ead4](https://github.com/ecomclub/search-engine/commit/5b9ead4))
* **set-spec:** handling 'setSpec' methods ([0a93966](https://github.com/ecomclub/search-engine/commit/0a93966))


### refactor

* **constructor:** changing some methods names ([cad3d3e](https://github.com/ecomclub/search-engine/commit/cad3d3e))
* **set-price-range:** edit method params ([8927966](https://github.com/ecomclub/search-engine/commit/8927966))


### BREAKING CHANGES

* **set-price-range:** 'setPriceRange' no more working with object param
* **constructor:** some methods renamed



## [0.5.0](https://github.com/ecomclub/search-engine/compare/v0.4.0...v0.5.0) (2019-08-01)


### Bug Fixes

* **reset-query:** reset default page limit and sort by views ([6712898](https://github.com/ecomclub/search-engine/commit/6712898))


### Features

* **set-page-number:** handling 'setPageNumber' method ([baca926](https://github.com/ecomclub/search-engine/commit/baca926))
* **set-search-term:** handling 'setSearchTerm' method ([204eae2](https://github.com/ecomclub/search-engine/commit/204eae2))



## [0.4.0](https://github.com/ecomclub/search-engine/compare/v0.3.0...v0.4.0) (2019-08-01)


### Build System

* **webpack:** fix declaring lodash as external lib ([32cb011](https://github.com/ecomclub/search-engine/commit/32cb011))


### Features

* **set-page-size:** handing 'setPageSize' method ([cf12f36](https://github.com/ecomclub/search-engine/commit/cf12f36))


### refactor

* **constructor:** changing 'query' property to 'dsl' ([3e5e08b](https://github.com/ecomclub/search-engine/commit/3e5e08b))


### BREAKING CHANGES

* **constructor:** search.query will no more work, changed to search.dsl



## [0.3.0](https://github.com/ecomclub/search-engine/compare/v0.2.0...v0.3.0) (2019-07-31)


### Bug Fixes

* **query:** preset query object, set default page limit and sort ([0fd4f51](https://github.com/ecomclub/search-engine/commit/0fd4f51))
* **reset-query:** using assing to keep original default query object ([c7523f9](https://github.com/ecomclub/search-engine/commit/c7523f9))
* **reset-query:** using deep clone to keep default query object intact ([9bd53ab](https://github.com/ecomclub/search-engine/commit/9bd53ab))


### Build System

* **webpack:** ignoring lodash.clonedeep on bundler as external package ([9797129](https://github.com/ecomclub/search-engine/commit/9797129))


### Features

* **constructor:** setup methods ([b633495](https://github.com/ecomclub/search-engine/commit/b633495))
* **reset-query:** return self to add ability to chain code ([10b00ca](https://github.com/ecomclub/search-engine/commit/10b00ca))
* **set-sort-order:** handling 'setSortOrder' method ([419ae41](https://github.com/ecomclub/search-engine/commit/419ae41))
* **set-sort-order:** return self to add ability to chain code ([191a7f1](https://github.com/ecomclub/search-engine/commit/191a7f1))



## [0.2.0](https://github.com/ecomclub/search-engine/compare/v0.1.0...v0.2.0) (2019-07-30)


### Features

* **fetch:** handling search api request with fetch method ([ebd12ba](https://github.com/ecomclub/search-engine/commit/ebd12ba))
* **method:** add 'resetQuery' method and setup with default Query DSL ([f3770d9](https://github.com/ecomclub/search-engine/commit/f3770d9))



## 0.1.0 (2019-07-29)


### Build System

* **babel:** setup babel config file ([d272605](https://github.com/ecomclub/search-engine/commit/d272605))
* **webpack:** edit output filename for cdns ([35d1308](https://github.com/ecomclub/search-engine/commit/35d1308))
* **webpack:** setup webpack config with two outputs ([5f170f2](https://github.com/ecomclub/search-engine/commit/5f170f2))


### Features

* **constructor:** setup constructor function ([6a87d99](https://github.com/ecomclub/search-engine/commit/6a87d99))


### Tests

* **home:** setup html file for tests ([8dfb2aa](https://github.com/ecomclub/search-engine/commit/8dfb2aa))

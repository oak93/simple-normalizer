# Normalizer

[![Build Status](https://travis-ci.org/flexdinesh/npm-module-boilerplate.svg?branch=master)](https://travis-ci.org/flexdinesh/npm-module-boilerplate) [![dependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate) [![devDependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/dev-status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Description**
simple-normalizer is a module for normalizing deep nested array of objects.
So, you can work with your data in a better way. Using this module with ReactJS, gives you
much power when you want to establish unmutable data.

By the way, it is really easy to use.

# Installation
npm install --save simple-normalizer

# Examples

**Default**
By default, simple-normalizer looks for 'children' property on your objects.

```
INPUT:

const data = [
  {id: 1, title: '1', children: [
      {id: 11, title: '1.1'},
      {id: 12, title: '1.2', children: [
          {id: 121, title: '1.2.1'},
          {id: 122, title: '1.2.2'},
        ]
      },
    ]
  },
  {id: 2, title: '2'},
  {id: 3, title: '3'},
]

const normalizedData = simpleNormalizer(data);
console.log(normalizedData);

OUTPUT:
[{
  1: {
    id: 1,
    title: "1",
    children: [
      11,
      12
    ]
  },
  2: {
    id: 2,
    title: "2",
    children: []
  },
  3: {
    id: 3,
    title: "3",
    children: []
  },
  11: {
    id: 11,
    title: "1.1",
    children: []
  },
  12: {
    id: 12,
    title: "1.2",
    children: [
      121,
      122
    ]
  },
  121: {
    id: 121,
    title: "1.2.1",
    children: []
  },
  122: {
    id: 122,
    title: "1.2.2",
    children: []
  }
}]

```

**You can choose which property**
By default, simple-normalizer looks for 'children' but if you want to change this behaivor,
you can specify the key name

```
INPUT:

const data = [
  {id: 1, title: '1', myKey: [
      {id: 11, title: '1.1'},
      {id: 12, title: '1.2', myKey: [
          {id: 121, title: '1.2.1'},
          {id: 122, title: '1.2.2'},
        ]
      },
    ]
  },
  {id: 2, title: '2'},
  {id: 3, title: '3'},
]

const normalizedData = simpleNormalizer(data, 'myKey');
console.log(normalizedData);

OUTPUT:
[{
  1: {
    id: 1,
    title: "1",
    myKey: [
      11,
      12
    ]
  },
  2: {
    id: 2,
    title: "2",
    myKey: []
  },
  3: {
    id: 3,
    title: "3",
    myKey: []
  },
  11: {
    id: 11,
    title: "1.1",
    myKey: []
  },
  12: {
    id: 12,
    title: "1.2",
    myKey: [
      121,
      122
    ]
  },
  121: {
    id: 121,
    title: "1.2.1",
    myKey: []
  },
  122: {
    id: 122,
    title: "1.2.2",
    myKey: []
  }
}]

```

# License
MIT © Osman Akar

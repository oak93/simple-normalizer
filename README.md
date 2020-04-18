# Normalizer

[![Build Status](https://travis-ci.org/flexdinesh/npm-module-boilerplate.svg?branch=master)](https://travis-ci.org/flexdinesh/npm-module-boilerplate) [![dependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Description**
simple-normalizer is a module for normalizing deep nested array of objects.
So, you can work with your data in a better way. Using this module with ReactJS, gives you
much power when you want to establish unmutable data. Basically it has two functions, normalizer and denormalizer.

# Installation

```sh
$ npm i --save simple-normalizer
```

# How to use

```sh
$ const { normalize, denormalize } = require("simple-normalizer");
```

# Examples

**Default**
By default, simple-normalizer looks for 'children' property on your objects.

```
INPUT:

const data = {
  id: 1,
  title: "1",
  children: [
    { id: 11, title: "1.1" },
    {
      id: 12,
      title: "1.2",
      children: [
        { id: 121, title: "1.2.1" },
        { id: 122, title: "1.2.2" },
      ],
    },
  ],
};

const normalizedData = normalize(data);

OUTPUT:
{
  "1": {
    "id": 1,
    "title": "1",
    "children": [
      11,
      12
    ]
  },
  "11": {
    "id": 11,
    "title": "1.1",
    "children": []
  },
  "12": {
    "id": 12,
    "title": "1.2",
    "children": [
      121,
      122
    ]
  },
  "121": {
    "id": 121,
    "title": "1.2.1",
    "children": []
  },
  "122": {
    "id": 122,
    "title": "1.2.2",
    "children": []
  }
}

```

**You can specify another property**
By default, simple-normalizer looks for 'children' but if you want to change this behaivor,
you can specify the property

```
INPUT:

const data = {
  id: 1,
  title: "1",
  myKey: [
    { id: 11, title: "1.1" },
    {
      id: 12,
      title: "1.2",
      myKey: [
        { id: 121, title: "1.2.1" },
        { id: 122, title: "1.2.2" },
      ],
    },
  ],
};

const normalizedData = normalize(data, "myKey");

OUTPUT:
{
  "1": {
    "id": 1,
    "title": "1",
    "myKey": [
      11,
      12
    ]
  },
  "11": {
    "id": 11,
    "title": "1.1",
    "myKey": []
  },
  "12": {
    "id": 12,
    "title": "1.2",
    "myKey": [
      121,
      122
    ]
  },
  "121": {
    "id": 121,
    "title": "1.2.1",
    "myKey": []
  },
  "122": {
    "id": 122,
    "title": "1.2.2",
    "myKey": []
  }
}

**If you want to denormalize the data like right above**

const denormalizedData = denormalize(normalizedData);

OUTPUT:
{
  "id": 1,
  "title": "1",
  "children": [
    {
      "id": 11,
      "title": "1.1"
    },
    {
      "id": 12,
      "title": "1.2",
      "children": [
        {
          "id": 121,
          "title": "1.2.1"
        },
        {
          "id": 122,
          "title": "1.2.2"
        }
      ]
    }
  ]
}

Also, if you have another property instead of 'children' you can pass it!

const denormalizedData = denormalize(data, "myKey");
```

# License

MIT © Osman Akar

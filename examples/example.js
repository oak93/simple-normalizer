const simpleNormalizer = require('../lib').default;

const nestedDataChildrenKey = [
  {
    id: 1,
    title:
      "1",
    children: [
      { id: 11, title: "1.1" },
      { id: 12, title: "1.2" },
      { id: 13, title: "1.3" },
      { id: 14, title: "1.4" },
      { id: 15, title: "1.5" }
    ]
  },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  {
    id: 4,
    title: "4",
    children: [
      { id: 41, title: "4.1" },
      {
        id: 42,
        title: "4.2",
        children: [
          { id: 421, title: "4.2.1" },
          { id: 422, title: "4.2.2" },
          { id: 423, title: "4.2.3" },
          { id: 424, title: "4.2.4" },
          { id: 425, title: "4.2.5" }
        ]
      },
      { id: 43, title: "4.3" },
      { id: 44, title: "4.4" },
      { id: 45, title: "4.5" }
    ]
  },
  { id: 5, title: "5" },
  { id: 6, title: "6" }
];

const nestedDataWithNestedKey = [
  {
    id: 1,
    title:
      "1",
    nested: [
      { id: 11, title: "1.1" },
      { id: 12, title: "1.2" },
      { id: 13, title: "1.3" },
      { id: 14, title: "1.4" },
      { id: 15, title: "1.5" }
    ]
  },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  {
    id: 4,
    title: "4",
    nested: [
      { id: 41, title: "4.1" },
      {
        id: 42,
        title: "4.2",
        nested: [
          { id: 421, title: "4.2.1" },
          { id: 422, title: "4.2.2" },
          { id: 423, title: "4.2.3" },
          { id: 424, title: "4.2.4" },
          { id: 425, title: "4.2.5" }
        ]
      },
      { id: 43, title: "4.3" },
      { id: 44, title: "4.4" },
      { id: 45, title: "4.5" }
    ]
  },
  { id: 5, title: "5" },
  { id: 6, title: "6" }
];

const resultChildrenKey = simpleNormalizer(nestedDataChildrenKey);
const resultNestedKey = simpleNormalizer(nestedDataWithNestedKey);

console.log('resultChildrenKey:', resultChildrenKey);
console.log('resultNestedKey:', resultNestedKey);

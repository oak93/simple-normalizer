const { normalize, denormalize } = require("../lib").default;

const dataWithChildren = {
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

const normalizedDataWithChildren = {
  "1": {
    id: 1,
    title: "1",
    children: [11, 12],
  },
  "11": {
    id: 11,
    title: "1.1",
    children: [],
  },
  "12": {
    id: 12,
    title: "1.2",
    children: [121, 122],
  },
  "121": {
    id: 121,
    title: "1.2.1",
    children: [],
  },
  "122": {
    id: 122,
    title: "1.2.2",
    children: [],
  },
};

// const resultDataWithChildren = normalize(dataWithChildren);
// console.log("resultDataWithChildren:", JSON.stringify(resultDataWithChildren));

const resultNormalizedDataWithChildren = denormalize(
  normalizedDataWithChildren
);
console.log(
  "resultNormalizedDataWithChildren:",
  JSON.stringify(resultNormalizedDataWithChildren)
);

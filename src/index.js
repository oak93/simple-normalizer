const normalize = (data, property = "children") => {
  if (!data) {
    return [];
  }

  if (!Array.isArray(data)) {
    data = [data];
  }

  const normalizedData = {};
  _normalize(normalizedData, data, property);

  return normalizedData;
};

const _normalize = (result, data, property) => {
  data.forEach((each) => {
    const deep = each[property];
    let children = [];

    if (deep && deep.length > 0) {
      children = deep.map((child) => child.id);
      _normalize(result, deep, property);
    }

    result[each.id] = {
      ...each,
      [property]: children,
    };
  });
};

const denormalize = (data, property = "children") => {
  const visiteds = {};

  const deepSearch = (eData, property) => {
    let children = [];
    let deepChildren = [];

    if (eData[property] && eData[property].length > 0) {
      children = eData[property].map((cData) => {
        deepChildren = deepSearch(data[cData], property);

        visiteds[data[cData].id] = true;

        const result = {
          ...data[cData],
          [property]: deepChildren,
        };

        if (result[property].length === 0) {
          delete result[property];
        }

        return result;
      });
    }

    return children;
  };

  const _denormalize = Object.keys(data).map((e) => {
    const eData = data[e];
    const children = deepSearch(eData, property);

    const result = {
      ...eData,
      [property]: children,
    };

    if (result[property].length === 0) {
      delete result[property];
    }

    return result;
  });

  const [denormalizedData] = _denormalize.filter((dData) => !visiteds[dData.id]);

  return denormalizedData;
};

const simpleNormalizer = {
  normalize,
  denormalize,
};

export default simpleNormalizer;

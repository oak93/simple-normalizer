const simpleNormalizer = (nestedData, property = 'children') => {
  if (!nestedData || nestedData.length === 0) {
    console.error(`simple-normalizer: cannot read ${nestedData}!`);
    return null;
  }

  if (!Array.isArray(nestedData)) {
    console.error(`simple-normalizer: type of ${nestedData} should be an array!`);
    return null;
  }

  const result = {};
  _normalize(result, nestedData, property);

  return result;
}

const _normalize = (res, nestedData, property) => {
  nestedData.forEach(data => {
    const deep = data[property];
    let children = [];

    if (deep && deep.length > 0) {
      children = deep.map(child => child.id);
      _normalize(res, deep, property);
    }

    res[data.id] = {
      ...data,
      [property]: children,
    };
  });
}

export default simpleNormalizer;

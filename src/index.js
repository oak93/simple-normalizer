class SimpleNormalizer {
  normalize(data, property = 'children') {
    const result = {};

    if (!data || data.length === 0) {
      console.error(`simple-normalizer: cannot read ${data}!`);
      return null;
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    if (Array.isArray(property)) {
      property.forEach(prop => {
        _recursiveNormalize(result, data, prop);
      })
    } else {
      _recursiveNormalize(result, data, property);
    }

    return result;
  }
}

const _recursiveNormalize = (result, data, prop) => {
  data.forEach(eachData => {
    let children = [];
    const propertyArr = prop.split('.');
    const firstItem = propertyArr[0];
    const lastItemIndex = propertyArr.length - 1;
    const deep = _findDeep(propertyArr, eachData);

    if (deep && deep.length > 0) {
      children = deep.map(child => child.id);
      _recursiveNormalize(result, deep, prop);
    }

    result[eachData.id] = {
      ...eachData,
      ...result[eachData.id],
      [propertyArr[lastItemIndex]]: children,
    };

    delete result[eachData.id][firstItem];
  });
}

const _findDeep = (propertyArr, data) => {
  return propertyArr.reduce((acc, cur) => {
    return acc && acc[cur];
  }, data);
}

export default new SimpleNormalizer();

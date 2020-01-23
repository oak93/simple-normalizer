class SimpleNormalizer {
  normalize(data, property = "children") {
    const normalizedData = {};

    if (!data || data.length === 0) {
      console.error(`simple-normalizer: cannot read ${data}!`);
      return null;
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    if (Array.isArray(property)) {
      property.forEach(prop => {
        _recursiveNormalize(normalizedData, data, prop);
      });
    } else {
      _recursiveNormalize(normalizedData, data, property);
    }

    return normalizedData;
  }

  denormalize(data, property = "children") {
    const visiteds = {};

    const goDeep = (data, eData, property = "children") => {
      let children = [];
      let deepChildren = [];

      if (eData.children && eData.children.length > 0) {
        children = eData.children.map(cData => {
          deepChildren = goDeep(data, data[cData], property);

          visiteds[data[cData].id] = true;

          return {
            ...data[cData],
            [property]: deepChildren
          };
        });
      }

      return children;
    };

    const unFilteredDenormalizedData = Object.keys(data).map(e => {
      const eData = data[e];
      const children = goDeep(data, eData);

      return {
        ...eData,
        [property]: children
      };
    });

    const denormalizedData = unFilteredDenormalizedData.filter(
      dData => !visiteds[dData.id]
    );

    return denormalizedData;
  }
}

const _recursiveNormalize = (normalizedData, data, prop) => {
  data.forEach(eachData => {
    let children = [];
    const propertyArr = prop.split(".");
    const firstItem = propertyArr[0];
    const lastItemIndex = propertyArr.length - 1;
    const deep = _findDeep(propertyArr, eachData);

    if (deep && deep.length > 0) {
      children = deep.map(child => child.id);
      _recursiveNormalize(normalizedData, deep, prop);
    }

    normalizedData[eachData.id] = {
      ...eachData,
      ...normalizedData[eachData.id],
      [propertyArr[lastItemIndex]]: children
    };

    delete normalizedData[eachData.id][firstItem];
  });
};

const _findDeep = (propertyArr, data) => {
  return propertyArr.reduce((acc, cur) => {
    return acc && acc[cur];
  }, data);
};

export default new SimpleNormalizer();

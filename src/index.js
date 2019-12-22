class SimpleNormalizer {
  constructor(data, property = 'children') {
    this.data = data;
    this.result = {};
    this.property = property;
  }

  normalize() {
    if (!this.data || this.data.length === 0) {
      console.error(`simple-normalizer: cannot read ${this.data}!`);
      return null;
    }

    if (!Array.isArray(this.data)) {
      this.data = [this.data];
    }

    if (Array.isArray(this.property)) {
      this.property.forEach(prop => {
        this._recursiveNormalize(this.result, this.data, prop);
      })
    } else {
      this._recursiveNormalize(this.result, this.data);
    }


    return this.result;
  }

  _recursiveNormalize(result, data, prop = this.property) {
    data.forEach(eachData => {
      let children = [];
      const propertyArr = prop.split('.');
      const firstItem = propertyArr[0];
      const lastItemIndex = propertyArr.length - 1;
      const deep = this._findDeep(propertyArr, eachData);

      if (deep && deep.length > 0) {
        children = deep.map(child => child.id);
        this._recursiveNormalize(result, deep, prop);
      }

      result[eachData.id] = {
        ...eachData,
        ...result[eachData.id],
        [propertyArr[lastItemIndex]]: children,
      };

      delete result[eachData.id][firstItem];
    });
  }

  _findDeep(propertyArr, data) {
    return propertyArr.reduce((acc, cur) => {
      return acc && acc[cur];
    }, data);
  }
}

export default SimpleNormalizer;

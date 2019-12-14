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

    this._recursiveNormalize(this.result, this.data, this.property);

    return this.result;
  }

  _recursiveNormalize(obj, nestedData) {
    nestedData.forEach(data => {
      const propertyArr = this.property.split('.');
      const lastItem = propertyArr.length - 1;

      const deep = propertyArr.reduce((acc, cur) => {
        return acc && acc[cur];
      }, data);

      let children = [];

      if (deep && deep.length > 0) {
        children = deep.map(child => child.id);
        this._recursiveNormalize(obj, deep, this.property);
      }

      obj[data.id] = {
        ...data,
        [propertyArr[lastItem]]: children,
      };
    });
  }
}

export default SimpleNormalizer;

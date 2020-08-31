class Value {
  constructor(value) {
    this.value = value;
  }

  toString() {
    if (this.value == null) {
      return '""';
    }

    if (typeof this.value == 'number' || typeof this.value == 'boolean') {
      this.value = this.value.toString();
    }

    if (typeof this.value == 'object') {
      this.value = JSON.stringify(this.value);
    }

    this.value = this.value.replace(/"/g, '""');
    return `"${this.value}"`;
  }
}

module.exports = Value;

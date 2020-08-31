const DEFAULTS = {
  index: 'transactionsv2-2020.08',
  scrollSize: 10,
  query: { query: { term: { source: { value: 'acehub' } } } },
  maxValue: undefined,
  filePath: './result.csv',
  url: 'http://localhost:9200',
};

class Arguments {
  constructor(args) {
    this.index = args.index ? args.index : DEFAULTS.index;
    this.scrollSize = args.scrollSize ? args.scrollSize : DEFAULTS.scrollSize;
    this.query = args.query ? JSON.stringify(args.query) : DEFAULTS.query;
    this.maxValue = args.maxValue ? args.query : DEFAULTS.maxValue;
    this.filePath = args.output ? args.output : DEFAULTS.filePath;
    this.url = args.url ? args.url : DEFAULTS.url;
  }

  toString() {
    return `{
      [index]: ${this.index},
      [scrollSize]: ${this.scrollSize},
      [query]: ${JSON.stringify(this.query)},
      [maxValue]: ${this.maxValue == null ? this.maxValue : '""'},
      [filePath]: ${this.filePath},
      [url]: ${this.url},
    }`;
  }
}

module.exports = Arguments;

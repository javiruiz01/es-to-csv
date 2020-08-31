const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');

const COLUMNS = require('./columns');
const Value = require('./value');
const SEPARATOR = ';';

async function exportToCsv({
  index,
  scrollSize,
  query,
  maxValue,
  filePath,
  url,
}) {
  const client = new Client({ node: url });
  let counter = 0;
  const responseQueue = [
    await client.search({
      index,
      scroll: '30s',
      size: scrollSize,
      body: query,
    }),
  ];

  const writeStream = fs.createWriteStream(filePath, {
    flags: 'w',
    autoClose: true,
  });
  writeStream.write(`${COLUMNS.join(SEPARATOR)}\n`);
  while (responseQueue.length > 0) {
    const { body } = responseQueue.shift();
    counter++;

    if (counter === body.hits.total.value || counter > maxValue) {
      console.log('Finished reading every element');
      break;
    }

    body.hits.hits.forEach(({ _source: source }) => {
      const mappedColumns = COLUMNS.map((column) =>
        new Value(source[column]).toString()
      );
      writeStream.write(`${mappedColumns.join(SEPARATOR)}\n`);
    });

    responseQueue.push(
      await client.scroll({
        scrollId: body._scroll_id,
        scroll: '30s',
      })
    );
  }

  writeStream.close();
  client.close();
}

module.exports = exportToCsv;

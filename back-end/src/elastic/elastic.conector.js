require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || "elastic",
    password: process.env.ELASTICSEARCH_PASSWORD || "23062003",
  },
});

const index_name = process.env.DATA_INDEX || "law";
const test_index_name = process.env.TEST_DATA_INDEX || "test";
const settings = require("./settings.json");
const data = require("./maindata/data.json");

async function checkOrCreateIndex(indexName, mappings) {
  const exists = await client.indices.exists({ index: indexName });
  if (exists) {
    console.log(`Index "${indexName}" already exists.`);
  } else {
    await client.indices.create({
      index: indexName,
      body: {
        settings: settings.settings,
        mappings,
      },
    });
    console.log(`Index "${indexName}" created.`);
  }
}
// push data to main index
async function bulkIndexData(indexName, documents) {
  const bulkData = documents.flatMap((doc) => [
    { index: { _index: indexName } },
    doc,
  ]);

  const bulkResponse = await client.bulk({ refresh: true, body: bulkData });

  if (bulkResponse.errors) {
    const erroredDocuments = bulkResponse.items.filter(
      (item) => item.index && item.index.error
    );
    console.error(`Errors occurred while indexing into "${indexName}":`, erroredDocuments);
  } else {
    console.log(`Data successfully indexed into "${indexName}".`);
  }
}

//push data to test index
async function loadTestData(folderPath, indexName) {
  const files = await fs.readdir(folderPath);
  const allDocuments = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    if (path.extname(file) === ".json") {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      allDocuments.push(...jsonData);
    }
  }

  await bulkIndexData(indexName, allDocuments);
}

(async () => {
  try {
    console.log("Connecting to Elasticsearch...");
    await client.ping();
    console.log("Successfully connected to Elasticsearch.");

    const mappings = {
      dynamic: true,
      properties: {
        "*": {
          type: "text",
          analyzer: "legal_vi_analyzer",
        },
      },
    };

    // Handle main index
    await checkOrCreateIndex(index_name, mappings);
    await bulkIndexData(index_name, data);

    // Handle test data index
    await checkOrCreateIndex(test_index_name, mappings);
    const testdataFolder = path.resolve(__dirname, "testdata");
    await loadTestData(testdataFolder, test_index_name);

  } catch (error) {
    console.error("An error occurred:", error);
  }
})();

module.exports = client;
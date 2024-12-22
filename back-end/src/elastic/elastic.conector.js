require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");
const data = require("./data.json"); // Adjust path as needed
const settings = require("./settings.json"); // Adjust path as needed

const client = new Client({
  node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || "elastic",
    password: process.env.ELASTICSEARCH_PASSWORD || "23062003",
  },
});

const index_name = process.env.DATA_INDEX || "law";

(async () => {
  try {
    // Check Elasticsearch connection
    // throw new Error(settings.settings.analysis);
    console.log("Elasticsearch Node:", process.env.ELASTICSEARCH_NODE);
    console.log("Elasticsearch Username:", process.env.ELASTICSEARCH_USERNAME);
    console.log("Elasticsearch Password:", process.env.ELASTICSEARCH_PASSWORD);
    console.log("Index name:", process.env.DATA_INDEX);
    await client.ping();
    console.log("Successfully connected to Elasticsearch.");

    // Check if the index already exists
    const exists = await client.indices.exists({ index: index_name });
    if (exists) {
      console.log(`Index "${index_name}" already exists.`);
    } else {
      // Create the index with dynamic mapping
      await client.indices.create({
        index: index_name,
        body: {
          settings: settings.settings,
          mappings: {
            dynamic: true, // Enable dynamic mapping
            properties: {
              // This will apply the custom analyzer to all text fields
              "*": {
                type: "text",
                analyzer: "legal_vi_analyzer", // Use the custom analyzer
              },
            },
          },
        },
      });

      // Prepare bulk indexing data
      const bulkData = data.flatMap((doc) => [
        { index: { _index: index_name } },
        doc,
      ]);

      // Perform bulk indexing
      const bulkResponse = await client.bulk({ refresh: true, body: bulkData });

      // Check for bulk errors
      if (bulkResponse.errors) {
        const erroredDocuments = bulkResponse.items.filter(
          (item) => item.index && item.index.error
        );
        console.error("Errors occurred while indexing:", erroredDocuments);
      } else {
        console.log("Data successfully indexed.");
      }
      console.log(`Index "${index_name}" created.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();

module.exports = client;

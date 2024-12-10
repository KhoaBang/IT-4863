import { Client, errors } from '@elastic/elasticsearch';
import data from './Elastic/data.json' assert { type: 'json' };

const client = new Client({
  node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
    password: process.env.ELASTICSEARCH_PASSWORD || 'your_default_password',
  },
});

const index_name = process.env.DATA_INDEX || 'law';

(async () => {
  try {
    await client.ping();
    console.log('Successfully connected to Elasticsearch.');
    
    // Check if the index already exists
    const exists = await client.indices.exists({ index: index_name });
    if (exists) {
      console.log(`Index "${index_name}" already exists.`);
    } else {
      // Create the index
      await client.indices.create({
        index: index_name,
        body: {
          mappings: {
            dynamic: true // Enable dynamic mapping
          }
        }
      });
      console.log(`Index "${index_name}" created.`);

      // Prepare bulk indexing data
      const bulkData = (data as Record<string, unknown>[]).flatMap((doc) => [
        { index: { _index: index_name } },
        doc
      ]);

      // Perform bulk indexing
      const bulkResponse = await client.bulk({ refresh: true, body: bulkData });

      // Check for bulk errors
      if (bulkResponse.errors) {
        const erroredDocuments = bulkResponse.items.filter(item => item.index && item.index.error);
        console.log('Errors occurred while indexing:', erroredDocuments);
      } else {
        console.log('Data successfully indexed.');
      }
    }
  } catch (error) {
    if (error instanceof errors.ResponseError) {
      console.error('Error occurred:', error.body);
    } else {
      console.error('Error occurred:', error);
    }
  }
})();

export default client;

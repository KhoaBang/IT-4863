const { Router } = require('express');
const client = require('../elastic/elastic.conector');

const router = Router();

router.get('/search', async (req, res,next) => {
    try {
      const { term } = req.query; // Extract 'term' from URL parameters
      const { pagenum = 1 } = req.query; // Extract 'pagenum' from query parameters, default to 1
  
      // Validate search term
      if (!term) {
        return res.status(400).json({ error: 'Missing search term' });
      }
  
      // Convert `pagenum` to an integer and calculate `from` for pagination
      const pageSize = 10; // Number of results per page
      const from = (parseInt(pagenum, 10) - 1) * pageSize;
  
      // Elasticsearch query
      const result = await client.search({
        index: process.env.DATA_INDEX || 'law',
        body: {
          from,
          size: pageSize,
          query: {
            bool: {
              should: [
                {
                  multi_match: {
                    query: term,
                    fields: [
                      "tenchude^1",
                      "tendemuc^1.5",
                      "tenchuong^2",
                      "tendieu^10",
                      "noidung^9"
                    ],
                  },
                },
               
              ],
            },
          },
        },
      });
      

      // Extract total hits and documents
      const totalHits = result.hits.total.value;
      const documents = result.hits.hits.map((hit) => hit._source);
  
      // Response with pagination metadata
      res.status(200).json({
        meta_data: {
          total: totalHits,
          page: parseInt(pagenum, 10),
          pageSize,
        },
        results: documents,
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/search/test', async (req, res,next) => {
    try {
      const { term } = req.query; // Extract 'term' from URL parameters
      const { pagenum = 1 } = req.query; // Extract 'pagenum' from query parameters, default to 1
  
      // Validate search term
      if (!term) {
        return res.status(400).json({ error: 'Missing search term' });
      }
  
      // Convert `pagenum` to an integer and calculate `from` for pagination
      const pageSize = 10; // Number of results per page
      const from = (parseInt(pagenum, 10) - 1) * pageSize;
  
      // Elasticsearch query
      const result = await client.search({
        index: process.env.TEST_DATA_INDEX || 'test',
        body: {
          from,
          size: pageSize,
          query: {
            bool: {
              should: [
                {
                  multi_match: {
                    query: term,
                    fields: [
                      'title^10',
                      'content^5',
                    ],
                  },
                },
              ],
            },
          },
        },
      });
      

      // Extract total hits and documents
      const totalHits = result.hits.total.value;
      const documents = result.hits.hits.map((hit) => hit._source);
  
      // Response with pagination metadata
      res.status(200).json({
        meta_data: {
          total: totalHits,
          page: parseInt(pagenum, 10),
          pageSize,
        },
        results: documents,
      });
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;
  

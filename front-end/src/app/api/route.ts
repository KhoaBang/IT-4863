import client from '../../../lib/elastic-connector'
import ElasticsearchResponse from '../../../lib/definitions'
import { NextResponse } from 'next/server';
 
export async function GET(req: Request) {
    // Extract the search term from the query parameters
    const {searchParams} = new URL(req.url); // Create a URL object from the request
    const term = searchParams.get('term'); // Get the 'term' parameter from the URL
    const object = Object.fromEntries(searchParams.entries())
    console.log(object);
    if (!term) {
      return NextResponse.json({ error: 'Missing search term' }, { status: 400 });
    }
  
    const result= await client.search<ElasticsearchResponse>({
        index: process.env. DATA_INDEX,
        body: {
          size: 10,
          "query": {
            "bool": {
              "should": [
                {
                  "multi_match": {
                    "query": term,
                    "fields": [
                      "tenchude^1", 
                      "tendemuc^1.5", 
                      "tenchuong^2", 
                      "noidung^9", 
                      "noidungtendieu^10"
                    ],
                    "fuzziness": "AUTO",
                    "minimum_should_match": "75%"
                  }
                },
                {
                  "match": {
                    "madieu": {
                      "query":term,
                      "boost": 20
                    }
                  }
                }
              ]
            }
          }
        }
      });
      console.log(result)
      console.log(result.hits.hits)
      const documents = result.hits.hits.map(hit => hit._source);

      return NextResponse.json({documents})
}

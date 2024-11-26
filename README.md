# Vietnamese legal documents retrieval system based on Elasticsearch

## Steps to Setup and Use

### Step 1: Open Docker Desktop
Navigate to the directory containing `elasticsearch-analysis-Vietnamese`:
IT-4863\Elasticsearch_config\elasticsearch-analysis-vietnamese

### Step 2: Update ELASTIC_PASSWORD
Edit the `docker-compose.yaml` file located in:
IT-4863\Elasticsearch_config\elasticsearch-analysis-vietnamese\docker-compose.yaml

Replace the `ELASTIC_PASSWORD` variable with your desired password. The default password is `28102003`.

### Step 3: Build and Start the Docker Containers
In Docker Desktop, execute the following commands:
```bash
docker compose build
docker compose up
```

### Step 4: Configure Elasticsearch and Upload Data
Open cmd and navigate to:
IT-4863\Elasticsearch_config\Elastic
Perform the following operations, replacing ELASTIC_PASSWORD with the password you set in Step 2.
Configure Settings
Run:
```
curl -u elastic:ELASTIC_PASSWORD -X PUT "http://localhost:9200/phapdien_final" \
-H "Content-Type: application/json" -d @settings.json
```

Configure Mappings
Run:
```
curl -u elastic:ELASTIC_PASSWORD -X PUT "http://localhost:9200/phapdien_final/_mapping" \
-H "Content-Type: application/json" -d @mappings.json
```

Upload Data
Run:
```
curl -u elastic:ELASTIC_PASSWORD -H "Content-Type: application/json" \
-XPOST "http://localhost:9200/phapdien_final/_bulk?pretty" --data-binary @phapdien_final.ndjson
```

### Step 5: Query Data
Navigate to:
IT-4863\Elasticsearch_config\Elastic\query_without_fuzziness.json
Replace "YOUR_QUERY" with your desired query.

Run the following command:
```
curl -u elastic:ELASTIC_PASSWORD -H "Content-Type: application/json" \
-X GET "http://localhost:9200/phapdien_final/_search" --data-binary "@query_without_fuzziness.json"
```






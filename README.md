set -a; source .env; set +a

curl -X GET -H "Content-Type: application/json" -H "x-openaip-api-key: $OPENAIP_API" 'https://api.core.openaip.net/api/airports?page=1&limit=1000' -o map/data/airportRaw.json

curl -X GET -H "Content-Type: application/json" -H "x-openaip-api-key: $OPENAIP_API" 'https://api.core.openaip.net/api/airspaces?page=1&limit=1000' -o map/data/airspaceRaw.json

curl -X GET -H "Content-Type: application/json" -H "x-openaip-api-key: $OPENAIP_API" 'https://api.core.openaip.net/api/navaids?page=1&limit=1000' -o map/data/navaidRaw.json

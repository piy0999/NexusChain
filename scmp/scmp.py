import requests
import json

response = requests.get(
    'https://datastudio-api.hkstp.org:443/scmparticlessample/v1.0/datastore_search?resource_id=0e27027d-ef86-4d03-ba99-3bb0fafec3f9', headers={'Authorization': 'Bearer bc891093a75ced9c19d3a8c030220c42'},verify = False)
response = json.loads(response.text)

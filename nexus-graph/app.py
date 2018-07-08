from flask import Flask, request, jsonify
import requests, json
from random import randint
from flask_cors import CORS, cross_origin

import networkx as nx
G = nx.Graph()

with open('entities.json') as f:
    entities = json.load(f)

for key,entity in entities.items():
    for edge in entity['edges']:
        G.add_edge(key,edge)

def get_group(type):
    if type == "company":
        return 1
    if type == "investor":
        return 2
    if type == "news":
        return 3
    if type == "country":
        return 4
    return 5

def get_graph_from_entities(required_entities):
    graph = {
    "nodes":[],
    "links":[]
    }
    for key, entity in required_entities.items():
        graph["nodes"].append({
            "id":key,
            "group":get_group(entity['type']),
            "name":entity['name']
        })
        for edge_to in entity['edges']:
            if edge_to in required_entities:
                graph["links"].append({
                "source":key,
                "target":edge_to,
                "value":1
            })
    return graph

def get_entities(paths):
    if len(paths) > 0:
        required_entities = {}
        for path in paths:
            for item in path:
                required_entities[item] = entities[item]
        return required_entities
    else:
        return entities

def get_path(entity_one, entity_two, cutoff):
    paths = nx.all_simple_paths(G, source=entity_one, target=entity_two,cutoff=cutoff)
    return list(paths)

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'This is the Nexus Tech Graph.\n'

@app.route('/get_graph',methods=['GET'])
def get_graph():
    entity_one = request.args.get('entity_one')
    entity_two = request.args.get('entity_two')
    cutoff = request.args.get('cutoff')
    if entity_one and entity_two and int(cutoff):
        print("Selective data")
        path = get_path(entity_one, entity_two, int(cutoff))
    else:
        print("All data")
        path = []
    required_entities = get_entities(path)
    graph = get_graph_from_entities(required_entities)
    with open('crunchbase.json', 'w') as outfile:
        json.dump(graph, outfile)
    return jsonify(graph)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0', port=5000)

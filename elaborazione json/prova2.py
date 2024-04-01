import json

with open("product.json","r",encoding="utf-8") as file:
    contenuto = json.load(file)
    print(contenuto)

# Creazione di un nuovo elenco con solo le chiavi richieste
filtered_data = []
for item in contenuto:
    filtered_item = {
        "name": item["title"],
        "description": item["description"],
        "price": item["price"],
        "category": item["category"],
        "image": item["image"]
    }
    filtered_data.append(filtered_item)

# Scrittura dei dati filtrati in un nuovo file JSON
with open('filtered_data.json', 'w') as f:
    json.dump(filtered_data, f, indent=4)

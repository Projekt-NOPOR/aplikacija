import pandas as pd
import json


df = pd.read_excel('proba.xlsx')


results = {}
povprecjeResults = {}


for index, row in df.iterrows():
    trenVrstica = row[0]
    results[trenVrstica] = {}

 
    for j in range(1, len(row)):
        trenStolp = df.columns[j]
        trenVrednostCelice = row[j]
        results[trenVrstica][trenStolp] = trenVrednostCelice


with open('results.json', 'w') as f:
    json.dump(results, f, indent=4)


for index, row in df.iterrows():
    trenVrsticaList = []
    for j in range(1, len(row)):
        trenVrednostCelice = row[j]
        if pd.notna(trenVrednostCelice):
            trenVrsticaList.append(trenVrednostCelice)
    if trenVrsticaList:
        avg = sum(trenVrsticaList) / len(trenVrsticaList)
        povprecjeResults[f"vrstica:{index}"] = avg

with open('povprecje.json', 'w') as f:
    json.dump(povprecjeResults, f, indent=4)
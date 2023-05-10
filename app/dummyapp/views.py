from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
# from dummyapp.models import DummyModel
from rest_framework.response import Response
from rest_framework.decorators import api_view

import json
import pandas as pd
import pickle
import numpy as np


# Create your views here.


def index(response):
    return render(response, "index.html", {})

# Ged data fromn the React app


@csrf_exempt
@api_view(['POST'])
def get_data(response):
    if response.method == "POST":  
        if "file" not in response.FILES:
            return HttpResponse("File not uploaded")
        
        # Uploaded file
        uploaded_file = response.FILES["file"]
        print(uploaded_file.name)

        # Save file to database
        # fileModel = DummyModel(file=uploaded_file)
        # fileModel.save()
        return HttpResponse("File uploaded")
    else:
        return HttpResponse("not POST method")

'''
sprejema excel datoteko s podatki, s katerimi moramo narediti napoved
vrača napoved v json obliki
'''
@api_view(['POST'])
@csrf_exempt
def make_prediction(request):
    if request.method == "POST":  
        if "file" not in request.FILES:
            return HttpResponse("File not uploaded")
        
        # Uploaded file
        uploaded_file = request.FILES["file"]
        print(uploaded_file.name)
        if not uploaded_file.name.endswith(".xlsx"):
            return HttpResponse("Wrong file type: Excel file expected!!!:(")

        df = pd.read_excel(uploaded_file)
        y_new = df.iloc[:, 0:-1]
        print("----------------------------------------")
        print(y_new)

        loaded_model = pickle.load(open("dummyapp/dt_1.pickle","rb"))

        pred_data = np.array(y_new)
        predicted = loaded_model.predict(pred_data)
        predicted_list = predicted.tolist()
        print("----------------------------------------")
        print(predicted_list)

        json_predicted = json.dumps(predicted_list)

        return Response(json_predicted)
    else:
        return HttpResponse("not POST method")

'''
vrača dummy drevo v json obliki za potrebe frontenda
moral bi biti isti kot na sliki v dummy_tree direktoriju
atribut "n_features_" je seveda napačen
'''
@api_view(['GET'])
def get_tree(request):
    json_tree = {
        "meta": "decision-tree-regression", 
        "feature_importances_": [0.07901668129938524, 0.0, 0.8150006271165184, 0.10598269158409623], 
        "max_features_": 4, 
        "n_features_": 999, 
        "n_outputs_": 1, 
        "tree_": {
            "max_depth": 2, 
            "node_count": 7, 
            "nodes": [[1, 4, 2, 12.5, 18.21, 10, 10.0], [2, 3, 3, 7.5, 4.1224489795918355, 7, 7.0], [-1, -1, -2, -2.0, 0.666666666666667, 3, 3.0], [-1, -1, -2, -2.0, 2.1875, 4, 4.0], [5, 6, 0, 4.5, 4.666666666666657, 3, 3.0], [-1, -1, -2, -2.0, 0.25, 2, 2.0], [-1, -1, -2, -2.0, 0.0, 1, 1.0]], 
            "values": [[[6.3]], [[3.857142857142857]], [[2.0]], [[5.25]], [[12.0]], [[10.5]], [[15.0]]], 
            "nodes_dtype": ["<i8", "<i8", "<i8", "<f8", "<f8", "<i8", "<f8"]}}
    return Response(json_tree) # vrne JSON drevo

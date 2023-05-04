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
def get_data(response):
    if response.method == "POST":
        # Uploaded file
        uploaded_file = response.FILES["file"]
        print(uploaded_file.name)


        df = pd.read_excel(uploaded_file)
        y_new = df.iloc[:, 0]

        loaded_model = pickle.load(open("dt_1.pickle", "rb"))

        pred_data = np.array(y_new)
        predicted = loaded_model.predict(pred_data)
        predicted_list = predicted.tolist()

        json_predicted = json.dumps(predicted_list)

        return Response(json_predicted)

        # Save file to database
        # fileModel = DummyModel(file=uploaded_file)
        # fileModel.save()
        # return HttpResponse("File uploaded")
    else:
        return HttpResponse("File not uploaded")


@api_view(['POST'])
def make_prediction(request):
    uploaded_file = request.FILES["file"]
    df = pd.read_excel(uploaded_file)
    y_new = df.iloc[:, 0]

    loaded_model = pickle.load(open("./decision_models/dt_1.pickle", "rb"))

    pred_data = np.array(y_new)
    predicted = loaded_model.predict(pred_data)
    predicted_list = predicted.tolist()

    json_predicted = json.dumps(predicted_list)

    return Response(json_predicted)


@api_view(['GET'])
def get_tree(request):
    simple_object = {}

    simple_object["name"] = "nekaj"
    simple_object["test"] = 155
    simple_object["list"] = [1, 2, 3, 4, 5]

    json_simple = json.dumps(simple_object)

    return Response(json_simple) # vrne JSON drevo

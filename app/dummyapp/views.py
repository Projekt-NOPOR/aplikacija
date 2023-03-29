from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
# from dummyapp.models import DummyModel

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

        # Save file to database
        # fileModel = DummyModel(file=uploaded_file)
        # fileModel.save()
        return HttpResponse("File uploaded")
    else:
        return HttpResponse("File not uploaded")

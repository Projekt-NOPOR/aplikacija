from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(response):
    return render(response, "dummyapp/index.html", {})

def rezulati(response):
    return render(response, "dummyapp/rezulati.html", {})

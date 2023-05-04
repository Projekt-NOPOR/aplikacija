from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("get_data", views.get_data, name="get_data"),
    path("tree", views.get_tree, name="tree"),
    path("make_prediction", views.make_prediction, name="make_prediction")
]

from django.urls import path
from .views import home_view, CalculatorView


urlpatterns = [
    path("calculator/", CalculatorView.as_view(), name="calculator"),
    path("", home_view, name="home"),
]

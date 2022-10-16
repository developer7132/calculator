import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View

from .utils import generate_expression

from .constants import KEYBOARD_LIST


def home_view(request):
    return render(
        request, 
        "home.html",
        {
            "page": "home",
        }
    )


class CalculatorView(View):
    def get(self, request):
        return render(
            request,
            "calculator.html",
            {
                "keyboard_list": KEYBOARD_LIST,
                "page": "calculator",
            }
        )

    def post(self, request):
        request_data = json.loads(request.body.decode("utf-8"))
        variables = request_data.get("variables")
        operators = request_data.get("operators")

        expression = generate_expression(variables, operators)

        return JsonResponse({"result": eval(expression)}, safe=False)

(function ($) {
    "use strict";

    let currentValue, currentIsFloat, pointPosition;
    let variables = [];
    let operators = [];
    let $currentValue = $("#current_value");
    let $cache = $("#cache");

    let isOperated = false;
    let isCalculated = false;

    const SYMBOLS = {
        plus: "+",
        minus: "-",
        times: "*",
        division: "/",
    }

    // Initialize variables.
    function init() {
        currentValue = 0;
        pointPosition = 0;
        currentIsFloat = false;
        $currentValue.html(currentValue);
        isOperated = false;
        isCalculated = false;

        variables = [];
        operators = [];
        $cache.html(0);
    };

    // Update display(currentValue, cache)
    function display() {
        if (currentIsFloat == true && pointPosition === 0) {
            $currentValue.html(currentValue + ".");
        } else {
            $currentValue.html(currentValue.toFixed(pointPosition));
        }
        // Update `Clear` button text.
        currentValue && $("#clear").html("C");
        variables.length && !currentValue && $("#clear").html("AC");
        // Update cache.
        let cache = ""
        if (isCalculated) {
            $cache.html(currentValue);
            return;
        }
        if (variables.length > 0 && operators.length > 0) {
            for (let i = 0; i < variables.length; i++) {
                cache += variables[i] + operators[i];
            }
        }

        if (!isOperated && currentValue) cache += currentValue

        $cache.html(cache);
    }

    // Send a POST request with variables and operators and got result.
    function calculate() {
        const URL = "/calculator/";
        if (operators.length >= variables.length) {
            operators = operators.splice(-1);
        }

        $.ajax({
            type: "POST",
            url: URL,
            headers: { "X-CSRFToken": csrftoken },
            data: JSON.stringify({
                variables: variables,
                operators: operators,
            }),
            success: function (response) {
                currentValue = response.result;
                variables = [];
                operators = [];
                isOperated = true;
                display();
            }
        });
    }

    // Update current value.
    function updateCurrentValue(val) {
        function initCurrentValue() {
            currentValue = 0;
            pointPosition = 0;
            currentIsFloat = false;
            isOperated = false;
            isCalculated = false;
        }
        if (isOperated) initCurrentValue();
        if (isCalculated) {
            variables.push(currentValue);
            initCurrentValue();
        }
        if ((currentValue === 0 && val === "0") || currentValue.toFixed(pointPosition).length > 13) {
            return;
        }
        if (val === "point") {
            if (currentIsFloat === false) {
                currentIsFloat = true;
            }
        } else if (currentIsFloat === true) {
            pointPosition++;
            val = pointPosition === 1 ? "." + val : val;
            currentValue = parseFloat(currentValue.toFixed(pointPosition - 1) + val);
        } else {
            currentValue = currentValue * 10 + parseInt(val)
        }

    }

    // Will be triggered once an `operator` is clicked.
    function operation(operator) {
        if(!currentValue) return;
        if (operator === "equal") {
            variables.push(currentValue);
            return calculate();
        }
        if (operators.length && isOperated) {
            operators[operators.length - 1] = SYMBOLS[operator];
            return;
        }
        operators.push(SYMBOLS[operator]);
        variables.push(currentValue);
        isOperated = true;
    }

    // Hanlle button click on calculator.
    $(".calc").on("click", function () {
        let $this = $(this);
        let $id = $this.attr("id");
        switch ($id) {
            case "clear":
                currentValue ? currentValue = 0 : init();
                break;
            case "plus_minus":
                currentValue *= -1;
                break;
            case "backspace":
                if(currentValue.toString().length < 2) currentValue = 0;
                else 
                    currentValue = isOperated || isCalculated 
                        ? 0
                        : parseFloat(currentValue.toString().slice(0, -1));
                break;
            default:
                $this.hasClass("operator")
                    ? operation($id)
                    : updateCurrentValue($id);
        }

        display();
    });

    $(window).on("load", function () {
        init();
    });
})(window.jQuery)
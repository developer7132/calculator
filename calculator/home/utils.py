def generate_expression(variables, operations):
    expression = str(variables[0])

    for index in range(1, len(variables)):
        expression += operations[index - 1] + str(variables[index])

    return expression

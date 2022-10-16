FROM python:3.8
LABEL maintainer="brandongalli32@gmail.com"

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code/

COPY requirements.txt /code/requirements.txt
RUN pip install --upgrade pip

RUN pip install -r /code/requirements.txt

COPY . /code/

CMD exec guniorn calculator/wsgi:application --bind 0.0.0.0:8000 --workers 3

# calculator

## Prerequisites
Please make sure you installed `Docker` and `Docker Compose` on your machine.

## Build and Initialize the application.
* Open up terminal and navigate to project dir.
* Run command - `docker-compose build` & `docker-compose up`
* Once db is ready to accept connections, open up another tab(You will be at the same dir.) and run `docker-compose exec app bash`.
<img width="1061" alt="image" src="https://user-images.githubusercontent.com/54678642/196058402-704e3188-0aa9-4981-8140-2a09716b553e.png">
* Run `python manage.py collecstatic`. (Optional: You can also run `python manage.py migrate` & `python manage.py createsuperuser`.)

## How to test.
* Open up your browser and go to `http://localhost`.
* Enjoy it.
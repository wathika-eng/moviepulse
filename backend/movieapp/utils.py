import random
from django.core.mail import send_mail
from django.conf import settings
from .models import User, OneTimePassword
import requests
from rest_framework.pagination import PageNumberPagination


def generate_otp():
    return random.randint(100000, 999999)


def send_otp_email(email):
    otp = generate_otp()
    subject = "OTP for MovieApp"

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return False

    email_from = settings.DEFAULT_FROM_EMAIL
    email_body = f"""
    Hello {user.first_name},

    Your OTP is {otp}. Please do not share this OTP with anyone.

    Regards,
    Team MovieApp
    """

    OneTimePassword.objects.create(user=user, otp=otp)

    try:
        print(f"Sending OTP email to {email}")
        send_mail(subject, email_body, email_from, [email], fail_silently=False)
    except Exception as e:

        print(f"Error sending OTP email: {e}")
        return False

    return True


class MoviePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


def fetch_movie_data(query):
    url = f"https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": settings.TMDB_API_KEY,
        "query": query,
        "language": "en-US",
        "page": 1,
        "include_adult": "false",
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to fetch data from TMDb"}


def fetch_top_movies(page):
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "page": page,
        "sort_by": "popularity.desc",
    }

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}",
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        print(response.json())
        return response.json()
    else:
        print(response.json())
        return {"error": "Failed to fetch data from TMDb"}

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import status
from .utils import send_otp_email, fetch_movie_data, MoviePagination, fetch_top_movies
from .models import User, OneTimePassword
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.core.cache import cache


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"}, status=status.HTTP_200_OK)


class UserCreateView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.get_serializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            user = serializer.data
            send_otp_email(user["email"])
            return Response(
                {"data": user, "message": f"User created successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class VerifyOTPView(GenericAPIView):
#     def post(self, request):
#         email = request.data.get("email")
#         otp = request.data.get("otp")

#         if not email or not otp:
#             return Response(
#                 {"error": "Email and OTP are required"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response(
#                 {"error": "User with this email does not exist"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )

#         try:
#             otp_obj = OneTimePassword.objects.get(user=user, otp=otp)
#         except OneTimePassword.DoesNotExist:
#             return Response(
#                 {"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST
#             )
#         otp_obj.delete()

#         return Response(
#             {"message": "OTP verified successfully"}, status=status.HTTP_200_OK
#         )


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, email=email, password=password)
        if user is None:
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        # if not user.otp_verified:
        #     return "Remember to verify your account"

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response(
            {
                "refresh": str(refresh),
                "access": access_token,
            },
            status=status.HTTP_200_OK,
        )


class SearchMoviesView(APIView):
    def get(self, request):
        query = request.GET.get("query")
        if not query:
            return Response(
                {"error": "Query parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        movie_data = fetch_movie_data(query)

        if "error" in movie_data:
            return Response(
                {"error": movie_data["error"]},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(movie_data, status=status.HTTP_200_OK)


class TopMoviesListView(APIView):
    def get(self, request):
        page = request.query_params.get("page", 1)

        cache_key = f"top_movies_{page}"

        data = cache.get(cache_key)

        if not data:
            data = fetch_top_movies(page)
            if "results" not in data:
                return Response(
                    {
                        "error": "Unexpected response from TMDB API. 'results' not found."
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            cache.set(cache_key, data, timeout=7200)
            print(cache_key)

        paginator = MoviePagination()
        result_page = paginator.paginate_queryset(data["results"], request)

        return paginator.get_paginated_response(result_page)

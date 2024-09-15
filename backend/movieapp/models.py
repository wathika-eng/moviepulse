from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# gettext_lazy is used to translate the string to the user's language.
from django.utils.translation import gettext_lazy as _
from .manager import UserManager
from rest_framework_simplejwt.tokens import (
    RefreshToken,
)


class User(AbstractBaseUser, PermissionsMixin):
    """
    We have created a custom user model that extends the AbstractBaseUser and PermissionsMixin classes.
    The AbstractBaseUser class provides the core implementation of a user model, including hashed passwords and token generation.
    In the required_fields attribute, we have specified the fields that are required to create a user, but left out email because it is the USERNAME_FIELD.
    """

    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(_("first name"), max_length=30)
    last_name = models.CharField(_("last name"), max_length=30)
    is_active = models.BooleanField(_("active"), default=True)
    is_staff = models.BooleanField(_("staff"), default=False)
    date_joined = models.DateTimeField(_("date joined"), auto_now_add=True)
    is_superuser = models.BooleanField(_("superuser"), default=False)
    last_login = models.DateTimeField(_("last login"), auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
    ]

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class OneTimePassword(models.Model):
    """
    OneTimePassword model is used to store the OTP generated for each user.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.otp}"

from django.db import models

# Building a custom user model from scratch, we shall have diffrent fields for our user model
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        _("email address"), unique=True, verbose_name=_("email address")
    )
    first_name = models.CharField(_("first name"), max_length=30)
    last_name = models.CharField(_("last name"), max_length=30)
    is_active = models.BooleanField(_("active"), default=True)
    is_staff = models.BooleanField(_("staff"), default=False)
    date_joined = models.DateTimeField(_("date joined"), auto_now_add=True)
    is_superuser = models.BooleanField(_("superuser"), default=False)
    last_login = models.DateTimeField(_("last login"), auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["email", "first_name", "last_name"]

    objects = UserManager()

    def __str__(self):
        return self.email

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

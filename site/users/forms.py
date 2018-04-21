from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User
from django.contrib.auth.admin import UserAdmin
from django import forms


class UserCreationFormExtended(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super(UserCreationFormExtended, self).__init__(*args, **kwargs)
        self.fields['bio'] = forms.CharField(
            label="Bio", max_length=256, widget=forms.Textarea)


class UserChangeFormExtended(UserChangeForm):
    def __init__(self, *args, **kwargs):
        super(UserChangeFormExtended, self).__init__(*args, **kwargs)
        self.fields['bio'] = forms.CharField(
            label="Bio", max_length=256, widget=forms.Textarea)

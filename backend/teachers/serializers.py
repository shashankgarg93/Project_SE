from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import education_history, otp_auth, teacher, tutor_rating, tutor_review


class otp_auth_serializer(serializers.ModelSerializer):
    class Meta:
        model = otp_auth
        fields = '__all__'

class teacher_serializer(serializers.ModelSerializer):
    class Meta:
        model = teacher
        fields = ('id','latitude','longitude','name','contact','subjects','classes','home_tutor','gives_demo','teaches_online','teaches_offline','about_me','experience','email','photo')

class teacher_serializer2(serializers.ModelSerializer):
    class Meta:
        model = teacher
        fields = ('latitude','longitude','name','contact','subjects','classes','home_tutor','gives_demo','teaches_online','teaches_offline','about_me','experience','email')

class tutor_rating_serializer(serializers.ModelSerializer):
    class Meta:
        model = tutor_rating
        fields = "__all__"

class tutor_review_serializer(serializers.ModelSerializer):
    class Meta:
        model = tutor_review
        fields="__all__"

class education_history_serializer(serializers.ModelSerializer):
    class Meta:
        model = education_history
        fields = "__all__"
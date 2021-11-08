from os import device_encoding
from django.db import models

# Create your models here.
class teacher(models.Model):
    name = models.CharField(max_length=128)
    photo = models.ImageField(upload_to = 'media/', default = 'media/dummy-user.png')
    latitude = models.DecimalField(max_digits=30,decimal_places=15)
    longitude = models.DecimalField(max_digits=30,decimal_places=15)
    contact = models.CharField(max_length=10)
    email = models.EmailField()
    subjects = models.CharField(max_length=512)
    classes = models.CharField(max_length=512)
    about_me = models.CharField(max_length=1024)
    experience = models.CharField(max_length=1024)
    teaches_offline = models.BooleanField(default=True)
    teaches_online = models.BooleanField(default=True)
    home_tutor = models.BooleanField(default=True)
    gives_demo = models.BooleanField(default=True)
    
    
class education_history(models.Model):
    contact = models.CharField(max_length=10)
    passing_year = models.CharField(max_length=5)
    school = models.CharField(max_length=512)
    degree = models.CharField(max_length=512)

class otp_auth(models.Model):
    phone_no = models.CharField(max_length=10)
    otp = models.CharField(max_length=4, blank=True)
    email = models.EmailField()

class tutor_rating(models.Model):
    phone_no = models.CharField(max_length=10)
    count = models.IntegerField()
    count_rating = models.IntegerField()

class tutor_review(models.Model):
    review_by = models.CharField(max_length=128)
    phone_no = models.CharField(max_length=10)
    rating = models.IntegerField()
    review = models.CharField(max_length=1024)
    date_posted=models.DateField()
    
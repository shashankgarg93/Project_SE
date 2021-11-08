from re import sub
import re
from django.db.models.aggregates import Count
from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from .api_tokens import twilio_key, rapid_api_sendgrid_key
from rest_framework.decorators import api_view
from twilio.rest import Client
from .models import education_history, otp_auth, teacher, tutor_rating, tutor_review
from .serializers import education_history_serializer, otp_auth_serializer, teacher_serializer, teacher_serializer2, tutor_rating_serializer, tutor_review_serializer
from django.http.response import JsonResponse
import requests
from django.core.files import File
from datetime import date
from PIL import Image

# Create your views here.
import math, random

@api_view(['POST'])
def get_otp(request):
    if(request.method=="POST"):
        req_data = request.data
        phone_no = req_data['phone_no']
        email = req_data['email']
        account_sid = 'ACab22abe1bb94d8836ff3abc3d0a31e51'
        auth_token = twilio_key
        # client = Client(account_sid, auth_token)
        digits = "0123456789"
        OTP = ""
        for i in range(4) :
            OTP += digits[math.floor(random.random() * 10)]
        try:
            url = "https://email-sender1.p.rapidapi.com/"

            querystring = {"txt_msg":"OTP for registration as a tutor is "+str(OTP),"to":email,"from":"BookMyTutor","subject":"OTP for registration as a tutor","reply_to":"shashank.garg9300@gmail.com","html_msg":"<html><body><b>OTP for your registration at BookMyTutor is "+str(OTP)+"</b></body></html>"}

            headers = {
    'content-type': "application/json",
    'x-rapidapi-host': "email-sender1.p.rapidapi.com",
    'x-rapidapi-key': rapid_api_sendgrid_key
    }

            response = requests.request("POST", url, headers=headers, params=querystring)

            # message = client.messages.create(
            #                             body= f'Your OTP is: % s'% OTP,
            #                             from_='+17742373181',
            #                             to=('+91'+str(phone_no))
            #                         )
            otp_auths = otp_auth.objects.filter(phone_no=(phone_no)).first()
            try:
                otp_auths.otp = OTP
                otp_auths.save()
                return JsonResponse({"message":"success"})
            except:
                serializer = otp_auth_serializer(data=req_data)
                serializer.is_valid(raise_exception=True)
                serializer.save(otp = OTP)
                return JsonResponse({"message":"success"})
        except:
            return JsonResponse({"message":"failure"})



# Verifies if the OTP entered by the user is valid or not. If valid, we also check if the person corresponds to a referral request sent before.
# If the new user corresponds to the referral request of an existing user, the existing user gets merchandise points that can be redeemed later
# If the user doesn't receive an OTP, it implies that the number entered by the user is not valid.
# If the OTP is incorrect, it prompts the user to try again.

@api_view(['POST'])
def verify_otp(request):
    if(request.method=='POST'):
        req_data = request.data
        phone_no = req_data['phone_no']
        OTP = req_data['otp']
        otp_auths = otp_auth.objects.filter(phone_no=str(phone_no)).first()
        if(otp_auths.otp != OTP):
            return JsonResponse({'message':'failure'})
        else:
            return JsonResponse({"message":"success"})

@api_view(['POST'])
def check_email_available(request):
    if(request.method=='POST'):
        req_data = request.data
        email = req_data['email']
        if(teacher.objects.filter(email=str(email)).count()==0):
            return JsonResponse({"message":"success"}) 
        else:
            return JsonResponse({"message":"failure"})


@api_view(['POST'])
def check_contact_available(request):
    if(request.method=='POST'):
        req_data = request.data
        phone_no = req_data['contact']
        if(teacher.objects.filter(contact=str(phone_no)).count()==0):
            return JsonResponse({"message":"success"}) 
        else:
            return JsonResponse({"message":"failure"})


@api_view(["POST"])
def register_tutor(request):
    if(request.method == "POST"):
        try:
            req_data = request.data
            phone_no = req_data['contact']
            OTP = str(req_data['otp'])
            
            otp_auths = otp_auth.objects.filter(phone_no=str(phone_no)).first()
            if(otp_auths.otp != OTP):
                return JsonResponse({'message':'wrong otp'})
            if(req_data['check']=="0" and teacher.objects.filter(contact=req_data['contact']).count() >0):
                return JsonResponse({'message':'contact already in use'})
            if(req_data['check']=="0" and teacher.objects.filter(email=req_data['email']).count() >0):
                return JsonResponse({'message':'email already in use'})
            
            if(str(req_data['check'])=="0"):
                temp_data = {"phone_no":phone_no,"count":0,"count_rating":0}
                serializer =  tutor_rating_serializer(data=temp_data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
            
           
            if(str(req_data['check'])=='0'):
                
                schools = req_data['schools']
                years = req_data['years']
                degrees = req_data['degrees']
                _schools=schools.split(',')
                _degrees=degrees.split(',')
                _years=years.split(',')
                
                for i in range(len(_schools)):
                    if(_schools[i]==""):
                        continue
                    x = {'school':_schools[i], 'passing_year':_years[i], 'degree':_degrees[i],'contact':phone_no}
                    serializer = education_history_serializer(data=x)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()

            # data = {'latitude':req_data['latitude'],
            # 'longitude':req_data['longitude'],
            # 'name':req_data['name'][4:],
            # 'contact':req_data['contact'],
            # 'subjects':req_data['subjects'],
            # 'classes':req_data['classes'],
            # 'home_tutor':req_data['home_tutor'],
            # 'gives_demo':req_data['gives_demo'],
            # 'teaches_online':req_data['teaches_online'],
            # 'teaches_offline':req_data['teaches_offline'],
            # 'about_me':req_data['about_me'],
            # 'experience':req_data['experience'],
            # 'email':req_data['email'],
            # 'photo':req_data['photo']}
            if(str(req_data['photo'])=='null'):
                serializer = teacher_serializer2(data=req_data)
            else:
                serializer = teacher_serializer(data=req_data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return JsonResponse({'message':'success'})
        except:
            return JsonResponse({"message":"failure"})


@api_view(["POST"])
def find_tutor(request):
    if(request.method == "POST"):
        try:
            req_data = request.data

            if(req_data['teaches_online']=='true'):


                classes = '%'+str(req_data['classes'])+'%'
                subjects = str(req_data['subjects']).split(',')
                # print(subjects)

                final_data = dict()

                if(req_data['gives_demo']=="true"):
                    for subject in subjects:
                        if(subject==''):
                            continue
                        sub = '%'+str(subject)+'%'
                        tutors = teacher.objects.raw('''
                    SELECT
        id
        FROM teachers_teacher
        WHERE subjects LIKE %s
        AND classes LIKE %s
        AND teaches_online= %s
        AND gives_demo = %s
        ;''',[sub,classes,True,True])

                        for x in tutors:

                            serializer = teacher_serializer(x)
                            temp = serializer.data


                            final_data[temp['contact']]=temp
                    final_Data=[]
                    for x in final_data.values():
                        rating_of_tutor = tutor_rating.objects.filter(phone_no=str(x['contact'])).first()
                        count = int(rating_of_tutor.count)
                        count_rating = int(rating_of_tutor.count_rating)
                        if count_rating == 0:
                            rating = 0
                        else:
                            rating = round(count_rating/count,2)
                        x['rating'] = rating
                        final_Data.append(x)
                    return JsonResponse({"data": final_Data})
                for subject in subjects:
                    if(subject==''):
                        continue
                    sub = '%'+str(subject)+'%'
                    tutors = teacher.objects.raw('''
                SELECT
    id
    FROM teachers_teacher
    WHERE subjects LIKE %s
    AND teaches_online =%s
    AND classes LIKE %s;''',[sub,True,classes])

                    for x in tutors:

                        serializer = teacher_serializer(x)
                        temp = serializer.data


                        final_data[temp['contact']]=temp
                final_Data=[]
                for x in final_data.values():
                    rating_of_tutor = tutor_rating.objects.filter(phone_no=str(x['contact'])).first()
                    count = int(rating_of_tutor.count)
                    count_rating = int(rating_of_tutor.count_rating)
                    if count_rating == 0:
                        rating = 0
                    else:
                        rating = round(count_rating/count,2)
                    x['rating'] = rating
                    final_Data.append(x)
                return JsonResponse({"data": final_Data})


            latitude = str(req_data['latitude'])
            distance = str(req_data['km'])
            classes = '%'+str(req_data['classes'])+'%'
            subjects = str(req_data['subjects']).split(',')
            # print(subjects)
            longitude = str(req_data['longitude'])
            final_data = dict()
            temp = int(distance)*0.621371
            distance = str(int(temp))

            if(req_data['home_tutor']=='true'):
                if(req_data['gives_demo']=="true"):
                    distance=11
                    for subject in subjects:
                        if(subject==''):
                            continue
                        sub = '%'+str(subject)+'%'
                        tutors = teacher.objects.raw('''
                SELECT
    id,
    (
    3959 *
    acos(cos(radians(%s)) *
    cos(radians(latitude)) *
    cos(radians(longitude) -
    radians(%s)) +
    sin(radians(%s)) *
    sin(radians(latitude)))
    ) AS distance
    FROM teachers_teacher
    WHERE subjects LIKE %s
    AND classes LIKE %s
    AND home_tutor = %s
    AND gives_demo = %s
    HAVING distance < %s
    ORDER BY distance;''',[latitude,longitude,latitude,sub,classes,True,True,distance])

                        for x in tutors:

                            serializer = teacher_serializer(x)
                            temp = serializer.data


                            final_data[temp['contact']]=temp
                    final_Data=[]
                    for x in final_data.values():
                        rating_of_tutor = tutor_rating.objects.filter(phone_no=str(x['contact'])).first()
                        count = int(rating_of_tutor.count)
                        count_rating = int(rating_of_tutor.count_rating)
                        if count_rating == 0:
                            rating = 0
                        else:
                            rating = round(count_rating/count,2)
                        x['rating'] = rating
                        final_Data.append(x)
                    return JsonResponse({"data": final_Data})
                distance=11
                for subject in subjects:
                    if(subject==''):
                        continue
                    sub = '%'+str(subject)+'%'
                    tutors = teacher.objects.raw('''
            SELECT
id,
(
   3959 *
   acos(cos(radians(%s)) *
   cos(radians(latitude)) *
   cos(radians(longitude) -
   radians(%s)) +
   sin(radians(%s)) *
   sin(radians(latitude)))
) AS distance
FROM teachers_teacher
WHERE subjects LIKE %s
AND classes LIKE %s
AND home_tutor = %s
HAVING distance < %s
ORDER BY distance;''',[latitude,longitude,latitude,sub,classes,True,distance])

                    for x in tutors:
                        serializer = teacher_serializer(x)
                        temp = serializer.data


                        final_data[temp['contact']]=temp
                final_Data=[]
                for x in final_data.values():
                    rating_of_tutor = tutor_rating.objects.filter(phone_no=str(x['contact'])).first()
                    count = int(rating_of_tutor.count)
                    count_rating = int(rating_of_tutor.count_rating)
                    if count_rating == 0:
                        rating = 0
                    else:
                        rating = round(count_rating/count,2)
                    x['rating'] = rating
                    final_Data.append(x)

                return JsonResponse({"data": final_Data})
            if(req_data['gives_demo']=='true'):
                for subject in subjects:
                    if(subject==''):
                        continue
                    sub = '%'+str(subject)+'%'
                    tutors = teacher.objects.raw('''
                SELECT
    id,
    (
    3959 *
    acos(cos(radians(%s)) *
    cos(radians(latitude)) *
    cos(radians(longitude) -
    radians(%s)) +
    sin(radians(%s)) *
    sin(radians(latitude)))
    ) AS distance
    FROM teachers_teacher
    WHERE subjects LIKE %s
    AND classes LIKE %s
    AND teaches_offline = %s
    AND gives_demo = %s
    HAVING distance < %s
    ORDER BY distance;''',[latitude,longitude,latitude,sub,classes,True,True,distance])

                    for x in tutors:

                        serializer = teacher_serializer(x)
                        temp = serializer.data


                        final_data[temp['contact']]=temp
                final_Data=[]
                for x in final_data.values():
                    rating_of_tutor = tutor_rating.objects.filter(phone_no=str(x['contact'])).first()
                    count = int(rating_of_tutor.count)
                    count_rating = int(rating_of_tutor.count_rating)
                    if count_rating == 0:
                        rating = 0
                    else:
                        rating = round(count_rating/count,2)
                    x['rating'] = rating
                    final_Data.append(x)

                return JsonResponse({"data": final_Data})
            for subject in subjects:
                if(subject==''):
                    continue
                sub = '%'+str(subject)+'%'
                tutors = teacher.objects.raw('''
            SELECT
id,
(
   3959 *
   acos(cos(radians(%s)) *
   cos(radians(latitude)) *
   cos(radians(longitude) -
   radians(%s)) +
   sin(radians(%s)) *
   sin(radians(latitude)))
) AS distance
FROM teachers_teacher
WHERE subjects LIKE %s
AND classes LIKE %s
AND teaches_offline = %s
HAVING distance < %s
ORDER BY distance;''',[latitude,longitude,latitude,sub,classes,True,distance])

                for x in tutors:

                    serializer = teacher_serializer(x)
                    temp = serializer.data


                    final_data[temp['contact']]=temp
            final_Data=[]
            for x in final_data.values():
                rating_of_tutor = tutor_rating.objects.filter(phone_no=str(x['contact'])).first()
                count = int(rating_of_tutor.count)
                count_rating = int(rating_of_tutor.count_rating)
                if count_rating == 0:
                    rating = 0
                else:
                    rating = round(count_rating/count,2)
                x['rating'] = rating
                
                final_Data.append(x)
            return JsonResponse({"data": final_Data})
            # serializer = found_tutor_serializer(tutors)
            # return Response(serializer.data)

        except:
            return JsonResponse({"message":"failure"})



@api_view(["POST"])
def get_rating_tutor(request):
    if(request.method == "POST"):
        try:
            req_data = request.data
            phone_no = req_data['phone_no']
            rating_of_tutor = tutor_rating.objects.filter(phone_no=str(phone_no)).first()
            count = int(rating_of_tutor.count)
            count_rating = int(rating_of_tutor.count_rating)
            rating = round(count_rating/count,2)

            return JsonResponse({'message':rating})
        except:
            return JsonResponse({"message":"failure"})


@api_view(["POST"])
def get_review_tutor(request):
    if(request.method == "POST"):
        try:
            req_data = request.data
            phone_no = req_data['phone_no']
            rating_of_tutor = tutor_review.objects.filter(phone_no=str(phone_no)).order_by("-date_posted").order_by("-id")
            data = []
            for x in rating_of_tutor:
                serializer = tutor_review_serializer(x)
                data.append(serializer.data)
            return JsonResponse({'message':data})
        except:
            return JsonResponse({"message":"failure"})

@api_view(["POST"])
def post_rating_tutor(request):
    if(request.method == "POST"):
        try:
            req_data = request.data
            phone_no = req_data['phone_no']
            rating=req_data['rating']
            review = req_data['review']
            review_by = req_data['review_by']

            print(date.today())
            try:
                rating_of_tutor = tutor_rating.objects.filter(phone_no=str(phone_no)).first()
                rating_of_tutor.count = rating_of_tutor.count +1
                rating_of_tutor.count_rating =rating_of_tutor.count_rating+int(rating)
                rating_of_tutor.save()
                data = {'phone_no':phone_no,'rating':rating, 'review':review, 'review_by':review_by,"date_posted":str(date.today())}
                serializer = tutor_review_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return JsonResponse({'message':'success'})
            except:

                data = {'phone_no':phone_no,'count':1, 'count_rating':rating}
                serializer = tutor_rating_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                data = {'phone_no':phone_no,'rating':rating, 'review':review, 'review_by':review_by,"date_posted":str(date.today())}
                serializer = tutor_review_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return JsonResponse({'message':'success'})
        except:
            return JsonResponse({"message":"failure"})

@api_view(["POST"])
def get_subjects_tutor(request):
    if(request.method == "POST"):
        try:
            req_data = request.data
            phone_no = req_data['phone_no']
            total_data = teacher.objects.filter(contact=str(phone_no))
            final_data = []
            for data in total_data:
                serializer = teacher_serializer(data)
                final_data.append(serializer.data)
                
            return JsonResponse({'message':final_data})
        except:
            return JsonResponse({"message":"failure"})

@api_view(["POST"])
def get_tutor_by_id(request):
    if(request.method == "POST"):
        try:
            req_data = request.data
            id = req_data['id']
            tutor = teacher.objects.filter(id = str(id)).first()
            serializer = teacher_serializer(tutor)
            x = serializer.data
            rating_of_tutor = tutor_rating.objects.filter(phone_no=str(x['contact'])).first()
            count = int(rating_of_tutor.count)
            count_rating = int(rating_of_tutor.count_rating)
            if count_rating == 0:
                rating = 0
            else:
                rating = round(count_rating/count,2)
            x['rating'] = rating
            return JsonResponse({"message":x})
        except:
            return JsonResponse({"message":"failure"})
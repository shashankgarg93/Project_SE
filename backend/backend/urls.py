"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.contrib import admin
from django.urls import path
from teachers import views as teacherviews
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('auth/otp/', teacherviews.get_otp),
    path('auth/verifyOtp/',teacherviews.verify_otp),
    path('register_tutor/', teacherviews.register_tutor),
    path('find_tutor/',teacherviews.find_tutor),
    path('get_rating/',teacherviews.get_rating_tutor),
    path('post_rating/',teacherviews.post_rating_tutor),
    path('get_reviews/',teacherviews.get_review_tutor),
    path('get_subjects_tutor/', teacherviews.get_subjects_tutor),
    path('check_contact_available/',teacherviews.check_contact_available),
    path('check_email_available/',teacherviews.check_email_available),
    path('get_tutor_details/',teacherviews.get_tutor_by_id)
]
if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.urls import re_path
from django.conf.urls.static import static
from django.conf import settings

from CarApp import views

urlpatterns = [
    re_path(r"^brand/$", views.brand_api),
    re_path(r"^brand/([0-9]+)$", views.brand_api),
    re_path(r"^car/$", views.car_api),
    re_path(r"^car/([0-9]+)$", views.car_api),
    re_path(r"^car/save_picture$", views.save_picture),
] + static(settings.MEDIA_PATH, document_root=settings.MEDIA_ROOT)

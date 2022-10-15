from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.http.response import JsonResponse

from rest_framework.parsers import JSONParser

from CarApp.models import Brands, Cars
from CarApp.serializers import BrandSerializer, CarSerializer


@csrf_exempt
def brand_api(request, id=0):
    """Perform CRUD operations on brands database"""
    if request.method == "GET":
        brands = Brands.objects.all()
        brands_serializer = BrandSerializer(brands, many=True)
        return JsonResponse(brands_serializer.data, safe=False)

    if request.method == "POST":
        brand_data = JSONParser().parse(request)
        brand_serializer = BrandSerializer(data=brand_data)
        print(brand_data)
        if brand_serializer.is_valid():
            brand_serializer.save()
            return JsonResponse("New item added", safe=False)
        return JsonResponse("Add operation failed.", safe=False)

    if request.method == "PUT":
        brand_data = JSONParser().parse(request)
        brand = Brands.objects.get(brand_id=brand_data["brand_id"])
        brand_serializer = BrandSerializer(brand, data=brand_data)
        if brand_serializer.is_valid():
            brand_serializer.save()
            return JsonResponse("The item has been updated", safe=False)
        return JsonResponse("Update operation failed.", safe=False)

    if request.method == "DELETE":
        brand = Brands.objects.get(brand_id=id)
        brand.delete()
        return JsonResponse("The item has been deleted", safe=False)
    return JsonResponse("Unknown operation", safe=False)


@csrf_exempt
def car_api(request, id=0):
    """Perform CRUD operations on cars database"""
    if request.method == "GET":
        cars = Cars.objects.all()
        cars_serializer = CarSerializer(cars, many=True)
        return JsonResponse(cars_serializer.data, safe=False)

    if request.method == "POST":
        car_data = JSONParser().parse(request)
        print(car_data)
        car_serializer = CarSerializer(data=car_data)
        if car_serializer.is_valid():
            car_serializer.save()
            return JsonResponse("New item added", safe=False)
        return JsonResponse("Add operation failed.", safe=False)

    if request.method == "PUT":
        car_data = JSONParser().parse(request)
        car = Cars.objects.get(car_id=car_data["car_id"])
        car_serializer = CarSerializer(car, data=car_data)
        if car_serializer.is_valid():
            car_serializer.save()
            return JsonResponse("The item has been updated", safe=False)
        return JsonResponse("Update operation failed.", safe=False)

    if request.method == "DELETE":
        car = Cars.objects.get(car_id=id)
        car.delete()
        return JsonResponse("The item has been deleted", safe=False)
    return JsonResponse("Unknown operation", safe=False)


@csrf_exempt
def save_picture(request):
    """Upload pictre to the server"""
    file = request.FILES["car_picture"]
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)

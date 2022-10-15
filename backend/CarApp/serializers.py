from rest_framework import serializers
from CarApp.models import Brands, Cars


class BrandSerializer(serializers.ModelSerializer):
    "Serializer of brands (id, name)"

    class Meta:
        model = Brands
        fields = ("brand_id", "brand_name")


class CarSerializer(serializers.ModelSerializer):
    "Serializer of cars for user input"

    class Meta:
        model = Cars
        fields = (
            "car_id",
            "brand_name",
            "car_name",
            "engine_type",
            "transmission",
            "purchase_date",
            "photo_file_name",
        )

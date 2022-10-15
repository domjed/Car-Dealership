from django.db import models


class Brands(models.Model):
    """Class representing brands database"""

    brand_id = models.AutoField(primary_key=True)
    brand_name = models.CharField(max_length=20)


class Cars(models.Model):
    """Class representing cars database"""

    car_id = models.AutoField(primary_key=True)
    brand_name = models.CharField(max_length=20)
    car_name = models.CharField(max_length=20)
    engine_type = models.CharField(max_length=20)
    transmission = models.CharField(max_length=20)
    purchase_date = models.DateField()
    photo_file_name = models.CharField(max_length=100)

from decimal import Decimal

from django.db import models


class Object(models.Model):
    REGION_COEFFICIENT_CHOICES = {"CNT": "Central", "OTH": "Other"}
    name = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    region_coefficient = models.CharField(max_length=3, choices=REGION_COEFFICIENT_CHOICES, default="CNT")
    area = models.PositiveIntegerField(null=True)
    user = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="+")

from django.db import models
from django.utils.translation import gettext_lazy as _


class Object(models.Model):
    # todo region_coefficient -> region
    class Region(models.TextChoices):
        CENTRAL = "CNT", _("Центральный регион")
        OTHER = "OTH", _("Не центральный регион")

    name = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    region_coefficient = models.CharField(max_length=3, choices=Region, default="CNT")
    area = models.PositiveIntegerField(null=True)
    user = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="+")

    def __str__(self):
        return f"{self.name} | creator: {self.user.username}"

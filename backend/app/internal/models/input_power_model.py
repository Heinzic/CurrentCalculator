from django.db import models


class InputPower(models.Model):
    section = models.ForeignKey("Section", on_delete=models.CASCADE)
    max_consumer = models.ForeignKey("Consumer", null=True, blank=True, on_delete=models.SET_NULL)

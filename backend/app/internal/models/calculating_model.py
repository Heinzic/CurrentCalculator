from django.db import models


class Calculating(models.Model):
    date = models.DateField(auto_now=True)
    costumer = models.CharField(max_length=255, blank=True)
    annotation = models.CharField(max_length=255, blank=True)
    object = models.ForeignKey("Object", on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey("CustomUser", on_delete=models.CASCADE)

    def __str__(self):
        return f"id: {self.id} | creator: {self.user.username}"

from django.db import models


class Section(models.Model):
    name = models.CharField(max_length=255)
    power_limit = models.PositiveIntegerField(default=150)
    calculating = models.ForeignKey("Calculating", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    # def distribute_consumers(self):
    #     consumers = Consumers.objects.filter(section__id == self.id)


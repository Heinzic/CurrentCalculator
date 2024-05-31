import math
from decimal import Decimal

from app.internal.models.consumer_model import Consumer
from django.db import models


class InputPower(models.Model):
    # todo много вызовов свойств, это плохо
    section = models.ForeignKey("Section", on_delete=models.CASCADE)
    max_consumer = models.ForeignKey("Consumer", null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.pk}"

    @property
    def cos(self):
        sp = self.sp
        if sp == 0:
            return Decimal("0")
        return self.pp / sp

    @property
    def tg(self):
        cos = self.cos
        if cos == 0:
            return Decimal("0")
        return Decimal(math.tan(math.acos(self.cos)))

    @property
    def pp(self):
        consumers = Consumer.objects.filter(input__id=self.id)
        if len(consumers) == 0:
            return Decimal("0")
        sum_pp = sum([cons.pp for cons in consumers])
        return Decimal(str(sum_pp))

    @property
    def qp(self):
        consumers = Consumer.objects.filter(input__id=self.id)
        if len(consumers) == 0:
            return Decimal("0")
        sum_qp = sum([cons.qp for cons in consumers])
        return Decimal(str(sum_qp))

    @property
    def sp(self):
        return Decimal(str(self.pp**2 + self.qp**2)).sqrt()

    @property
    def result_current(self):
        return self.sp / Decimal("0.66")

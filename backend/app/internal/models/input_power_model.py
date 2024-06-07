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

    def delete(self, using=None, keep_parents=False):
        for consumer in Consumer.objects.filter(input__id=self.pk, section=None):
            consumer.delete()
        return super().delete(using, keep_parents)

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
        consumers = Consumer.objects.filter(input=self)
        if len(consumers) == 0:
            return Decimal("0")
        sum_pp = sum([cons.pp for cons in consumers])
        return Decimal(str(sum_pp))

    @property
    def qp(self):
        consumers = Consumer.objects.filter(input=self)
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

    def get_result_current_by_consumers(self, consumers):
        consumers_in = list(filter(lambda cons: cons.input == self, consumers))
        sum_pp = Decimal(str(sum([cons.pp for cons in consumers_in]))) if len(consumers_in) > 0 else Decimal("0")
        sum_qp = Decimal(str(sum([cons.qp for cons in consumers_in]))) if len(consumers_in) > 0 else Decimal("0")
        sp = Decimal(str(sum_pp**2 + sum_qp**2)).sqrt()
        return sp / Decimal("0.66")

import math
from decimal import Decimal

from app.internal.models.object_model import Object
from django.db import models


class ConsumerType(models.Model):
    FLAT = "Flat"
    ELEVATOR = "Elevator"
    ELEVATOR_PP = "Elevator-PP"
    SP256 = "СП-256"
    OTHER = "Other"
    SPECIAL_CHOICE = [
        (FLAT, "Квартира"),
        (ELEVATOR, "Лифт"),
        (ELEVATOR_PP, "Лифт ПП"),
        (OTHER, "Другое"),
        (SP256, "СП-256"),
    ]
    name = models.CharField(max_length=255)
    special = models.CharField(max_length=255, choices=SPECIAL_CHOICE, default="Квартира")
    unit_measurement = models.CharField(max_length=255)
    default_power_per_unit = models.DecimalField(decimal_places=3, max_digits=9)
    default_cos = models.DecimalField(decimal_places=2, max_digits=3)

    def __str__(self):
        return f"{self.name}"


class Consumer(models.Model):
    section = models.ForeignKey("Section", on_delete=models.CASCADE, verbose_name="секция", null=True)
    input = models.ForeignKey("InputPower", on_delete=models.SET_NULL, null=True, blank=True, verbose_name="ввод")
    name = models.CharField(max_length=255, verbose_name="имя")
    type = models.ForeignKey("ConsumerType", on_delete=models.SET_NULL, null=True, verbose_name="тип")
    volume = models.DecimalField(default=1, decimal_places=2, max_digits=8, verbose_name="количество")
    power_per_unit = models.DecimalField(default=10, decimal_places=3, max_digits=9, verbose_name="мощность на единицу")
    coefficient_regional = models.DecimalField(default=1, decimal_places=2, max_digits=3, verbose_name="коэф. региона")
    coefficient_demand = models.DecimalField(default=1, decimal_places=6, max_digits=7, verbose_name="коэф. спроса")
    cos = models.DecimalField(default=0.95, decimal_places=2, max_digits=3)

    def __str__(self):
        return f"{self.name}"

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if self.section and self.type.special == ConsumerType.FLAT:
            region = self.section.calculating.object.region_coefficient
            self.coefficient_regional = Decimal("0.81") if region is Object.Region.CENTRAL else Decimal("0.91")

        super().save(force_insert, force_update, using, update_fields)

        # todo возможен баг
        # если у максимального потребителя изменить параметры и другой потребитель будет его превосходить, то
        # максимальный потребитель у входа не изменится
        if self.input and (not self.input.max_consumer or self.input.max_consumer.result_current < self.result_current):
            self.input.max_consumer = self
            self.input.save()

    @property
    def total_capacity(self):
        if self.type.special == ConsumerType.FLAT:
            return None
        return Decimal(self.volume * self.power_per_unit)

    @property
    def coefficient_maximum_mismatch(self):
        if self.input and self.input.max_consumer:
            return Decimal("1") if self.input.max_consumer.id == self.id else Decimal("0.9")
        else:
            return Decimal("1")

    @property
    def tg(self):
        return Decimal(math.tan(math.acos(self.cos)))

    @property
    def pp(self):
        coefficient_multiple = Decimal(
            self.coefficient_regional * self.coefficient_demand * self.coefficient_maximum_mismatch
        )
        if self.type.special == ConsumerType.FLAT:
            return Decimal(self.volume * coefficient_multiple)
        else:
            return Decimal(self.total_capacity * coefficient_multiple)

    @property
    def qp(self):
        return Decimal(self.pp * self.tg)

    @property
    def sp(self):
        return Decimal(self.pp / self.cos)

    @property
    def result_current(self):
        return Decimal(self.sp / Decimal(0.66))

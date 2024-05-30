import math
from decimal import Decimal

from django.db import models


class Consumer(models.Model):
    # region consumers
    FLAT_10 = ("FLAT_10", "Квартира(с эл.плит) 10 квт ")
    FLAT_10C = ("FLAT_10C", "Квартира(с эл.плит) 10 квт с кондиционерами")
    FLAT_G10 = ("FLAT_G10", "Квартира(с эл.плит) более 10 квт")
    FLAT_G10C = ("FLAT_G10C", "Квартира(с эл.плит) более 10 квт с кондиционерами;")
    FLAT_L10 = ("FLAT_L10", "Квартира(с эл.плит) менее 10 квт ")
    FLAT_L10C = ("FLAT_L10C", "Квартира(с эл.плит) менее 10 квт с кондиционерами;")
    ELECTRIC_PANEL1 = ("EL_PANEL1", "Щит СС")
    ELECTRIC_PANEL2 = ("EL_PANEL2", "Щит СПЗ СС")
    ROSETTE = ("ROSETTE", "Розеточная сеть")
    ROOM_L100 = ("ROOM_L100", "Встроенные помещения (БКТ), при площади меньше 100 м2")
    ROOM_G100 = ("ROOM_G100", "Встроенные помещения (БКТ), при площади больше 100 м2")
    VENTILATION = ("VNTL", "Общеобменная вентиляция, небольших объектов")
    VENTILATION_L75 = ("VNTL_L75", "Общеобменная вентиляция, не высотных зданий (до 75 м)")
    VENTILATION_L100 = ("VNTL_L100", "Общеобменная вентиляция, высотных зданий (до 100 м)")
    VENTILATION_L200 = ("VNTL_L200", "Общеобменная вентиляция, уникальных зданий (до 200 м)")
    ELEVATOR = ("ELVTR", "Лифт")
    ELEVATOR_PP = ("ELVTR_PP", "Лифт ПП")
    EL_CURTAIN_HEAT = ("EL_CRTN", "Электрические тепловые завесы (на ТЭНах)")
    WTR_CURTAIN_HEAT = ("WTR_CRTN", "Водяные тепловые завесы")
    LIGHT = ("LIGHT", "Освещение")
    PANEL_LIGHT = ("P_LIGHT", "Щит освещения")
    PANEL_OUT_LIGHT = ("P_OUTLIGHT", "Щит наружного освещения")
    PANEL_FACADE_LIGHT = ("P_FACLIGHT", "Щит фасадного освещения")
    EL_PANEL_HEAT = ("ELPANHEAT", "Отопление электрощитовых")
    PUMP_STATION_L75 = ("PUMP_L75", "Насосная станция, не высоттных зданий (до 75 м)")
    PUMP_STATION_L100 = ("PUMP_L100", "Насосная станция, не высоттных зданий (до 100 м)")
    PUMP_STATION_L200 = ("PUMP_L200", "Насосная станция, не высоттных зданий (до 200 м)")
    HEAT_CENTER_L75 = ("HTCNTR_L75", "ИТП, не высоттных зданий (до 75 м) ")
    HEAT_CENTER_L100 = ("HTCNTR_L100", "ИТП, не высоттных зданий (до 100 м) ")
    HEAT_CENTER_L200 = ("HTCNTR_L200", "ИТП, не высоттных зданий (до 200 м) ")
    PARKING_GATE = ("PRKNG_GATE", "Ворота в паркинг")
    # SP256


    Type = {
        "Flat": {
            FLAT_10,
            FLAT_10C,
            FLAT_G10,
            FLAT_G10C,
            FLAT_L10,
            FLAT_L10C
        },
        "Electric panel": {
            ELECTRIC_PANEL1,
            ELECTRIC_PANEL1
        },
        "Room": {
            ROOM_L100,
            ROOM_G100
        },
        "Ventilation": {
            VENTILATION,
            VENTILATION_L75,
            VENTILATION_L100,
            VENTILATION_L200
        },
        "Elevator": {
            ELEVATOR,
            ELEVATOR_PP
        },
        "Curtain heat": {
            EL_CURTAIN_HEAT,
            WTR_CURTAIN_HEAT
        },
        "Lightning and panel": {
            LIGHT,
            PANEL_LIGHT,
            PANEL_OUT_LIGHT,
            PANEL_FACADE_LIGHT
        },
        "Pump station": {
            PUMP_STATION_L75,
            PUMP_STATION_L100,
            PUMP_STATION_L200
        },
        "Heat center": {
            HEAT_CENTER_L75,
            HEAT_CENTER_L100,
            HEAT_CENTER_L200
        },
        ROSETTE[0]: ROSETTE[1],
        EL_PANEL_HEAT[0]: EL_PANEL_HEAT[1],
        PARKING_GATE[0]: PARKING_GATE[1]
    }
    ppu_name = "power_per_unit"
    cos_name = "cos"
    CHARACTERISTIC = {
        FLAT_10[0]: {"description": FLAT_10[1], ppu_name: 10, cos_name: Decimal(0.98)},
        FLAT_10C[0]: {"description": FLAT_10C[1], ppu_name: 10, cos_name: Decimal(0.93)},
        FLAT_G10[0]: {"description": FLAT_G10[1], ppu_name: 11, cos_name: Decimal(0.98)},
        FLAT_G10C[0]: {"description": FLAT_G10C[1], ppu_name: 11, cos_name: Decimal(0.93)},
        FLAT_L10[0]: {"description": FLAT_L10[1], ppu_name: 9, cos_name: Decimal(0.98)},
        FLAT_L10C[0]: {"description": FLAT_L10C[1], ppu_name: 9, cos_name: Decimal(0.93)},
        ELEVATOR[0]: {"description": ELEVATOR[1], ppu_name: 20, cos_name: Decimal(0.65)},
        ELEVATOR_PP[0]: {"description": ELEVATOR_PP[1], ppu_name: 20, cos_name: Decimal(0.65)},
    }
    # endregion

    section = models.ForeignKey("Section", on_delete=models.CASCADE, verbose_name="секция")
    input = models.ForeignKey("InputPower", on_delete=models.SET_NULL, null=True, blank=True, verbose_name="ввод")
    name = models.CharField(max_length=255, verbose_name="имя")
    type = models.CharField(max_length=11, choices=Type, default=FLAT_10, verbose_name="тип")
    volume = models.DecimalField(default=1, decimal_places=2, max_digits=8, verbose_name="количество")
    power_per_unit = models.DecimalField(default=10, decimal_places=3, max_digits=9, verbose_name="мощность на единицу")
    coefficient_regional = models.DecimalField(default=1, decimal_places=2, max_digits=3, verbose_name="коэф. региона")
    coefficient_demand = models.DecimalField(default=1, decimal_places=6, max_digits=7, verbose_name="коэф. спроса")
    cos = models.DecimalField(default=0.95, decimal_places=2, max_digits=3)

    # result_current = models.DecimalField(decimal_places=2, max_digits=6, null=True, blank=True,
    #                                      verbose_name="расчётная мощность")

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        # todo возможен баг
        # если у максимального потребителя изменить параметры и другой потребитель будет его превосходить, то
        # максимальный потребитель у входа не изменится
        if self.input and (not self.input.max_consumer or self.input.max_consumer.result_current < self.result_current):
            self.input.max_consumer = self
            self.input.save()

        super().save(force_insert, force_update, using, update_fields)

    @property
    def total_capacity(self):
        if self.type in self.Type["Flat"]:
            return None
        return Decimal(self.volume * self.power_per_unit)

    @property
    def coefficient_maximum_mismatch(self):
        if self.input and self.input.max_consumer:
            return Decimal('1') if self.input.max_consumer.id == self.id else Decimal('0.9')
        else:
            return Decimal('0.9')

    @property
    def tg(self):
        return Decimal(math.tan(math.acos(self.cos)))

    @property
    def pp(self):
        coefficient_multiple = Decimal(
            self.coefficient_regional * self.coefficient_demand * self.coefficient_maximum_mismatch)
        if self.type in self.Type["Flat"]:
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

    # total_capacity - установленная мощность (кол-во * мощность на ед)
    # coefficient_maximum_mismatch - коэф. несовпадения максимумов
    # tg = sqrt(abs(1-1/cos^2))
    # pp
    # qp
    # sp

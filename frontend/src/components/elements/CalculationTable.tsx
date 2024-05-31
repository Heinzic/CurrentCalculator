function CalculationTable() {
    return ( 
        <div className="mx-auto w-[100%] table border-spacing-y-[3px]">
            <div className="table-row text-center rounded-md  align-middle ">
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#9AA8B0] rounded-l-md">
                    №
                </div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#9AA8B0]">Пользовательское наименование</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#9AA8B0]">Тип потребителя</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#9AA8B0]">Количество единиц измерения</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#9AA8B0]">Расчетная нагрузка</div>
                <div className=" px-[5px] table-cell align-middle bg-[#9AA8B0] rounded-r-md">
                    <div className="">
                        Коэффициенты
                    </div>
                    Уст. м. на ед; Уст. м; Кп.к; Кс; Кн.м; Cosj; Tgj
                </div>
            </div> 
            <div className="table-row text-center rounded-md align-middle h-[40px]">
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-l-md"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className=" px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-r-md"></div>
            </div> 
        </div>
    );
}

export default CalculationTable;
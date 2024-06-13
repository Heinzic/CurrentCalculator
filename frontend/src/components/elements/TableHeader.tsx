function TableHeader() {
    return <>
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
                    <div className="flex gap-[5px]">
                        <b className="text-[18px]">Уст. м. на ед;</b>
                        <span className="text-[#6E6E6E] text-[18px]">Уст. м;</span>
                        <b className="text-[18px] ">Кп.к;</b>
                        <span className="text-[#6E6E6E] text-[18px]">Кс;</span>
                        <b className="text-[18px]">Кн.м;</b>
                        <span className="text-[#6E6E6E] text-[18px]">Cosj;</span>
                        <b className="text-[18px]">Tgj</b>
                    </div>
                    
                </div>
            </div> 
    </>
}

export default TableHeader
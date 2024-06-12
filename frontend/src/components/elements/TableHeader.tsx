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
                    <b>Уст. м. на ед;</b>
                    <span className="text-[#6E6E6E]"> Уст. м;</span>
                    <b> Кп.к;</b>
                    <span className="text-[#6E6E6E]"> Кс;</span>
                    <b> Кн.м;</b>
                    <span className="text-[#6E6E6E]"> Cosj;</span>
                    <b> Tgj</b>
                </div>
            </div> 
    </>
}

export default TableHeader
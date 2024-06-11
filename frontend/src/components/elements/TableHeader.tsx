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
                    Уст. м. на ед; Уст. м; Кп.к; Кс; Кн.м; Cosj; Tgj
                </div>
            </div> 
    </>
}

export default TableHeader
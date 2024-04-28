function ObjectCard() {
    return (
        <>
            <div className="max-w-[640px] w-[640px] bg-[#D0DADF] mt-[20px] rounded-md border-[2px] hover:border-[#454F55]">
                <div className="p-[12px] pb-1">
                    <div className="flex flex-row bg-[#FFFFFF] rounded-md text-xl px-1 gap-[10px]">
                        <ul>
                            <li>
                                <span>Объект:</span>
                            </li>
                            <li>
                                <span>Адрес:</span>
                            </li>
                            <li>
                                <span>Заказчик:</span>
                            </li>
                            <li>
                                <span>Номер:</span>
                            </li>
                            <li>
                                <span>Дата:</span>
                            </li>
                            <li>
                                <span>Расчетная нагрузка:</span>
                            </li>
                            <li>
                                <span>Примечание:</span>
                            </li>
                        </ul>
                        <ul className="bg-[#FFFFFF] rounded-md px-1">
                            <li className="">
                                <span>ЖК Легион</span>
                            </li>
                            <li>
                                <span>ЖК Легион</span>
                            </li>
                            <li>
                                <span>ЖК Легион</span>
                            </li>
                            <li>
                                <span>ЖК Легион</span>
                            </li>
                            <li>
                                <span>ЖК Легион</span>
                            </li>
                            <li>
                                <span>ЖК Легион</span>
                            </li>
                            <li>
                                <span>ЖК Легион</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-[10px] flex justify-between">
                        <div className="flex gap-[8px]">
                            <button className="bg-[#9AA8B0] px-[18px] rounded-md">
                                Экспорт xlsx
                            </button>
                            <button className="bg-[#9AA8B0] px-[18px] rounded-md">
                                Экспорт PDF
                            </button>
                        </div>
                        <button className="bg-[#9AA8B0] px-[18px] py-[2px] rounded-md">
                            Изменить
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default ObjectCard
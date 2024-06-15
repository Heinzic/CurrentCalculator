import { useGetCalculationsListQuery } from "../../store/apis/CalculationsAPI";
import { useLoadMyProfileQuery } from "../../store/apis/UserAPI";
import Footer from "../base/Footer";
import Header from "../base/Header";
import Search from "../base/Search";
import ObjectCard from "../elements/ObjectCard";

function Main() {

    useLoadMyProfileQuery()
    const calc = useGetCalculationsListQuery().data
    
    return (
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <div className="max-w-[1320px] mx-auto mt-[20px] flex-grow">
                <div className="flex flex-row">
                    <div className="flex-grow"></div>
                    <div className="flex flex-row gap-[27px] mx-auto">
                        <button className="bg-[#D0D4D9] px-[40px] py-[8px] rounded-md border-[1px] hover:border-gray-700">
                            Фильтр
                        </button>
                        <Search/>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap justify-between">
                    {calc && calc.slice(0).reverse().map((e, index) => (
                        <ObjectCard
                            {...e}
                            index={index}
                            key={e.id}
                            />                        
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Main
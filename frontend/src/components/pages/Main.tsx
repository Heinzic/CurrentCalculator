import Footer from "../base/Footer";
import Header from "../base/Header";
import Search from "../base/Search";
import ObjectCard from "../elements/ObjectCard";

function Main() {
    return (
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <div className="max-w-[1320px] mx-auto mt-[20px] flex-grow h-[1000px]">
                <div className="flex flex-row">
                    <div className="flex-grow"></div>
                    <div className="flex flex-row gap-[27px] mx-auto">
                        <button className="bg-[#D0D4D9] px-[40px] py-[8px] rounded-md">
                            Фильтр
                        </button>
                        <Search/>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap justify-between">
                    <ObjectCard/>
                    <ObjectCard/>
                    <ObjectCard/>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Main
import { useEffect } from "react";
import { useLoadMyProfileQuery } from "../../store/apis/UserAPI";
import { tokenService } from "../../store/services/TokenService";
import Footer from "../base/Footer";
import Header from "../base/Header";
import Search from "../base/Search";
import ObjectCard from "../elements/ObjectCard";
import { redirect } from "react-router-dom";

function Main() {

    const access = tokenService.getLocalAccessToken()
    let profile;
    if (access) {
            profile = useLoadMyProfileQuery(access)
    } else {
        redirect('/login')
    }
    
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
                        {profile?.data?.first_name}
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
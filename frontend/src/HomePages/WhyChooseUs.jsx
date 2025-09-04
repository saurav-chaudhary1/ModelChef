import { useLanguage } from "../otherFiles/languageContext";
import translation from "../otherFiles/constants";
import { Link } from "react-router-dom";
function WhyChooseUs(){
    const { language , setLanguage } = useLanguage();
    const t = translation[language];
    const IsAuthenticated = localStorage.getItem("IsAuthenticated") === "true";
    return(
        <>
            <section class="py-16 relative overflow-hidden">
                <div className="blob w-96 h-96 bg-purple-500 top-90 left-30"></div>
                <div className="blob w-96 h-96 bg-red-500 top-20 left-170"></div>
                <div className="blob w-80 h-80 bg-green-700 top-40 right-10"></div>
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    
                    <div>
                        <h2 class="text-4xl font-bold mb-4 text-white">{t.whyChooseUs.Half_title}<span class="text-indigo-600">ModelChef</span>?</h2>
                        <p class="text-lg text-white mb-6">
                        {t.whyChooseUs.Description}
                        </p>
                        <Link to={IsAuthenticated ? "/fine-tune" : "/signup"} class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md">
                        {t.whyChooseUs.start_fine_tun_button}
                        </Link>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div class="p-6  rounded-lg shadow-sm hover:shadow-md transition border border-gray-800">
                        <h3 class="font-semibold text-lg text-green-600" >{t.whyChooseUs.reason1_title}</h3>
                        <p class="text-md text-gray-300">{t.whyChooseUs.reason1_description}</p>
                        </div>


                        <div class="p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-800">
                        <h3 class="font-semibold text-lg text-green-600">{t.whyChooseUs.reason2_title}</h3>
                        <p class="text-md text-gray-300">{t.whyChooseUs.reason2_description}</p>
                        </div>

                        <div class="p-6  rounded-lg shadow-sm hover:shadow-md transition border border-gray-800">
                        <h3 class="font-semibold text-lg text-green-600">{t.whyChooseUs.reason3_title}</h3>
                        <p class="text-md text-gray-300">{t.whyChooseUs.reason3_description}</p>
                        </div>


                        <div class="p-6  rounded-lg shadow-sm hover:shadow-md transition border border-gray-800">
                        <h3 class="font-semibold text-lg text-green-600">{t.whyChooseUs.reason4_title}</h3>
                        <p class="text-md text-gray-300">{t.whyChooseUs.reason4_description}</p>
                        </div>

                        <div class="p-6 rounded-xl shadow border border-gray-800 md:col-span-2">
                        <h3 class="text-2xl font-bold mb-3 text-green-600">{t.whyChooseUs.reason4_title}</h3>
                        <p class="text-white text-lg">
                        {t.whyChooseUs.reason5_description}  <strong>{t.whyChooseUs.reason5_description_strong}</strong> {t.whyChooseUs.reason3_description_rest}
                        </p>
                        </div>
                    </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default WhyChooseUs;
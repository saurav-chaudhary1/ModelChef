import { useLanguage } from "../otherFiles/languageContext";
import translation from "../otherFiles/constants";
function HowItWorks(){
    const {language , setLanguage} = useLanguage();
    const t = translation[language];
    const workings = [
        {
            id: 1,
            title: t.howItWorks.working1_title,
            description: t.howItWorks.working1_description,
        },
        {
            id: 2,
            title: t.howItWorks.working2_title,
            description: t.howItWorks.working2_description,
        },
        {
            id: 3,
            title: t.howItWorks.working3_title,
            description: t.howItWorks.working3_description,
        }
    ]
    return(
        <>
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold mb-4">{t.howItWorks.title}</h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            {t.howItWorks.Description}
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 mt-25">
                    {workings.map((working , index) => (
                        <div key={index} className="text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl font-bold text-primary">{working.id}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{working.title}</h3>
                            <p className="text-gray-400">{working.description}</p>
                        </div>
                    ))}
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default HowItWorks;
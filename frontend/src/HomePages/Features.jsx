import {
    WandSparkles,
    Settings,
    MessageSquare,
    Image,
    Volume2,
    Cloud
} from "lucide-react";
import { useLanguage } from "../otherFiles/languageContext";
import translation from "../otherFiles/constants";

function Features(){

    const {language , setLanguage} = useLanguage();
    const t = translation[language];

    const features = [
        {
            title:t.features.feature1_title,
            description:t.features.feature1_description,
            icon: <WandSparkles className="text-xl text-primary"/>,
            borderColor: "hover:border-primary",
            iconBg: "bg-blue-500/20"
        },
        {
            title: t.features.feature2_title,
            description: t.features.feature2_description,
            icon: <Settings className="text-xl text-secondary" />,
            borderColor: "hover:border-secondary",
            iconBg: "bg-purple-500/20"
        },
        {
            title: t.features.feature3_title,
            description: t.features.feature3_description,
            icon: <MessageSquare className="text-xl text-accent" />,
            borderColor: "hover:border-accent",
            iconBg: "bg-green-500/20"
        },
        {
            title: t.features.feature4_title,
            description: t.features.feature4_description,
            icon: <Image className="text-xl text-primary" />,
            borderColor: "hover:border-primary",
            iconBg: "bg-blue-500/20"
        },
        {
            title: t.features.feature5_title,
            description: t.features.feature5_description,
            icon: <Volume2 className="text-xl text-secondary" />,
            borderColor: "hover:border-secondary",
            iconBg: "bg-purple-500/20"
        },
        {
            title: t.features.feature6_title,
            description: t.features.feature6_description,
            icon: <Cloud className="text-xl text-accent" />,
            borderColor: "hover:border-accent",
            iconBg: "bg-green-500/20"
        }
    ];

    return(
        <>
        <section id="features" className="py-20">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">{t.features.title}</h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        {t.features.Decsription}
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {features.map((feature , index) =>(
                        <div 
                            key={index}
                            className={`feature-card p-6 rounded-xl border border-gray-800 bg-gray-900 ${feature.borderColor}`}
                        > 
                            <div className={`w-12 h-12 rounded-lg ${feature.iconBg} flex items-center justify-center mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}

export default Features;
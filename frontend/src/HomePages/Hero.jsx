import { Button } from "../components/ui/button";
import { PlayCircle , RocketIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../otherFiles/languageContext";
import translation from "../otherFiles/constants";
function Hero(){
    const {language , setLanguage} = useLanguage();
    const t = translation[language];
    const IsAuthenticated = localStorage.getItem("IsAuthenticated") === "true";
    return(
        <>
            <section className="py-20 relative overflow-hidden">

            <div className="blob w-96 h-96 bg-red-500 top-20 left-20"></div>
            <div className="blob w-80 h-80 bg-blue-700 top-40 right-10"></div>
            <div className="blob w-72 h-72 bg-green-700 bottom-20 left-40"></div>
            <div className="blob w-72 h-72 bg-purple-700 bottom-20 left-240"></div>

                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 md:pr-12">
                            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-white">
                                {t.hero.Half_title}
                                <span className="gradient-text"> {t.hero.Second_half_title}</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                            {t.hero.Decsription}
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <Button
                                    
                                    size="lg"
                                    className="px-8 py-6  border-gray-700 hover:border-green-500 hover:bg-blue-500 flex items-center justify-center bg-black-700 hover:cursor-pointer"
                                    asChild
                                >
                                    <Link to={IsAuthenticated ? "/fine-tune" : '/login'}>
                                        <RocketIcon className="mr-2 h-5 w-5" />
                                        {t.hero.Get_started}
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-6 border-gray-700 hover:border-green-500 hover:bg-green-500 flex items-center justify-center bg-black-700 hover:cursor-pointer"
                                >
                                    <PlayCircle className="mr-2 h-5 w-5" />
                                    {t.hero.Watch_demo}
                                </Button>
                            </div>
                        </div>

                        <div className="md:w-1/2 mt-12 md:mt-0">
                        <div className="relative animate-float">
                        <div className="p-2 bg-card rounded-xl border border-gray-800">
                            <div className="terminal-wrapper">
                            <div className="flex space-x-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-sm">
                                <span className="text-purple-500">$</span>{" "}
                                <span className="text-green-500">aimasterctl</span> fine-tune
                                --model gpt-3.5 --data training.jsonl
                                <br />
                                <span className="text-green-400">✓</span> Validating data
                                format...
                                <br />
                                <span className="text-green-400">✓</span> Uploading training
                                files...
                                <br />
                                <span className="text-green-400">✓</span> Preparing model
                                for fine-tuning...
                                <br />
                                <span className="text-blue-400">⟳</span> Training model:{" "}
                                <span className="text-yellow-400">42%</span> complete
                                <br />
                                <span className="text-gray-400">
                                [===========.........]
                                </span>
                                <br />
                                ETA: 5 minutes 23 seconds<span className="cursor bg-blue-500"></span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-blue-500">200+</h3>
                        <p className="text-gray-400">{t.hero.supported_models}</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-blue-500">50k+</h3>
                        <p className="text-gray-400">{t.hero.active_users}</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-blue-500">99.9%</h3>
                        <p className="text-gray-400">{t.hero.uptime}</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-blue-500">24/7</h3>
                        <p className="text-gray-400">{t.hero.support}</p>
                    </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero;
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "../otherFiles/languageContext";
import translation from "../otherFiles/constants";
export default function Cta() {
  const { language  , setLanguage} = useLanguage();
  const IsAuthenticated = localStorage.getItem("IsAuthenticated") === "true";
  const t = translation[language];
  return (
    <section className="py-20 bg-gradient-to-r from-card to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-blue-900"></div>
        <div className="absolute right-10 top-40 w-72 h-72 rounded-full bg-green-700"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-purple-900"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{t.cta.title}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t.cta.Description}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg"
              className="px-8 py-6 hover:bg-green-500"
              asChild
            >
              <Link to={IsAuthenticated ? "/fine-tune" : "/signup"}>
                {t.cta.get_started}
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 border-gray-700 hover:border-blue-500 hover:cursor-pointer"
            >
              {t.cta.Schedule_demo}
            </Button>
          </div>
          
          <p className="mt-6 text-gray-400 text-sm">{t.cta.demo}</p>
        </div>
      </div>
    </section>
  );
}
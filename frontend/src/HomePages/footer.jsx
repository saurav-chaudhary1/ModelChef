import { Brain } from "lucide-react";
import { Twitter , Linkedin , Github , MessageCircleCode } from "lucide-react";
import { Link } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {useLanguage} from '../otherFiles/languageContext'
import translation from "../otherFiles/constants";

function Footer(){
    const {language ,  setLanguage} = useLanguage();
    const t = translation[language];
    const productLinks = [
        { href: "#", label: t.footer.product1 },
        { href: "#", label: t.footer.product2 },
        { href: "#", label: t.footer.product3 },
        { href: "#", label: t.footer.product4 }
    ]
    
    const companyLinks = [
        { href: "#", label: t.footer.company1 },
        { href: "#", label: t.footer.company2 },
        { href: "#", label: t.footer.company3 },
        { href: "#", label: t.footer.company4 },
        { href: "#", label: t.footer.company5 }
      ];
    
    const SocialLinks = [
        { href: "#", icon: <Twitter className="h-4 w-4" /> },
        { href: "#", icon: <Linkedin className="h-4 w-4" /> },
        { href: "#", icon: <Github className="h-4 w-4" /> },
        { href: "#", icon: <MessageCircleCode className="h-4 w-4" /> }
    ]
    return(
        <>
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto p4">
                    <div className="grid grid-cols-3">
                        <div>
                            <div className="mb-2 flex ">
                                <Brain className="mt-1 w-8 h-6 rounded-lg" />
                                <span className="text-xl font-semibold mt-0.5">ModelChef</span>
                            </div>
                            <div className="ml-2">
                                <p className="text-gray-400 text-sm">{t.footer.para1}</p>
                                <p className="text-gray-400 text-sm mb-4">{t.footer.para2}</p>
                            </div>
                            <div className="mb-2 flex gap-10 ml-2">
                                {SocialLinks.map((link , index) => (
                                    <a 
                                    key={index} 
                                    href={link.href} 
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {link.icon}
                                </a>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-medium mb-2">{t.footer.product}</h4>
                            <ul className="space-y-2 text-gray-400">
                            {productLinks.map((link, index) => (
                                <li key={index}>
                                <Link href={link.href} className="hover:text-white transition-colors">
                                    {link.label}
                                </Link>
                                </li>
                            ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium mb-4">{t.footer.company}</h4>
                            <ul className="space-y-2 text-gray-400">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                <Link href={link.href} className="hover:text-white transition-colors">
                                    {link.label}
                                </Link>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                        <div className="border-t border-black mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">{t.footer.copyright}</p>
                        <div className="mt-4 md:mt-0">
                            <Select onValueChange={(selectedLang) =>{
                                // Language.value = selectedLang;
                                setLanguage(selectedLang);
                                console.log(selectedLang);
                            }} defaultValue="en">
                            <SelectTrigger className="bg-black border-green-700 text-green-400 text-sm w-[180px]">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English (US)</SelectItem>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="de">Deutsch</SelectItem>
                                <SelectItem value="zh">中文</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer;
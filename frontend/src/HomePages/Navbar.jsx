// import {Link , useLocation } from "wouter";
import { Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import translation from "../otherFiles/constants";
import {useLanguage} from '../otherFiles/languageContext';
import { DropdownMenu , DropdownMenuTrigger , DropdownMenuContent , DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Avatar , AvatarImage , AvatarFallback} from "@radix-ui/react-avatar";
import { Settings , LucideLogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const {language , setLanguage} = useLanguage();
  const t = translation[language];
  const   location = useLocation();
  const IsAuthenticated = localStorage.getItem("IsAuthenticated") === "true";
  const username = localStorage.getItem("username")
  const initials = localStorage.getItem("initials")

  const handleLogout = ()=>{
    localStorage.removeItem("IsAuthenticated");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    navigate("/");
  }

  const navLinks = useMemo(()=> [
    { href: "/", label: t.navbar.Buttons[0] },
    { href: IsAuthenticated ? "/fine-tune" : '/login', label: t.navbar.Buttons[1] },
    { href: IsAuthenticated ? "/chat" : '/login', label: t.navbar.Buttons[2] },
    { href: IsAuthenticated ? "/models" : '/login', label: t.navbar.Buttons[3] },
    { href: IsAuthenticated ? "/datasets" : '/login', label: t.navbar.Buttons[4] },
  ] , [IsAuthenticated , t]);

  return (
    <header className="w-full border-b border-gray-800 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="h-5 w-5" /> 
            </div>
            <span className="text-xl font-semibold">ModelChef</span>
          </div>

          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={
                  location.pathname === link.href
                    ? "text-white hover:text-primary transition-colors"
                    : "text-gray-400 hover:text-green-500 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {!IsAuthenticated ?(
            <>
            <div className="flex items-center space-x-4">
            <Link to='/login'>
              <Button variant="outline" className="hover:bg-blue-500 hover:border-blue-500 hover:cursor-pointer" >{t.navbar.Login}</Button>
            </Link>
            <Link to="/signup">
              <Button className="hover:bg-green-500 hover:border-green-500 hover:cursor-pointer" >{t.navbar.Signup}</Button>
            </Link>
          </div>
            </>
          ) : (
            <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-900/50 hover:bg-gradient-to-r from-blue-700/80 to-indigo-800/80 transition-all duration-300 cursor-pointer border border-gray-800 hover:border-blue-500/50 shadow-sm hover:shadow-md hover:shadow-blue-900/20 group">
                  <Avatar className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-blue-500/50 ring-offset-2 ring-offset-gray-950 shadow-inner">
                    <AvatarImage src="" alt={username} className="rounded-full object-cover w-full h-full" />
                    <AvatarFallback className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white text-sm font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-white font-medium group-hover:text-blue-200 transition-colors duration-300 capitalize">
                      {username}
                    </span>
                    <span className="text-gray-400 text-xs group-hover:text-blue-300/70 transition-colors duration-300">
                      Online
                    </span>
                  </div>
                  <div className="ml-auto">
                    <div className="h-2 w-2 rounded-full bg-green-500 ring-2 ring-green-500/30"></div>
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200"
              >
                <DropdownMenuItem
                  className="px-4 py-2 text-sm text-gray-700  rounded-t-md cursor-pointer flex items-center gap-2"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-4 py-2 text-sm text-red-600  rounded-b-md cursor-pointer flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LucideLogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </>
          )}
        </div>
      </div>
    </header>
  );
}

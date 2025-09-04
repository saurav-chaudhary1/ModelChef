import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  // const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");


  const getProfile = async() =>{
    const token = localStorage.getItem("access_token");
    try{
      const response = await axios.get("http://127.0.0.1:8002/api/profile/" , {
        headers : {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data;
    } catch (e){
      console.error("Error fetching profile:", e);
      return null;
    }
  }

  const handleLogin = async () =>{
    const payload = {
      'email' : email,
      'password' : password,
    };
    const ErrorDiv = document.getElementById("errorMessage")
      try{
        const response = await axios.post("http://127.0.0.1:8002/api/login/" , payload);
        const {access_token , refresh_token} = response.data;
        localStorage.setItem("access_token" , access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("IsAuthenticated" , "true");

        const profileData = await getProfile();
        if (profileData) {
        const { username, email } = profileData;
          localStorage.setItem("username", username);
          localStorage.setItem("email", email);
          const initials = username.split(" ").map((n) => n[0]).join("").slice(0 , 2).toUpperCase();
          localStorage.setItem("initials", initials);
        }

        navigate("/");
      } catch (e){
        console.error("Login failed:", e.response ? e.response.data : e.message);
        const errors = e.response.data;
        if (errors.user) {
          ErrorDiv.innerHTML = `<p>${errors.user}</p>`;
        } else if (errors.message) {
          ErrorDiv.innerHTML = `<p>${errors.message}</p>`;
        }else if(errors.non_field_errors){
          ErrorDiv.innerHTML = `<p>${errors.non_field_errors}</p>`;
        } else {
          ErrorDiv.innerHTML = "<p>Something went wrong</p>";
        }
      }
  }

  return (
    <section className="pt-16 px-10  bg-black">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="h-auto w-[550px] bg-gray-900 p-10 rounded-xl shadow-xl text-white">
            <h1 className="text-[28px] font-semibold text-center mb-6">
              Welcome Back 👋
            </h1>

            <div className="flex flex-col items-center gap-5 mb-6">
              <Button
                variant="outline"
                className="w-[250px] text-[15px] flex items-center justify-between border-gray-700 hover:bg-blue-600 hover:border-blue-600 hover:cursor-pointer"
              >
                <span>Login with GitHub</span>
                <Github className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="w-[250px] text-[15px] flex items-center justify-between border-gray-700 hover:bg-green-500 hover:border-green-500 hover:cursor-pointer"
              >
                <span>Login with Google</span>
                <FaGoogle className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="w-[250px] text-[15px] flex items-center justify-between border-gray-700 hover:bg-purple-500 hover:border-purple-500 hover:cursor-pointer"
              >
                <span>Login with LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-center text-gray-400 mb-6">or</p>
            <div id="errorMessage" className="text-gray-400 text-sm mb-6 text-red-700"></div>
            <form className="flex flex-col items-center gap-4" onSubmit={(e) => {e.preventDefault(); handleLogin();}}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-[300px] p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-[300px] p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="outline"
                type = "submit"
                className="mt-2 w-[300px] hover:bg-green-500 hover:border-green-500 hover:text-white"
                // onClick={handleLogin}
              >
                Login
              </Button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

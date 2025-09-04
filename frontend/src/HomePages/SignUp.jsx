import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import { Link , useNavigate} from "react-router-dom";
import {FaGoogle} from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
function Signup() {
  const navigate = useNavigate();
  const [username , setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2 , setPassword2] = useState("");

  const RegisterUser = async () =>{
    const payload = {
      'username' : username,
      'email' : email,
      'password' : password,
      'password2' : password2
    };

    const ErrorDiv = document.getElementById("errorMessage");

    try{
      const response = await axios.post("http://127.0.0.1:8002/api/register/" , payload);
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (e){
      console.error("Registration error:", e.response.data);
      const errors = e.response.data;

      if (errors.username) {
        ErrorDiv.innerHTML = `<p>${errors.username}</p>`;
      } else if (errors.message) {
        ErrorDiv.innerHTML = `<p>${errors.message}</p>`;
      } else {
        ErrorDiv.innerHTML = "<p>Login failed due to unknown error.</p>";
      }
    }
  }
    
  return (
    <section className="min-h-screen bg-black/90 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 text-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to CodeChef</h1>

        <div className="flex flex-col gap-4 mb-6">
          <Button
            variant="outline"
            className="w-full flex  items-center text-sm border-gray-700 hover:bg-blue-500 hover:cursor-pointer"
          >
            Sign Up with GitHub <Github className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="w-full text-sm border-gray-700 hover:bg-green-500  hover:cursor-pointer"
          >
            Sign Up with Google
            <FaGoogle className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center text-sm border-gray-700 hover:bg-purple-500  hover:cursor-pointer"
          >
            Sign Up with LinkedIn <Linkedin className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center text-gray-400 text-sm mb-6">or continue with email</div>
        <div id="errorMessage" className="text-gray-400 text-sm mb-6 text-red-700"></div>
        <form className="flex flex-col gap-4" onSubmit={(e) => {e.preventDefault(); RegisterUser();}}>
          <input
            type="text"
            placeholder="Full Name"
            className="bg-transparent border border-gray-700 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent border border-gray-700 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border border-gray-700 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-transparent border border-gray-700 rounded px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button
            variant="outline"
            className="mt-2 w-full hover:bg-green-600 hover:border-green-600 transition-colors  hover:cursor-pointer"
            type = "submit"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;

import React, { useState } from "react";
import { Mail, Lock, Video } from "lucide-react";
import { Input } from "../components/ui/Input";
import { authSchema } from "../validation/authSchema";
import { useNavigate } from "react-router-dom";
import { login , signUp } from "../api/user";


const Auth = () => {

    // const dispatch = useDispatch();
    const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('')
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = { email, password };
  
    try {
     
      const parsedData = authSchema.parse(formData);
  
      const apiFn = isLogin ? login : signUp;
      const response = await apiFn(parsedData);
  
      console.log("✅ Response from server:", response);
  
      if (response.data?.success) {
        const { accessToken, user } = response.data.data;
        console.log("access tocken is receiving",response.data.data)
        
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("user", JSON.stringify(user));
        }
  
        alert(isLogin ? "Login successful!" : "Signup successful!");
        navigate('/')
        // window.location.href = "/home";
      } else {
        throw new Error(response.data?.message || "Something went wrong");
      }
    } catch (error: any) {
      // ✅ 6. Error handling
      console.error("❌ Error during auth:", error);
  
      if (error.errors) {
        // Zod validation error
        alert(error.errors[0].message);
      } else if (error.response) {
        // API error
        alert(error.response.data?.message || "Server error");
      } else {
        alert(error.message || "Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-black  text-white p-4">
      <div className="w-full max-w-md bg-gray backdrop-blur-sm rounded-2xl shadow-lg border border-gray-900 p-6 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-600/20 rounded-full">
              <Video className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isLogin
              ? "Sign in to access your videos"
              : "Sign up to start managing your videos"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>         
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />

            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
            </div>
          </div>

          {/* Submit Button */}
          <button
  type="button"
  onClick={handleSubmit}
  disabled={loading} // disable when loading
  className={`w-full py-2 mt-2 rounded-md font-semibold shadow-md transition-all 
    ${loading ? "bg-red-500 cursor-not-allowed opacity-70" : "bg-red-600 hover:bg-red-700 text-white"}`}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>Loading...</span>
    </div>
  ) : (
    <span>{isLogin ? "Sign In" : "Sign Up"}</span>
  )}
</button>

        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-900 px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-700 text-gray-300 py-2 rounded-md hover:bg-gray-800 transition-all"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>

        {/* Toggle Login / Signup */}
        <div className="mt-6 text-center text-sm">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:text-pink-400 transition-all"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

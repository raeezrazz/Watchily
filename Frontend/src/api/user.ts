import apiClient from "./apiClient/axios";

export interface SignUpData {
   
    email: string;
    password: string;
    phone?: string; 
    otp?: string;
  }


export const signUp = async (formData:SignUpData) => {
    console.log
    return await apiClient.post("/register", {
        ...formData,
    });
};
export const login = async (formData:SignUpData) => {
    return await apiClient.post("/login", {
        ...formData,
    });
};
export const addVideo = async (formData: { title: string; youtube_url: string }) => {
    return await apiClient.post("/videos/add", {
      ...formData,
    });
  };

  
  export const getAllVideos = async () => {
    return await apiClient.get("/videos");
  };

//   export const logout = async () => {
//     localStorage.removeItem("accessToken");
    
//     localStorage.removeItem("user");
  
   
//     return await apiClient.post("/logout"); 
//   };
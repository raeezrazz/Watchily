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
// export  const verifyOtp =async (formData: SignUpData)=>{
//     return await apiClient.post('/user/verifyOtp',{
//         ...formData
//     });
// };
// export const resendOtp = async (email: string) => {
//     return await apiClient.post("/user/resendOtp", { email });
//   };
  

// export const getUserById = async (userId?: string) => {
//     if(userId){
        
//         return await apiClient.get(`/user/${userId}`);
         
//     }
// }
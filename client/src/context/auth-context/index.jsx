

import axiosInstance from "@/api/axiosInstace";
import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    // ✅ Yeh ab functional component ke andar hai
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const [auth, setAuth] = useState({
        authenticate:false,
        user:null
    })
    if (!auth) {
        return <p>Loading...</p>; // 🛠 Agar auth data aane me time lag raha hai
    }
    
    const [loading, setLoading] = useState(false);

    async function handleRegistrUser(e){
        e.preventDefault();
        const {data}= await registerService(signUpFormData);
    }
    const navigate = useNavigate(); // ✅ Navigation hook
    

   
    
    async function handleLoginUser(e) {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post('/auth/login', signInFormData, {
                withCredentials: true,
            });
    
            if (data?.data?.user) {
                setAuth({
                    authenticate: true,
                    user: data.data.user
                });
            } else {
                console.error("Invalid login response structure:", data);
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    }
    
        async function checkAuthUser() {
            try {
                const { data } = await checkAuthService();
        
        
                if (data.success && data.user) {
                    setAuth({
                        authenticate: true,
                        user: data.user
                    });
                } else {
                    setAuth({
                        authenticate: false,
                        user: null
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error("Auth Check Error:", error);
            }
        }
        
        useEffect(() => {
            checkAuthUser();
        }, []);
    

 

    
       
    

    return (
        <AuthContext.Provider value={{
            signInFormData,
            setSignInFormData,
            signUpFormData,
            setSignUpFormData,
            handleRegistrUser,
            handleLoginUser,
            auth,
        }}>
            {
                loading ? <Skeleton/> : children
            }

           
        </AuthContext.Provider>
    );
}


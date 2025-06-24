"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface User {
  name: string;
  email: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null
  // login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        withCredentials: true
      })
      setUser(response.data.data);
      
      localStorage.setItem("userName", response.data.data.name);
      localStorage.setItem("userEmail", response.data.data.email);
      localStorage.setItem("userRoles", response.data.data.roles);

    } catch (error) {
      setUser(null)
    } 
  }

  useEffect(() => {
    checkAuth()
  }, [])

  // const login = async (credentials: { email: string; password: string }) => {
  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, credentials,
  //       { withCredentials: true }
  //     )
  //     await checkAuth() // Refresh auth state after login

  //     // Successful Login
  //     localStorage.setItem("userName", response.data.user.name);
  //     localStorage.setItem("userRole", response.data.user.roles);

  //   } catch (error) {
  //     console.log("Login Error: ", error);
  //   }
  // }

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, { 
        withCredentials: true 
      });
      
      // Clear client-side storage
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRoles");
      setUser(null);
      
      // Force refresh to clear any cached data
      // router.refresh();
      router.push('/');

    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      logout, 
      checkAuth, 
      // login,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
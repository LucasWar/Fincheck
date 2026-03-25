import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../../services/userServices";
import { PageLoader } from "../../assets/components/PageLoader";

interface AuthContextValue {
  signedIn: boolean;
  signin(value:string): void; 
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({children}: {children: React.ReactNode} ){
  const [signedIn, setSignIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

    return Boolean(storedAccessToken)
  })

  const {isError, isFetching, isSuccess, remove} = useQuery({
    queryKey: ['users','me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
  })

  const signin = useCallback((accesseToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accesseToken)
    setSignIn(true)
  }, [])

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    remove()
    setSignIn(false)
  }, [remove])

  useEffect(() => {
    if (isError) {
      signout()
    }
  }, [isError, signout])

  if(isFetching){
    return <PageLoader />
  }

  return(
    <AuthContext.Provider value={{
      signedIn: isSuccess && signedIn, 
      signin, 
      signout
    }}>
      {children}
    </AuthContext.Provider>
  )
} 
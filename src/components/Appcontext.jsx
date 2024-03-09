'use client'
import { SessionProvider } from "next-auth/react";

export function Appprovider({children}){
    return (
        <SessionProvider>
           {children}
        </SessionProvider>
    )
}
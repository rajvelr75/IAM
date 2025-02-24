"use client"

import { useToast } from '@/hooks/use-toast'
import { authClient } from '@/lib/better-auth/auth-client'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SignOut = () => {
    const {push} = useRouter()
    const {toast} = useToast()
  return (
    <DropdownMenuItem className="flex items-center gap-3 cursor-pointer" onClick={async()=>{
        await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                toast({
                  title: "Sign out success!",
                });
                push("/sign-in");
              },
  
              onError: (cxt) => {
                toast({
                  title: "Error!",
                  description: cxt.error.message,
                });
              },
            },
          });
    }}>Sign Out <LogOut/></DropdownMenuItem>

  )
}

export default SignOut
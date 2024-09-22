'use client'
import React, {useState, useEffect} from "react";
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import {
  Search
} from "lucide-react"
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import Link from "next/link";
export interface User {
  id: BigInteger,
  name: string,
  email: string,
  email_verified_at: Date,
  creatd_at: Date,
  picture: string,
  updated_at: Date
}

export default function Header() {
  const router = useRouter()
const [user, setUser] = useState<User>()

useEffect(() => {
  let token = Cookies.get('token')
    getuser(token)
  
  }, [])

  const getuser = (token : any) => {

    const headers = { 'Authorization': 'Bearer ' + token };
    axios.post('http://localhost:8000/api/user', {}, { headers })
      .then(response => setUser(response.data))
    .catch (function (error) {
    if (error.response.status == 401) {
      return router.push('/login')
    }
  })
}

  const logout = () => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer '+token };
    axios.post('http://localhost:8000/api/logout', {}, {  headers })
      .then(response =>{ if(response.data === 'success')
      Cookies.remove('token', { path: '/' })})
      .then(response => router.push('/login'))
  }

  return (
    <>
      <div className="flex flex-col  w-full" >
        <header className="sticky top-0 z-30 flex h-10 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 ">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src={user ? `http://localhost:8000/storage/${user?.avatar}` : "/placeholder-user.jpg"}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel><Link href="/admin/profile">Profils</Link></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <h2>{user?.name}</h2>
        </header>
      </div>
    </>
  )
}
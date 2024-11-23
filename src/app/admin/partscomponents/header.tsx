'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import {
  Search
} from "lucide-react"
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Loading from "./loading";
import { toast } from "sonner";
import Searchcard from "./searchcard";
export interface User {
  id: BigInteger,
  name: string,
  personalnr: string,
  email: string,
  email_verified_at: Date,
  creatd_at: Date,
  avatar: string,
  updated_at: Date,
  bio: string,
  adress: string,
  phone: string,
  description: string,
  scope: string,
  occupation: string,
  bank: string
}

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<User>()
  const [searchvalue, setSearchvalue] = useState()
  const [searchresponse, setSearchresponse] = useState([])

  useEffect(() => {
    let token = Cookies.get('token')
    getuser(token)

  }, [])

  const getuser = (token: any) => {

    const headers = { 'Authorization': 'Bearer ' + token };
    axios.post('http://localhost:8000/api/user', {}, { headers })
      .then(response => { if (response.data.scope === 'business') { setUser(response.data) } else { router.push('/') } })
      .catch(function (error) {
        if (error.response.status == 401) {
          return router.push('/login')
        }
      })
  }

  const logout = () => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };
    axios.post('http://localhost:8000/api/logout', {}, { headers })
      .then(response => {
        if (response.data === 'success')
          Cookies.remove('token', { path: '/' })
      })
      .then(response => router.push('/login'))
  }

  const searching = () => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };

    axios.post('http://localhost:8000/api/search', { searchvalue }, { headers })
      .then(response => setSearchresponse(response.data))
  }

  if (!user) {
    return <Loading />
  }

console.log(searchresponse)
  return (
    <>
      <div className="flex flex-col  w-full header" >
        <header className="sticky top-0 z-30 flex h-10 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 ">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  searching()
              }}
              onChange={(e) => setSearchvalue(e.target.value)}
            />
          </div>
          <Searchcard searchresponse={searchresponse} setSearchresponse={setSearchresponse}/>
   
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
              <DropdownMenuItem onClick={logout}>Izrakstīties</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <h2>{user?.name}</h2>
        </header>
      </div>
    </>
  )
}
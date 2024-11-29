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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search
} from "lucide-react"
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Loading from "./loading";
import Searchcard from "./searchcard";
import { Client } from "../clients/page";
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
  bank: string,
  abonament: string
}

export interface invoice{
  booking: number,
created_at: Date,
customer:  User ,
external_customer: string,
id: number,
invoice: string,
paid_date: Date,
price: number,
serial_number: string,
service: string,
status: string,
type: string,
updated_at: Date,
user: number
}

export interface search{
  clients: Client[]
  invoices: invoice[]
}

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<User>()
  const [searchvalue, setSearchvalue] = useState<string>()
  const [searchresponse, setSearchresponse] = useState([])

  useEffect(() => {
    let token = Cookies.get('token')
    getuser(token)

  }, [])

  const getuser = (token: any) => {

    const headers = { 'Authorization': 'Bearer ' + token };
    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/user`, {}, { headers })
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
    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/logout`, {}, { headers })
      .then(response => {
        if (response.data === 'success')
          Cookies.remove('token', { path: '/' })
      })
      .then(response => router.push('/login'))
  }

  const searching = () => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };

    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/search`, { searchvalue }, { headers })
      .then(response => setSearchresponse(response.data))
  }

  const closesearching=()=>{
    setSearchresponse([])
  }
  
  if (!user) {
    return <Loading />
  }

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
          <Searchcard response={searchresponse} close={closesearching}/>
   
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src={user ? `${process.env.NEXT_PUBLIC_REQUEST_STORAGE}/${user?.avatar}` : "/placeholder-user.jpg"}
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
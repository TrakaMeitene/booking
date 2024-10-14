'use client'
import React, {useEffect, useState} from "react"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { User} from "../admin/partscomponents/header"

export default function Nav(){

  const [isLoggedin, setLoggedin] = useState(false)
  const [user, setUser] = useState<User>()
  const router = useRouter()

  useEffect(() => {
    let token = Cookies.get('token')
    if(token){
      getuser(token)
    }
    }, [])
  
    const getuser = (token:any) => {
  
      const headers = { 'Authorization': 'Bearer ' + token };
      axios.post('http://localhost:8000/api/user', {}, { headers })
        .then(response => {
          console.log(response)
          if(response.data.scope === "all"){
          setLoggedin(true)
          setUser(response.data)
          }
        })
      .catch (function (error) {
      // if (error.response.status == 401) {
      //   return router.push('/')
      // }
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

    return(
        <nav className="homenav">
        <Link href="Http://localhost:3000/"><Image
        src="/logo1.png"
        alt="logo"
        width={100}
        height={100}
        /></Link>
        <div>
        <Button>
          <Link href="/business">Biznesam</Link>
        </Button>
       {isLoggedin ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src={user?.avatar ? `http://localhost:8000/storage/${user.avatar}` : "/placeholder-user.jpg"}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel><Link href="/profile">Profils</Link></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Izrakstīties</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            : <Button><Link href="/login">Ielogoties</Link></Button>}
            </div>
      </nav>
    )
}
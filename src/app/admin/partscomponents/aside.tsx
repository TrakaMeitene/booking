'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link"
import {
  LineChart,
  Package,
  Settings,
  Users,
  PanelLeft,
  CalendarDays,
  ReceiptEuro,
  Star
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Header from "./header";
import { usePathname } from 'next/navigation'
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { User } from "./header"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useOnborda } from "onborda";

export default function Aside() {
  const pathname = usePathname()
  const [user, setUser] = useState<User>()
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true)
  const { startOnborda, closeOnborda } = useOnborda()
    const [windowWidth, setWindowWidth] = useState<number>(0)

  const router = useRouter()
  useEffect(() => {
    let token = Cookies.get('token')
    setWindowWidth(window.innerWidth)

    window.innerWidth > 800 &&  isFirstTimeIn()

    if (token) {
      getuser(token)
    } else { router.push('/') }
  }, [])


  const getuser = (token: string) => {

    const headers = { 'Authorization': 'Bearer ' + token };
    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/user`, {}, { headers })
      .then(response => {
        if (response.data.scope === "business") {
          setUser(response.data)
        }
      })

  }


  const isFirstTimeIn = () => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };

    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getonboardtime`, {}, { headers })
      .then(response => 
        { response.data.onboarder !== null ? setIsFirstTime(false) : startOnborda("firsttour") })
  }

  const base = "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
  const active = "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-accent text-accent-foreground transition-colors"

  return (
    <TooltipProvider>

      <aside className="fixed inset-y-0 left-0  hidden w-14 flex-col border-r bg-background sm:flex z-[100]"  >
        <nav className="flex flex-col items-center gap-4 px-2 py-4" >
          <Link
            href="/admin/calendar"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base "
          >
            <Image
              src="/logo1.png"
              height={25}
              width={25}
              alt="logo"
              style={{ transform: "translate(1px, -1px)" }}
            />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/calendar"
                className={pathname === "/admin/calendar" ? active : base}
              >
                <CalendarDays className="h-5 w-5" id="welcome-message"
                />
                <span className="sr-only">Kalendārs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Kalendārs</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/clients"
                className={pathname === "/admin/clients" ? active : base}
              >
                <Users className="h-5 w-5" />
                <span className="sr-only">Klienti</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Klienti</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/services"
                className={pathname === "/admin/services" ? active : base}
              >
                <Package className="h-5 w-5" id="step2" />
                <span className="sr-only">Pakalpojumi</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Pakalpojumi</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={user?.abonament != "bezmaksas" ? "/admin/invoices" : "/admin/update"}
                className={pathname === "/admin/invoices" ? active : base}
              >
                <ReceiptEuro className="h-5 w-5" />
                <span className="sr-only">Rēķini</span>
              </Link>
            </TooltipTrigger>
            {user?.abonament == "bezmaksas" && <Badge variant="destructive" className="relative translate-y-[-3.3rem] translate-x-2	rounded-full  "><Star size={12} /></Badge>}

            <TooltipContent side="right">Rēķini</TooltipContent>
          </Tooltip>


        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/settings"
                className={pathname === "/admin/settings" ? active : base}
              >
                <Settings className="h-5 w-5" id="step4" />
                <span className="sr-only">Uzstādījumi</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Uzstādījumi</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0  flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Header />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/admin/calendar"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Image
                    src="/logo1.png"
                    height={25}
                    width={25}
                    alt="logo"
                    style={{ transform: "translate(1px, -1px)" }}
                  />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="/admin/calendar"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <CalendarDays className="h-5 w-5" 
                  />
                  Kalendārs
                </Link>
                <Link
                  href="/admin/clients"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Klienti
                </Link>
                <Link
                  href="/admin/services"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Pakalpojumi
                </Link>
                <Link
                  href={user?.abonament != "bezmaksas" ? "/admin/invoices" : "/admin/update"}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  {user?.abonament == "bezmaksas" && <Badge variant="destructive" className="absolute  translate-x-28	rounded-full  "><Star size={12} /></Badge>}

                  <Package className="h-5 w-5" />
                  Rēķini
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Uzstādījumi
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </TooltipProvider>

  )
}
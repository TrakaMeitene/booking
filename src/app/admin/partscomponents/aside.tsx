'use client'
import React from "react";
import Link from "next/link"
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  PanelLeft
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

export type Usermodel = {
  id: BigInteger,
  name: string,
  email: string,
  email_verified_at: Date,
  creatd_at: Date,
  picture: string,
  updated_at: Date
}

export interface User {
  user : Usermodel
}

export default function Aside(){
  const pathname = usePathname()

  const base = "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
  const active = "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-accent text-accent-foreground transition-colors"
    return(
      <TooltipProvider>

        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/admin/calendar"
            className= "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base "
          >
            <Image
            src="/logo1.png"
            height={25}
            width={25}
            alt="logo"
            style={{transform: "translate(1px, -1px)"}}
            />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/calendar"
                className={pathname === "/admin/calendar" ? active : base}
              >
                <Home className="h-5 w-5" />
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
                <ShoppingCart className="h-5 w-5" />
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
                <Package className="h-5 w-5" />
                <span className="sr-only">Pakalpojumi</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Pakalpojumi</TooltipContent>
          </Tooltip>
      
   
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/settings"
                className={pathname === "/admin/settings" ? active : base}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Uzstādījumi</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Uzstādījumi</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="/admin/calendar"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Kalendārs
                </Link>
                <Link
                  href="/admin/clients"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
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
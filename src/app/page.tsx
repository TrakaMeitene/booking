'use client'
import React, { useEffect, useState } from "react"
import Nav from "./components/nav"
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from 'moment';
import 'moment/locale/lv'

import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Syne } from 'next/font/google';
import axios from "axios"
import Footer from "./business/components/footer";

const syne = Syne({ subsets: ['latin'], weight: "700"});

export default function Home() {
  const [date, setDate] = useState<any>(new Date())


  return (
    <>
      <Nav />

      <section id="homefirst">
        <h1 className={syne.className}>Atrodiet savu labsajūtas speciālistu jebkurā laikā, jebkurā vietā!</h1>
        <div className="search">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Atrašanās vieta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pakalpojums" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? moment(date).format('dddd, Do MMMM YYYY') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button className="button">
            MEKLĒT
          </Button>
        </div>
      </section>
      <Footer/>
    </>
  );
}

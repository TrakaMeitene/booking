'use client'
import React, { use, useState, memo} from "react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { Calendar } from "@/components/ui/calendar";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from 'moment';
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

export default function Searchspecialist( ) {
  const [date, setDate] = useState<any>(new Date())
  const [cities] = useState(["Rīga", "Daugavpils", "Jelgava", "Jēkabpils", "Jūrmala", "Liepāja", "Rēzekne", "Valmiera", "Ventspils", "Aizkraukles rajons", "Alūksnes rajons", "Balvu rajons", "Bauskas rajons", "Cēsu rajons", "Daugavpils rajons", "Dobeles rajons", "Gulbenes rajons", "Jēkabpils rajons", "Jelgavas rajons", "Krāslavas rajons", "Kuldīgas rajons", "Liepājas rajons", "Limbažu rajons", "Ludzas rajons", "Madonas rajons", "Ogres rajons", "Preiļu rajons", "Rēzeknes rajons", "Rīgas rajons", "Saldus rajons", "Talsu rajons", "Tukuma rajons", "Valkas rajons", "Valmieras rajons", "Ventspils rajons", "Ārpus Latvijas"])
  const [occupations] = useState(["Frizieris", "Vizāžists", "Manikīrs", "Kosmetologs", "Skropst meistars", "Masieris", "Stilists", "Lāzerepilācija", "Tetovēšana/pīrsingi", "Fitness", "Masāža"])
  const [selectedcity, setSelectedcity] = useState("Rīga") //varbut var noteikt ierīces atrašanaš vietu
  const [selectedoccupation, setSelectedoccupation] = useState("")
  
  const router = useRouter()

  const searchspecialsist = () => {
    router.push(`/specialistslist?city=${selectedcity}&occupation=${selectedoccupation}&date=${date}`)

  }


  return (
    <div className="search mb-9 z-10 flex-wrap">
      <Select value={selectedcity} onValueChange={(value) => {
        setSelectedcity(value)
      }} >
        <SelectTrigger className="w-[180px] max-[390px]:w-full">
          <SelectValue placeholder="Atrašanās vieta" />
        </SelectTrigger>
        <SelectContent>
          {cities.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={selectedoccupation} onValueChange={(value) => {
        setSelectedoccupation(value)
      }} >
        <SelectTrigger className="w-[180px] max-[390px]:w-full">
          <SelectValue placeholder="Pakalpojums" />
        </SelectTrigger>
        <SelectContent>
          {occupations.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal max-[390px]:w-full",
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

      <Button className="button" onClick={searchspecialsist}>
        MEKLĒT
      </Button>
    </div>
  )
}
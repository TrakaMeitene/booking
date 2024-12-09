'use client'
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import moment, { now } from "moment";
import { lv } from "date-fns/locale";
import { cn } from "@/lib/utils";
import 'moment/locale/lv'
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface inprops{
    setTab: (arg:string)=>void,
    getmessage: (message:string)=>void,
    setOpen: (arg:boolean)=>void
}

export default function Addvacation(props:inprops) {

    const [startdate, setstartDate] = useState(moment())
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [enddate, setendDate] = useState(moment().add(1, 'days'))
    const [isCalendarOpenend, setIsCalendarOpenend] = useState(false)
const router = useRouter()

    let token = Cookies.get('token')

const operations=(date: Date)=>{
    setstartDate(date)
    setendDate(moment(date).add(1, 'days'))
     setIsCalendarOpen(false)
}


const savevacation = (e) => {
    e.preventDefault()
const data = {}
data.start = startdate
data.end = enddate

    const headers = { 'Authorization': 'Bearer ' + token };
    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/savevacation`, data, { headers })
        .then(response =>{ 
            props.setTab("Brīvdienas")
            if(response.data.length > 0){
           props.getmessage({message: "Dati saglabāti veiksmīgi!"})
           props.setOpen(false)
}
        }
    ) 
        .catch(function (error) {
            if (error.response.status == 401) {
                return router.push('/login')
            }
        })
}

    return (
        <>

                <form onSubmit={savevacation}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Sākuma datums *
                            </Label>
                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !startdate && "text-muted-foreground"

                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startdate ? moment(startdate).format('dddd, Do MMMM YYYY') : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={startdate}
                                        onSelect={(e:Date)=>operations(e)}
                                        initialFocus
                                        fromDate={new Date()}
                                        locale={lv}
                                        className="opacity-100"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                               Beigu Datums *
                            </Label>
                            <Popover open={isCalendarOpenend} onOpenChange={setIsCalendarOpenend}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !enddate && "text-muted-foreground"

                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {enddate ? moment(enddate).format('dddd, Do MMMM YYYY') : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={enddate}
                                        onSelect={setendDate}
                                        initialFocus
                                        fromDate={new Date()}
                                        locale={lv}
                                        className="opacity-100"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <Button type="submit">Saglabāt</Button>
                </form>

        </>
    )
}
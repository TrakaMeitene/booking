'use client'
import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import axios from "axios";
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { User } from "../admin/calendar/page";
import { Service } from "../admin/services/page";
import Loading from "../admin/partscomponents/loading";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";

export default function Specialistpage() {
    const [specialist, setSpecialist] = useState<User[]>([])
    const [availabletimes, setAvailabletimes] = useState()
    const [services, setservices] = useState<Service[]>([])
    const [selectedservice, setselectedservice] = useState("")
    const [today, setToday] = useState(new Date())
    const [rangeEnd, setRangened] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7))
    const [times, setTimes] = useState([])

    const pathname = usePathname()
    let decodedstring = decodeURIComponent(pathname)

    useEffect(() => {
        getdata()
    }, [])

    const getdata = () => {
        axios.post('http://localhost:8000/api/getspecialistbyname', { name: decodedstring.slice(1) })
            .then(response => setSpecialist(response.data))

    }


    useEffect(() => {
        getservices()
    }, [specialist[0]])

    const getservices = () => {
        if (specialist.length > 0) {
            axios.post('http://localhost:8000/api/getservicesforspecialist', { id: specialist[0]?.id })
                .then(response => setservices(response.data))
        }
    }

    let days = []
    for (let i = 0; i <= 7; i++) {
        days.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i))
    }

    const gettimes = () => {
        axios.post('http://localhost:8000/api/getspecialiststimes', { userid: specialist[0].id, service: selectedservice, range: days })
            .then(response => setTimes(response.data))
    }

    const getDate=(y)=>{
console.log(new Date(y))
    }

    if (!specialist[0]) {
        return <Loading />
    }
    const months = ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"]
    const weekdays = ["P.", "O.", "T.", "C.", "Pk.", "S.", "Sv."]

    const nextrange = () => {
        setToday(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7))
        setRangened(new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate() + 7))
    }

    const previousrange = () => {
        setToday(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7))
        setRangened(new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate() - 7))
    }


    console.log(times)
    return (
        <>
            <Nav />
            <section id="personpage" className="flex justify-center items-center flex-col">
                <div className="flex w-[80%]  p-5 flex-row items-center ">
                    <Avatar className="h-[150px] w-[150px] mr-4" >
                        <AvatarImage src={`http://localhost:8000/storage/${specialist[0].avatar}`} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div >
                        <h4 className="font-bold text-xl">{specialist[0]?.name}</h4>
                        <p className="">{specialist[0].bio}</p>
                        <p className="text-stone-400 text-sm mt-2">{specialist[0].occupation}</p>
                        <div className="flex flex-row text-left">
                            <p className="text-stone-400 text-sm">{specialist[0].city},</p>
                            <p className="text-stone-400 text-sm">{specialist[0].adress}</p>
                        </div>
                    </div>
                </div>
                <div className="flex w-[80%] h-[50vh] p-5 flex-col  items-center  ">
                    <div className="grid gap-2">
                        <Label htmlFor="city">Izvēlies pakalpojumu</Label>
                        <Select value={selectedservice} onValueChange={(value) => {
                            setselectedservice(value)
                        }} >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Izvēlies pakalpojumu" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>

                                    {services.map(x => <SelectItem key={x.id} value={x.id.toString()}>{x.name}</SelectItem>)}

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={gettimes} disabled={!selectedservice}>Atlasīt laikus</Button>
                    </div>
                    <div className="w-full flex flex-row items-center justify-center mt-4">
                        <ChevronLeft onClick={previousrange} className="cursor-pointer" />
                        <p>{today.getDate()}  {months[today.getMonth()]} - {rangeEnd.getDate()} {months[rangeEnd.getMonth()]}</p>
                        <ChevronRight onClick={nextrange} className="cursor-pointer" />
                    </div>
                    <div className="flex flex-row mt-4 w-full items-center justify-center">

                        {times.map(x=> <div key={x.date} className="flex flex-col w-[70px] bg-stone-400 h-[30px] mr-2 text-center mb-4">{weekdays[new Date(x.date).getUTCDay()]}<div className="" >{x.interval.map(y => <div key={y} className="bg-stone-800 text-white mt-2" onClick={()=>getDate(y)}>{moment(y).format("HH:mm")}</div>)}</div></div> )}

                    </div>
               
                </div>
            </section>
        </>
    )
}
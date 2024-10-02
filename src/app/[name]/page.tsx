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

export default function Specialistpage() {
    const [specialist, setSpecialist] = useState<User[]>([])
    const [availabletimes, setAvailabletimes] = useState()
    const [services, setservices] = useState<Service[]>([])
    const [selectedservice, setselectedservice] = useState("")
    const [today, setToday] = useState(new Date())
    const [rangeEnd, setRangened] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7))

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

    const gettimes = () => {
        axios.post('http://localhost:8000/api/getspecialiststimes', { userid: specialist[0].id, service: selectedservice })
            .then(response => console.log(response.data))
    }


    if (!specialist[0]) {
        return <Loading />
    }

    // let today = new Date()
    // let date = new Date()
    // const rangeEnd = new Date(date.getFullYear(),date.getMonth(),date.getDate()+7);
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

    let days = []
    for (let i = 0; i <= 7; i++) {
        days.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i))
    }

    console.log(days)
    return (
        <>
            <Nav />
            <section id="personpage" className="flex justify-center items-center flex-row">
                <div className="flex w-[35%] h-[70vh] p-5 flex-col justify-center items-center border-2 ">
                    <Avatar className="h-[150px] w-[150px]" >
                        <AvatarImage src={`http://localhost:8000/storage/${specialist[0].avatar}`} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="p-5 ">
                        <h4 className="font-bold text-xl">{specialist[0]?.name}</h4>
                        <p className="">{specialist[0].bio}</p>
                        <p className="text-stone-400 text-sm mt-2">{specialist[0].occupation}</p>
                        <div className="flex flex-row text-left">
                            <p className="text-stone-400 text-sm">{specialist[0].city},</p>
                            <p className="text-stone-400 text-sm">{specialist[0].adress}</p>
                        </div>
                    </div>
                </div>
                <div className="flex w-[40%] h-[70vh] p-5 flex-col justify-center items-center border-2 ">
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
                    <div className="flex flex-row">
                        {days.map(x => <div className="w-[50px] border-2 mr-2">{weekdays[x.getDay()]}</div>)}
                    </div>
                </div>
            </section>
        </>
    )
}
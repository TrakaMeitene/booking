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
import Cookies from "js-cookie";
import Eventform from "../admin/calendar/eventform";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
interface Times {
    date: Date
    interval: []
}

export default function Specialistpage() {
    const [specialist, setSpecialist] = useState<User[]>([])
    const [services, setservices] = useState<Service[]>([])
    const [selectedservice, setselectedservice] = useState("")
    const [today, setToday] = useState(new Date())
    const [rangeEnd, setRangened] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7))
    const [times, setTimes] = useState<Times[]>()
    const [user, setUser] = useState()
    const [eventFormOpen, setEventFormOpen] = useState(false)
    const [datetopass, setDatetopass] = useState(new Date())

    const pathname = usePathname()
    let decodedstring = decodeURIComponent(pathname)

    let token = Cookies.get('token')



    useEffect(() => {
        getdata()
        if (token) {
            getuser()
        }
    }, [token])

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

    const getuser = () => {
        let token = Cookies.get('token')

        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post('http://localhost:8000/api/user', {}, { headers })
            .then(response => {
                if (response.data.scope === "all") {
                    setUser(response.data)
                }
            })
            .catch(function (error) {
                // if (error.response.status == 401) {
                //   return router.push('/')
                // }
            })
    }

    const getDate = (y: Date) => {
        console.log(new Date(y))
        setDatetopass(new Date(y))
        setEventFormOpen(true)

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

    const close = () => {
        setEventFormOpen(false)
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
                    <div className="grid gap-2 hover:scale-1">
                        <Label htmlFor="service">Izvēlies pakalpojumu</Label>
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

                        {times?.map(x =>
                            <div key={x.date} className="flex flex-col w-[70px]  h-[30px] mr-2 text-center mb-4 font-bold">{weekdays[new Date(x.date).getUTCDay()]}
                                <div className="font-light text-sm">{new Date(x.date).getDate()}.{new Date(x.date).getMonth() + 1}</div>
                                <Dialog open={eventFormOpen} onOpenChange={(e) => setEventFormOpen(e)} >
                                    <DialogContent className="sm:max-w-[425px] sm:text-center ">
                                        <DialogHeader>
                                            <DialogTitle className="sm:text-center">Jauns pieraksts</DialogTitle>

                                        </DialogHeader>
                                        {user ? <Eventform getdata={getuser} close={close} dateFrompage={datetopass}  user={user} service={selectedservice} allservices={services} specialist={specialist}/> : <div className="flex flex-col"><p>Lai veiktu pierakstu, ielogojies sistēmā!</p><Link href="/login/signin?type=all"><Button className="mt-4">IELOGOTIES</Button></Link></div>}

                                    </DialogContent>

                                    <DialogTrigger asChild >


                                        <div className="" >{x.interval.map(y => <button key={y} className="border-solid border-black border mt-2 p-1.5 rounded-md	w-[70px] hover:bg-stone-400 font-normal" onClick={() => getDate(y)}>{moment(y).format("HH:mm")}</button>)}
                                        </div>
                                    </DialogTrigger>
                                </Dialog>
                            </div>)}

                    </div>

                </div>
            </section>
        </>
    )
}
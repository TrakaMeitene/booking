'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { User } from "../../../admin/calendar/page";
import { Service } from "../../../admin/services/page";
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
import Eventform from "../../../admin/calendar/eventform";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import { toast } from "sonner";
import Custom404 from "@/app/not-found";
import { Message } from "postcss";
import { useRouter } from "next/navigation";
interface Times {
    date: Date
    interval: [],
    isDayVacation: boolean,
    isDayFree: boolean
}



export default function Specialistpage() {
    const [specialist, setSpecialist] = useState<User[]>([])
    const [services, setservices] = useState<Service[]>([])
    const [selectedservice, setselectedservice] = useState<string>("")
    const [today, setToday] = useState<Date>(new Date())
    const [rangeEnd, setRangened] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7))
    const [times, setTimes] = useState<Times[]>()
    const [user, setUser] = useState<User>()
    const [eventFormOpen, setEventFormOpen] = useState<boolean>(false)
    const [datetopass, setDatetopass] = useState<Date>(new Date())
    const [windowWidth, setWindowWidth] = useState<number>(0)
const router = useRouter()
    const pathname = usePathname()
    let decodedstring = decodeURIComponent(pathname)
    let token = Cookies.get('token')
let id = pathname.slice(12, 13)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        getdata()
        if (token) {
            getuser()
        }

    }, [token])

    const getdata = () => {
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getspecialistbyid`, { id: id })
            .then(response => setSpecialist(response.data))

    }

    let length = windowWidth > 390 ? 7 : 3

    useEffect(() => {

        setRangened(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + length))
        getservices()
    }, [specialist[0]])

    const getservices = () => {
        if (specialist.length > 0) {
            axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getservicesforspecialist`, { id: specialist[0]?.id })
                .then(response => setservices(response.data))
        }
    }

    let days = []
    for (let i = 0; i <= length; i++) {
        days.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i))
    }


    const gettimes = () => {
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getspecialiststimes`, { userid: specialist[0].id, service: selectedservice, range: days })
            .then(response => setTimes(response.data))
    }

    const getuser = () => {
        let token = Cookies.get('token')

        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/user`, {}, { headers })
            .then(response => {
                if (response.data.scope === "all") {
                    setUser(response.data)
                }
            })

    }

    const getDate = (y: Date) => {
        setDatetopass(new Date(y))
        setEventFormOpen(true)

    }

    if (!specialist[0]) {
        return <Custom404/>
    }

    const months = ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"]
    const weekdays = ["P.", "O.", "T.", "C.", "Pk.", "S.", "Sv."]



    const nextrange = () => {
        setToday(new Date(today.getFullYear(), today.getMonth(), today.getDate() + length))
        setRangened(new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate() + length))
        if(selectedservice) gettimes()
    }

    const previousrange = () => {
        setToday(new Date(today.getFullYear(), today.getMonth(), today.getDate() - length))
        setRangened(new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate() - length))
        if(selectedservice) gettimes()
        }

    const close = () => {
        setEventFormOpen(false)
    }

    const getmessage = (message: Message) => {
        if(message.type === "success") { toast.success(message.message)} else {toast.error(message.message)}
    }

const isToday = moment(today).format("DD,MM,YYYY") === moment(new Date()).format("DD,MM,YYYY")

return (
        <>
            <section id="personpage" className="flex justify-center items-center flex-col ">
                
                <div className="flex w-[80%]  p-5 flex-col items-center justify-center max-[390px]:flex-col max-[390px]:w-[90%] z-[2]">
                    <Avatar className="h-[150px] w-[150px] mr-4" >
                        <AvatarImage src={`${process.env.NEXT_PUBLIC_REQUEST_STORAGE}/${specialist[0].avatar}`} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div >
                        <h4 className="font-bold text-xl text-center">{specialist[0]?.name}</h4>
                        <div style={{ height: "auto", backgroundColor: "hsl(32, 25%, 99%)", padding: "10px",  borderRadius: "10px",  marginTop: "20px", border: "1px solid hsl(33, 27%, 92%)"}}>

                        <p className="max-[390px]:text-sm">{specialist[0].bio}</p>
                        <p className="text-stone-400 text-sm mt-2 text-left">{specialist[0].occupation}</p>
                        <div className="flex flex-row text-left">
                            <p className="text-stone-400 text-sm">{specialist[0].city},</p>
                            <p className="text-stone-400 text-sm">{specialist[0].adress}</p>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-[80%] h-full p-5 flex-col  items-center  ">
                    <div className="grid gap-2 ">
                        <Label htmlFor="service">Izvēlies pakalpojumu</Label>
                        <Select value={selectedservice} onValueChange={(value) => {
                            setselectedservice(value)
                        }} >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Izvēlies pakalpojumu" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>

                                    {services.map(x => <SelectItem key={x.id} value={x.id.toString()}><div className="flex justify-between w-[300px]"><div>{x.name}</div> <div>{(Number(x.price)/100).toFixed(2)} Eur / {(x.time/60).toFixed(2) } St.</div></div></SelectItem>)}

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={gettimes} disabled={!selectedservice}>Atlasīt laikus</Button>
                    </div>
                    <div style={{ height: "auto", backgroundColor: "hsl(32, 25%, 99%)", padding: "10px",  borderRadius: "10px",  marginTop: "20px", border: "1px solid hsl(33, 27%, 92%)"}}>
                    <div className="w-full flex flex-row items-start justify-center mt-4">
                        <ChevronLeft onClick={!isToday ? previousrange : ()=>{}} className="cursor-pointer " color={isToday ? "grey" : "black"}/>
                        <p className="max-[390px]:text-sm">{today.getDate()}  {months[today.getMonth()]} - {rangeEnd.getDate()} {months[rangeEnd.getMonth()]}</p>
                        <ChevronRight onClick={nextrange} className="cursor-pointer" />
                    </div>
                    <div className="max-[390px]:w-[90%] flex max-[390px]:items-start  items-start">
                        <div className="flex flex-row mt-4 w-full items-start justify-center max-[390px]:items-left">

                            { times?.map((x, index) =>
                                <div key={index} className={`flex flex-col w-[70px]  mr-2 text-center mb-4 font-bold ${x.isDayFree || x.isDayVacation ? "" : "text-zinc-300 z-index-[-2] hover:bg-white"}`}>{weekdays[new Date(x.date).getUTCDay()]}
                                   {x.interval && <div className="font-light text-sm">{new Date(x.date).getDate()}.{new Date(x.date).getMonth() + 1}</div> }
                                    <Dialog open={eventFormOpen}
                                        onOpenChange={(e) => setEventFormOpen(e)}
                                    >
                                        <DialogContent className="sm:max-w-[425px] sm:text-center " aria-label="Jauna vizīte" aria-describedby={undefined}>
                                            <DialogHeader>
                                                <DialogTitle className="sm:text-center">Jauns pieraksts</DialogTitle>

                                            </DialogHeader>
                                            {user ?
                                                <Eventform getdata={getuser} close={close} dateFrompage={datetopass} user={user} service={selectedservice} allservices={services} specialist={specialist} getmessage={getmessage} open={false} setOpenaddbooking={(arg)=>false}/>
                                                : <div className="flex flex-col"><p>Lai veiktu pierakstu, ielogojies sistēmā!</p><Link href="/login/signin?type=all"><Button className="mt-4">IELOGOTIES</Button></Link></div>}

                                        </DialogContent>

                                        <DialogTrigger asChild >


                                            {x.interval ? <div className="" >{x.interval?.map(y => <button key={y} className="border-solid border-black border mt-2 p-1.5 rounded-md	w-[70px] hover:bg-stone-400 font-normal" onClick={() => getDate(y)} disabled={!x.isDayFree}>{moment(y).format("HH:mm")}</button>)} 
                                            </div> : <h1>Pieraksts aizvērts!</h1>}
                                        </DialogTrigger>
                                    </Dialog>
                                </div>) }

                        </div>
                    </div>
                    </div>

                </div>

            </section>
        </>
    )
}


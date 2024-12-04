'use client'
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from 'moment';
import 'moment/locale/lv'
import { TimePickerInput } from "@/components/ui/time-picker-input";
import { useForm, SubmitHandler } from "react-hook-form"

import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { Message } from "../profile/page";

interface prop {
    getdata: () => void,
    dateFrompage: Date | undefined,
    user?: any | undefined,
    service: string | undefined,
    allservices: any,
    specialist: any,
    getmessage: (message: Message) => void,
    open: boolean,
    setOpenaddbooking: (arg: boolean)=>void
    close: ()=>void
}
export default function Eventform(propsIn: prop) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [services, setservices] = useState([])
    const [selectedservice, setSelectedservices] = useState<string>()
    const router = useRouter()

    useEffect(() => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };


        if (propsIn.dateFrompage) {
            setDate(propsIn.dateFrompage)
        }

        if (propsIn.allservices) {
            setservices(propsIn.allservices)
        } else {
            axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getservices`, {}, { headers })
                .then(response => {
                    setservices(response.data.data)
                })
                .catch(function (error) {
                    if (error.response.status == 401) {
                        return router.push('/login')
                    }
                })
        }

        if (propsIn.service) {
            setSelectedservices(propsIn.service)
        }
    }, [])

    type Inputs = {
        name: string,
        phone: string,
        email: string,
        description: string,
        bank: string,
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const itemtosave = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            date: date,
            service: selectedservice,
            description: data.description,
            user: propsIn.user ? propsIn.user : 0,
            booking: 0,
            specialist: 0
        }
        if (propsIn.specialist) {
            itemtosave.specialist = propsIn.specialist[0].id
        }
      
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/savebooking`, itemtosave, { headers })

            .then(response => {
                if (typeof response.data === "string") {
                    const newMessage: Message = {
                        message: response.data,
                        type: "error"
                      };
                   propsIn.getmessage(newMessage)
                } else {
                    const newMessage: Message = {
                        message: "Dati saglabāti veiksmīgi",
                        type: "success"
                      };
                   propsIn.getmessage(newMessage)
                    itemtosave.booking = response.data.id
                  //  makeinvoice(itemtosave)
                   if(propsIn.close){ propsIn.close()}else {propsIn.setOpenaddbooking(false)}
                    
                    propsIn.getdata()
                }
            })
            .catch(function (error) {
                if (error?.response?.status == 401) {
                    return router.push('/login')
                }
            })
    }

    const makeinvoice = (itemtosave: any) => {
        let token = Cookies.get('token')

        const headers = { 'Authorization': 'Bearer ' + token, responseType: 'blob' };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/makeinvoice`, itemtosave, { headers })

            .then(response => {
               if(response.data != ""){
                propsIn.getmessage({message: "Rēķins izsūtīts!", type: "success"})
               }
            }
            )
    }

const changedate=(e:Date)=>{
    if(date){
    const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
    
    const updatedDate = new Date(
        e.getFullYear(),
        e.getMonth(),
       e.getDate(),
        hours,
        minutes,
        seconds
      );
      setDate(updatedDate)
    }
}

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <><div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Klienta vārds *
                    </Label>
                    <Input id="name" className={`col-span-3 ${errors.name ? "error" : ""}`} defaultValue={propsIn.user?.name ? propsIn.user?.name : ""}  readOnly={propsIn.user?.name ? true: false}
                        {...register("name", { required: "This is required." })} />

                </div>
                {errors.name  && <div className="relative ml-28"><p></p><p className="text-xs">Lūdzu aizpildiet šo lauku</p></div>}

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Telefona nr. *
                    </Label>
                    <Input id="phone" type="phone" className={`col-span-3 ${errors.name ? "error" : ""}`}  {...register("phone", { required: "This is required." })} defaultValue={propsIn.user?.phone} readOnly={propsIn.user?.phone ? true: false}/>
                </div>
                {errors.phone && <div className="relative ml-28"><p></p><p className="text-xs">Lūdzu aizpildiet šo lauku</p></div>}

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        E-pasts *
                    </Label>
                    <Input id="email" type="email" className={`col-span-3 ${errors.name ? "error" : ""}`} {...register("email", { required: "This is required." })} defaultValue={propsIn.user?.email} readOnly={propsIn.user?.email ? true: false}/>
                </div>
                {errors.email && <div className="relative ml-28"><p></p><p className="text-xs">Lūdzu aizpildiet šo lauku</p></div>}

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                        Datums *
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"

                                )}
                                readOnly= {propsIn.dateFrompage ? true : false}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? moment(date).format('dddd, Do MMMM YYYY') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={changedate}
                                initialFocus
                                fromDate={new Date()}
                            />
                        </PopoverContent>
                    </Popover>

                </div>
                <div className="flex items-center ">
                    <Label htmlFor="username" className="text-center mr-5 ml-10">
                        Sākuma laiks *
                    </Label>
                    <div className="grid gap-1 col-auto">
                        <Label htmlFor="hours" className="text-xs mr-5">
                            Stundas
                        </Label>
                        <TimePickerInput
                            picker="hours"
                            date={date}
                            setDate={setDate}
                            readOnly={propsIn.dateFrompage ? true : false}
                        />
                    </div>
                    <div className="grid gap-1 ">
                        <Label htmlFor="minutes" className="text-xs mr-5">
                            Minūtes
                        </Label>
                        <TimePickerInput
                            picker="minutes"
                            date={date}
                            setDate={setDate}
                            readOnly={propsIn.dateFrompage ? true : false}

                        />
                    </div>
                </div>
                <div className="flex items-center ">
                    <Label htmlFor="minutes" className="text-xs mr-4 ml-5">Pakalpojums *</Label>


                    <Select value={selectedservice} onValueChange={(value) => {
                        if (propsIn.service) { setSelectedservices(propsIn.service) } else {
                            setSelectedservices(value)
                        }
                    }} readOnly={propsIn?.service ? true : false} required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Izvēlies pakalpojumu" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {services?.map((x:any)=> <SelectItem key={x.id} value={x.id.toString()}>{x.name}</SelectItem>)}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center ">
                    <Label htmlFor="minutes" className="text-xs mr-4 ml-5">
                        Komentārs
                    </Label>
                    <Textarea  {...register("description")} />


                </div>
            </div>
{!selectedservice  && <div className="flex flex-col"><p className="text-xs">Jums nav pakalpojumu, izveidojiet tos spiežot uz saites</p><Link href="/admin/services" className="text-xs underline">šeit</Link></div>}
                    <Button type="submit" disabled={!selectedservice ? true: false} >Saglabāt</Button>
            </>
        </form>

    )
}
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
import {
    DialogTrigger,
} from "@/components/ui/dialog"
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

interface prop {
    getdata: () => void,
    dateFrompage: Date | undefined,
    user?: any | undefined,
    service: string | undefined,
    allservices: any,
    specialist: any,
    getmessage: ({message}: {message: string|undefined}) => void,
}
export default function Eventform(propsIn: prop) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [services, setservices] = useState([])
    const [selectedservice, setSelectedservices] = useState<string>("")
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
                    setservices(response.data)
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
                    propsIn.getmessage({message: response.data})
                } else {
                    propsIn.getmessage({message: "Dati saglabāti veiksmīgi"})
                    itemtosave.booking = response.data.id
                    makeinvoice(itemtosave)
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
                propsIn.getmessage({message: "Rēķins izsūtīts!"})
               }
            }
            )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <><div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Klienta vārds
                    </Label>
                    <Input id="name" className="col-span-3" defaultValue={propsIn.user?.name}
                        {...register("name")} />

                </div>
      
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Telefona nr.
                    </Label>
                    <Input id="phone" type="phone" className="col-span-3"  {...register("phone")} defaultValue={propsIn.user?.phone} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        E-pasts
                    </Label>
                    <Input id="email" type="email" className="col-span-3"  {...register("email")} defaultValue={propsIn.user?.email} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                        Datums
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"

                                )}
                                disabled={propsIn.dateFrompage ? true : false}
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

                </div>
                <div className="flex items-center ">
                    <Label htmlFor="username" className="text-center mr-5 ml-10">
                        Laiks
                    </Label>
                    <div className="grid gap-1 col-auto">
                        <Label htmlFor="hours" className="text-xs mr-5">
                            Stundas
                        </Label>
                        <TimePickerInput
                            picker="hours"
                            date={date}
                            setDate={setDate}
                            disabled={propsIn.dateFrompage ? true : false}
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
                            disabled={propsIn.dateFrompage ? true : false}

                        />
                    </div>
                </div>
                <div className="flex items-center ">
                    <Label htmlFor="minutes" className="text-xs mr-4 ml-5">Pakalpojums</Label>
                    <Select value={selectedservice} onValueChange={(value) => {
                        if (propsIn.service) { setSelectedservices(propsIn.service) } else {
                            setSelectedservices(value)
                        }
                    }} disabled={propsIn.service ? true : false} >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Izvēlies nodarbošanos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {services?.data?.map((x:any)=> <SelectItem key={x.id} value={x.id.toString()}>{x.name}</SelectItem>)}

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

                <DialogTrigger asChild>
                    <Button type="submit" >Saglabāt</Button>
                </DialogTrigger>
            </>
        </form>

    )
}
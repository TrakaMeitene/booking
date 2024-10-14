'use client'
import React, { useActionState, useEffect, useState } from "react";
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from 'next/navigation'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import Alertcomp from "../partscomponents/alert";
import { spec } from "node:test/reporters";

export default function Eventform({ close, getdata, dateFrompage, user, service, allservices, specialist }) {

    const [date, setDate] = useState<any>(new Date())
    const [services, setservices] = useState([])
    const [selectedservice, setSelectedservices] = useState("")
    const [message, setMessage] = useState(undefined)
    const router = useRouter()

    useEffect(() => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };


        if (dateFrompage) {
            setDate(dateFrompage)
        }

        if (allservices) {
            setservices(allservices)
        } else {
            axios.get('http://localhost:8000/api/getservices', { headers })
                .then(response => {
                    setservices(response.data)
                })
                .catch(function (error) {
                    if (error.response.status == 401) {
                        return router.push('/login')
                    }
                })
        }

        if (service) {
            setSelectedservices(service)
        }
    }, [])

    type Inputs = {
        title: string,
        phone: string,
        email: string,
        description: string,
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
console.log(specialist)
        const itemtosave = {
            title: data.title,
            email: data.email,
            phone: data.phone,
            date: date,
            service: selectedservice,
            description: data.description,
        }
        if (specialist) {
            itemtosave.specialist = specialist[0].id
        }

        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post('http://localhost:8000/api/savebooking', itemtosave, { headers })
            .then(response => {
                if (typeof response.data === "string") {
                    setMessage({ message: response.data, type: "error" })
                } else {
                    console.log(response.data)
                    setMessage({ message: "Dati saglabāti veiksmīgi", type: "success" })
                    close()
                    getdata()
                }
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }
    console.log(selectedservice, services)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {message && <Alertcomp success={message} />}
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Klients
                    </Label>
                    <Input id="name" className="col-span-3" defaultValue={user?.name}
                        {...register("title")} />

                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Telefona nr.
                    </Label>
                    <Input id="phone" type="phone" className="col-span-3"  {...register("phone")} defaultValue={user?.phone} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        E-pasts
                    </Label>
                    <Input id="email" type="email" className="col-span-3"  {...register("email")} defaultValue={user?.email} />
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
                                disabled={dateFrompage}
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
                            disabled={dateFrompage}
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
                            disabled={dateFrompage}

                        />
                    </div>
                </div>
                <div className="flex items-center ">
                    <Label htmlFor="minutes" className="text-xs mr-4 ml-5">Pakalpojums</Label>
                    <Select value={selectedservice} onValueChange={(value) => {
                        if (service) { setSelectedservices(service) } else {
                            setSelectedservices(value)
                        }
                    }} disabled={service} >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Izvēlies nodarbošanos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {services.map(x => <SelectItem key={x.id} value={x.id.toString()}>{x.name}</SelectItem>)}

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
        </form>

    )
}
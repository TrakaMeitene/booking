'use client'
import React, { useEffect, useState } from "react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm, SubmitHandler } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TimePickerInput } from "@/components/ui/time-picker-input";
import axios from "axios"
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";
import { Service } from "./page";
import { serviceObject } from "../calendar/bookingdetails";

interface propsin {
    getmessage: ({ message, type}: { message: string | undefined; type: string}) => void,
    setOpen: (arg: boolean) => void,
    selectedservice: serviceObject | undefined
}

export default function Newcservice(propsIn: propsin) {
    const [date, setDate] = useState<Date>(new Date())
    const router = useRouter()

    let hours = date.getHours()
let minutes = date.getMinutes()
let seconds = 0

if(propsIn?.selectedservice?.time){
     hours = Math.trunc(propsIn.selectedservice.time /60)
    minutes = propsIn.selectedservice.time -(60* hours)
}

useEffect(()=>{
    const updatedDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        hours,
        minutes,
    seconds
      )
      setDate(updatedDate)
},[])


    type Inputs = {
        name: string,
        price: number,
        time: number,
        description: string,
        id: number
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    const saveservice: SubmitHandler<Inputs> = (data) => {
        data.time = date.getHours() * 60 + date.getMinutes()
       if(propsIn.selectedservice){ data.id = propsIn.selectedservice?.id}
        let token = Cookies.get('token')
        data.price = data.price * 100
        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/addservice`, data, { headers })
            .then(response => {
                propsIn.getmessage({ message: "Dati saglabāti veiksmīgi!", type: "success"})
                propsIn.setOpen(false)
                reset({})
            })
            .catch(function (error) {
                if (error.response?.status == 401) {
                    return router.push('/login')
                }
            })

    }

    return (
        <>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader><DialogTitle>{propsIn.selectedservice ? "Labot pakalpojumu" : "Jauns pakalpojums"}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit(saveservice)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nosaukums *
                            </Label>
                            <Input id="name" className={`col-span-3 ${errors.name ? "error" : ""}`}
                                defaultValue={propsIn?.selectedservice ? propsIn.selectedservice?.name : ""}
                                {...register("name", { required: "This is required." })} />

                        </div>
                        {errors.name && <div className="relative ml-28"><p></p><p className="text-xs">Lūdzu aizpildiet šo lauku</p></div>}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Cena *
                            </Label>
                            <Input id="price" type="number" className={`col-span-3 ${errors.name ? "error" : ""}`} step=".01" placeholder="0.00"
                                defaultValue={propsIn?.selectedservice ? (propsIn.selectedservice?.price /100).toFixed(2) : ""}

                                {...register("price", { required: "This is required." })} />

                        </div>
                        {errors.price && <div className="relative ml-28"><p></p><p className="text-xs">Lūdzu aizpildiet šo lauku</p></div>}

                        <div className="flex flex-row items-center ml-16">
                            <Label htmlFor="phone" className="text-right mr-4 ">
                                Ilgums *
                            </Label>
                            <div className="grid gap-1 col-auto">
                                <Label htmlFor="hours" className="text-xs mr-5">
                                    Stundas
                                </Label>
                                <TimePickerInput
                                    picker="hours"
                                    date={date}
                                    setDate={setDate}
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="minutes" className="text-xs mr-5">
                                    Minūtes
                                </Label>
                                <TimePickerInput
                                    picker="minutes"
                                    date={date}
                                    setDate={setDate}

                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Apraksts
                            </Label>

                            <Textarea className="col-span-3" 
                            defaultValue={propsIn?.selectedservice  ? propsIn.selectedservice?.description : ""}
                                {...register("description")} />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" >Saglabāt</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </>

    )
}
'use client'
import React, { useState } from "react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm, SubmitHandler } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { TimePickerInput } from "@/components/ui/time-picker-input";
import axios from "axios"
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";
import { toast } from "sonner";
import moment from "moment";

export default function Newcservice({getmessage}) {
    const [date, setDate] = useState<any>()
    const router = useRouter()

    type Inputs = {
        name: string,
        price: number,
        time: Date,
        description: string,
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const saveservice: SubmitHandler<Inputs> = (data) => {   
       {data.time ? data.time = date.getHours() * 60 + date.getMinutes() : data.time = 0  }
        let token = Cookies.get('token')
        data.price = data.price * 100
        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post('http://localhost:8000/api/addservice', data, { headers })
            .then(response => {
                console.log(response)
                getmessage("Dati saglabāti veiksmīgi!")

            })
            .catch(function (error) {
                if (error.response?.status == 401) {
                    return router.push('/login')
                }
            })

    }

    return (
        <>
            <DialogContent >
                <DialogHeader><DialogTitle>Jauns pakalpojums</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit(saveservice)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nosaukums
                            </Label>
                            <Input id="name" className="col-span-3"
                                {...register("name")} />

                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="surname" className="text-right">
                                Cena
                            </Label>
                            <Input id="price" type="number" className="col-span-3" step=".01" placeholder="0.00"
                                {...register("price")} />

                        </div>
                        <div className="flex flex-row items-center ml-16">
                            <Label htmlFor="phone" className="text-right mr-4 ">
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
                            <Textarea className="col-span-3"  {...register("description")} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogTrigger asChild>
                            <Button type="submit" >Saglabāt</Button>
                        </DialogTrigger>
                    </DialogFooter>
                </form>

            </DialogContent>
        </>

    )
}
'use client'
import React, { useState } from "react";
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

export default function Eventform({ dateexiting }: any) {

    const [date, setDate] = useState<any>(new Date(dateexiting))

    type Inputs = {
        client: string,
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
        const itemtosave = {
            client: data.client,
            email: data.email,
            phone: data.phone,
            date: date,
            description: data.description
        }
        console.log(itemtosave)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Klients
                    </Label>
                    <Input id="name" className="col-span-3"
                        {...register("client")} />

                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Telefona nr.
                    </Label>
                    <Input id="phone" type="phone" className="col-span-3"  {...register("phone")} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        E-pasts
                    </Label>
                    <Input id="email" type="email" className="col-span-3"  {...register("email")} />
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

                        />
                    </div>
                  
                </div>
                <div className="flex items-center ">
                    <Label htmlFor="minutes" className="text-xs mr-4 ml-5">
                            Komentārs
                        </Label>
                    <Textarea  {...register("description")}/>

                        
                    </div>
            </div>
            <DialogTrigger asChild>
                    <Button type="submit" >Saglabāt</Button>
            </DialogTrigger>
        </form>

    )
}
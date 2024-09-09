'use client'
import React from "react";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { useForm, SubmitHandler } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function Newclient(){

    type Inputs = {
        name: string,
        surname: string,
        phone: string,
        email: string,
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const saveclient: SubmitHandler<Inputs> = (data)=>{
console.log(data)
    }

    return(
        <>
        <DialogContent >
            <DialogHeader><DialogTitle>Jauns klients</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(saveclient)}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Vārds
                    </Label>
                    <Input id="name" className="col-span-3"
                        {...register("name")} />

                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="surname" className="text-right">
                        Uzvārds
                    </Label>
                    <Input id="surname" className="col-span-3"
                        {...register("surname")} />

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
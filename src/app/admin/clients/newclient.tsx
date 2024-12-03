'use client'
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm, SubmitHandler } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import axios from "axios";
import { Client } from "./page";

interface propsin {
    getmessage: (message: string) => void,
    client: Client | undefined,
    open: boolean,
    setOpen: (arg: boolean)=>void
}

export default function Newclient(propsin: propsin) {
    type Inputs = {
        id: number,
        name: string,
        phone: string,
        email: string,
    }

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        setError
    } = useForm<Inputs>()


    const saveclient: SubmitHandler<Inputs> = (data) => {

        if (propsin.client) {
            data.id = propsin.client.id
        }
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/saveclient`, data, { headers })
            .then(response => {
                if (response.statusText == "OK") {
                    propsin.getmessage("Dati saglabāti veiksmīgi")
                    propsin.setOpen(false);
                }
            })

    }

    return (
        <>
        <Dialog open={propsin.open}  onOpenChange={propsin.setOpen}>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader><DialogTitle>{propsin.client ? "Labot klienta datus" : "Jauns klients"}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit(saveclient)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Vārds un uzvārds *
                            </Label>
                            <Input id="name" className={`col-span-3 ${errors.name ? "error" : ""}`}
                                defaultValue={propsin?.client ? propsin.client.name : ""}
                                {...register("name" , { required: "This is required." })} />

                        </div>
                        {errors.name && <div className="relative ml-28"><p></p><p className="text-xs">Lūdzu aizpildiet šo lauku</p></div>}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Telefona nr. *
                            </Label>
                            <Input id="phone" type="phone" className={`col-span-3 ${errors.phone ? "error" : ""}`}
                                defaultValue={propsin?.client ? propsin.client.phone : ""}
                                {...register("phone", { required: "This is required." })} />
                        </div>
                        {errors.phone && <div className="relative ml-28"><p></p><p className="text-xs">Lūdzu aizpildiet šo lauku</p></div>}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                E-pasts *
                            </Label>
                            <Input id="email" type="email" className={`col-span-3 ${errors.email ? "error" : ""}`}
                                defaultValue={propsin?.client ? propsin.client.email : ""}
                                {...register("email", { required: "This is required." })} />
                        </div>
                        {errors.email && <div className="relative ml-28"><p></p><p className="text-xs">Lūdzu aizpildiet šo lauku</p></div>}

                    </div>
                    <DialogFooter>
                        <Button type="submit" >Saglabāt</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
            </Dialog>
        </>

    )
}
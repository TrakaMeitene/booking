import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CircleX, SmilePlus, Send } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Booking, User } from "./page";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form"
import moment from "moment";
import axios from "axios"
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { toast } from "sonner";

export interface serviceObject {
    created_at: Date,
    description: String,
    id: number,
    name: string,
    price: number,
    time: number,
    updated_at: Date,
    user: number
}

export default function Bookingdetails({ data }: { data: Booking | undefined }) {
    type Inputs = {
        itemid: number | undefined;
        cancelreason: string,
    }



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const router = useRouter()
    const [service, setservice] = useState<serviceObject>()
    const [user, setUser] = useState<User>()

    let token = Cookies.get('token')

    useEffect(() => {
        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getservicebyid`, data, { headers })
            .then(response => setservice(response.data))
            .then(resp => getuser())
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }, [data])

    const getuser = () => {

        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/user`, {}, { headers })
            .then(response => setUser(response.data))
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    const save: SubmitHandler<Inputs> = (cancellation) => {
        const headers = { 'Authorization': 'Bearer ' + token };

        cancellation.itemid = data?.id
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/cancelbooking`, cancellation, { headers })
            .then(response => {
                if (response.statusText == "OK") {
                    toast.success('Dati saglabāti veiksmīgi!')
                } else {
                    toast.error('Kaut kas nogāja greizi!')
                }
            }
            )
    }

    const clientvisited = () => {
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/clientvisited`, { data }, { headers })
            .then(response => {
                response.data.type == 'error' ? toast.error(response.data.message) : toast.success(response.data.message)
            })
    }

    return (
        <DialogContent className="max-w-[450px] flex items-center justify-center flex-col ">
            <DialogHeader className="text-center sm:text-center">
                <DialogTitle>Pieraksta detaļas</DialogTitle>
                <DialogDescription>{moment(data?.date).format('HH:mm  dddd, Do MMMM YYYY')}</DialogDescription>
            </DialogHeader>
            <h1>{data?.title}</h1>
            <p>{service?.name}</p>
            <p className="text-xs">{data?.description}</p>
            <div className="flex flex-row w-full place-content-evenly">
                <Dialog>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle>Atcelšanas iemesls</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(save)}>
                            <Textarea className="mb-4 " {...register('cancelreason')} />
                            <DialogTrigger asChild>
                                <Button type="submit">Saglabāt</Button>
                            </DialogTrigger>
                        </form>
                    </DialogContent>
                    <DialogTrigger asChild>
                        <Button variant="destructive" color="green"><CircleX size={20} className="mr-2" />Atcelt</Button>
                    </DialogTrigger>
                </Dialog>
                <Button onClick={clientvisited} ><SmilePlus size={20} className="mr-2" />Ieradies</Button>
                <Button variant="outline"><Send size={20} className="mr-2" /><a href={`sms:${user?.phone}`}>Sazināties</a></Button>
            </div>
        </DialogContent>
    )

}
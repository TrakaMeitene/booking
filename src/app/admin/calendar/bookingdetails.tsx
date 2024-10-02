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
import { Booking } from "./page";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form"
import moment from "moment";
import axios from "axios"
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

export default function Bookingdetails({ data }: { data: Booking | undefined }) {
    type Inputs = {
        cancelreason: string,
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const router = useRouter()
    const [service, setservice] = useState({})
    const [user, setUser] = useState()

    let token = Cookies.get('token')

    useEffect(() => {
        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post('http://localhost:8000/api/getservicebyid', data, { headers })
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
        axios.post('http://localhost:8000/api/user', {}, { headers })
          .then(response => setUser(response.data))
        .catch (function (error) {
        if (error.response.status == 401) {
          return router.push('/login')
        }
      })
    }

    const save: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }

    return (
        <DialogContent className="max-w-[450px] flex items-center justify-center flex-col ">
            <DialogHeader className="text-center sm:text-center">
                <DialogTitle>Pieraksta detaļas</DialogTitle>
                <DialogDescription>{moment(data?.date).format('HH:MM  dddd, Do MMMM YYYY')}</DialogDescription>
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
                <Button ><SmilePlus size={20} className="mr-2" />Ieradies</Button>
                <Button variant="outline"><Send size={20} className="mr-2" /><a href={`sms:${user?.phone}`}>Sazināties</a></Button>
            </div>
        </DialogContent>
    )

}
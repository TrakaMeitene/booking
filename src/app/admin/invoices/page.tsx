'use client'
import InvoiceTable from "@/app/profile/invoicetable";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Newinvoice from "./newinvoice";
import { useRouter } from 'next/navigation'
import { User } from "../partscomponents/header";

interface incomedata {

    expenses: number,
    thismonth: number,
    thismonthexpenses: number,
    total: number,
    unpaid: number
}

export default function Invoices() {
    const [data, setData] = useState<incomedata>()
    const [formopen, setOpen] = useState<boolean>(false)
    const [type, setType] = useState<string>()
    const router = useRouter()
    const [user, setUser] = useState<User>()

    useEffect(() => {
        getdata()
        getuser()
    }, [])

    const getuser = () => {
        let token = Cookies.get('token')

        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/user`, {}, { headers })
            .then(response => {
                if (response.data.scope === "business") {
                    setUser(response.data)
                }
                if (response.data.abonament === "bezmaksas") {
                    return router.push('/admin/update')
                }
            })

    }
    const getdata = () => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getsumm`, {}, { headers })
            .then(response => {
                setData(response.data[0])
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    const closeform = () => {
        setOpen(false)
    }

    return (
        <main id="invoices" className="bg-white">
            <h1 className="text-3xl w-full border-b-2">Rēķini</h1>
            <div className="flex flex-col">
                <div className="flex flex-row w-full space-x-3.5 mt-2">
                    <Card className="">
                        <CardHeader>

                            <CardTitle className="text-4xl">{data?.total.toFixed(2)} Eur</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Kopējie ieņēmumi</p>
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader>

                            <CardTitle className="text-4xl text-red-500">{data?.unpaid.toFixed(2)} Eur</CardTitle>

                        </CardHeader>
                        <CardContent>
                            <p className="text-red-500">Neapmaksāto rēķinu summa</p>

                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader>

                            <CardTitle className="text-4xl">{data?.thismonth.toFixed(2)} Eur</CardTitle>

                        </CardHeader>
                        <CardContent>
                            <p >Šī mēneša rēķinu summa</p>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl">{data?.expenses.toFixed(2)} Eur</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p >Kopējās izmaksas</p>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl">{data?.thismonthexpenses.toFixed(2)}  Eur</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p >Šī mēneša izmaksas</p>

                        </CardContent>
                    </Card>
                </div>
                <Dialog open={formopen} onOpenChange={(e) => setOpen(e)}>
                    <div className="flex flex-row ">
                        <DialogTrigger asChild>
                            <Button className="w-[150px] mt-2 mr-2" onClick={() => setType("ieņēmums")}>Jauns ieņēmums</Button>
                        </DialogTrigger>
                        <DialogTrigger asChild >
                            <Button className="w-[150px] mt-2" onClick={() => setType("izdevums")}>Jauns izdevums</Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="sm:max-w-[425px]" aria-label="juans izdeums/ieņēmums" aria-describedby={undefined}>
                        <DialogHeader>
                            <DialogTitle>{type === "ieņēmums" ? "Pievienot jaunu ieņēmumu" : "Pievienot jaunu izdevumu"}</DialogTitle>

                        </DialogHeader>
                        <Newinvoice close={closeform} />

                    </DialogContent>
                </Dialog>
                <InvoiceTable scope="business" />

            </div>
        </main>
    )
}
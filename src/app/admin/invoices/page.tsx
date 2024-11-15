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

export default function Invoices() {
    const [data, setData] = useState({ tota: 0, unpaid: 0 })
    const [formopen, setOpen] = useState(false)

    useEffect(() => {
        getdata()
    }, [])

    const getdata = () => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`http://localhost:8000/api/getsumm`, {}, { headers })
            .then(response => {
                setData(response.data)
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                    //return router.push('/login')
                }
            })
    }

    const closeform = () => {
        setOpen(false)
    }

    return (
        <main >
            <h1 className="text-3xl w-full border-b-2">Rēķini</h1>
            <div className="flex flex-col">
                <div className="flex flex-row w-full space-x-3.5 mt-2">
                    <Card className="">
                        <CardHeader>

                            <CardTitle className="text-4xl">{data[0]?.total.toFixed(2)} Eur</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Kopējie ieņēmumi</p>
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader>

                            <CardTitle className="text-4xl text-red-500">{data[0]?.unpaid.toFixed(2)} Eur</CardTitle>

                        </CardHeader>
                        <CardContent>
                            <p className="text-red-500">Neapmaksāto rēķinu summa</p>

                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader>

                            <CardTitle className="text-4xl">{data[0]?.thismonth.toFixed(2)} Eur</CardTitle>

                        </CardHeader>
                        <CardContent>
                            <p >Šī mēneša rēķinu summa</p>

                        </CardContent>
                    </Card>
                </div>
                <Dialog open={formopen} onOpenChange={(e) => setOpen(e)}>
                    <DialogTrigger asChild>
                        <Button className="w-[150px] mt-2">Jauns ieņēmums</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Pievienot jaunu ieņēmumu</DialogTitle>

                        </DialogHeader>
                        <Newinvoice close={closeform}/>

                    </DialogContent>
                </Dialog>
                <InvoiceTable scope="business" />

            </div>
        </main>
    )
}
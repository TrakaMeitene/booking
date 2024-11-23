'use client'
import React, {useEffect, useRef } from "react";


import { Download } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

import { toast } from "sonner";


export default function Searchcard({ searchresponse, setSearchresponse }) {
    const modalRef = useRef();

    useEffect(() => {
        if (searchresponse) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchresponse]);


    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setSearchresponse([]);
        }
    }

    const router = useRouter()

    const statusspaid = (invoice) => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`http://localhost:8000/api/updateInvoice`, invoice, { headers })
            .then(response => {
                toast.success('Rēķina informācija atjaunota!')
            })
            .then(response =>
                setSearchresponse([])
            )
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    return (
        <span ref={modalRef} className="absolute w-[400px] top-[7%] max-h-[500px] overflow-y-scroll">
            {searchresponse.length > 0 && <Card  >
                <CardContent>
                    {searchresponse[0]?.clients.map(x => <div key={x.id} className="border-b-2">
                        <h1 className="font-medium">Klienti</h1>
                        <p className="text-sm">{x.name} {x.surname}</p>
                        <p><a href={`https://wa.me/${x.phone}`} className="text-sm">Telefona nr.: {x.phone}</a></p>
                        <p><a href={`mailto:${x.email}`} className="text-sm">E-pasts: {x.email}</a></p>
                    </div>)}
                    {searchresponse[0]?.invoices.map(x => <div key={x.id} className="border-b-2 ">
                        <h1 className="font-medium">Rēķini</h1>
                        <p className="text-sm">Rēķina nr.: {x.serial_number}</p>
                        <p className="text-sm">Partneris: {x.customer?.name}</p>
                        <p className="text-sm">Summa: {x.price.toFixed(2)} Eur</p>
                        <p className="text-sm">Statuss: {x.status === "cancelled" ? "Atcelts" : x.status === "paid" ? "Apmaksāts" : "Neapmaksāts"}</p>
                        <p className="text-sm">Paklpojums: {x.service}</p>
                        <div className=" flex flex-row w-full items-center mb-2"> <a href={x.invoice} target="_blank"><Download /></a>
                            <Button className="ml-4" onClick={() => statusspaid(x)} disabled={x.paid_date}>Apmaksāts</Button>
                        </div>
                    </div>)}
                </CardContent>
            </Card>}
        </span>
    )
}
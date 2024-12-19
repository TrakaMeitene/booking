'use client'
import React, { useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
import {search, User} from "./header"
export interface invoice {
    booking: number,
    created_at: Date,
    customer?: User,
    external_customer: string,
    id: number,
    invoice: string 
    paid_date: Date,
    price: number,
    serial_number: string,
    service: string,
    status: string,
    type: string,
    updated_at: Date,
    user: number
}

interface props{
  response: search[],
    close: ()=>void
}

export default function Searchcard(props: props) {
    const modalRef = useRef<any>();

    useEffect(() => {
        if (props.response) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [props.response]);


    const handleClickOutside = (event: any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          props.close()
        }
    }

    const router = useRouter()

    const statusspaid = (invoice: invoice) => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/updateInvoice`, invoice, { headers })
            .then(response => {
                toast.success('Rēķina informācija atjaunota!')
            })
            .then(response =>
             props.close()

            )
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    return (
        <span ref={modalRef} className="absolute w-[400px] top-[7%] max-h-[500px] overflow-y-scroll " >
            {props.response?.length > 0 && <Card className="border-2" >
                <CardContent>
                    {props.response[0]?.clients.map(x => <div key={x.id} className="border-b-2">
                        <h1 className="font-medium">Klienti</h1>
                        <p className="text-sm">{x.name}</p>
                        <p><a href={`https://wa.me/${x.phone}`} className="text-sm">Telefona nr.: {x.phone}</a></p>
                        <p><a href={`mailto:${x.email}`} className="text-sm">E-pasts: {x.email}</a></p>
                    </div>)}
                    {props.response[0]?.invoices.map(x => <div key={x.id} className="border-b-2 ">
                        <h1 className="font-medium">Rēķini</h1>
                        <p className="text-sm">Rēķina nr.: {x.serial_number}</p>
                        <p className="text-sm">Partneris: {x.customer?.name}</p>
                        <p className="text-sm">Summa: {x.price.toFixed(2)} Eur</p>
                        <p className="text-sm">Statuss: {x.status === "cancelled" ? "Atcelts" : x.status === "paid" ? "Apmaksāts" : "Neapmaksāts"}</p>
                        <p className="text-sm">Pakalpojums: {x.service}</p>
                        <div className=" flex flex-row w-full items-center mb-2"> <a href={x.invoice} target="_blank"><Download /></a>
                            <Button className="ml-4" onClick={() => statusspaid(x)} disabled={x.paid_date ? true : false}>Apmaksāts</Button>
                        </div>
                    </div>)}
                </CardContent>
            </Card>}
        </span>
    )
}
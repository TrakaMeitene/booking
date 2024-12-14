'use client'
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Sucesspayment(){
    const abonament = async (e: any) => {
        e.preventDefault()
       const price = e.target['priceId'].value
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };
       await  axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/stripesession`, {price}, { headers })
        .then(response => window.open(response.data.url, '_blank', 'noopener,noreferrer'))
    }

    return(
        <main id="notfound" className=" flex justify-center items-center flex-col h-[80vh]">
        <h2 className="text-7xl flex justify-center text-center">Kaut kas nogājis greizi un maksājums nav izdevies!</h2>
        <Button onClick={abonament}>Mēģināt vēlreiz!</Button>
     </main>
    )
}

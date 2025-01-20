'use client'
import React, { useState, useEffect, Key } from "react";
import 'moment/locale/lv'
import "../admin.css"
import Calendarview from "./calendar";
import axios from "axios";
import Cookies from "js-cookie";
import Alertcomp from "../partscomponents/alert";
import { useRouter } from 'next/navigation'
import Footer from "../partscomponents/footer";

export interface Booking {
  id: number, title: string, time: string, date: Date, description: string, end: string, service: number
}

export interface User {
  id: BigInteger | Key | null | undefined
  name: string,
  email: string,
  email_verified_at: Date,
  creatd_at: Date,
  avatar: string,
  updated_at: Date,
  bio: string,
  occupation: string,
  city: string,
  adress: string,
  phone: string

}

export default function Admin() {
  const date: Date = new Date();
  const [message, setmessage] = useState()
  const router = useRouter()

  useEffect(() => {
    checklimits()
  }, [])

  const checklimits = () => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };

    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/checklimits`, {}, { headers })
      .then(response => setmessage(response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          return router.push('/login')
        }
      })

  }
  return (
    <>
      <main className="flex justify-around p-2 w-[95vw] flex-wrap mb-[20px] bg-white" >
        {message && <Alertcomp success={{ message: message, type: "error" }} />}
        <Calendarview />
      </main>
    </>


  )
}
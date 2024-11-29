'use client'
import React from "react";
import 'moment/locale/lv'
import "../admin.css"
import Calendarview from "./calendar";

export interface Booking {
  id: number, title: string, time: string, date: Date, description: string, end: string, service: number
}

export interface User {
  id: BigInteger,
  name: string,
  email: string,
  email_verified_at: Date,
  creatd_at: Date,
 avatar: string,
  updated_at: Date,
  bio: string,
  occupation: string,
  city:string,
  adress:string,
  phone: string

}

export default function Admin() {
  const date: Date = new Date();

  return (
    <>
          <main className="flex justify-around p-2 w-[95vw] flex-wrap mb-[20px]" >
              <Calendarview   />
            </main> 
          </>
  

  )
}
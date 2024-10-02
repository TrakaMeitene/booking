'use client'
import React, { useEffect, useState } from "react";
import moment from 'moment';
import 'moment/locale/lv'
import "../admin.css"
import Calendarview from "./calendar";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

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
  adress:string

}

export default function Admin() {
  const date: Date = new Date();


  // const data: Booking[] = [{ id: 1, title: "Sandra Jurberga", time: "11:00", date: moment().toDate(), description: "apraksts", end: moment().add(1, 'hours').toString() }, { id: 2, title: "Sandra Jurberga", time: "11:00", date: moment("8/15/2024 12:12").toDate(), description: "apraksts2", end: moment("8/15/2024").add(1, 'hours').toString() }, { id: 3, title: "Sandra Jurberga", time: "11:00", date: moment(new Date(2024, 6, 4, 10, 45)).toDate(), description: "", end: moment(new Date(2024, 6, 4, 10, 45)).add(1, 'hours').toString() }, { id: 4, title: "Sandra Jurberga", time: "11:00", date: new Date(2024, 7, 7, 8, 6), description: "apraksts teksts garaks teksts teksts te atkal tesksts ", end: moment(new Date(2024, 7, 7, 8, 6)).add(1, 'hours').toString() }, { id: 5, title: "Sandra Jurberga", time: "11:00", date: new Date(2024, 6, 4, 5, 6), description: "apraksts", end: moment(new Date(2024, 6, 4, 5, 6)).add(1, 'hours').toString() }]
  // const data: Booking[] = [
  //   {
  //     "id": 1,
  //     "title": "John Doe",
  //     "time": "09:00",
  //     "date": moment("2024-08-28T09:00:00.000Z").toDate(),
  //     "description": "Meeting with John",
  //     "end": "2024-08-28T10:00:00.000Z"
  //   },
  //   {
  //     "id": 2,
  //     "title": "Jane Smith",
  //     "time": "10:30",
  //     "date": moment("2024-08-15T10:30:00.000Z").toDate(),
  //     "description": "Project discussion",
  //     "end": "2024-08-15T11:30:00.000Z"
  //   },
  //   {
  //     "id": 3,
  //     "title": "Alice Johnson",
  //     "time": "14:00",
  //     "date": moment("2024-07-04T14:00:00.000Z").toDate(),
  //     "description": "Lunch with Alice",
  //     "end": "2024-07-04T15:00:00.000Z",
  //   },
  //   {
  //     "id": 4,
  //     "title": "Bob Brown",
  //     "time": "16:00",
  //     "date": moment("2024-08-07T16:00:00.000Z").toDate(),
  //     "description": "Strategy meeting",
  //     "end": "2024-08-07T17:00:00.000Z"
  //   },
  //   {
  //     "id": 5,
  //     "title": "Charlie Davis",
  //     "time": "08:00",
  //     "date": moment("2024-07-04T08:00:00.000Z").toDate(),
  //     "description": "Morning briefing",
  //     "end": "2024-07-04T09:00:00.000Z"
  //   },
  //   {
  //     "id": 6,
  //     "title": "Diana Evans",
  //     "time": "11:00",
  //     "date": moment("2024-09-01T11:00:00.000Z").toDate(),
  //     "description": "Client call",
  //     "end": "2024-09-01T12:00:00.000Z"
  //   },
  //   {
  //     "id": 7,
  //     "title": "Ethan Foster",
  //     "time": "13:00",
  //     "date": moment("2024-09-02T13:00:00.000Z").toDate(),
  //     "description": "Team meeting",
  //     "end": "2024-09-02T14:00:00.000Z"
  //   },
  //   {
  //     "id": 8,
  //     "title": "Fiona Green",
  //     "time": "15:30",
  //     "date": moment("2024-09-03T15:30:00.000Z").toDate(),
  //     "description": "Review session",
  //     "end": "2024-09-03T16:30:00.000Z"
  //   },
  //   {
  //     "id": 9,
  //     "title": "George Harris",
  //     "time": "17:00",
  //     "date": moment("2024-09-04T17:00:00.000Z").toDate(),
  //     "description": "Wrap-up meeting",
  //     "end": "2024-09-04T18:00:00.000Z"
  //   },
  //   {
  //     "id": 10,
  //     "title": "Hannah Lee",
  //     "time": "18:30",
  //     "date": moment("2024-09-05T18:30:00.000Z").toDate(),
  //     "description": "Evening call",
  //     "end": "2024-09-05T19:30:00.000Z"
  //   },
  //   {
  //     "id": 11,
  //     "title": "Ivy King",
  //     "time": "09:00",
  //     "date": moment("2024-09-06T09:00:00.000Z").toDate(),
  //     "description": "Morning meeting",
  //     "end": "2024-09-06T10:00:00.000Z"
  //   },
  //   {
  //     "id": 12,
  //     "title": "Jack Lewis",
  //     "time": "11:00",
  //     "date": moment("2024-09-06T11:00:00.000Z").toDate(),
  //     "description": "Client presentation",
  //     "end": "2024-09-06T12:00:00.000Z"
  //   },
  //   {
  //     "id": 13,
  //     "title": "Karen Miller",
  //     "time": "14:00",
  //     "date": moment("2024-09-06T14:00:00.000Z").toDate(),
  //     "description": "Project review",
  //     "end": "2024-09-06T15:00:00.000Z"
  //   },
  //   {
  //     "id": 14,
  //     "title": "Liam Nelson",
  //     "time": "09:00",
  //     "date": moment("2024-09-07T09:00:00.000Z").toDate(),
  //     "description": "Team sync",
  //     "end": "2024-09-07T10:00:00.000Z"
  //   },
  //   {
  //     "id": 15,
  //     "title": "Mia Owens",
  //     "time": "11:00",
  //     "date": moment("2024-09-07T11:00:00.000Z").toDate(),
  //     "description": "Client feedback",
  //     "end": "2024-09-07T12:00:00.000Z"
  //   },
  //   {
  //     "id": 16,
  //     "title": "Noah Parker",
  //     "time": "14:00",
  //     "date": moment("2024-09-07T14:00:00.000Z").toDate(),
  //     "description": "Product demo",
  //     "end": "2024-09-07T15:00:00.000Z"
  //   },
  //   {
  //     "id": 17,
  //     "title": "Olivia Quinn",
  //     "time": "09:00",
  //     "date": moment("2024-09-08T09:00:00.000Z").toDate(),
  //     "description": "Morning catch-up",
  //     "end": "2024-09-08T10:00:00.000Z"
  //   },
  //   {
  //     "id": 18,
  //     "title": "Paul Roberts",
  //     "time": "11:00",
  //     "date": moment("2024-09-08T11:00:00.000Z").toDate(),
  //     "description": "Sales call",
  //     "end": "2024-09-08T12:00:00.000Z"
  //   },
  //   {
  //     "id": 19,
  //     "title": "Quinn Scott",
  //     "time": "14:00",
  //     "date": moment("2024-09-08T14:00:00.000Z").toDate(),
  //     "description": "Marketing meeting",
  //     "end": "2024-09-08T15:00:00.000Z"
  //   },
  //   {
  //     "id": 20,
  //     "title": "Rachel Taylor",
  //     "time": "09:00",
  //     "date": moment("2024-09-09T09:00:00.000Z").toDate(),
  //     "description": "Project kickoff",
  //     "end": "2024-09-09T10:00:00.000Z"
  //   },
  //   {
  //     "id": 21,
  //     "title": "Sam Underwood",
  //     "time": "11:00",
  //     "date": moment("2024-09-09T11:00:00.000Z").toDate(),
  //     "description": "Client update",
  //     "end": "2024-09-09T12:00:00.000Z"
  //   },
  //   {
  //     "id": 22,
  //     "title": "Tina Vance",
  //     "time": "14:00",
  //     "date": moment("2024-09-09T14:00:00.000Z").toDate(),
  //     "description": "Design review",
  //     "end": "2024-09-09T15:00:00.000Z"
  //   },
  //   {
  //     "id": 23,
  //     "title": "Uma White",
  //     "time": "09:00",
  //     "date": moment("2024-09-10T09:00:00.000Z").toDate(),
  //     "description": "Morning meeting",
  //     "end": "2024-09-10T10:00:00.000Z"
  //   },
  //   {
  //     "id": 24,
  //     "title": "Victor Xander",
  //     "time": "11:00",
  //     "date": moment("2024-09-10T11:00:00.000Z").toDate(),
  //     "description": "Client call",
  //     "end": "2024-09-10T12:00:00.000Z"
  //   }
  //]

  // data.sort(function (a, b) {
  //   return a.date.toLocaleTimeString('lv-LV').localeCompare(b.date.toLocaleTimeString('lv-LV'));
  // });





  return (
    <>
          <main className="flex justify-around p-2 w-[95vw] flex-wrap" >
              <Calendarview   />
            </main> 
     
          </>
  

  )
}
'use client'
import React, { useState } from "react";
import Aside from "../partscomponents/aside";
import moment from 'moment';
import 'moment/locale/lv'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import "../admin.css"
import Calendarview from "./calendar";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Eventform from "./eventform";
import Bookingdetails from "./bookingdetails";

export interface Booking {
    id: number, title: string, time: string, date: Date, description: string, end: string 
}

export default function Admin() {

    const date: Date = new Date();
    const datefull: string = date.toLocaleDateString('lv-LV', { month: 'long' })
    const state = datefull.charAt(0).toUpperCase() + datefull.slice(1)
    const dayNames = ["Pirmdiena", "Otrdiena", "Trešdiena", "Cetturtdiena", "Piektdiena", "Sestdiena", "Svētdiena"];
    const months = ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"]

    const [selectedOption, setSelectedOption] = useState(state)
    const [daysCount, setDays] = useState(7)
    const [calendarview, setCalendarview] = useState(false)

    moment.locale('lv')
    let days = [];

    for (let i = 1; i <= daysCount; i++) {
        days.push(months[moment().month()] === selectedOption ? moment().month(selectedOption).add(i, 'days').format('MM/DD/YYYY') : moment().month(selectedOption).startOf('month').add(-1, 'days').add(i, 'days').format('MM/DD/YYYY'))
    }

   // const data: Booking[] = [{ id: 1, title: "Sandra Jurberga", time: "11:00", date: moment().toDate(), description: "apraksts", end: moment().add(1, 'hours').toString() }, { id: 2, title: "Sandra Jurberga", time: "11:00", date: moment("8/15/2024 12:12").toDate(), description: "apraksts2", end: moment("8/15/2024").add(1, 'hours').toString() }, { id: 3, title: "Sandra Jurberga", time: "11:00", date: moment(new Date(2024, 6, 4, 10, 45)).toDate(), description: "", end: moment(new Date(2024, 6, 4, 10, 45)).add(1, 'hours').toString() }, { id: 4, title: "Sandra Jurberga", time: "11:00", date: new Date(2024, 7, 7, 8, 6), description: "apraksts teksts garaks teksts teksts te atkal tesksts ", end: moment(new Date(2024, 7, 7, 8, 6)).add(1, 'hours').toString() }, { id: 5, title: "Sandra Jurberga", time: "11:00", date: new Date(2024, 6, 4, 5, 6), description: "apraksts", end: moment(new Date(2024, 6, 4, 5, 6)).add(1, 'hours').toString() }]
const data: Booking[] = [
        {
          "id": 1,
          "title": "John Doe",
          "time": "09:00",
          "date": moment("2024-08-28T09:00:00.000Z").toDate(),
          "description": "Meeting with John",
          "end": "2024-08-28T10:00:00.000Z"
        },
        {
          "id": 2,
          "title": "Jane Smith",
          "time": "10:30",
          "date": moment("2024-08-15T10:30:00.000Z").toDate(),
          "description": "Project discussion",
          "end": "2024-08-15T11:30:00.000Z"
        },
        {
          "id": 3,
          "title": "Alice Johnson",
          "time": "14:00",
          "date": moment("2024-07-04T14:00:00.000Z").toDate(),
          "description": "Lunch with Alice",
          "end": "2024-07-04T15:00:00.000Z"
        },
        {
          "id": 4,
          "title": "Bob Brown",
          "time": "16:00",
          "date": moment("2024-08-07T16:00:00.000Z").toDate(),
          "description": "Strategy meeting",
          "end": "2024-08-07T17:00:00.000Z"
        },
        {
          "id": 5,
          "title": "Charlie Davis",
          "time": "08:00",
          "date": moment("2024-07-04T08:00:00.000Z").toDate(),
          "description": "Morning briefing",
          "end": "2024-07-04T09:00:00.000Z"
        },
        {
          "id": 6,
          "title": "Diana Evans",
          "time": "11:00",
          "date": moment("2024-09-01T11:00:00.000Z").toDate(),
          "description": "Client call",
          "end": "2024-09-01T12:00:00.000Z"
        },
        {
          "id": 7,
          "title": "Ethan Foster",
          "time": "13:00",
          "date": moment("2024-09-02T13:00:00.000Z").toDate(),
          "description": "Team meeting",
          "end": "2024-09-02T14:00:00.000Z"
        },
        {
          "id": 8,
          "title": "Fiona Green",
          "time": "15:30",
          "date": moment("2024-09-03T15:30:00.000Z").toDate(),
          "description": "Review session",
          "end": "2024-09-03T16:30:00.000Z"
        },
        {
          "id": 9,
          "title": "George Harris",
          "time": "17:00",
          "date": moment("2024-09-04T17:00:00.000Z").toDate(),
          "description": "Wrap-up meeting",
          "end": "2024-09-04T18:00:00.000Z"
        },
        {
          "id": 10,
          "title": "Hannah Lee",
          "time": "18:30",
          "date": moment("2024-09-05T18:30:00.000Z").toDate(),
          "description": "Evening call",
          "end": "2024-09-05T19:30:00.000Z"
        },
        {
          "id": 11,
          "title": "Ivy King",
          "time": "09:00",
          "date": moment("2024-09-06T09:00:00.000Z").toDate(),
          "description": "Morning meeting",
          "end": "2024-09-06T10:00:00.000Z"
        },
        {
          "id": 12,
          "title": "Jack Lewis",
          "time": "11:00",
          "date": moment("2024-09-06T11:00:00.000Z").toDate(),
          "description": "Client presentation",
          "end": "2024-09-06T12:00:00.000Z"
        },
        {
          "id": 13,
          "title": "Karen Miller",
          "time": "14:00",
          "date": moment("2024-09-06T14:00:00.000Z").toDate(),
          "description": "Project review",
          "end": "2024-09-06T15:00:00.000Z"
        },
        {
          "id": 14,
          "title": "Liam Nelson",
          "time": "09:00",
          "date": moment("2024-09-07T09:00:00.000Z").toDate(),
          "description": "Team sync",
          "end": "2024-09-07T10:00:00.000Z"
        },
        {
          "id": 15,
          "title": "Mia Owens",
          "time": "11:00",
          "date": moment("2024-09-07T11:00:00.000Z").toDate(),
          "description": "Client feedback",
          "end": "2024-09-07T12:00:00.000Z"
        },
        {
          "id": 16,
          "title": "Noah Parker",
          "time": "14:00",
          "date": moment("2024-09-07T14:00:00.000Z").toDate(),
          "description": "Product demo",
          "end": "2024-09-07T15:00:00.000Z"
        },
        {
          "id": 17,
          "title": "Olivia Quinn",
          "time": "09:00",
          "date": moment("2024-09-08T09:00:00.000Z").toDate(),
          "description": "Morning catch-up",
          "end": "2024-09-08T10:00:00.000Z"
        },
        {
          "id": 18,
          "title": "Paul Roberts",
          "time": "11:00",
          "date": moment("2024-09-08T11:00:00.000Z").toDate(),
          "description": "Sales call",
          "end": "2024-09-08T12:00:00.000Z"
        },
        {
          "id": 19,
          "title": "Quinn Scott",
          "time": "14:00",
          "date": moment("2024-09-08T14:00:00.000Z").toDate(),
          "description": "Marketing meeting",
          "end": "2024-09-08T15:00:00.000Z"
        },
        {
          "id": 20,
          "title": "Rachel Taylor",
          "time": "09:00",
          "date": moment("2024-09-09T09:00:00.000Z").toDate(),
          "description": "Project kickoff",
          "end": "2024-09-09T10:00:00.000Z"
        },
        {
          "id": 21,
          "title": "Sam Underwood",
          "time": "11:00",
          "date": moment("2024-09-09T11:00:00.000Z").toDate(),
          "description": "Client update",
          "end": "2024-09-09T12:00:00.000Z"
        },
        {
          "id": 22,
          "title": "Tina Vance",
          "time": "14:00",
          "date": moment("2024-09-09T14:00:00.000Z").toDate(),
          "description": "Design review",
          "end": "2024-09-09T15:00:00.000Z"
        },
        {
          "id": 23,
          "title": "Uma White",
          "time": "09:00",
          "date": moment("2024-09-10T09:00:00.000Z").toDate(),
          "description": "Morning meeting",
          "end": "2024-09-10T10:00:00.000Z"
        },
        {
          "id": 24,
          "title": "Victor Xander",
          "time": "11:00",
          "date": moment("2024-09-10T11:00:00.000Z").toDate(),
          "description": "Client call",
          "end": "2024-09-10T12:00:00.000Z"
        }
  ]
    data.sort(function (a, b) {
        return a.date.toLocaleTimeString('lv-LV').localeCompare(b.date.toLocaleTimeString('lv-LV'));
    });

    if (months[moment().month()] === selectedOption) {
        days.push(moment().format('MM/DD/YYYY'))
        days.sort((a, b) => moment(a).valueOf() - moment(b).valueOf())
    }

    return (
        <section>
            <Aside />
            <div className="flex flex-row items-center gap-4 px-2 py-4 border-t border-b select flex-wrap">
                <div className="flex justify-end w-[50%]">
                    <Select value={selectedOption} disabled={calendarview}
                        onValueChange={(value) => {
                            setSelectedOption(value)
                        }}>
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Mēnesis" />
                        </SelectTrigger>
                        <SelectContent >
                            {months.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end ">
                    <div className="flex items-center space-x-2">
                        <Switch id="calendar" onCheckedChange={(e) => setCalendarview(e)} />
                        <Label htmlFor="caendar">Kalendāra skats</Label>
                    </div>
                    {!calendarview &&
                        <>
                            <Button variant="link" onClick={() => setDays(7)} className={daysCount === 7 ? "button" : ""}>Nedēļa</Button>
                            <Button variant="link" onClick={() => setDays(moment().month(selectedOption).daysInMonth() + 1)} className={daysCount >= 28 ? "button" : ""}>Mēnesis</Button>
                        </>
                    }
                </div>
            </div>

            <main className="flex justify-around p-2 w-[95vw] flex-wrap" >
                {calendarview ?
                    <Calendarview month={selectedOption} data={data} />
                    :
                    <>
                        {days.map(x =>
                            <Card className="w-[300px] font-serif m-2" key={x} >
                                <CardHeader className="cardheader">
                                    <CardTitle>{moment().format('dddd, Do MMMM YYYY') === x ? "Šodien" : moment(x).date()}</CardTitle>
                                    <CardDescription>{dayNames[moment(x).isoWeekday() - 1]}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {data.map(y =>
                                        <div key={y.id}>
                                            <Dialog>
                                              <Bookingdetails data={y}/>
                                                <DialogTrigger asChild>
                                                    {moment(y.date).format('MM/DD/YYYY') === x &&
                                                     <div className="flex flex-wrap border w-full rounded-lg justify-start items-center p-2 my-2 hover:bg-accent cursor-pointer ">
                                                        <span className="px-2">{y.date.toLocaleTimeString('lv-LV', { hour: "2-digit", minute: "2-digit" })}</span>
                                                        <span>{y.title}</span>
                                                    </div>
                                                    }
                                                </DialogTrigger>

                                            </Dialog>
                                        </div>)}
                                </CardContent>
                                <CardFooter className="flex items-center justify-center">
                                    <Dialog >
                                        <DialogContent className="sm:max-w-[425px] sm:text-center">
                                            <DialogHeader>
                                                <DialogTitle className="sm:text-center">Jauns pieraksts</DialogTitle>

                                            </DialogHeader>
                                            <Eventform dateexiting={x} />

                                        </DialogContent>

                                        <DialogTrigger asChild >
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="overflow-hidden rounded-full"
                                            >
                                                <Plus size={20} />
                                            </Button>
                                        </DialogTrigger>

                                    </Dialog>
                                </CardFooter>
                            </Card>
                        )}
                    </>
                }
            </main>
        </section >
    )
}
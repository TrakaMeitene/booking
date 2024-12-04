'use client'
import React, { useCallback, useEffect, useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Bookingdetails from "./bookingdetails";
import Eventform from "./eventform";
import Addbreak from "./addbreak";
import axios from "axios"
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Booking, User } from "./page";
import { toast } from "sonner";
import { Message } from "../profile/page";


interface vacation{

created_at: Date,
date: Date,
id: number,
updated_at: Date
user: number
}

export default function Calendarview({ data }: any) {
  const dayLayoutAlgorithm = 'no-overlap'

  const [item, setItem] = useState()
  const [open, setOpen] = useState<boolean>(false)
  const [addevent, setaddevenetopen] = useState<boolean>(false)
  const [slotitems, setslotitems] = useState()
  const [vacation, setvacation] = useState<vacation>()
  const [range, setrange] = useState()
  const [bookings, setbookings] = useState<Booking[]>()
  const [openaddbooking, setOpenaddbooking] = useState<boolean>(false)
const [user, setUser] = useState<User>()

  const router = useRouter()

  useEffect(() => {
    let token = Cookies.get('token')
if(token){
    if (item) {
      setOpen(true)
    }
    getdata()
    getuser()
  } else{
    router.push('/')
  }
  }, [item])

  const localizer = momentLocalizer(moment)
  const lang: { week: string, work_week: string, day: string, month: string, previous: string, next: string, today: string, agenda: string, date: string, event:string, time:string,  noEventsInRange: string } = {
    week: 'Nedēļa',
    work_week: 'Darba nedēļa',
    day: 'Diena',
    month: 'Mēnesis',
    previous: 'Iepriekš',
    next: 'Uz priekšu',
    today: 'Šodien',
    agenda: 'Darba kārtība',
    date: 'Datums',
    event: 'Notikums',
    time: "Laiks",
    noEventsInRange: "Šājā laika posmā nav notikumu."
  }

  const handleSelectEvent = useCallback(
    (event: any) => setItem(event), []
  )

  const onSelectSlot = useCallback((slotInfo: any) => {
    /**
     * Here we are waiting 250 milliseconds prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    setaddevenetopen(true)
    setslotitems(slotInfo.slots)
  }, [])

  const closedialog = () => {
    setaddevenetopen(false)
  }

  const onRangeChange = useCallback((range: any) => {
    setrange(range)
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };
    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getvacation`, range, { headers })
      .then(response => setvacation(response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          return router.push('/login')
        }
      })
  }, [])

  const getdata = () => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };
    // Using Map to represent the `range` (assuming range is previously defined as an object)
    const range = new Map();
    // Example: range.set('startDate', '2024-09-01'); range.set('endDate', '2024-09-30');

    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getbookings`, Object.fromEntries(range), { headers })
      .then(response => {
        // Convert date strings to JavaScript Date objects in the response data
        const bookingsWithDates = response.data.map((booking: Booking) => ({
          ...booking,
          // Assuming `bookingDate` is a field in the response that needs conversion
          date: new Date(booking.date)
        }));

        setbookings(bookingsWithDates);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          return router.push('/login');
        }
      });
  }


  const getmessage = (message: string, type: string) => {
    console.log(message)
    if(message.type === "error") {toast.error(message.message)}else{ toast.success(message.message)}
}

const getuser = () => {
  let token = Cookies.get('token')

  const headers = { 'Authorization': 'Bearer ' + token };
  axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/user`, {}, { headers })
      .then(response => {
              setUser(response.data)
      })
      .catch(function (error) {
          if (error.response.status == 401) {
            return router.push('/')
          }
      })
}


  return (
    <div style={{ height: "800px" }} className="w-full mb-4">
      <Dialog open={openaddbooking} onOpenChange={(event) => setOpenaddbooking(event)} >
        <DialogContent className="sm:max-w-[425px] sm:text-center">
          <DialogHeader>
            <DialogTitle className="sm:text-center">Jauns pieraksts</DialogTitle>

          </DialogHeader>
          <Eventform  getdata={getdata} getmessage={getmessage} specialist={[user]} dateFrompage={undefined} user={undefined} service={undefined} allservices={undefined} open={openaddbooking} setOpenaddbooking={setOpenaddbooking}/>

        </DialogContent>

          <Button
            variant="default"
            className="mb-2"
            onClick={() => setOpenaddbooking(true)}
          >
            <Plus size={20} /> Jauns pieraksts
          </Button>

      </Dialog>
      <Calendar
      dayLayoutAlgorithm={dayLayoutAlgorithm}
        messages={lang}
        localizer={localizer}
        defaultView="day"
        events={bookings}
        showMultiDayTimes
        startAccessor="date"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        selectable
        onSelectSlot={onSelectSlot}
        onRangeChange={onRangeChange}

        dayPropGetter={(event) => {
          const hasTodo = vacation?.find((item: any) => new Date(item.date).toLocaleDateString() == new Date(event).toLocaleDateString())
          return {
            style: {
              backgroundColor: hasTodo ? "hsl(115, 100%, 90%)" : "white",
            },
          }
        }}
      />
      <Dialog open={open} onOpenChange={(event) => setOpen(event)}> <Bookingdetails data={item} setOpen={setOpen} getdata={getdata}/> </Dialog>
      <Dialog open={addevent} onOpenChange={(event) => setaddevenetopen(event)}><Addbreak data={slotitems} close={closedialog} getmessage={getmessage} /></Dialog>

    </div>
  )
}
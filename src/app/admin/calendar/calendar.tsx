'use client'
import React, { useCallback, useEffect, useState, useRef, useActionState } from "react";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import {
  Dialog,

} from "@/components/ui/dialog"
import Bookingdetails from "./bookingdetails";
import Eventform from "./eventform";
import Addbreak from "./addbreak";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios"
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import Loading from "../partscomponents/loading";

export default function Calendarview({ data }: any) {
  const [item, setItem] = useState()
  const [open, setOpen] = useState(false)
const [addevent, setaddevenetopen ] = useState(false)
const [slotitems, setslotitems] = useState()
const [vacation, setvacation] = useState()

const router = useRouter()

  useEffect(()=>{
  if(item){
    setOpen(true)
  }  
  }, [item])

  const localizer = momentLocalizer(moment)
  const lang: { week: string, work_week: string, day: string, month: string, previous: string, next: string, today: string, agenda: string } = {
    week: 'Nedēļa',
    work_week: 'Darba nedēļa',
    day: 'Diena',
    month: 'Mēnesis',
    previous: 'Iepriekš',
    next: 'Uz priekšu',
    today: 'Šodien',
    agenda: 'Darba kārtība',
  }

  const handleSelectEvent = useCallback(
    (event: any) => setItem(event), []
  )
let content = <p></p>
  const onSelectSlot = useCallback((slotInfo : any) => {
    /**
     * Here we are waiting 250 milliseconds prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    console.log("te", slotInfo)
    setaddevenetopen(true)
    setslotitems(slotInfo.slots)
  }, [])

  // const dayPropGetter = useCallback(
  //   (date) => {

  //    // console.log( slotitems, date)
  //     return {
  //       style: {
  //         backgroundColor: '#88C9E8', 
  //         border: '1px solid gray',
  //         margin: 0,
  //         padding: 0
  //       }
  //     }
  //   }
  // , [])

  const onRangeChange =  useCallback((range) => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };
     axios.post('http://localhost:8000/api/getvacation', range, { headers })
        .then(response => setvacation(response.data))
        .catch(function (error) {
            if (error.response.status == 401) {
                return router.push('/login')
            }
        })
   console.log(range.start, range.end)

  }, [])

  const dayPropGetter = useCallback(
      (date) => {
 
       // console.log( slotitems, date)
        return {
          style: {
            backgroundColor: '#88C9E8', 
            border: '1px solid gray',
            margin: 0,
            padding: 0
          }
        }
      }
    , [])

console.log(vacation)
  return (
    <div style={{ height: "700px" }} className="w-full mb-4">
      <Calendar
        messages={lang}
        localizer={localizer}
        defaultView="day"
        events={data}
        showMultiDayTimes
        startAccessor="date"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
       selectable
     onSelectSlot={onSelectSlot}
     //dayPropGetter={dayPropGetter}
     onRangeChange={onRangeChange}
     dayPropGetter={(event) => {
      const hasTodo = vacation?.find((item) => new Date(item.date).getDate() == new Date(event).getDate())
      return {
        style: {
          backgroundColor: hasTodo ? "#b64fc8" : "white",
        },
      }
    }}
      />
      <Dialog open={open} onOpenChange={(event) => setOpen(event)}> <Bookingdetails data={item} /> </Dialog>
      <Dialog open={addevent} onOpenChange={(event) => setaddevenetopen(event)}><Addbreak data={slotitems}/></Dialog>
    </div>
  )
}
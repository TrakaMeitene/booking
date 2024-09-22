'use client'
import React, { useCallback, useEffect, useState, useRef } from "react";
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

export default function Calendarview({ data }: any) {
  const [item, setItem] = useState()
  const [open, setOpen] = useState(false)
const [addevent, setaddevenetopen ] = useState(false)
const [slotitems, setslotitems] = useState()

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
 // let views= Object.keys(Views).map((k) => Views[k])

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
       // onSelectEvent={handleSelectEvent}
      //  selectable
      //  onSelectSlot={onSelectSlot}
       // views={views}

      />
      <Dialog open={open} onOpenChange={(event) => setOpen(event)}> <Bookingdetails data={item} /> </Dialog>
      {/* <Dialog open={addevent} onOpenChange={(event) => setaddevenetopen(event)}><Addbreak data={slotitems}/></Dialog> */}
    </div>
  )
}
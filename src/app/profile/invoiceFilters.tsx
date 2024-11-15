import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function Invoicefilters({getdata}){
    const [month, setMonth] = useState()

useEffect(()=>{
getdata(months.indexOf(month ) +1)
}, [month])

    const months = [
        'Janvāris',
        'Februāris',
        'Marts',
        'Aprīlis',
        'Maijs',
        'Jūnijs',
        'Jūlijs',
        'Augusts',
        'Septembris',
        'Oktobris',
        'Novembris',
        'Decembris'
    ]

    return(
        <div className="flex flex-row">
<Select value={month} onValueChange={(value) => { 
     setMonth(value)
}} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Mēnesis" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Mēnesis</SelectLabel>
          {months.map(x=> <SelectItem key={x} value={x}>{x}</SelectItem>)}
       
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
    )
}
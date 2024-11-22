import React, { useEffect, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default function Invoicefilters({ getdata, scope, page }) {

  const [month, setMonth] = useState()
  const [type, setType] = useState('Ieņēmumi/izdevumi')
  const prevMonth = usePrevious(month);
  const prevType = usePrevious(type);

  useEffect(() => {
    getdata(months.indexOf(month) + 1, months.indexOf(prevMonth) + 1, type, prevType)
  }, [month, page, type])

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

  const types = [
    'Ieņēmumi/izdevumi',
    'Ieņēmumi',
    'Izdevumi'
  ]

  return (
    <div className="flex flex-row">
      <Select value={month} onValueChange={(value) => {
        setMonth(value)
      }} >
        <SelectTrigger className="w-[180px] mr-2">
          <SelectValue placeholder="Mēnesis" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Mēnesis</SelectLabel>
            {months.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}

          </SelectGroup>
        </SelectContent>
      </Select>

      {scope === "business" && <Select  value={type} onValueChange={(value) => {
        setType(value)
      }} >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ieņēmumi/Izdevumi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {types.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}

          </SelectGroup>
        </SelectContent>
      </Select>}


    </div>
  )
}
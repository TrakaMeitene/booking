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


const usePrevious = (value: string | number ) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


interface props{
getdata: ( month: number, prevMonth: number, type: string, prevType: string, status: string, prevStatus: string)=>void,
scope: string,
page: number,
forcereload: boolean
}

export default function Invoicefilters(props: props) {

  const [month, setMonth] = useState<string>("")
  const [type, setType] = useState('Ieņēmumi/izdevumi')
  const [status, setStatus] = useState('Visi')
  const prevMonth = usePrevious(month);
  const prevType = usePrevious(type);
  const prevStatus = usePrevious(status);


  useEffect(() => {
    props.getdata(months.indexOf(month!) + 1, months.indexOf(prevMonth!) + 1, type, prevType!, status, prevStatus!)
  }, [month, props.page, type, status, props.forcereload])

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

  const statusi = [
    'Visi',
    'Apmaksāts',
    'Neapmaksāts',
    'Anulēts'
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

      {props.scope === "business" && <Select value={type} onValueChange={(value) => {
        setType(value)
      }} >
        <SelectTrigger className="w-[180px]  mr-2">
          <SelectValue placeholder="Ieņēmumi/Izdevumi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {types.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}

          </SelectGroup>
        </SelectContent>
      </Select>}
      <Select value={status} onValueChange={(value) => {
        setStatus(value)
      }} >
        <SelectTrigger className="w-[180px] mr-2">
          <SelectValue placeholder="Statuss" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statusi.map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}

          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  )
}
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
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const usePrevious = (value: string | number|undefined) => {
  const ref = useRef<any>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


interface props {
  getdata: (month: number, prevMonth: number, type: string, prevType: string, status: string, prevStatus: string, selectedyear: string) => void,
  scope: string,
  page: number,
  forcereload: boolean
}
const yearslist = [
  2025,
  2024,
  2023
]

export default function Invoicefilters(props: props) {

  const [month, setMonth] = useState<string>("")
  const [type, setType] = useState<string>('Ieņēmumi/izdevumi')
  const [status, setStatus] = useState<string>('Visi')
  const prevMonth = usePrevious(month);
  const prevType = usePrevious(type);
  const prevStatus = usePrevious(status);
  const [years, setYears] = useState<any>(yearslist)
  const [selectedyear, setSelectedyear] = useState<any>(new Date().getFullYear())
const router = useRouter()

  useEffect(() => {
    props.getdata(months.indexOf(month!) + 1, months.indexOf(prevMonth!) + 1, type, prevType!, status, prevStatus!, selectedyear)
    getyears()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, props.page, type, status, props.forcereload, selectedyear])

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

  const getyears = () => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };

    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getyearsofbills`, {}, { headers })
      .then(response => {
        setYears(response.data.length == 0 ? [new Date().getFullYear()] : response.data)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          return router.push('/login')
        }
      })
  }

  const clearfilters=()=>{
    setMonth("")
    setStatus('Visi')
    setType('Ieņēmumi/izdevumi')
    setSelectedyear(new Date().getFullYear())
  }

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

      <Select value={selectedyear} onValueChange={(value) => {
        setSelectedyear(value)
      }}>
        <SelectTrigger className="w-[180px] mr-2">
          <SelectValue placeholder="Gads" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {years?.map((x:any) => <SelectItem key={x} value={x}>{x}</SelectItem>)}

          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={clearfilters} variant="outline" className="mr-2">Noņemt filtrus</Button>

    </div>
  )
}
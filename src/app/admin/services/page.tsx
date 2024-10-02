'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import "../../admin/admin.css"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"
import { DialogTrigger, Dialog } from "@/components/ui/dialog";
import Newcservice from "./newservice";
import axios from "axios"
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";
import Loading from "../partscomponents/loading";

export interface Service {
  id: number, name: string, price: string, time: number, description: string
}

export default function Services() {
  const router = useRouter()
const [services, setservices] = useState<Service>()

  const data: Service[] = [
    {
      id: 1,
      name: "Manikīrs sausias",
      price: "20 €",
      time: 1,
      description: "saturs"
    },
    {
      id: 2,
      name: "Slapjais manikīrs",
      price: "20  € ",
      time: 1,
      description: "saturs liels garš saturs ar banānanmaizisaturs liels garš saturs ar banānanmaizisaturs liels garš saturs ar banānanmaizisaturs liels garš saturs ar banānanmaizisaturs liels garš saturs ar banānanmaizisaturs liels garš saturs ar banānanmaizisaturs liels garš saturs ar banānanmaizisaturs liels garš saturs ar banānanmaizisaturs liels garš saturs ar banānanmaizi "
    }
  ]
  useEffect(() => {
    getdata()
  }, [])

  const getdata = () => {
    let token = Cookies.get('token')

    const headers = { 'Authorization': 'Bearer ' + token };
    axios.get('http://localhost:8000/api/getservices', { headers })
      .then(response => {
        setservices(response.data)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          return router.push('/login')
        }
      })
  }
console.log(services)
if(!services)
  return <Loading/>


  return (
    <main>
      <h1 className="text-3xl w-full border-b-2">Pakalpojumi</h1>
      <Dialog>
        <Newcservice />
        <DialogTrigger asChild>
          <Button className="mt-2">  <Plus size={20} className="mr-2" />Jauns pakalpojums</Button>
        </DialogTrigger>

        <Table className="mt-4">
          <TableCaption>Paklapojumu saraksts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >Nosaukums</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead>Ilgums</TableHead>
              <TableHead className="max-w-5">Apraksts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((x: Service) => <TableRow key={x.id} >
              <TableCell>{x.name}</TableCell>
              <TableCell >{x.price} Eur</TableCell>
              <TableCell >{x.time} min</TableCell>
              <TableCell className="max-w-60">{x.description}</TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </Dialog>
    </main>
  )
}
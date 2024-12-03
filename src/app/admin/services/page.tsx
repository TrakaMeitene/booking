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
import Newservice from "./newservice";
import axios from "axios"
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";
import Loading from "../partscomponents/loading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Trash2, Pencil } from "lucide-react"
import { toast } from "sonner"
import { serviceObject } from "../calendar/bookingdetails";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

export interface Service {
  map(arg0: (x: serviceObject) => React.JSX.Element): React.ReactNode;
  id: number, name: string, price: string, time: number, description: string
}

export default function Services() {
  const router = useRouter()
  const [services, setservices] = useState<Service[]>()
  const [current, setCurrent] = useState<number>(1)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedservice, setSelectedservice] = useState<serviceObject>()

  useEffect(() => {
    getdata()
  }, [current])

  const getdata = () => {
    let token = Cookies.get('token')

    const headers = { 'Authorization': 'Bearer ' + token };
    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getservices`, { current }, { headers })
      .then(response => {
        setservices(response.data)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          return router.push('/login')
        }
      })
  }

  const deleteservice = (service: serviceObject) => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };

    axios.delete(`${process.env.NEXT_PUBLIC_REQUEST_URL}/deleteservice/${service.id}`)
      .then(response => {
        if (response.statusText == "OK") {
          toast.success("Dati saglabāti veiksmīgi!")
        } else {
          toast.error("Kaut kas nogāja greizi!")
        }
        getdata()
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          return router.push('/login')
        }
      })
  }

  const getmessage = (message: string, type: string) => {
    toast.success(message.message)
    getdata()
  }
  let prev = current - 1 > 1 ? current - 1 : 1
  let next = current + 1 < services?.last_page ? current + 1 : services?.last_page


  const Options = (service:serviceObject) => {
    setOpen(true)
    setSelectedservice(service)
  }

  if (!services)
    return <Loading />

  return (
    <main>
      <h1 className="text-3xl w-full border-b-2">Pakalpojumi</h1>
      <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
        {open && <Newservice getmessage={getmessage} setOpen={setOpen} />}
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
              <TableHead className="max-w-5">Iespējas</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.data.map((x: serviceObject) => <TableRow key={x.id} >
              <TableCell>{x.name}</TableCell>
              <TableCell >{(Number(x.price) / 100).toFixed(2)} Eur</TableCell>
              <TableCell >{x.time} min</TableCell>
              <TableCell className="max-w-60">{x.description}</TableCell>
              <TableCell className="max-w-60">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger onClick={() => { deleteservice(x) }}>
                      <Trash2 />                                                </TooltipTrigger>
                    <TooltipContent>
                      <p>Dzēst</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {open && <Newservice getmessage={getmessage} setOpen={setOpen} selectedservice={selectedservice} />}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger onClick={() => { Options(x) }}>
                      <Pencil className="ml-4"/>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Labot</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </TableCell>

            </TableRow>)}
          </TableBody>
        </Table>
      </Dialog>
      <Pagination>
        <PaginationContent className="pagination flex-wrap w-full">
          {services?.links?.map((x: any, index: number) => <PaginationItem key={index}>
            <PaginationLink isActive={services?.current_page == x.label} onClick={() => setCurrent(Number(x.label) ? Number(x.label) : x.label === "&laquo; Previous" ? prev : next)}>{x.label == "&laquo; Previous" ? "<" : x.label == "Next &raquo;" ? ">" : x.label}</PaginationLink>
          </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </main>
  )
}
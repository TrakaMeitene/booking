'use client'
import React, { useEffect, useState, useCallback  } from "react";
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
import Newclient from "./newclient";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Pencil } from "lucide-react";
export interface Client {
  id: number, name: String, surname: string, email: string, phone: string, reiting: number
}

export default function Clients() {

  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState(1)
  let [open, setOpen] = useState(false);
const [selectedclient, setclient] = useState()

  const router = useRouter()

  useEffect(() => {
    getdata()
  }, [current])

  const getdata = () => {
    let token = Cookies.get('token')
    const headers = { 'Authorization': 'Bearer ' + token };

    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getclients`, { current }, { headers })
      .then(response => {
        setData(response.data)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          return router.push('/login')
        }
      })
  }

  const getmessage = (message: string) => {
    toast.success(message)
    getdata()
  }
  let prev = current - 1 > 1 ? current - 1 : 1
  let next = current + 1 < data?.last_page ? current + 1 : data?.last_page

const options=(client: Client)=>{
  setOpen(true)
  setclient(client)
}

  return (
    <main>
      <h1 className="text-3xl w-full border-b-2">Klienti</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        {open && <Newclient getmessage={getmessage} client={undefined}  open={open} setOpen={setOpen}/>}
        <DialogTrigger asChild>
          <Button className="mt-2">  <Plus size={20} className="mr-2" />Jauns klients</Button>
        </DialogTrigger>
      </Dialog>
      <Table className="mt-4">
        <TableCaption>Klientu saraksts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >Vārds</TableHead>
            <TableHead>E-pasts</TableHead>
            <TableHead >Telefona nr.</TableHead>
            <TableHead>Reitings</TableHead>
            <TableHead>Iespējas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((x: any) => <TableRow key={x.id}>
            <TableCell>{x.name}</TableCell>
            <TableCell ><a href={`mailto:${x.email}`} className="text-blue-700" >{x.email}</a></TableCell>
            <TableCell><a href={`https://wa.me/${x.phone}`} className="text-blue-700" target="_blank">{x.phone}</a></TableCell>
            <TableCell>{x.rating}</TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                    {open && <Newclient getmessage={getmessage} client={selectedclient}  open={open} setOpen={setOpen}/>}
                      <TooltipTrigger >
                        <TooltipContent>
                          Labot
                        </TooltipContent>
                        <Pencil onClick={()=>options(x)}/>
                      </TooltipTrigger>

                </Tooltip>
              </TooltipProvider></TableCell>
          </TableRow>)}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent className="pagination flex-wrap w-full">
          {data?.links?.map((x: any, index: number) => <PaginationItem key={index}>
            <PaginationLink isActive={data?.current_page == x.label} onClick={() => setCurrent(Number(x.label) ? Number(x.label) : x.label === "&laquo; Previous" ? prev : next)}>{x.label == "&laquo; Previous" ? "<" : x.label == "Next &raquo;" ? ">" : x.label}</PaginationLink>
          </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </main>
  )
}
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
  id: number, name: string, surname: string, email: string, phone: string, reiting: number, prevState:undefined 
}

export default function Clients() {

  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState(1)
  let [open, setOpen] = useState(false);
const [selectedclient, setclient] = useState<Client>()

  const router = useRouter()

  useEffect(() => {
    getdata()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <main className="bg-white pb-[80px]">
      <h1 className="text-3xl w-full border-b-2">Klienti</h1>
      <div className="hidden md:block">
      <Dialog open={open} onOpenChange={(e)=> {setOpen(e), setclient(undefined)}}>
        {open && <Newclient getmessage={getmessage} client={undefined}  open={open} setOpen={setOpen}/>}
        <DialogTrigger asChild>
          <Button className="mt-2">  <Plus size={20} className="mr-2" />Jauns klients</Button>
        </DialogTrigger>
      </Dialog>
      <Table className="mt-4 bg-white">
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
            <PaginationLink isActive={data?.current_page == x.label} onClick={() => setCurrent(Number(x.label) ? Number(x.label) : (x.label === "&laquo; Previous" || x.label == "pagination.previous") ? prev : next)}>{(x.label == "&laquo; Previous" || x.label == "pagination.previous" ) ? "<" : (x.label == "Next &raquo;" || x.label == "pagination.next")? ">" : x.label}</PaginationLink>
          </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
  </div>

  {/* Mobile View */}
  <div className="md:hidden">
        {data?.data?.map((item: any) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-semibold">Vārds:</span>
              <span>{item.name}</span>

              <span className="font-semibold">E-pasts:</span>
              <span><a href={`mailto:${item.email}`} className="text-blue-700" >{item.email}</a></span>

              <span className="font-semibold">Telefona nr.:</span>
              <span><a href={`https://wa.me/${item.phone}`} className="text-blue-700" target="_blank">{item.phone}</a></span>
              <span className="font-semibold">Reitings:</span>
              <span>{item.rating}</span>


            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={()=>options(item)}>
                    <Pencil className="ml-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Labot</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
           
            </div>
          </div>
        ))}
      </div>
    </main>
    
  )
}
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
import Newclient from "./newclient";
import axios from "axios";
import Cookies from "js-cookie";
import {toast} from "sonner"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation";
  export interface Client {
    id: number, name: String, surname: string, email: string, phone: string, reiting: number
}

export default function Clients(){

  const [data, setData] = useState<any>([])
  const [current, setCurrent] = useState(1)

  const router = useRouter()

    useEffect(()=>{
getdata()
    }, [current])
    
    const getdata=()=>{
      let token = Cookies.get('token')
      const headers = { 'Authorization': 'Bearer ' + token };

      axios.post(`http://localhost:8000/api/getclients`, {current}, { headers })
          .then(response => {
              setData(response.data)
          })
          .catch(function (error) {
              if (error.response.status == 401) {
                  return router.push('/login')
              }
          })
          }

          const getmessage=(message:string)=>{
            toast.success(message)
            getdata()
          }
          let prev = current - 1 > 1 ? current - 1 : 1
          let next = current + 1 < data?.last_page ? current + 1 : data?.last_page
          
          return(
 <main>
        <h1 className="text-3xl w-full border-b-2">Klienti</h1>
        <Dialog>
            <Newclient getmessage={getmessage}/>
            <DialogTrigger asChild>
        <Button className="mt-2">  <Plus size={20} className="mr-2"/>Jauns klients</Button>
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
    </TableRow>
  </TableHeader>
  <TableBody>
    {data?.data?.map((x:any) => <TableRow key={x.id}>
        <TableCell>{x.name}</TableCell>
        <TableCell ><a href={`mailto:${x.email}`} className="text-blue-700" >{x.email}</a></TableCell>
        <TableCell><a href={`https://wa.me/${x.phone}`} className="text-blue-700" target="_blank">{x.phone}</a></TableCell>
        <TableCell>{x.rating}</TableCell>
        </TableRow>)}
  </TableBody>
        </Table>

        <Pagination>
                        <PaginationContent className="pagination flex-wrap w-full">
                            {data?.links?.map((x:any, index: number) => <PaginationItem key={index}>
                                <PaginationLink isActive={data?.current_page == x.label}  onClick={() => setCurrent(Number(x.label) ? Number(x.label) : x.label === "&laquo; Previous" ? prev : next)}>{x.label == "&laquo; Previous" ? "<" : x.label == "Next &raquo;" ? ">" : x.label}</PaginationLink>
                            </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
        </main>
    )
}
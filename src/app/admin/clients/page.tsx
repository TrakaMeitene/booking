import React from "react";
import Aside from "../partscomponents/aside";
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

  export interface Client {
    id: number, name: String, surname: string, email: string, phone: string, reiting: number
}

export default function Clients(){

    const data: Client[] =[
        {
            id: 1,
            name: "Sandra",
            surname: "Jurberga",
            email: "sandra@sandra.lv",
            phone: "2345677",
            reiting: 1
        },
        {
            id: 2,
            name: "Sandra",
            surname: "Jurberga3",
            email: "sandra@sandra.lv",
            phone: "234567700",
            reiting: 9
        }
    ]
    
    return(
        <>
        <Aside/>
        <main>
        <h1 className="text-3xl w-full border-b-2">Klienti</h1>
        <Dialog>
            <Newclient/>
            <DialogTrigger asChild>
        <Button className="mt-2">  <Plus size={20} className="mr-2"/>Jauns klients</Button>
        </DialogTrigger>
        </Dialog>
        <Table className="mt-4">
        <TableCaption>Klientu saraksts</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >Vārds</TableHead>
      <TableHead>Uzvārds</TableHead>
      <TableHead>E-pasts</TableHead>
      <TableHead >Telefona nr.</TableHead>
      <TableHead>Reitings</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(x => <TableRow key={x.id}>
        <TableCell>{x.name}</TableCell>
        <TableCell>{x.surname}</TableCell>
        <TableCell ><a href={`mailto:${x.email}`} className="text-blue-700" >{x.email}</a></TableCell>
        <TableCell><a href={`https://wa.me/${x.phone}`} className="text-blue-700" target="_blank">{x.phone}</a></TableCell>
        <TableCell>{x.reiting}</TableCell>
        </TableRow>)}
  </TableBody>
        </Table>
        </main>
        </>
    )
}
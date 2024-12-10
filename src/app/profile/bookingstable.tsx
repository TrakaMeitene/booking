'use client'
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {toast} from "sonner"
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from 'next/navigation'
import moment from "moment";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button";
import { User } from "../admin/partscomponents/header";
import { Booking } from "../admin/calendar/page";

export default function Bookingstable({user}: {user: User}) {

    const [data, setData] = useState<any>()
    const router = useRouter()
    const [current, setCurrent] = useState(1)

    useEffect(() => {
        getdata()
    }, [current])

    const getdata = () => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getbookingsUsermade`, { current }, { headers })
            .then(response => {
                setData(response.data)
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }
    let prev = current - 1 > 1 ? current - 1 : 1
    let next = current + 1 < data?.last_page ? current + 1 : data?.last_page


    const cancelbooking=(data: Booking)=>{
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/cancelbooking`, {itemid: data.id})
            .then(response => {
                if (response.statusText == "OK") {
                    toast.success('Dati saglabāti veiksmīgi!')
                } else{
                    toast.error('Kaut kas nogāja greizi!')
                }
            }
            )
    }

    return (
        <Card className="w-[885px] mt-2 p-4  card">
            <CardHeader>

                <CardTitle>Tavas rezervācijas</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="max-h-[650px]">
                    <TableCaption>Saraksts ar Jūsu veiktajiem pierakstiem.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Veikšanas datums</TableHead>
                            <TableHead>Pakalpojumu sniedzējs</TableHead>
                            <TableHead>Pakalpojums</TableHead>
                            <TableHead className="text-right">Vizītes datums</TableHead>
                            <TableHead className="text-right">Cena</TableHead>
                            {user.scope === "all" && <TableHead>Statuss</TableHead>}
                            {user.scope === "all" && <TableHead>Iespējas</TableHead>}

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data.map((x: any) => (
                            <TableRow key={x.id} className={x.statuss === "cancelled" ? "bg-red-200 hover:bg-red-400" : ""}>
                                <TableCell>{moment(x.created_at).format("DD.MM.yyyy HH:mm")}</TableCell>
                                <TableCell className="font-medium">{x.specialist.name}</TableCell>
                                <TableCell>{x.service.name}</TableCell>
                                <TableCell>{moment(x.date).format("DD.MM.yyyy HH:mm")}</TableCell>
                                <TableCell className="text-right">{x.service.price.toFixed(2)} Eur</TableCell>
                                {user.scope === "all" && <TableCell>{x.statuss === "active" ? "Aktīva" : "Atteikta"}</TableCell>}
                                {user.scope === "all" && <TableCell><Button disabled={!x.canCancel} onClick={()=>cancelbooking(x)}>Atcelt</Button></TableCell>}

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

                <Pagination >
                    <PaginationContent className="pagination flex-wrap w-full">
                        {data?.links.map((x:any) => <PaginationItem key={x.label}>
                            <PaginationLink isActive={data?.current_page == x.label} onClick={() => setCurrent(Number(x.label) ? Number(x.label) : x.label === "&laquo; Previous" ? prev : next)}>{x.label == "&laquo; Previous" ? "<" : x.label == "Next &raquo;" ? ">" : x.label}</PaginationLink>
                        </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>

            </CardContent>
        </Card>
    )
} 
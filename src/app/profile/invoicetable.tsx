import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import moment from "moment";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { Download } from "lucide-react";
import Invoicefilters from "./invoiceFilters";

export default function InvoiceTable({ scope }) {
    const [data, setData] = useState()
    const router = useRouter()
    const [current, setCurrent] = useState(1)

    useEffect(() => {
        getdata()
    }, [current])

    const getdata = (month) => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };
        const endpoint = scope === "all" ? "getCustomerInvoices" : "getSpecialistInvoices"

        axios.post(`http://localhost:8000/api/${endpoint}`, { month, current }, { headers })
            .then(response => {
                setData(response.data)
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    const getinvoice = (invoice) => {
        let extension = invoice.invoice.split(/[#?]/)[0].split('.').pop().trim()
        const link = document.createElement('a');
        if (extension === ("jpg" || "png" || "jpeg")) {
            link.href = `http://localhost:8000/storage/${invoice.invoice}`;
        } else {
            link.href = invoice.invoice;

        }
        link.target = '_blank'; // Open in a new tab
        link.rel = 'noopener noreferrer'; // Security measure
        link.setAttribute('download', `aa.pdf`);
        document.body.appendChild(link);
        link.click();

    }

    const statusspaid = (invoice) => {
        let token = Cookies.get('token')
        const headers = { 'Authorization': 'Bearer ' + token };

        axios.post(`http://localhost:8000/api/updateInvoice`, invoice, { headers })
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

    return (
        <>
            <Card className="w-[985px] mt-2 p-4 card">
                <CardHeader>

                    <CardTitle>Tavi rēķini</CardTitle>
                </CardHeader>
                <CardContent>
                    <Invoicefilters getdata={getdata} />
                    {/* te vajag arī serach by customer.name un serial_number */}
                    <Table className="max-h-[750px] mt-4">
                        <TableCaption>Saraksts ar Jums adresētiem rēķiniem.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rēķina nr.</TableHead>
                                <TableHead>Izrakstīšanas datums</TableHead>
                                <TableHead>{scope === "all" ? "Paklpojumu sniedzējs" : "Pakalpojuma saņēmējs"}</TableHead>
                                <TableHead>Pakalpojums</TableHead>
                                <TableHead className="text-right">Apmaksas datums</TableHead>
                                <TableHead className="text-right">Cena</TableHead>
                                <TableHead>Iespējas</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data?.map((x) => (
                                <TableRow key={x.id} >
                                    <TableCell>{x.serial_number}</TableCell>
                                    <TableCell>{moment(x.created_at).format("DD.MM.yyyy HH:mm")}</TableCell>
                                    <TableCell className="font-medium">{scope === "all" ? x.specialist?.name : x.customer?.name}</TableCell>
                                    <TableCell>{x.service}</TableCell>
                                    <TableCell>{x.paid_date ? moment(x.paid_date).format("DD.MM.yyyy HH:mm") : ""}</TableCell>
                                    <TableCell className="text-right">{(x.price / 100)?.toFixed(2)} Eur</TableCell>
                                    <TableCell><div className="flex flex-row">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger onClick={() => { getinvoice(x) }}>
                                                    <Download />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Lejupielādēt</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        {scope === "business" && <Button className="ml-4" onClick={() => statusspaid(x)} disabled={x.paid_date}>Apmaksāts</Button>}</div></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                    <Pagination>
                        <PaginationContent className="pagination flex-wrap w-full">
                            {data?.links?.map(x => <PaginationItem key={x.label}>
                                <PaginationLink isActive={data?.current_page == x.label} onClick={() => setCurrent(Number(x.label) ? Number(x.label) : x.label === "&laquo; Previous" ? prev : next)}>{x.label == "&laquo; Previous" ? "<" : x.label == "Next &raquo;" ? ">" : x.label}</PaginationLink>
                            </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>

                </CardContent>
            </Card>
        </>
    )
}
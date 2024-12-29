'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Trash } from "lucide-react";
import moment from "moment";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Addvacation from "./addvacation";
import { Message } from "postcss";

interface inprops {
    setActiveTab: (arg: string) => void
}

export default function Vacations(props: inprops) {
    const [current, setCurrent] = useState(1)
    const [data, setdata] = useState<any>()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    let prev = current - 1 > 1 ? current - 1 : 1
    let next = current + 1 < data?.last_page ? current + 1 : data?.last_page

    useEffect(() => {
        getdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current])

    let token = Cookies.get('token')

    const getdata = () => {
        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getvacationbyspecid`, { current }, { headers })
            .then(response => setdata(response.data))
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    const deletevacation = (id: number) => {
        axios.delete(`${process.env.NEXT_PUBLIC_REQUEST_URL}/deletevacation/${id}`)
            .then(response => {
                if (response.data.status == 1) { toast.success(response.data.msg) } else { toast.error(response.data.msg) }
                getdata()
            })
    }

    const  getmessage = (message: Message) => {
        toast.success(message.message)
    }

    return (
        <div>
  
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent aria-label="Jauna brīvdiena" aria-describedby={undefined}>
                    <DialogTitle>Pieteikt jaunu brīvdienu</DialogTitle>
                    <Addvacation setTab={props.setActiveTab} getmessage={getmessage} setOpen={setOpen}/>
                </DialogContent>

                <DialogTrigger asChild>
                    <Button><Plus />Pieteikt</Button>
                </DialogTrigger>
            </Dialog>
            <div>
                <Table className="max-h-[750px] mt-4">
                    <TableCaption>Saraksts ar pieteiktajām brīvdienām</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Brīvdienas datums</TableHead>
                            <TableHead>Pieteikšanas datums</TableHead>
                            <TableHead>Iespējas</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data.map((x: any) => (
                            <TableRow key={x.id} >
                                <TableCell>{moment(x.date).format("DD.MM.yyyy")}</TableCell>
                                <TableCell>{moment(x.created_at).format("DD.MM.yyyy HH:mm")}</TableCell>

                                <TableCell><div className="flex flex-row">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger >
                                                <Trash onClick={() => deletevacation(x.id)} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Dzēst</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>

            <Pagination>
                <PaginationContent className="pagination flex-wrap w-full">
                    {data?.links?.map((x: any, index: number) => <PaginationItem key={index}>
                        <PaginationLink isActive={data?.current_page == x.label} onClick={() => setCurrent(Number(x.label) ? Number(x.label) : (x.label === "&laquo; Previous" || x.label == "pagination.previous") ? prev : next)}>{(x.label == "&laquo; Previous" || x.label == "pagination.previous" ) ? "<" : (x.label == "Next &raquo;" || x.label == "pagination.next")? ">" : x.label}</PaginationLink>
                    </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    )
}
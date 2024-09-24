import React from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import moment from "moment";
import { Button } from "@/components/ui/button";
import axios from "axios"
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

export default function Addbreak({ data }: { data: Date[] | undefined }) {
    const router = useRouter()
    let token = Cookies.get('token')

    const savevacation = () => {

        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post('http://localhost:8000/api/savevacation', data, { headers })
            .then(response => console.log(response))
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    return (
        <DialogContent className="max-w-[450px] flex items-center justify-center flex-col ">
            <DialogHeader className="text-center sm:text-center">
                <DialogTitle>Atzīmēt kā brīvdienas</DialogTitle>
            </DialogHeader>
            <div style={{ maxHeight: 300, overflow: "auto", lineHeight: 2 }}>
                {data && data.map(x => <div>{moment(x).format('dddd, Do MMMM YYYY')}</div>)}
            </div>
            <DialogFooter>
                <Button variant="outline" >Atcelt</Button>
                <Button type="submit" onClick={savevacation}>Saglabāt</Button>
            </DialogFooter>
        </DialogContent>
    )

}
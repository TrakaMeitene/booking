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

interface type{
    data: any,
    close: ()=>void,
    getmessage: (arg0: {message: string}) => void
}
export default function Addbreak( props:type) {

    const router = useRouter()
    let token = Cookies.get('token')


    const savevacation = () => {

        const headers = { 'Authorization': 'Bearer ' + token };
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/savevacation`, props.data, { headers })
            .then(response =>{ if(response.data.length > 0){
                props.getmessage({message: "Dati saglabāti veiksmīgi!"})
                props.close()
            }}) 
            .catch(function (error) {
                if (error.response.status == 401) {
                    return router.push('/login')
                }
            })
    }

    return (
        <>
        <DialogContent className="max-w-[450px] flex items-center justify-center flex-col ">
            <DialogHeader className="text-center sm:text-center">
                <DialogTitle>Atzīmēt kā brīvdienas</DialogTitle>
            </DialogHeader>
            <div style={{ maxHeight: 300, overflow: "auto", lineHeight: 2 }}>
                {props.data && props.data.map((x: moment.MomentInput) => <div>{moment(x).format('dddd, Do MMMM YYYY')}</div>)}
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={props.close}>Atcelt</Button>
                <Button type="submit" 
                onClick={savevacation}
                >Saglabāt</Button>
            </DialogFooter>
        </DialogContent>
        </>
    )

}
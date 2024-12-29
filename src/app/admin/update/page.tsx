

'use client'
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { User } from "../partscomponents/header";
import axios from "axios";
import { useRouter } from 'next/navigation'


export default function Upgrade(){
    const [user, setUser] = useState<User>()
    const router = useRouter()

    useEffect(() => {
      getuser()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const getuser = () => {
      let token = Cookies.get('token')
    
      const headers = { 'Authorization': 'Bearer ' + token };
      axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/user`, {}, { headers })
        .then(response => {
          if (response.data.scope === "business") {
            setUser(response.data)
          }

          if(response.data.abonament != "bezmaksas"){
            return router.push("/invoices")
          }
        })
    
    }

    return(
        <main id="update">
                  <Card className="h-[150px] mt-2 ml-2 mb-2">
                <CardContent>
                    <CardHeader>
                        <CardTitle>Abonaments</CardTitle>
                    </CardHeader>
                    <p className="font-bold">Jums ir aktīvs - {user?.abonament} abonaments</p>
                   {user?.abonament === "bezmaksas" && <Button className="mt-2 ">Mainīt uz Biznesa plāns</Button>}
                </CardContent>
            </Card>
        </main>
    )
}
'use client'
import React, {useState} from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import  axios from "axios"

export default function LoginForm() {
  type FormValues = {
    email: string
  }

  const { register, handleSubmit } = useForm<FormValues>();

  const sendrecovery =(email:FormValues)=>{

    axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/recoveremail`, email)
    .then(response => {
      if(response.data === ""){
        toast.error('Kaut kas nogāja greizi! Mēģini vēlreiz. ')
      }else{
        toast.success(response.data.status)
      }
    }
    )

  }

  return (
    <div className="flex  justify-center items-center h-[100vh] bg-muted">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Aizmirsi paroli?</CardTitle>
        <CardDescription>
          Ievadi e-pastu, lai varam nosūtīt paroles atjaunošanas datus
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(sendrecovery)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Epasts *</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              {...register('email')}
            />
          </div>
        
          <Button type="submit" className="w-full" >
           Nosutīt
          </Button>
        </div>
        </form>

        <div className="mt-4 text-center text-sm flex flex-col">
       <p>Tev vēl nav savs konts?</p>
                <Link href={`/login`} className="underline">
                  <Button variant="outline" className="w-full" >Izveidot</Button>
                </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

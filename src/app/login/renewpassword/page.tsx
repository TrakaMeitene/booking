'use client'
import React, { useState, } from "react"
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
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios"
import { Message } from "@/app/admin/profile/page"


export default function LoginForm() {
    const [password, setPaswword] = useState<string>()
    const [validation, setValidation] = useState<Message>()
    const { register, handleSubmit } = useForm<FormValues>();

    const urlSearchString = window.location.search;

    const params = new URLSearchParams(urlSearchString);
   
   let token = params.get('token');

    type FormValues = {
        password: string,
        email: string,
        token: string
    }


    const compare = (e:any) => {
        const value = e.target.value
        if (value != password) {
            setValidation({ 'type': "error", 'message': "Paroles nesakrīt!" })
        } else {
            setValidation(undefined)
        }
    }

    const resetpassword: SubmitHandler<FormValues> = (data) => {
        axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/passwordreset`, { 'password': password, 'email': data.email, 'token': token })
            .then(response => {
                if (response.data === "") {
                    toast.error('Kaut kas nogāja greizi! Mēģini vēlreiz. ')
                } else {
                    toast.info(response.data.status)
                }
            })
    }

    return (
        <div className="flex  justify-center items-center h-[100vh]">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Atjauno paroli</CardTitle>
                    <CardDescription>
                        Ievadi jauno paroli un otrā laukā to atkārto.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(resetpassword)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-pasts</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    {...register('email')}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Parole</Label>

                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    onChange={(e) => setPaswword(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Parole</Label>

                                <Input
                                    id="password2"
                                    type="password"
                                    required
                                    style={{ border: validation?.type ? "1px solid red" : "" }}
                                    onChange={compare}

                                />
                                {validation?.message && <p className="text-[12px] text-red-500">{validation?.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" >
                                Atjaunot
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

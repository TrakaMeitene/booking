'use client'
import React, { Suspense, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FaCheck } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
interface FormValues {
    Name: string
    Email: string,
    Password: string,
    scope: string,
    urlname: string
}

export default function Register() {

    const searchParams = useSearchParams()

    const type = searchParams.get('type')

    const [success, setSuccess] = useState({ type: "", message: "" })
    const [selectedOption, setSelectedOption] = useState(type || "all")
    const router = useRouter()

    const registeruser = (data: FormValues) => {
        data.scope = selectedOption
        data.urlname = data.Name.toLocaleLowerCase('tr').replace(/ /g, "-")

        try {
            axios.post(`${process.env.NEXT_PUBLIC_REQUEST_URL}/register`, data)
                .then(response => {
                    if (response.data.user?.id) {
                        setSuccess({ type: "success", message: "Reģistrācija veiksmīga!" })
                        setTimeout(() => {
                            router.push('/login')
                        }, 3000);
                    } else {
                        setSuccess({ type: "error", message: "E-pasts jau ir reģistrēts!" })
                    }
                })
        } catch (error) {
            setSuccess({ type: "error", message: "E-pasts jau ir reģistrēts!" })
        }
    }
    const { register, handleSubmit } = useForm<FormValues>();



    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl ">
                <Card className="overflow-hidden ">
                    <CardContent className="grid p-0 md:grid-cols-2">

                        <div className="mx-auto grid w-[350px] gap-6 p-4">
                            {success.type != "" && <Alert style={{ border: "1px solid green" }} variant={success.type === "success" ? null : "destructive"}>
                                {success.type === "success" ? <FaCheck color="green" /> : <IoCloseCircleOutline color="red" />}

                                <AlertTitle>{success.message}</AlertTitle>
                                <AlertDescription>Dodies atpakaļ uz ielogošanās formu un ienāc sistēmā! </AlertDescription>
                            </Alert>}
                            <div className="grid gap-2 text-center">

                                <h1 className="text-3xl font-bold">Izveido kontu `Pieraksts pie` </h1>
                                <p className="text-balance text-muted-foreground">
                                    Ielogojies vai izveido savu kontu.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit(registeruser)}>

                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Vārds Uzvārds *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Jānis Bērziņš"
                                            required
                                            {...register('Name')}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Epasts *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            {...register('Email')}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Parole *</Label>

                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            {...register('Password')}
                                        />
                                    </div>
                                    <Suspense>
                                        <Select
                                            defaultValue={selectedOption}
                                            onValueChange={(value) => {
                                                setSelectedOption(value)
                                            }}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Konta tips" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="business">Biznesa, speciālista konts</SelectItem>
                                                <SelectItem value="all">Lietotāja konts</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Suspense>
                                    <Button type="submit" className="w-full"
                                    >
                                        Reģistrēties
                                    </Button>

                                </div>
                            </form>
                        </div>

                        <div className="hidden bg-muted lg:block" >
                            <Image
                                src="/asset3.png"
                                alt="Image"
                                width="1920"
                                height="1080"
                                className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>

                    </CardContent>
                </Card >
            </div >
            </div>


            )
}
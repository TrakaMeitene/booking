'use client'
import React, { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Alertcomp from "@/app/admin/partscomponents/alert";


export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export default function Signin() {
  type FormValues = {
    email: string,
    password: string,
    scope: string | null
  }
  const { register, handleSubmit } = useForm<FormValues>();
  const [message, setMessage] = useState()

  const router = useRouter()

  const searchParams = useSearchParams()

  const type = searchParams.get('type')

  const login = (data: FormValues) => {
    data.scope = type
    axios.post('http://localhost:8000/api/logins', data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        console.log(response)
        if (response.data.token) {
          Cookies.set("token", response.data.token);
          if (response.data.user.scope === "business") {
            router.push('/admin/calendar')
          } else {
            router.push('/')
          }
        } else {
          setMessage(response.data)
        }
      })
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-full">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          {message && <Alertcomp success={message} />}
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Pieslēdzies "Pieraksts pie" </h1>
            <p className="text-balance text-muted-foreground">
              Ielogojies vai izveido savu kontu.
            </p>
          </div>
          <form onSubmit={handleSubmit(login)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Epasts</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register('email')}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Parole</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Aizmirsi paroli?
                  </Link>
                </div>
                <Input id="password" type="password" required  {...register('password')}
                />
              </div>
              <Button type="submit" className="w-full">
                Pieslēgties
              </Button>
              <div className="mt-4 text-center text-sm">
                Tev vēl nav savs konts?{" "}
                <Link href={`/login/register?type=${type}`} className="underline">
                  Izveidot
                </Link>
              </div>


              <div style={{ borderBottom: "1px solid gray" }}></div>
              <p className="mt-4 text-center text-sm">
                Vai pieslēdzies ar sociālo tīklu kontu
              </p>
              <Button variant="outline" className="w-full">
                Pierakstīties ar Google
              </Button>
              <Link href="http://localhost:8000/auth/redirect">
                <Button variant="outline" className="w-full" >
                  Pierakstīties ar Facebook
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden bg-muted lg:block">
        <Image
          src="/logo1.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
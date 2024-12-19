import React from "react";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import "../login/login.css"

export default function Loginbefore() {
  return (
    <div className="w-full lg:grid lg:min-h-[800px] lg:grid-cols-2 xl:min-h-[800px] h-full">
      <div className="flex items-center justify-center py-12 px-12">
        <div className="mx-auto grid  gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Norādi savu virzienu</h1>

          </div>
          <div className=" clienttype flex flex-col justify-center items-center">
            <div className="w-full">
              <Link href={{
                pathname: 'login/signin',
                query: { type: 'business' },
              }}>
                <Button className="card">
                  <h2>Biznesam -&#853;</h2>
                  <p>Pārvaldi savu biznesu, vizītes, klientus. </p>
                </Button>
              </Link>
            </div>
            <div className="mt-4">
              <Link href={{
                pathname: 'login/signin',
                query: { type: 'all' },
              }}>
                <Button className="card">
                  <h2>Visiem -&#853;</h2>
                  <p className="text-wrap text-left">Meklē speciālistus, pieraksties ātri un ērti sev vēlamā laikā!</p>
                </Button>
              </Link>
            </div>

          </div>

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
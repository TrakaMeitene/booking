import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";

import "../login/login.css"
import { Card, CardContent} from "@/components/ui/card";

export default function Loginbefore() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
      <Card className="overflow-hidden">
      <CardContent className="grid p-0 md:grid-cols-2">
              <div className="flex items-center justify-center py-12 px-12">
        <div className="mx-auto grid  gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Norādi savu virzienu</h1>

          </div>
          <div className=" clienttype flex flex-col justify-center items-center">
            <div >
              <Link href={{
                pathname: 'login/signin',
                query: { type: 'business' },
              }}>
                <Button className="card">
                  <span className="flex flex-row"><h2>Biznesam </h2><ArrowRight /></span>
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
                <span className="flex flex-row"><h2>Visiem</h2><ArrowRight /></span>
                <p className="text-wrap text-left">Meklē speciālistus, pieraksties ātri un ērti sev vēlamā laikā!</p>
                </Button>
              </Link>
            </div>

          </div>

        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/asset3.png"
          alt="Image"
          width="450"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      </CardContent>
      </Card>
    </div>
    </div>

  )
}
import Link from "next/link";
import React from "react";

export default function Sucesspayment(){
    return(
        <main id="notfound" className=" flex justify-center items-center flex-col h-[80vh]">
        <h2 className="text-7xl text-center">Esat abonējis "Pieraksts Pie" biznesa abonamentu!</h2>
        <Link href="/admin/calendar" className="underline">Atgriezties uz sākumu</Link>
     </main>
    )
}
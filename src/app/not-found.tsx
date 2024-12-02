import Link from "next/link";
import React from "react";

export default function Custom404(){
    return(
        <section  id="notfound" className="home flex justify-center items-center flex-col">
           <h2 className="text-7xl">Šeit nekā nav</h2>
           <Link href="/" className="underline">Atgriezties uz sākumu</Link>
        </section>
    )
}
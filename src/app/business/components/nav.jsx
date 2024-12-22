'use client'
import React from "react";
import "../App.css"
import logo from "../../assets/logo1.png"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
 
export const metadata = {
    title: "Pieraksts Pie",
    description: "Rezervāciju sistēma pakalpojumu sniedzējiem Latvijā.",
    openGraph: {
      title: "Pieraksts Pie",
      description: "Rezervāciju sistēma pakalpojumu sniedzējiem Latvijā.",
      images: "./favicon.ico",
    }
  };

export default function Navigation(){

    const scroll=()=>{
        if(typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    return(
        <nav className="landingnav">
            <span>
        <a href="#home"  id="scroll" onClick={scroll}>
            <Image
            src={logo}
            width={70}
            height={70}
            alt="logo"
            />
            </a>
        <ul>
            <li>
                <a href="#features" >Iespējas</a>
            </li>
            <li>
                <a href="#pricing">Cenas</a>
            </li>
        </ul>
        </span>
        <Button style={{marginTop: 0}} className="button-black">
<Link href="/login">
Ielogoties
</Link>
        </Button>
    </nav>
    )
}
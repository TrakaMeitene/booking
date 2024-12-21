import React from "react";
import Specialistpage from "./specialist";
import Nav from "@/app/components/nav";

 
export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = (await params).id
   
    // fetch data
    const product = await fetch(`https://api.pierakstspie.lv/api/getspecialistapi?id=${id}`).then((res) => res.json())
   
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: product.name,
      description: product.bio,
      openGraph: {
        title: product.name,
        description: product.bio,
        images: [`https://api.pierakstspie.lv/storage/${product.avatar}`, ...previousImages],
      },
    }
  }


export default async function Specialistlayout({ params, searchParams }){

    return (
        <>
        <Nav/>
        <Specialistpage/>
        </>
    )
}



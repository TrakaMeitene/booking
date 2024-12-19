'use server'
import React from "react";
import Specialistpage from "./specialist";
import Nav from "@/app/components/nav";

// type Props = {
//   params: Promise<{ id: string }>
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }
 
// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = (await params).id
 
//   // fetch data
//   const product = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_URL}/getspecialistapi`, {id: id}).then((res) => res.json())
 
//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []
 
//   return {
//     title: product,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }
 


export default async function Specialistlayout(){

    return (
        <>
        <Nav/>
        <Specialistpage/>
        </>
    )
}
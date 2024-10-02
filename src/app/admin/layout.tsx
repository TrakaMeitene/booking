import React from "react";
import Aside from "./partscomponents/aside";

export default function Layout({children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return(
<>
<Aside />
{children}


</>
    )
}
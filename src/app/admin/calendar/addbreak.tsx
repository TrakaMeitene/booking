import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import moment from "moment";

export default function Addbreak({data}: { data: Date[]|undefined } ){
    return(
<DialogContent className="max-w-[450px] flex items-center justify-center flex-col ">
            <DialogHeader className="text-center sm:text-center">
                <DialogTitle>Atzīmēt kā brīvdienas</DialogTitle>
            </DialogHeader>
      {data && data.map(x => <div>{moment(x).format('dddd, Do MMMM YYYY')}</div>)}
        </DialogContent>
    )
    
}
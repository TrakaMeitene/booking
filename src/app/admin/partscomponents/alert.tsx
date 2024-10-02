import React from "react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { FaCheck } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function Alertcomp({ success }) {
    return (
        <>
        {success.type != "" && <Alert variant={success.type === "success" ? null : "destructive"} className="w-[350px] mt-2">
        {success.type === "success" ? <FaCheck color="green" /> : <IoCloseCircleOutline color="red" />}
            <AlertTitle>{success.message}</AlertTitle>
        </Alert>}
        </>
    )
}
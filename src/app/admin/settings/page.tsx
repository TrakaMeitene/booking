'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import React, { useState } from "react";
import Settings from "./settings";
import Vacations from "./vacations";
import SpecialAvailability from "./specialtimes";

export default function Settingstabs(){

    const [activeTab, setActiveTab] = useState("Uzstādījumi")
    return(
        <main className="bg-white">
        <Tabs value={activeTab} onValueChange={setActiveTab} >
        <TabsList>
            <TabsTrigger value="Uzstādījumi">Uzstādījumi</TabsTrigger>
            <TabsTrigger value="Brīvdienas">Brīvdienas</TabsTrigger>
            <TabsTrigger value="Pakalpojumu laiki">Pakalpojumu laiki</TabsTrigger>

        </TabsList>
        <TabsContent value="Uzstādījumi"> <Settings/></TabsContent>
        <TabsContent value="Brīvdienas"><Vacations setActiveTab={setActiveTab}/></TabsContent>
        <TabsContent value="Pakalpojumu laiki"><SpecialAvailability /></TabsContent>

    </Tabs>
    </main>
    )
}
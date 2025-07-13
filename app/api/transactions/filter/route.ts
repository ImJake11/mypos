import { prisma } from "@/app/lib/utils/db/prisma";
import { NextResponse } from "next/server";


export async function GET() {


    try {
        const productName = "The";

        const data = await prisma.transactionDetails.findMany({
            where: {
               purchasedItems:{
                some:{
                    
                }
               }
            }
        })
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }



}
"use server"
import {revalidatePath} from 'next/cache' 
import { prisma } from "@/src/lib/prisma"
import { orderIdSchema } from "@/src/schema"

export async function completeOrder(formdata: FormData) {
    const data = {
        orderId: formdata.get('order_id')!
    }
   

    const result = orderIdSchema.safeParse(data)
    if (result.success) {
        try {
            await prisma.order.updateMany({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status:true,
                    orderReadyAt: new Date(Date.now())
                }
                
            })
            revalidatePath('/admin/orders')
        } catch (error) {
            console.log(error)
        }
    }
    
}
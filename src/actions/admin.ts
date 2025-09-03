"use server"
import { UserRole } from "@/generated/prisma";
import { currentUser } from "@/lib/auth"

 
export const admin = async ()=> {
    const user = await currentUser();

    if(user?.role !== UserRole.ADMIN){
        return {error : 'Forbidden'}
    }

    return {success : "Allowed!"}
}
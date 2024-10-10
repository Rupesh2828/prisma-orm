import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface UpdatedUser{
    firstname:string,
    email:string,
    username: string
}

async function UpdateUser({firstname,email,username} : UpdatedUser) {

    const res = await prisma.user.update({
        where: {email},
        data:{
            firstname,
            email,
            username
        }
    })
    
    console.log(res);
    
}

UpdateUser({
    firstname: "Rupesh",
    email: "rupesh@gmail.com",
    username: "rupesh_28",
  });
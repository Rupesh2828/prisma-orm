// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient()

// async function createUser(username: string, email: string, firstname: string, lastname: string, password: string) {
//     const result = await prisma.user.create({
//         data: {
//             email,
//             username,
//             firstname,
//             lastname,
//             password
//         },
//         select: {
//             id: true,
//             username: true,
//             password: true
//         }
//     })

//     console.log(result);


// }

// createUser('amit', 'amit@gmail.com', 'amit', 'f', '12354')
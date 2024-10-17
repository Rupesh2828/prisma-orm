import { Request, Response } from "express"
import bcrypt from "bcrypt";

import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient()

interface createInterface {
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    email: string
}


const createUser = async (req: Request, res: Response): Promise<any> => {
    const { username, firstname, lastname, password, email }: createInterface = req.body
    console.log("Request Body:", req.body);

    if (
        [username, firstname, lastname, password, email].some(
            (field) => field?.trim() === ""
        )
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10)


        const user = await prisma.user.create({
            data: {
                username,
                firstname,
                lastname,
                password: hashedPassword,
                email


            },
            select: {
                id: true,
                username: true,
                email: true

            }

        })

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error("Error while creating user:", error);
        res.status(500).json({ message: "Failed to create user" });
    }
}



interface TodoInterface {
  title: string;
  description: string;
  completed?: boolean;
}

const createTodo = async (req: Request, res: Response): Promise<any> => {
    // console.log("Creating todo for user ID:", req.params.userId);
  const { title, description, completed }: TodoInterface = req.body;
  console.log("Body :", req.body);
  

  // Validate title and description
  if (!title || !description) {
    return res.status(400).json({ message: "Title and Description are required" });
  }


  const userId = parseInt(req.params.userId, 10); // Get userId from params and parse it
  const existingUser: User | null = await prisma.user.findUnique({
      where: {
          id: userId // Use the parsed userId here
      }
  });

  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist" });
}

  const newTodo = await prisma.todo.create({
    data: {
      title,
      description,
      completed: completed ?? false,
      userId: existingUser.id, // Link todo to the existing user
    },
  });

  return res.status(201).json(newTodo);
};

const fetchTodo = async (req: Request, res: Response): Promise<any> => {
    const todoId = parseInt(req.params.todoId, 10); // Assuming todoId is passed as a route parameter
  
    // Fetch the todo by its ID
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    //   include: {
    //     user: true, // Optionally include the user who created the todo
    //   },
    });
  
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
  
    return res.status(200).json(todo);
  };
  


export {
    createUser,
    createTodo,
    fetchTodo
}
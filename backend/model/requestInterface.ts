import { UserInterface } from "./userSchemaInterface";
import { Request } from 'express'

interface LoginInterface
{
    email:string;
    password:string;
}

interface CreateUserInterface extends LoginInterface
{
    username: string;
    gender: string;
    role: string;
    birthDay: string;
    status: string;
    avatarUrl: string;
}

interface ModifyUserDataInterface
{
    username: string;
    email: string;
    gender: string;
    role: string;
    status: string;
    description: string;
    startDate: Date;
    dueDate: Date;
}

interface AuthRequest extends Request
{
    user?: UserInterface;
    foundUser?: UserInterface | UserInterface[] | null;
    updateData?: Record<string, any> | null;
}

interface BodyInterfaceForDelete
{
    status:string;
    banListId:string;
}

export type {LoginInterface, CreateUserInterface, ModifyUserDataInterface, AuthRequest, BodyInterfaceForDelete}

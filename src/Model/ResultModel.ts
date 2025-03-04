import { UserDataInterface } from "./TablePageModel";

interface ResultInterface
{
    data: RegisterDataInterface;
}

interface RegisterDataInterface
{
    authToken: string;
    username: string;
    role: string;
    avatarUrl:string;
    status: string;
}

interface GetResultInterface
{
    success:boolean;
    authtoken?:string;
    foundUser: UserResultDataInterface | UserResultDataInterface[];
}

interface UserResultDataInterface extends UserDataInterface
{
    _id:string;
    avatarUrl?:string;
    bannedDetails?: BannedDetailsInterface;
    deleteDetails?: DeleteDetailsInterface;
}

interface BannedDetailsInterface
{
    _id:string;
    description:string;
    startDate: Date;
    dueDate: Date;
}

interface DeleteDetailsInterface
{
    _id:string;
    startDate: Date;
    dueDate: Date;
}

export type {ResultInterface, GetResultInterface, UserResultDataInterface, BannedDetailsInterface, DeleteDetailsInterface}
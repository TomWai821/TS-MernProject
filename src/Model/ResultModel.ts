import { UserDataInterface } from "./UserTableModel";

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
    bannedDetails?: DetailsInterfaceForBannedAndDelete;
    deleteDetails?: DetailsInterfaceForBannedAndDelete;
}

interface DetailsInterfaceForBannedAndDelete
{
    _id:string;
    userID:string;
    description:string;
    startDate: Date | string;
    dueDate: Date | string;
    status:string;
}

interface DefinationResultInterface
{
    success:boolean;
    foundData: DefinationInterface | DefinationInterface[];
}

interface DefinationInterface
{
    _id:string;
    shortName:string;
    language?:string;
    genre?:string;
}

interface DefinationState
{
    Genre: DefinationInterface[];
    Language: DefinationInterface[];
}

export type {ResultInterface, RegisterDataInterface, GetResultInterface, UserResultDataInterface, DetailsInterfaceForBannedAndDelete, DefinationResultInterface, DefinationInterface, DefinationState}
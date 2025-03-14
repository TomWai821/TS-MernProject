import { BookDataInterface } from "./BookTableModel";
import { DefinationInterface, DetailsInterfaceForBannedAndDelete, UserResultDataInterface } from "./ResultModel";

interface CreateModalInterface
{
    value?: number;
    data?: any;
}

interface EditModalInterface
{
    value?: number;
    editData: UserResultDataInterface | DetailsInterfaceForBannedAndDelete | DefinationInterface | BookDataInterface;
    compareData: UserResultDataInterface | DetailsInterfaceForBannedAndDelete | DefinationInterface | BookDataInterface;
}

interface BanModalInterface
{
    _id:string;
    username:string;
    durationOption?:number;
    description?:string;
}

interface DeleteModalInterface
{
    _id:string;
    value:number;
    data: UserResultDataInterface | DefinationInterface | DefinationInterface;
}

interface DisplayDataModalInterface
{
    value:number;
    isAdmin:boolean;
    data:UserResultDataInterface | BookDataInterface;
}

interface ModalConfirmButtonInterface
{
    clickEvent:() => void;
    name:string;
    buttonType:string;
}

interface UserModalBody
{
    isAdmin?:boolean;
    data: UserResultDataInterface;
}

export type {CreateModalInterface, EditModalInterface, BanModalInterface, DeleteModalInterface, DisplayDataModalInterface, ModalConfirmButtonInterface, UserModalBody}
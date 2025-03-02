import { Dispatch, ReactNode, SetStateAction } from "react";
import { FindUserInterface, UserDataInterface } from "./TablePageModel";
import { UserResultDataInterface } from "./ResultModel";

interface ChildProps
{
    children: ReactNode;
}

// For Alert
interface AlertConfig
{
    AlertType: 'success' | 'info' | 'warning' | 'error';
    Message: string;
    open: boolean;
    onClose?: () => void;
}

interface AlertContextProps
{
    setAlertConfig: (config: AlertConfig | null) => void;
}

// For modal
interface ModalContextProps
{
    open: boolean;
    handleOpen: (content: ReactNode) => void;
    handleClose: () => void
    content: ReactNode;
}

interface ModalTemplateProps extends ChildProps
{
    title: string;
    cancelButtonName: string;
    cancelButtonEvent?: () => void;
}

interface UserContextProps
{
    AllUser: UserResultDataInterface[];
    BannedUser: UserResultDataInterface[];
    DeleteUser: UserResultDataInterface[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    fetchUser: (tableName: string, UserData: UserDataInterface | undefined, dateData: { startDate: Date; dueDate: Date; }) => Promise<void>;
    fetchAllUser: (page:number, amount:number) => void;
    createUser: (registerPosition:string, username:string, email:string, password:string, role:string, gender:string, birthDay:string) => void;
    editUserData: (_id:string, username: string, email: string, gender: string, role: string) => void;
    changeUserstatus: (id:string, status:string, duration:number, description:string) => void;
}

interface TabPanelProps extends ChildProps
{
    index: number;
    value: number;
}

export type {ChildProps, AlertConfig, AlertContextProps, ModalContextProps, ModalTemplateProps, UserContextProps, TabPanelProps}
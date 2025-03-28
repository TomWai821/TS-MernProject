import { ReactNode } from "react";
import { BookDataInterface, ContactState, DefinitionState, LoanBookInterface, UserResultDataInterface } from "./ResultModel";
import { UserDataInterface } from "./UserTableModel";
import { BookTableDataInterface } from "./BookTableModel";
import { IsAdminInterface } from "./TablePagesAndModalModel";

export interface ChildProps
{
    children: ReactNode;
}

// For Alert
export interface AlertConfig
{
    AlertType: 'success' | 'info' | 'warning' | 'error';
    Message: string;
    open: boolean;
    onClose?: () => void;
}

export interface AlertContextProps
{
    setAlertConfig: (config: AlertConfig | null) => void;
}

// For modal
export interface ModalContextProps
{
    open: boolean;
    handleOpen: (content: ReactNode) => void;
    handleClose: () => void
    content: ReactNode;
}

export interface ModalTemplateProps extends ChildProps
{
    title: string;
    minWidth?: string;
    maxWidth?: string;
    width?:string;
    cancelButtonName: string;
    cancelButtonEvent?: () => void;
}

// For Context
export interface UserContextProps
{
    userData: UserResultDataInterface[][];
    fetchAllUser: () => Promise<void>;
    fetchUser: (type:string, UserData: UserDataInterface | undefined) => Promise<void>;
    createUser: (registerPosition:string, username:string, email:string, password:string, role:string, gender:string, birthDay:string) => void;
    editUserData: (userId:string, username: string, email: string, gender: string, role: string) => void;
    editBannedUserData: (userId:string, bannedListID: string, dueDate: Date, description: string) => void;
    changeUserStatus: (type:string, userId:string, status:string, ListID?:string, duration?:number, description?:string) => void;
    actualDeleteUser: (userId:string, deleteListID:string, status:string) => void;
}

export interface BookContextProps
{
    bookData:(BookDataInterface[] | LoanBookInterface[])[];
    fetchAllBook: () => Promise<void>;
    fetchBookWithFliterData: (tablename:string, bookname?:string, genreID?:string, languageID?:string) => Promise<void>;
    createBook: (image:File, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description:string, publishDate:string) => void;
    editBook: (bookID:string, bookname:string, genreID:string, languageID:string, publisherID:string, authorID:string, description:string) => void;
    deleteBook: (bookID:string) => void;
}

export interface SuggestBookContextProps
{
    suggestBook: (BookDataInterface[] | LoanBookInterface[])[];
    SelfLoanBook: LoanBookInterface[];
}

export interface DefinatonProps
{
    definition: DefinitionState;
    fetchAllDefinition: () => Promise<void>;
    createDefinition:(type:string, shortName:string, detailsName:string) => void;
    editDefinition:(type:string, id:string, shortName:string, detailsName:string) => void;
    deleteDefinition:(type:string, id:string) => void;
}

export interface ContactProps
{
    contact: ContactState;
    fetchAllContactData: () => Promise<void>;
    createContactData:(type:string, shortName:string, detailsName:string) => void;
    editContactData:(type:string, id:string, shortName:string, detailsName:string) => void;
    deleteContactData:(type:string, id:string) => void;
}

// For Tab Panel
export interface TabPanelProps extends ChildProps
{
    index: number;
    value: number;
}

// For ContentTableCell
export interface ContentTableCellProps extends ChildProps, IsAdminInterface
{
    TableName: string;
    value: number;
    isLoggedIn?: boolean;
    Information: UserResultDataInterface | BookDataInterface | BookTableDataInterface | LoanBookInterface;
}

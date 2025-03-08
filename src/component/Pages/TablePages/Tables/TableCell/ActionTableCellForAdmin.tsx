import { FC, Fragment } from "react"
import { ActionTableCellInterface, BookDataInterface } from "../../../../../Model/TablePageModel"
import { IconButton, TableCell, Tooltip } from "@mui/material";

import { UserResultDataInterface } from "../../../../../Model/ResultModel";
import { useModal } from "../../../../../Context/ModalContext";
import { DeleteButton, ImportantActionButtonSyntax } from "../../../../../Maps/FormatSyntaxMaps";

import EditUserModal from "../../../../Modal/User/EditUserModal";
import EditBookModal from "../../../../Modal/Book/EditBookModal";
import DeleteUserConfirmModal from "../../../../Modal/Confirmation/User/DeleteUserConfirmModal";
import DeleteBookModal from "../../../../Modal/Confirmation/Book/DeleteBookConfirmModal";
import BanUserModal from "../../../../Modal/User/BanUserModal";

import { Edit as EditIcon, Delete as DeleteIcon, Block as BlockIcon, LockOpen as LockOpenIcon, Restore as RestoreIcon } from '@mui/icons-material';
import UndoUserActivityModal from "../../../../Modal/Confirmation/User/UndoUserActivityModal";
import { StatusDetectionForAllUser, StatusDetectionForBannedUser, StatusDetectionForDeleteUser } from "../../../../../Controller/UserController/UserOtherController";

const ActionTableCellForAdmin: FC<ActionTableCellInterface> = (tableCellData) => 
{
    const { value, TableName, Information} = tableCellData;
    const userData = Information as UserResultDataInterface;

    const { handleOpen } = useModal();

    const openEditModal = () => 
    {
        switch (TableName) 
        {
            case "Book":
                const bookData = Information as BookDataInterface;
                handleOpen(<EditBookModal editData={bookData} compareData={bookData} value={value}  />);
                break;
                
            case "User":
                handleOpen(<EditUserModal editData={userData} compareData={userData} value={value}/>);
                break;
        }
    }

    const openDeleteModal = () => 
    {
        switch (TableName) 
        {
            case "Book":
                handleOpen(<DeleteBookModal {...Information as BookDataInterface} />);
                break;

            case "User":
                handleOpen(<DeleteUserConfirmModal value={value} {...userData} />);
                break;
        }
    }

    const openBannedModal = () => 
    {
        handleOpen(<BanUserModal {...Information as UserResultDataInterface}/>);
    }

    const openUndoActionModal = () => 
    {
        handleOpen(<UndoUserActivityModal value={value} {...userData}/>)
    }
    
    const UserActionTableCellForAdmin = 
    [
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Move To Banned List" , syntax:ImportantActionButtonSyntax, clickEvent:openBannedModal, icon:<BlockIcon />, disable: StatusDetectionForAllUser(userData.status).banned.disable},
            {title: "Move To Delete List", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />, disable: StatusDetectionForAllUser(userData.status).delete.disable}
        ],
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditModal, icon:<EditIcon />, disable:StatusDetectionForBannedUser(userData.bannedDetails?.status as string)},
            {title: "Unban User", syntax:ImportantActionButtonSyntax, clickEvent:openUndoActionModal , icon:<LockOpenIcon />, disable:StatusDetectionForBannedUser(userData.bannedDetails?.status as string)},
        ],
        [
            {title: "UnDelete user", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openUndoActionModal, icon:<RestoreIcon />, disable:StatusDetectionForDeleteUser(userData.deleteDetails?.status as string)},
            {title: "Delete(Actual)", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />, disable:StatusDetectionForDeleteUser(userData.deleteDetails?.status as string)},
        ]
    ]

    const BookActionTableCellForAdmin = 
    [
        {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openEditModal, icon:<EditIcon />},
        {title: "Delete(Actual)", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />},
    ]

    let actionsToRender: any[] = [];

    if(TableName === "User")
    {
        actionsToRender = UserActionTableCellForAdmin[value] || [];
    }
    else if
    (TableName === "Book" && value === 0)
    {
        actionsToRender = BookActionTableCellForAdmin;
    }

    return(
        <TableCell sx={{marginLeft: '20px'}}>
            {
                actionsToRender.map((actions, index) => 
                (
                    <Tooltip title={actions.title} key={index} arrow>
                        <IconButton sx={actions.syntax} onClick={actions.clickEvent} disabled={actions.disable}>
                            {actions.icon}
                        </IconButton>
                    </Tooltip>
                ))
            }
        </TableCell>
    );
}

export default ActionTableCellForAdmin
import { Box, Button, duration, Typography } from "@mui/material";
import { DeleteButton, ModalBodySyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import ModalTemplate from "../../../Templates/ModalTemplate";
import { BanModalInterface } from "../../../../Model/TablePageModel";
import { FC } from "react";
import { useModal } from "../../../../Context/ModalContext";
import BanUserModal from "../../User/BanUserModal";
import { dateOption } from "../../../../Maps/TextFieldsMaps";
import { useUserContext } from "../../../../Context/userContext";

const BanUserConfirmModal:FC<BanModalInterface> = (banData) => 
{
    const { _id, username, durationOption, description } = banData;
    const {handleOpen, handleClose} = useModal();
    const {changeUserstatus} = useUserContext();

    const returnBanUserModal = () => 
    {
        handleOpen(<BanUserModal username={username} _id={_id} durationOption={durationOption} description={description}/>);
    }


    const BanUser = (_id:string, duration:number, description:string) => 
    {
        handleClose();
        changeUserstatus(_id, "Banned", duration, description);
    }

    return(
        <ModalTemplate title={"Ban User Confirmation"} cancelButtonName={"No"}  cancelButtonEvent={returnBanUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to ban {username}?</Typography>
                <Typography>Duration: {dateOption[durationOption as number].label}</Typography>
                <Typography>Description: {description}</Typography>
            </Box>
            
            <Button onClick={() => BanUser(_id, dateOption[durationOption as number].value, description as string)} sx={{...DeleteButton}}>Yes</Button>
        </ModalTemplate>
    );
}

export default BanUserConfirmModal
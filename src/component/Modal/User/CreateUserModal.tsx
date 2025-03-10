import { ChangeEvent, FC, useState } from 'react'

import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { CreateUserInputField } from '../../../Maps/TextFieldsMaps';
import CreateUserConfirmModal from '../Confirmation/User/CreateUserConfirmModal';
import { GetCurrentDate } from '../../../Controller/OtherController';
import { UserDataInterface } from '../../../Model/UserTableModel';
import ModalConfirmButton from '../../UIFragment/ModalConfirmButton';

const CreateUserModal:FC = ({}) => 
{
    const [user, setUser] = useState({username: "", password: "", email: "", role: "User", status: "", gender: "Male", birthDay: GetCurrentDate("String") as Date});

    const {handleOpen} = useModal();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setUser({...user, [event.target.name] : event.target.value})
    }

    const OpenConfirmModal = () => 
    {
        handleOpen(<CreateUserConfirmModal {...user}/>);
    }
    
    return(
        <ModalTemplate title={"Create User Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            {
                CreateUserInputField.map((field, index) => 
                (
                    <TextField key={index} label={field.label} name={field.name} value={user[field.name as keyof UserDataInterface]}
                        type={field.type} size="small" onChange={onChange} select={field.select}>
                        {
                            field.select && field.options.map((option, index) => 
                            (
                                <MenuItem key={index} value={option}>{option}</MenuItem>
                            ))
                        }
                    </TextField>
                ))   
            }
            </Box>
            
            <ModalConfirmButton clickEvent={OpenConfirmModal} name={"Create"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default CreateUserModal;
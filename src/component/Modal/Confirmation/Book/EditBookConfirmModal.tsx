import { FC, JSX, useEffect, useState } from "react"
import { Avatar, Box, Button, Typography } from "@mui/material";

// Template
import ModalTemplate from "../../../Templates/ModalTemplate";

// Context
import { useModal } from "../../../../Context/ModalContext";

// Model
import { EditModalInterface } from "../../../../Model/ModelForModal";

// Another Modal
import EditBookModal from "../../Book/EditBookModal";

// Data (CSS Syntax)
import { BookDataInterfaceForEdit } from "../../../../Model/ResultModel";
import { useBookContext } from "../../../../Context/Book/BookContext";
import { BookImageFormatForEdit, displayAsRow, ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useContactContext } from "../../../../Context/Book/ContactContext";
import { useDefinitionContext } from "../../../../Context/Book/DefinitionContext";

const EditBookConfirmModal:FC<EditModalInterface> = (editModalData) => 
{  
    const {handleOpen, handleClose} = useModal();
    const {editBook} = useBookContext();
    const {contact} = useContactContext();
    const {definition} = useDefinitionContext();

    const {value, editData, compareData} = editModalData;

    const CompareData = compareData as BookDataInterfaceForEdit;
    const EditData = editData as BookDataInterfaceForEdit;
    const sameImage = (EditData.imageUrl === CompareData.imageUrl);
    const width = sameImage ? "400px" : "700px";

    const [differences, setDifferences] = useState<JSX.Element[]>([]);

    const generateChangeTypography = (editData:BookDataInterfaceForEdit, compareData:BookDataInterfaceForEdit) => 
    {
        let differences: JSX.Element[] = [];
        const ignoreList = ["imageUrl", "filename"]
    
        for (const key in compareData) 
        {
            if(ignoreList.includes(key))
            {
                continue;
            }

            if (editData[key as keyof BookDataInterfaceForEdit] !== compareData[key as keyof BookDataInterfaceForEdit]) 
            {
                differences.push(
                    <Typography key={key}>
                        {`- ${key}: ${compareData[key as keyof BookDataInterfaceForEdit]} -> ${editData[key as keyof BookDataInterfaceForEdit]}`}
                    </Typography>
                );
            }
        }
    
        if (differences.length === 0 && sameImage) 
        {
            differences.push(<Typography key={"nothingChange"}>- Nothing Changed</Typography>);
        }
    
        setDifferences(differences);
    };
   
    const returnEditBookModal = () => 
    {
        setDifferences([]);
        handleOpen(<EditBookModal value={value} editData={EditData} compareData={CompareData} />);
    }
    
    const editBookData = () => 
    {
        const genreID = definition.Genre.find((genreData) => genreData.genre === EditData.genre)?._id as string;
        const langaugeID = definition.Language.find((languageData) => languageData.language === EditData.language)?._id as string;
        const publisherID = contact.Publisher.find((publisherData) => publisherData.publisher === EditData.publisher)?._id as string;
        const authorID = contact.Author.find((authorData) => authorData.author === EditData.author)?._id as string;
        editBook(EditData._id, CompareData.filename, EditData.image as File, EditData.bookname, genreID, langaugeID, publisherID, authorID, EditData.description);
        handleClose();
    }

    useEffect(() => 
    {
        generateChangeTypography(EditData, CompareData);
    },
    [editData, compareData]);

    return(
        <ModalTemplate title={"Edit Book Record Confirmation"} cancelButtonName={"No"} width={width} cancelButtonEvent={returnEditBookModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to edit this book record?</Typography>
                <Typography sx={ModalRemarkSyntax}>Changes:</Typography>
                {!sameImage &&
                    ( 
                        <Box sx={{...displayAsRow, justifyContent: 'space-between', alignItems: 'center'}}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                <Avatar src={compareData.imageUrl} alt="Preview" variant="rounded" sx={BookImageFormatForEdit}/>
                            </Box>

                            <ArrowRightAltIcon sx={{width: '125px', height: '100px'}}/>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                <Avatar src={EditData.imageUrl} alt="Preview" variant="rounded" sx={BookImageFormatForEdit}/>
                            </Box>
                        </Box>
                    )
                } 
                {differences}
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            <Button variant='contained' onClick={editBookData}>Yes</Button>
        </ModalTemplate>

    );
}
export default EditBookConfirmModal
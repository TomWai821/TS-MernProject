import {  ChangeEvent, FC, useEffect, useState } from "react";
import { Box, TableContainer, Paper } from "@mui/material";

// Context
import { useBookContext } from "../../../Context/Book/BookContext";
import { useDefinitionContext } from "../../../Context/Book/DefinitionContext";

// Another Component
import BookFilter from "./Filter/BookFilter";
import CustomTab from "../../UIFragment/CustomTab";
import BookTabPanel from "./Tabs/BookTabPanel";
import TableTitle from "../../UIFragment/TableTitle";

// Model
import { BookSearchInterface } from "../../../Model/BookTableModel";
import { PagesInterface } from "../../../Model/TablePagesAndModalModel";

// Data (CSS SYntax and dropdown)
import { PageItemToCenter } from "../../../ArraysAndObjects/FormatSyntaxObjects";
import { BookTabLabel, PaginationOption } from "../../../ArraysAndObjects/TableArrays";
import { useContactContext } from "../../../Context/Book/ContactContext";

const BookPage:FC<PagesInterface> = (loginData) =>
{
    const { isLoggedIn, isAdmin } = loginData;
    const { bookData, fetchAllBookWithFliterData, fetchLoanBookWithFliterData } = useBookContext();
    const { definition } = useDefinitionContext();
    const { contact } = useContactContext();

    const SetTitle:string = isAdmin ? "Manage Books Record": "View Books";

    const [searchBook, setSearchBook] = useState<BookSearchInterface>({ bookname: "", username: "", status:"All", language: "All", languageID: "", genre: "All", genreID: "", author: "All", authorID: "", publisher: "All", publisherID: ""});
    const [tabValue, setTabValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);

    const defaultValue = { bookname: "", username: "", language: "All", status:"All", languageID: "", genre: "All", genreID: "",  author: "All", authorID: "", publisher: "All", publisherID: ""};

    const onChange = (event: ChangeEvent<HTMLInputElement>, index?: number) => 
    {
        const { name, value } = event.target;

        const fieldsMap: Record<string, {idKey: string, dataSource:any}> = 
        {
            "genre": {idKey: "genreID", dataSource: definition.Genre},
            "language": {idKey: "languageID", dataSource: definition.Language},
            "publisher": {idKey: "publisherID", dataSource: contact.Publisher},
            "author": {idKey: "authorID", dataSource: contact.Author},
        }
    
        if(fieldsMap[name])
        {
            const {idKey, dataSource} = fieldsMap[name];

            setSearchBook({...searchBook, [name]: value, [idKey]: index !== undefined && dataSource[index]?._id ? dataSource[index]._id : ""});
        }
        else
        {
            setSearchBook({ ...searchBook, [name]: value });
        }
    };

    const changeValue = (type:string, newValue: number) =>
    {
        switch(type)
        {
            case "Tab":
                setTabValue(newValue);
                break;

            case "Pagination":
                setPaginationValue(newValue);
                break;
            
            default:
                break;
        }
    }

    const SearchBook = () => 
    {
        switch(tabValue)
        {
            case 0:
                fetchAllBookWithFliterData(searchBook.bookname, searchBook.genreID, searchBook.languageID, searchBook.authorID, searchBook.publisherID);
                break;

            case 1:
                fetchLoanBookWithFliterData("AllUser", searchBook.bookname, searchBook.username, searchBook.status)
                break;
        }
        
    }

    useEffect(() => 
        { 
            if(!isAdmin) 
            { 
                setTabValue(0); 
            }
        },[isAdmin]
    )

    useEffect(() => 
        {
            setSearchBook(defaultValue);
        },[tabValue]
    )
     
    return( 
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={SetTitle} dataLength={bookData[tabValue].length}/>

            <BookFilter isAdmin={isAdmin} value={tabValue} onChange={onChange} searchData={searchBook} Search={SearchBook}/>

            <CustomTab isAdmin={isAdmin} value={tabValue} valueChange={changeValue} paginationValue={paginationValue} tabLabel={BookTabLabel} paginationOption={PaginationOption}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <BookTabPanel value={tabValue} isAdmin={isAdmin} bookData={bookData} paginationValue={paginationValue} isLoggedIn={isLoggedIn}/>
            </TableContainer>
        </Box>
    );
}

export default BookPage
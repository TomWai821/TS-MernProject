import { FC, Fragment } from "react"

// UI Fragment
import CustomTabPanel from "../../../UIFragment/CustomTabPanel"

// 
import LoanBookTable from "../Tables/Book/OnLoanBookTable"
import AllBookTable from "../Tables/Book/AllBookTable"

// Model
import { BookRecordTableInterface } from "../../../../Model/BookTableModel"

const BookTabPanel:FC<BookRecordTableInterface> = (TabData) =>
{
    const {value, bookData, paginationValue, changeValue, setSearchBook, searchBook} = TabData;
    
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value}>
                <AllBookTable bookData={bookData} value={value} paginationValue={paginationValue} changeValue={changeValue}
                    setSearchBook={setSearchBook} searchBook={searchBook}/>
            </CustomTabPanel>

            <CustomTabPanel index={1} value={value}>
                <LoanBookTable bookData={bookData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>
        </Fragment>
    )
}

export default BookTabPanel
import { FC } from "react"
import { Typography } from "@mui/material"

const TableTitle:FC<{type:string, dataLength:number}> = (tableTitleData) => 
{
    const {type, dataLength} = tableTitleData;
    return(
        <Typography sx={{fontSize: '24px'}}>{type} {dataLength === 0 ? "(Do not have any genre data currently)" : `Totally ${dataLength} Records`}</Typography>
    )
}

export default TableTitle
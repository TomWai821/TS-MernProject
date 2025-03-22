import { FC } from "react"
import { Avatar, Box, Typography } from "@mui/material";
import { DisplayDataModalBody } from "../../../../Model/ModelForModal"
import { displayAsColumn } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { UserResultDataInterface } from "../../../../Model/ResultModel";


const AllUserDataBody:FC<DisplayDataModalBody> = (AllUserData) => 
{
    const {data} = AllUserData;
    const Data = data as UserResultDataInterface;

    return(
        <Box sx={{...displayAsColumn, alignItems:'center', justifyContent: 'center'}}>
            <Avatar src={Data.avatarUrl ?? "/broken-image.jpg"} sx={{ width: "100px", height: "100px" }} />
            <Typography sx={{fontSize: '24px', padding: '15px'}}>{Data.role}</Typography>
            <Box sx={{ display: 'grid', gap: '20px 50px', gridTemplateColumns: '100%'}}>
                <Typography>Username: {Data.username}</Typography>
                <Typography>Email: {Data.email}</Typography>
                <Typography>Status: {Data.status}</Typography>
                <Typography>Gender: {Data.gender}</Typography>
            </Box>
        </Box>
    );
}

export default AllUserDataBody
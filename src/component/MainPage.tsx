import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const MainPage = () =>
{
    

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
}

export default MainPage
import { FC, Fragment } from "react"
import { Box, Card, MenuItem, TextField, Typography } from "@mui/material"

import { BookOptionFieldModal } from "../../Model/InputFieldModel";
import { useDefinationContext } from "../../Context/Book/DefinationContext";

const SearchOptionFieldForBook:FC<BookOptionFieldModal> = ({...optionData}) =>
{
    const {optionVisiable, onChange, searchData} = optionData;
    const {defination} = useDefinationContext();
    
    if (!optionVisiable) 
    {
        return null;
    }

    return(
        <Fragment>
            {optionVisiable && (
                <Card sx={{padding: '15px' }}>
                    <Typography>Options</Typography>
                    <Box sx={{ padding: '15px 20px', display: 'grid', justifyContent: 'center', alignItems: 'center', gap: '15px 50px', gridTemplateColumns: '10% 30% 10% 30%' }}>

                        <Typography>Genre</Typography>
                        <TextField name="genre" onChange={onChange} value={searchData.genre} size="small" select>
                            {
                                defination.Genre.map((genre, index) => 
                                (
                                    <MenuItem key={index} value={genre.genre}>{`${genre.genre} (${genre.shortName})`}</MenuItem>
                                ))
                            }
                            <MenuItem value="All" sx={{ height: '40px'}}>All</MenuItem>
                        </TextField>

                        <Typography>Language</Typography>
                        <TextField name="language" value={searchData.language} onChange={onChange} size="small" select>
                            {   
                                defination.Language.map((language, index) => 
                                (
                                    <MenuItem key={index} value={language.language}>{`${language.language}(${language.shortName})`}</MenuItem>
                                ))
                            }
                            <MenuItem value="All" sx={{height: '40px'}}>All</MenuItem>
                        </TextField>
                    </Box>
                </Card>
            )}
        </Fragment>
    )
}

export default SearchOptionFieldForBook
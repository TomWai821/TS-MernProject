import { FormEvent, ChangeEvent, useState, useContext } from 'react';

import { Box, Button, Card, CardContent, FormControl, TextField, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// Models
import { LoginModel } from '../../Model/InputFieldModel';

// Context
import { AlertContext } from '../../Context/AlertContext';

// Another Useful Function
import { ValidateField } from '../../Controller/ValidateController'
import { LoginController } from '../../Controller/UserController/UserPostController';
import { ChangePage } from '../../Controller/OtherController';

// Data (CSS Syntax and dropdown)
import { PageItemToCenter, PageTitleSyntax } from '../../ArraysAndObjects/FormatSyntaxObjects';
import { LoginField } from '../../ArraysAndObjects/TextFieldsArrays';

const LoginPage = () => 
{
    const [credentials, setCredentials] = useState({ email: "", password: "", stayLogin: false });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({email: "", password: ""});
    const [helperTexts, setHelperText] = useState({email: "", password: ""});

    const alertContext = useContext(AlertContext);

    const handleLogin = async (e: FormEvent) => 
    {
        e.preventDefault();
        const response: boolean = await LoginController(credentials.email, credentials.password, credentials.stayLogin);
        setIsSubmitted(true);
    
        if(alertContext && alertContext.setAlertConfig)
        {
            if (response) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: "Login Successfully!", open: true, onClose: () => alertContext.setAlertConfig(null)});
                setTimeout(() => {ChangePage('/')}, 2000);
                return;
            }
            alertContext.setAlertConfig({ AlertType: "error", Message: "Failed to login!", open: true, onClose: () => alertContext.setAlertConfig(null)});

        }
    };
    
    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        // For login 
        const { name, value, checked, type } = event.target;
        setCredentials(prevState => ({...prevState, [name]: type === 'checkbox' ? checked : value}));

        // For validate
        const { error, helperText } = ValidateField(name, value);
        setHelperText({...helperTexts, [name]: helperText});
        setErrors({...errors, [name]: error});
    };

    return (
        <Box sx={PageItemToCenter}>
            <Card variant='outlined' sx={{ width: 600 }}>
                <CardContent>
                    <Typography sx={PageTitleSyntax}>Login</Typography>
                    {LoginField.map((field, index) => (
                        <FormControl key={index} sx={{ marginBottom: 3, width: '100%' }}>
                            <Typography>{field.label}</Typography>
                            <TextField
                                name={field.name}
                                type={field.type}
                                value={credentials[field.name as keyof LoginModel]}
                                helperText={isSubmitted && helperTexts[field.name as keyof typeof helperTexts]}
                                error={isSubmitted && errors[field.name as keyof typeof errors] != ""}
                                onChange={onChange}
                                size="small"
                                required
                            />
                        </FormControl>
                    ))}
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={credentials.stayLogin}
                                    onChange={onChange}
                                    name="stayLogin"
                                />
                            }
                            label="Remember me in 30 days"
                        />
                    </FormGroup>
                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;

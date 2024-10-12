import { setUserCookie, deleteUserCookie } from "./CookieHandler";


const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';
const mainPage:string = 'http://localhost:3000/';

interface result
{
    authToken: string,
    name: string
}

export const LoginHandler = async (email:String, password:String) => 
{
    const user = {email, password};

    try
    {
        const request = new XMLHttpRequest();
        request.open('POST', `${localhost}/login`);
        request.setRequestHeader('content-type', contentType);
        request.send(JSON.stringify(user));
        
        request.onload = () => 
        {
            if(request.status === 200)
            {
                const result: result = JSON.parse(request.response);
                handleSuccess(result);
            }
        }
    }
    catch(error)
    {
        console.log("");
    }
}

export const RegisterHandler = async (email:string, name:string, password:string, birthDay:string, gender:string) => 
{
    const user = {email, name, password, birthDay, gender};

    try
    {
        const response = await fetch(`${localhost}/register`,
            {
                method: 'POST',
                headers: { 'content-type': contentType },
                body: JSON.stringify(user)
            }
        )

        const result: result = await response.json();
        console.log(result);

        handleSuccess(result);
    }
    catch(error)
    {
        console.log("");
    }
}

export const fetchUserData = async(authToken:string) => 
{
    try
    {
        const response = await fetch(`${localhost}/user`,
            {
                method: 'GET',
                headers: 
                { 
                    'content-type': contentType,
                    'authToken': authToken
                },
            }
        )
        const result: result = await response.json();
        console.log(response.body)
        console.log(result);
    }
    catch(error)
    {
        console.log("");
    }
}

export const handleLogout = async() =>
{
    deleteUserCookie();
    window.location.href = mainPage;
}

export const handleSuccess = async(result: result) =>
{
    if(result)
    {
        setUserCookie(result.authToken, result.name, 30);
        window.location.href = mainPage;
    }
}
    
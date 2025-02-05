export const setUserCookie = (authToken:string, name:string, role:string, days:number, expires?:string) => 
{
    if(!expires)
    {
        let expires = "";
        if(days)
        {
            const date = new Date();
            const milliSeconds = days * 24 * 60 * 60 * 1000;
            date.setTime(date.getTime() + milliSeconds);
            expires = ":expires=" + date.toUTCString();
        }
    }
    document.cookie = "authToken="+ authToken + ";name=" + name +"; role=" + role + expires +";path=/" ;
}

export const getUserCookie = (name:string) => 
{
    if(name != "authToken")
    {
        return document.cookie.split(';').find(row => row.startsWith(name+'='));
    }
    return null;
}
    
export const deleteUserCookie = (username: string | null) =>
{
    document.cookie = "authToken=" + username + '; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
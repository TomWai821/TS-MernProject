import { GetResultInterface } from "../../Model/ResultModel";

const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const BuildQuery = (params:Record<string, number | string | Date | undefined>) =>
{
    let queryParams = new URLSearchParams();
    for(const key in params)
    {
        if (params[key] === undefined || params[key] === null || params[key] === "" || key.trim() === "") 
        {
            continue; 
        }
        else if(params[key] instanceof Date)
        {
            queryParams.append(key, (params[key] as Date).toISOString());
        }
        else
        {
            queryParams.append(key, params[key] as string);
        }
    }

    return queryParams.toString();
}

const FetchUserData = async(tableName?: string, authToken?:string, page?:number, amount?: number, username?: string, email?: string , role?: string , status?: string, gender?: string, startDate?:Date, dueDate?: Date) => 
{
    try
    {
        const headers: Record<string, string> = 
        {
            'content-type': contentType
        }

        if(authToken)
        {
            headers['authToken'] = authToken;
        }

        let queryParams = BuildQuery({username, email, role, status, gender, startDate, dueDate, page, amount});

        const queryString = queryParams.toString();
        const url = `${localhost}/userData/tableName=${queryString ? `${tableName}?${queryString}` : `${tableName}`}`;
        console.log(url);

        const response = await fetch(url,
            {
                method: 'GET',
                headers
            }
        )

        const result: GetResultInterface = await response.json();
        return result;
    }
    catch(error)
    {
        console.log("");
    }
}

export { FetchUserData }
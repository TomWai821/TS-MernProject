import { GetResultInterface } from "../../Model/ResultModel";

const localhost:string = 'http://localhost:5000/api/book';
const contentType:string = "application/json";

export const fetchBook = async (bookname?:string, status?:string, genreID?:string, languageID?:string, authorID?:string, publisherID?:string) => 
{
    const queryString = BuildQuery({bookname, languageID, status, genreID, publisherID, authorID});

    const response = await fetch(`${localhost}/bookData${queryString ? `?${queryString}` : ``}`,
        {
            method: 'GET',
            headers: { 'content-type': contentType },
        }
    );

    if(response.ok)
    {
        const result: GetResultInterface = await response.json();
        return result;
    }
}

export const fetchSuggestBook = async (type:string, authToken?:string, data?:Record<string,any>) => 
{
    const headers: Record<string, string> = 
    {
        'content-type': contentType
    }

    if(authToken)
    {
        headers['authToken'] = authToken;
    }

    let response: Response;

    if(type === "forUser")
    {
        response = await fetch(`${localhost}/BookData/type=${type}`, 
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ suggestionData: data })
        });

        console.log(JSON.stringify({ suggestionData: data }))
    }
    else
    {
        const queryParams = data ? '?' + Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&'): '';
        const url = type === "mostPopular" ? `${localhost}/loanBook/type=${type}${queryParams}` : `${localhost}/bookData/type=${type}${queryParams}`
    
        response = await fetch(url,
            {
                method: 'GET',
                headers: headers,
            }
        );
    }

    if(response.ok)
    {
        const result: GetResultInterface = await response.json();
        return result;
    }
}

export const fetchLoanBook = async(authToken?:string, bookname?:string, username?:string, status?:string) => 
{
    const data = {bookname, username, status};

    const headers: Record<string, string> = 
    {
        'content-type': contentType
    }

    if(authToken)
    {
        headers['authToken'] = authToken;
    }

    const queryParams =  BuildQuery(data);
    const url = queryParams ? `${localhost}/LoanBook?${queryParams}` : `${localhost}/LoanBook`

    const response = await fetch(url,
        {
            method: 'GET',
            headers: headers
        }
    );

    if(response.ok)
    {
        const result: GetResultInterface = await response.json();
        return result;
    }
}

export const fetchFavouriteBook = async(authToken:string, bookname?:string, status?:string, genreID?:string, languageID?:string, authorID?:string, publisherID?:string) => 
{
    const queryString = BuildQuery({bookname, languageID, status, genreID, publisherID, authorID});

    const response = await fetch(`${localhost}/FavouriteBook${queryString ? `?${queryString}` : ``}`,
        {
            method: 'GET',
            headers: {'content-type':contentType, 'authToken': authToken}
        }
    );

    console.log(response);

    if(response.ok)
    {
        const result: GetResultInterface = await response.json();
        return result;
    }
}

const BuildQuery = (params:Record<string, number | string | Date | boolean | undefined>) =>
{
    let queryParams = new URLSearchParams();
    for(const key in params)
    {
        if (params[key] === undefined || params[key] === null || params[key] === "" || params[key] === "All" || key.trim() === "") 
        {
            continue; 
        }
        
        if(params[key] instanceof Date)
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
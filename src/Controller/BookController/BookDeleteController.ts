const localhost:string = 'http://localhost:5000/api/book';
const contentType:string = "application/json";

export const deleteBookRecord = async (type:string ,authToken:string, ID:string) => 
{
    try
    {
        const url:Record<string, string> = 
        {
            "Book": `${localhost}/bookData/id=${ID}`,
            "Favourite": `${localhost}/FavouriteBook/id=${ID}`
        }

        console.log(url[type]);

        const response = await fetch(url[type],
            {
                method: 'DELETE',
                headers: {'content-type': contentType, 'authToken': authToken}
            }
        )

        if(response.ok)
        {
            const result = await response.json();
            return response.ok;
        }
    }
    catch(error)
    {
        console.log(error);
    }
}
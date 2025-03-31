import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { SuggestBookContextProps, ChildProps, SuggestionData } from "../../Model/ContextAndProviderModel";
import { BookDataInterface, GetResultInterface, LoanBookInterface } from "../../Model/ResultModel";
import { fetchLoanBook, fetchSuggestBook } from "../../Controller/BookController/BookGetController";
import { GetData } from "../../Controller/OtherController";

const SuggestBookContext = createContext<SuggestBookContextProps | undefined>(undefined);

export const SuggestBookProvider:FC<ChildProps> = ({children}) => 
{
    const [newPublishBook, setNewPublishBook] = useState<BookDataInterface[]>([]);
    const [mostPopularBook, setMostPopularBook] = useState<LoanBookInterface[]>([]);
    const [SelfLoanBook, setSelfLoanBook] = useState<LoanBookInterface[]>([]);
    const [bookForUser, setBookForUser] = useState<BookDataInterface[]>([]);
    const suggestBook = [bookForUser, newPublishBook, mostPopularBook];

    const authToken = GetData("authToken") as string;

    const fetchAllSuggestBook = useCallback(async () => {
        // Fetch initial suggestions
        const resultForNewPublishBook: GetResultInterface | undefined = await fetchSuggestBook("newPublish");
        const resultForMostPopularBook: GetResultInterface | undefined = await fetchSuggestBook("mostPopular");
    
        if (resultForNewPublishBook && Array.isArray(resultForNewPublishBook.foundBook))
        {
            setNewPublishBook(resultForNewPublishBook.foundBook);
        }
    
        if (resultForMostPopularBook && Array.isArray(resultForMostPopularBook.foundLoanBook)) 
        {
            setMostPopularBook(resultForMostPopularBook.foundLoanBook);
        }
    
        // Check if user is authenticated
        if (authToken) 
        {
            const resultForSelfLoanBook: GetResultInterface | undefined = await fetchLoanBook(authToken);
    
            if (resultForSelfLoanBook && Array.isArray(resultForSelfLoanBook.foundLoanBook)) {
                // Set loaned books
                setSelfLoanBook(resultForSelfLoanBook.foundLoanBook);
    
                // Count attributes for suggestions
                const suggestionData = countAttributes(resultForSelfLoanBook.foundLoanBook);
    
                // Only proceed if suggestionData has meaningful values
                if (suggestionData.topAuthors.length > 0 || suggestionData.topGenres.length > 0 || suggestionData.topPublishers.length > 0) 
                {
                    // Update `dataForSuggestion`
                    const dataForSuggestion = suggestionData;
    
                    // Fetch books for the user
                    const resultForUser: GetResultInterface | undefined = await fetchSuggestBook("forUser", authToken, dataForSuggestion);
    
                    if (resultForUser && Array.isArray(resultForUser.foundBook)) 
                    {
                        setBookForUser(resultForUser.foundBook);
                    }
                }
            }
        }
    }, []);

    const getTopThree = (countObject: Record<string, number>) => 
    {
        return Object.entries(countObject)
            .sort(([, first], [, second]) => second - first)
            .slice(0, 3)
            .map(([key]) => key);
    };

    const countAttributes = (books: LoanBookInterface[]): SuggestionData  => 
    {
        const genreCount: Record<string, number> = {};
        const authorCount: Record<string, number> = {};
        const publisherCount: Record<string, number> = {};

        books.forEach((book) => 
        {
            const genre = book.genreDetails?.genre;
            if (genre) 
            {
                genreCount[genre] = (genreCount[genre] || 0) + 1;
            }

            const author = book.authorDetails?.author;
            if (author) 
            {
                authorCount[author] = (authorCount[author] || 0) + 1;
            }

            const publisher = book.publisherDetails?.publisher;
            if (publisher) 
            {
                publisherCount[publisher] = (publisherCount[publisher] || 0) + 1;
            }
        });

        return { topGenres: getTopThree(genreCount), topAuthors: getTopThree(authorCount),topPublishers: getTopThree(publisherCount) };
    };

    useEffect(() => 
    {
        fetchAllSuggestBook();
    },[fetchAllSuggestBook])

    return (
        <SuggestBookContext.Provider value={{ suggestBook, SelfLoanBook }}>
            {children}
        </SuggestBookContext.Provider>
    );
}
    
export const useSuggestBookContext = () => 
{
    const context = useContext(SuggestBookContext);
    
    if (context === undefined) 
    {
        throw new Error("useSuggestContext must be used within a useSuggestProvider");
    }
    return context;
};

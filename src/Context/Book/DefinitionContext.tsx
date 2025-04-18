import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { CreateDefinitionData, DeleteDefinitionData, EditDefinitionData, GetDefinition } from "../../Controller/BookController/DefinitionController";
import { ChildProps, DefinatonProps } from "../../Model/ContextAndProviderModel";
import { DefinitionInterface, DefinitionState, GetResultInterface } from "../../Model/ResultModel";
import { GetData } from "../../Controller/OtherController";

const DefinitionContext = createContext<DefinatonProps | undefined>(undefined);

export const DefinitionProvider:FC<ChildProps> = ({children}) => 
{
    const [definition, setDefinition] = useState<DefinitionState>(
        {
            Genre:[],
            Language:[]
        }
    );
    const authToken = GetData("authToken") as string;

    const fetchAllDefinition = useCallback(async () => 
    {
        const getGenreData: GetResultInterface | undefined = await GetDefinition("Genre");
        const getLanguageData : GetResultInterface | undefined = await GetDefinition("Language");

        if(getGenreData && Array.isArray(getGenreData.foundDefinition as DefinitionInterface[]))
        {
            setDefinition((prev) => ({...prev, Genre:getGenreData.foundDefinition as DefinitionInterface[]}));
        }

        if(getLanguageData && Array.isArray(getLanguageData.foundDefinition as DefinitionInterface[]))
        {
            setDefinition((prev) => ({...prev, Language:getLanguageData.foundDefinition as DefinitionInterface[]}));
        }
    }
    ,[])

    const createDefinition = useCallback(async (type:string, shortName:string, detailsName:string) => 
    {
        const createDefinitionData = await CreateDefinitionData(type, authToken, shortName, detailsName);

        if(createDefinitionData)
        {
            fetchAllDefinition();
        }
    }
    ,[fetchAllDefinition])

    const editDefinition = useCallback( async (type:string, id:string, shortName:string, detailsName:string) => 
    {
        const editDefinitionData = await EditDefinitionData(type, authToken, id, shortName, detailsName);

        if(editDefinitionData)
        {
            fetchAllDefinition();
        }
    }
    ,[fetchAllDefinition])

    const deleteDefinition = useCallback(async (type:string, id:string) => 
    {
        const deleteDefinitionData = await DeleteDefinitionData(type, authToken, id);

        if(deleteDefinitionData)
        {
            fetchAllDefinition();
        }
    }
    ,[fetchAllDefinition])

    useEffect(() => 
    {
        fetchAllDefinition();
    }
    ,[fetchAllDefinition])

    return (
        <DefinitionContext.Provider value={{ definition, fetchAllDefinition, createDefinition, editDefinition, deleteDefinition}}>
            {children}
        </DefinitionContext.Provider>
    );
}

export const useDefinitionContext = () => 
{
    const context = useContext(DefinitionContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

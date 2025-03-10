import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";

// Useful Function
import { CalculateDueDate, GetCurrentDate, GetData } from "../../Controller/OtherController";
import { ModifyBanListDataController, ModifyStatusController } from "../../Controller/UserController/UserPutController";
import { FetchUserData } from "../../Controller/UserController/UserGetController";

// Models
import { ChildProps, BannedUserContextProps } from "../../Model/ContextAndProviderModel";
import { GetResultInterface, UserResultDataInterface } from "../../Model/ResultModel";
import { FindUserInterface, UserDataInterface } from "../../Model/UserTableModel";

const BannedUserContext = createContext<BannedUserContextProps | undefined>(undefined);

export const BannedUserProvider: FC<ChildProps> = ({ children }) =>
{
    const [BannedUser, setBannedUser] = useState<UserResultDataInterface[]>([]);

    const authToken = GetData("authToken") as string;

    // For search function
    const fetchBannedUser = useCallback(async (UserData: UserDataInterface | undefined) => 
    {
        const {username, email, role, status, gender} = UserData as FindUserInterface;
        try
        {
            const result : GetResultInterface | undefined = await FetchUserData("BannedUser", authToken, username, email, role, status, gender);
            if(result && Array.isArray(result.foundUser))
            {
                setBannedUser(result.foundUser);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken])

    // For table init
    const fetchAllBannedUser = useCallback(async () => 
    {
        const resultForDeleteUser: GetResultInterface | undefined = await FetchUserData("BannedUser", authToken);

        try
        {
            if(resultForDeleteUser && Array.isArray(resultForDeleteUser.foundUser))
            {
                setBannedUser(resultForDeleteUser.foundUser)
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[authToken])

    const editBannedUserData = useCallback(async (bannedListID:string, dueDate:Date, description:string) => 
    {
        const result : GetResultInterface | undefined = await ModifyBanListDataController(authToken, bannedListID, dueDate, description);

        try
        {
            if(result)
            {
                fetchAllBannedUser();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[fetchAllBannedUser])

    const changeBannedUserStatus = useCallback(async (userId:string, bannedListID:string) => 
    {
        const result : GetResultInterface | undefined = await ModifyStatusController(authToken, userId, "Normal", "Unbanned", undefined, bannedListID);

        try
        {
            if(result)
            {
                fetchAllBannedUser();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    },[fetchAllBannedUser]);

    useEffect(() => 
        {
            fetchAllBannedUser();
        }, [fetchAllBannedUser]
    )

    return (
        <BannedUserContext.Provider value={{ BannedUser, fetchAllBannedUser, fetchBannedUser, editBannedUserData, changeBannedUserStatus }}>
            {children}
        </BannedUserContext.Provider>
    );
};

export const useBannedUserContext = () => 
{
    const context = useContext(BannedUserContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

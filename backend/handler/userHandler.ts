import User from '../schema/user';

export const findUser = async (email:Record<string, any>) => 
{
    try
    { 
        return User.findOne(email);
    }
    catch(error)
    {
        return error;
    } 
}

export const createUser = async (p0: string, user: Record<string, any>) => 
{ 
    try
    {
        return User.create(user);
    }
    catch(error)
    {
        return error;
    }
};

export const getUser = async(userId:Record<string, any>) => 
{
    try
    {
        if(userId.match("{}"))
        {
           return User.find({});
        }
        return User.findById(userId);
    }
    catch(error)
    {
        return error;
    }
}

export const changePassword = async(userId:string, newPassword:string) =>
{
    return User.findByIdAndUpdate(userId, {password:newPassword});
}
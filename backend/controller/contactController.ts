import { Request, Response } from 'express'
import { AuthRequest } from '../model/requestInterface';
import { CreateAuthor, FindAuthorByIDAndDelete, FindAuthorByIDAndUpdate, GetAuthor } from '../schema/book/author';
import { CreatePublisher, FindPublisherByIDAndDelete, FindPublisherByIDAndUpdate, GetPublisher } from '../schema/book/publisher';
import { ObjectId } from 'mongoose';

export const GetContactRecord = async (req: AuthRequest, res: Response) => 
{
    const contactType = req.params.type as keyof typeof contactHandler;
    let success = false;

    try 
    {
        const getData = await contactHandler[contactType].Get();
        
        if (!getData) 
        {
            return res.status(400).json({ success, error: `Failed to get ${contactType} data` });
        }

        success = true;
        return res.json({ success, foundContact: getData });
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};

export const CreateContactRecord = async (req: AuthRequest, res: Response) => 
{
    const contactType = req.params.type as keyof typeof contactHandler;

    switch(contactType)
    {
        case "Author":
            CreateAuthorRecord(req, res);
            break;

        case "Publisher":
            CreatePublisherRecord(req, res);
            break;
    }

    res.json({ success: true, message: `Create ${contactType} successfully!` });
}

const CreateAuthorRecord = async (req: AuthRequest, res: Response) => 
{
    const { author, phoneNumber, email } = req.body;
    const contactType = req.params.type as keyof typeof contactHandler;
    let success = false;

    try 
    {
        const createAuthor = await CreateAuthor({author: author, phoneNumber: phoneNumber, email: email});

        if(!createAuthor)
        {
            return res.status(400).json({ success, error: `Failed to create ${contactType}` });
        }
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
}

const CreatePublisherRecord = async (req: AuthRequest, res: Response) => 
{
    const { publisher, address, phoneNumber, email } = req.body;
    const contactType = req.params.type as keyof typeof contactHandler;
    let success = false;

    try 
    {
        const createPublisher = await CreatePublisher({publisher: publisher, address: address, phoneNumber: phoneNumber, email: email});

        if(!createPublisher)
        {
            return res.status(400).json({ success, error: `Failed to create ${contactType}` });
        }
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
}

export const UpdateContactRecord = async (req: AuthRequest, res: Response) => 
{
    const contactType = req.params.type as keyof typeof contactHandler;

    switch(contactType)
    {
        case "Author":
            UpdateAuthorRecord(req, res);
            break;

        case "Publisher":
            UpdatePublisherRecord(req, res);
            break;
    }

    res.json({ success: true, message: `Create Author successfully!` });
}

const UpdateAuthorRecord = async (req: AuthRequest, res: Response) => 
{
    const { id, author, phoneNumber, email } = req.body;
    let success = false;

    try 
    {
        const createAuthor = await FindAuthorByIDAndUpdate(id, {author: author, phoneNumber: phoneNumber, email: email});

        if(!createAuthor)
        {
            return res.status(400).json({ success, error: `Failed to create Author Record` });
        }
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
}

const UpdatePublisherRecord = async (req: AuthRequest, res: Response) => 
{
    const { id, publisher, address, phoneNumber, email } = req.body;
    let success = false;

    try 
    {
        const createPublisher = await FindPublisherByIDAndUpdate(id, {publisher: publisher, address: address, phoneNumber: phoneNumber, email: email});

        if(!createPublisher)
        {
            return res.status(400).json({ success, error: `Failed to create Publisher Record` });
        }
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
}

export const DeleteContactRecord = async (req: AuthRequest, res: Response) => 
{
    const { id } = req.body;
    const contactType = req.params.type as keyof typeof contactHandler;
    let success = false;

    try 
    {
        const deleteData = await contactHandler[contactType].Delete(id as ObjectId);
        
        if (!deleteData) 
        {
            return res.status(400).json({ success, error: `Failed to get ${contactType} data` });
        }

        success = true;
        return res.json({ success, message: "Delete Contact Data successfully!" });
    } 
    catch (error) 
    {
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};
    

export const contactHandler = 
{
    Author:
    {
        Get:GetAuthor,
        Delete:FindAuthorByIDAndDelete
    },
    Publisher:
    {
        Get:GetPublisher,
        Delete:FindPublisherByIDAndDelete
    }

}
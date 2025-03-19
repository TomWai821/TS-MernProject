import mongoose, { PipelineStage } from 'mongoose';
import { BookInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';

const BookSchema = new mongoose.Schema<BookInterface>
(
    {
        bookname: { type: String, required: true },
        languageID: { type: mongoose.Types.ObjectId, ref:'Language', required: true },
        genreID: { type: mongoose.Types.ObjectId, ref:'Genre', required: true },
        page: { type: Number, required: true, min: 1 },
        description: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const Book = mongoose.model<BookInterface>('Book', BookSchema);

export const CreateBook = async (data:Record<string, any>) =>
{
    try
    {
        return await Book.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetBook = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await GetBooksWithOtherDetails();
        }
        return await Book.find(data as Record<string, any>);
    }
    catch(error)
    {
        printError(error);
    }
};

// Local variable(For get banned user data)
const GetBooksWithOtherDetails = async () => 
{
    let pipeline:PipelineStage[] = [];

    pipeline.push(
        {
            $lookup: {
                from: 'genres',
                localField: 'genreID',
                foreignField: '_id',
                as: 'genreDetails'
            }
        },
        {
            $unwind: {
                path: '$genreDetails',
                preserveNullAndEmptyArrays: true 
            }
        },
        {
            $lookup: {
                from: 'languages',
                localField: 'languageID',
                foreignField: '_id',
                as: 'languageDetails'
            }
        },
        {
            $unwind: {
                path: '$languageDetails', // Specify the field to unwind
                preserveNullAndEmptyArrays: true // Optional: Keeps documents without a match
            }
        },
    );

    return await Book.aggregate(pipeline);
}
        
export const FindBook = async (data: Record<string, any>) => 
{
    try
    {
        return await Book.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookByID = async (book: string, select?: Record<string, any>) => 
{
    try
    {
        if(select)
        {
            return await Book.findById(book).select(select);
        }
        return await Book.findById(book);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookByIDAndUpdate = async (book: string, data: Record<string, any>) => 
{
    try
    {
        return await Book.findByIdAndUpdate(book, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookByIDAndDelete = async (book: string, data: Record<string, any>) =>
{
    try
    {
        return await Book.findByIdAndDelete(book, data);
    }
    catch(error)
    {
        printError(error);
    }
}
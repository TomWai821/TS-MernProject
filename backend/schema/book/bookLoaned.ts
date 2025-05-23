import mongoose, { PipelineStage } from "mongoose";
import { BookLoanedInterface } from "../../model/bookSchemaInterface";
import { lookupAndUnwind, printError } from "../../controller/Utils";
import { bookReturnStatus, finesPaidStatus } from "../../Arrays/Types";

const BookLoanedSchema = new mongoose.Schema<BookLoanedInterface>
(   
    {
        userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        bookID: { type: mongoose.Types.ObjectId, ref: 'Book', required: true },
        loanDate: { type:Date, required: true },
        dueDate: { type:Date, required: true },
        returnDate: { type:Date, default: null },
        status: { type:String, enum: bookReturnStatus, default: 'Loaned'},
        fineAmount: { type:Number, default: 0 },
        finesPaid: { type:String, enum: finesPaidStatus, default: "Not Fine Needed" }
    }
)

const BookLoaned = mongoose.model<BookLoanedInterface>('BookLoaned', BookLoanedSchema);

export const CreateBookLoaned = async (data:Record<string, any>) =>
{
    try
    {
        return await BookLoaned.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetBookLoaned = async (data?:Record<string, any>, limit?:number) =>
{
    try
    {
        if(limit)
        {
            return await GetSuggestBookDetails(data, limit);
        }
        return await GetBooksWithOtherDetails(data);
    }
    catch(error)
    {
        printError(error);
    }
};

// Local variable(For get banned user data)
const GetBooksWithOtherDetails = async (data?:Record<string, any>) => 
{
    let pipeline:PipelineStage[] = [];

    pipeline.push(
        ...lookupAndUnwind('users', 'userID', '_id', 'userDetails'),
        ...lookupAndUnwind('books', 'bookID', '_id', 'bookDetails'),
        ...lookupAndUnwind('authors', 'bookDetails.authorID', '_id', 'authorDetails'),
        ...lookupAndUnwind('publishers', 'bookDetails.publisherID', '_id', 'publisherDetails'),
        ...lookupAndUnwind('genres', 'bookDetails.genreID', '_id', 'genreDetails'),
        ...lookupAndUnwind('languages', 'bookDetails.languageID', '_id', 'languageDetails')
    );

    if (data) { pipeline.push( {$match: {...data}} )}
    return await BookLoaned.aggregate(pipeline);
}
 
const GetSuggestBookDetails = async (data?: Record<string, any>, limit?: number) => 
{
    let pipeline: PipelineStage[] = [];

    if (data) { pipeline.push({ $match: { ...data } })}

    pipeline.push({ $group: { _id: "$bookID", count: { $sum: 1 } }});

    pipeline.push({ $sort: { count: -1 } });

    if (limit) {pipeline.push({ $limit: limit });}

    pipeline.push(
        ...lookupAndUnwind('users', '_id', '_id', 'userDetails'),
        ...lookupAndUnwind('books', '_id', '_id', 'bookDetails'),
        ...lookupAndUnwind('authors', 'bookDetails.authorID', '_id', 'authorDetails'),
        ...lookupAndUnwind('publishers', 'bookDetails.publisherID', '_id', 'publisherDetails'),
        ...lookupAndUnwind('genres', 'bookDetails.genreID', '_id', 'genreDetails'),
        ...lookupAndUnwind('languages', 'bookDetails.languageID', '_id', 'languageDetails'),
    );

    pipeline.push({ $unwind: { path: "$bookDetails",  preserveNullAndEmptyArrays: true }});

    return await BookLoaned.aggregate(pipeline);
};

        
export const FindBookLoaned = async (data: Record<string, any>) =>
{
    try
    {
        return await BookLoaned.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookLoanedByID = async (bookLoanedId: string, select?: Record<string, any>) =>
{
    try
    {
        if(select)
        {
            return await BookLoaned.findById(bookLoanedId).select(select);
        }
        return await BookLoaned.findById(bookLoanedId);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookLoanedByIDAndUpdate  = async (bookLoanedId: string, data: Record<string, any>) =>
{
    try
    {
        return await BookLoaned.findByIdAndUpdate(bookLoanedId, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookLoanedByIDAndDelete = async (bookLoanedId: string, data: Record<string, any>) =>
{
    try
    {
        return await BookLoaned.findByIdAndDelete(bookLoanedId, data);
    }
    catch(error)
    {
        printError(error);
    }
}
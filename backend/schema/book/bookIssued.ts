import mongoose from "mongoose";
import { BookIssuedInterface } from "../../model/bookSchemaInterface";

const BookIssuedSchema = new mongoose.Schema<BookIssuedInterface>
(   
    {
        _id: { type: String, required: true },
        userID: { type: String, ref: 'User', required: true },
        bookID: { type: String, ref: 'Book',required: true },
        issueDate: { type:Date, required: true },
        dueDate: { type:Date, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const BookIssued = mongoose.model<BookIssuedInterface>('BookIssued', BookIssuedSchema);
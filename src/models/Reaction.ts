import { Schema, Document, ObjectId, Types } from 'mongoose';
//check imports when work starts

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username:string;
    createdAt:Date;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            maxlength:280,
        },
        username: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)
export default reactionSchema;
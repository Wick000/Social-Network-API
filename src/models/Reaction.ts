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
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (value: any) => value.toLocaleString(),
        },
    },
    {
        toJSON:{
            getters:true,
        },
        id:false,
    }
)
export default reactionSchema;


//25 26 28

//database name at the end of the configs connection string
//server routes checkout controllers model
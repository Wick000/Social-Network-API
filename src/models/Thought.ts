import { Schema, Document, ObjectId, Types, model } from 'mongoose';
//check imports when work start
import Reaction from './Reaction.js'
interface IThoughts extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Reaction[];
}

const thoughtsSchema = new Schema<IThoughts>(
    {
      thoughtText: {
        type: String,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
      },
      reactions: [Reaction],  
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);





const Thoughts = model('Thoughts', thoughtsSchema);

export default Thoughts;
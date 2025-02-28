import { Schema, Document, ObjectId, Types, model } from 'mongoose';
//check imports when work start
import Reaction from './Reaction.js'
interface IThoughts extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions:  typeof Reaction[]; //check this with the instructors
}

const thoughtsSchema = new Schema<IThoughts>(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (value) => value.toLocaleString(),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [Reaction],  
    },
    {
        
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtsSchema
  .virtual('reactionCount')

  .get(function() {
    return this.reactions.length;
  });




const Thoughts = model('Thoughts', thoughtsSchema);

export default Thoughts;
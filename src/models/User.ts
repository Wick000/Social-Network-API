import { Schema, Document, model, ObjectId } from 'mongoose';
//check imports when work starts
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}



const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true, 
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return  /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email`
            },
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
userSchema
.virtual('friendCount')

.get(function (){
    return this.friends.length;
});


const User = model('User', userSchema)

export default User;
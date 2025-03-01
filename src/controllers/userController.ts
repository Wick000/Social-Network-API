import { Request, Response } from "express";
//import { ObjectId } from "mongoose"
import  User  from '../models/User.js'
import Thoughts from "../models/Thought.js";


// export const getTotalNumUser = async () => {
//     const numberOfUsers = await User.aggregate()
//         .count('userCount');
//         return numberOfUsers;
// } this returns an array of one object with just the number of total students, might not need it

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find()

        const userObj = {
            users,
            //numUsers: await getTotalNumUser()
        }
       return res.json(userObj);
    } catch (error:any) {
       return res.status(500).json({
            message: error.message
        });
    }
}

export const getSingleUser = async (req: Request, res: Response) =>{
    try {
        const user = await User.findOne({_id: req.params.userId})
            .populate({path: 'thoughts', select: '-__v' })
            .populate({path: 'friends', select: '-__v'})
        
        if(!user) {
         return   res.status(404).json({message: "No thought found with that id"})
        } else{
          return  res.json(user);
        }
    } catch (err) {
       return res.status(500).json(err);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
       return res.json(user)
    } catch (err) {
       return res.status(500).json(err);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                username: req.body.username,
                email: req.body.email
            },
            { runValidators: true, new: true}
        );
        if(!user) {
            res.status(404).json({message: 'No user found with that ID'});
        }
        return res.json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId});
            if(!user) {
                res.status(404).json({message: 'No user found with that id'})
            } else {
                await Thoughts.deleteMany({_id: { $in: user.thoughts}});
                res.json({message: 'User and Thoughts deleted!'})
            }
        
    } catch(error:any) {
        res.status(500).json({message: error.message})
    }
}
// Friends might need to be users here im not sure
export const newFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: { friends: req.params.friendId} },
            { runValidators: true, new: true}
        )
        if (!user) {
            res.status(404).json({message: 'No Friend found with that ID'})
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId} },
            { runValidators: true, new: true}
        );

        if (!user) {
          return  res.status(404).json({ message: 'No Friends found with that ID'});
        } else {
            return res.json(user)
        }
    } catch (err){
        return res.status(500).json(err)
    }
}
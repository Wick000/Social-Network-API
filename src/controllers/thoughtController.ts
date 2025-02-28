import { Request, Response } from "express";
//import { ObjectId } from "mongoose"
import  User  from '../models/User.js'
import Thoughts from "../models/Thought.js";
//import reactionSchema from "../models/Reaction.js";


export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thoughts.find()

        const thoughtsObj = {
            thoughts,
            //numUsers: await getTotalNumUser()
        }
       return res.json(thoughtsObj);
    } catch (error:any) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getSingleThoughts = async (req: Request, res: Response) =>{
    try {
        const thought = await Thoughts.findOne({_id: req.params.thoughtId})

        .select('-__v')

        if(!thought) {
           return res.status(404).json({message: "No user by that id"})
        } else{
          return  res.json(thought);
        }
    } catch (err) {
       return res.status(500).json(err);
    }
}

export const createNewThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId},
            { $addToSet: { thoughts: thought._id} },
            {new: true}
        );
        
    if (!user) {
        res
          .status(404)
          .json({ message: 'Thought created, but found no User with that ID' });
      } else {
        res.json('Created the Thought!');
      }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate({_id: req.params.thoughtId});
      
        if (!thought) {
            res
              .status(404)
              .json({ message: 'Sorry there are no Thoughts with That ID' });
          } else{
            res.json('Updated Thought!');
          }
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndDelete({_id: req.params.thoughtId});
        if (!thought) {
            res
              .status(404)
              .json({ message: 'Sorry there are no Thoughts with That ID' });
    } else {
        res.json('Thought Deleted')
    }
    } catch (err) {
    res.status(500).json(err);
    }
}

export const createReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate( 
            
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}}, 
            { runValidators: true, new: true}
        );
        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No Thoughts found with that ID :(' });
        }
       return res.json(thought)
    } catch (err) {
       return res.status(500).json(err)
    }
}

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: { reactionsId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );
        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No Thought found with that ID :(' });
        }
       return res.json(thought)

    } catch (err) {
       return res.status(500).json(err);
    }
}
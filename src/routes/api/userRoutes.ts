import { Router } from 'express'
const router = Router()
import{
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    deleteFriend,
} from '../../controllers/userController.js';

// /api/users/

router.route('/')
.get(getAllUsers).post(createUser);


// /api/users/:userId

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId

router.route('/:userId/friends/:friendId')
.post(newFriend).delete(deleteFriend);

export {router as userRouter}
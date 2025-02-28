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

router.route('/')
.get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(newFriend).delete(deleteFriend);

export {router as userRouter}
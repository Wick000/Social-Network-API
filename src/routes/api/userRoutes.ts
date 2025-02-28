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

router.route('/api/user')
.get(getAllUsers).get(getSingleUser).post(createUser).put(updateUser).delete(deleteUser);

router.route('/api/users/:userId/friends/:friendId')
.post(newFriend).delete(deleteFriend);
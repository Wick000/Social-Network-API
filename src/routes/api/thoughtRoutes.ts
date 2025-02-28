import { Router } from 'express'
const router = Router();

import {
    getAllThoughts,
    getSingleThoughts,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,
} from '../../controllers/thoughtController.js';

router.route('/')
.get(getAllThoughts).post(createNewThought);

router.route('/:thoughtId').get(getSingleThoughts).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);



export{router as thoughtRouter};
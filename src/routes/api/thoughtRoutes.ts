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

router.route('/api/thoughts')
.get(getAllThoughts).get(getSingleThoughts).post(createNewThought).put(updateThought).delete(deleteThought);

router.route('/api/thoughts/:thoughtId/reactions').post(createReaction).delete(removeReaction);

export{router as thoughtRouter};
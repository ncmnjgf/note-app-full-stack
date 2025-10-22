import express from 'express'
import { createNode } from '../controllers/node.control.js'
import { getNotes } from "../controllers/node.control.js";
import { updateNote } from '../controllers/node.control.js';
import { deleteNote } from '../controllers/node.control.js'
const router = express.Router()

router.post('/createNote', createNode)
router.get('/get-notes', getNotes)
router.put('/update-notes/:id', updateNote)
router.delete('/delete-note/:id', deleteNote) 
export default router

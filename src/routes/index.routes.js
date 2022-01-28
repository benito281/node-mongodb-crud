import { Router } from 'express';
import { viewIndex,
    viewAbout,
    viewEdit,
    addTask,
    editTask,
    deleteTask,
    taskDone  } from '../controllers/task.controllers';
const router = Router();

router.get('/', viewIndex);
router.post('/task/add', addTask)
router.get('/about', viewAbout);
router.get('/edit/:id', viewEdit);
router.post('/task/edit/:id', editTask);
router.get('/task/delete/:id', deleteTask);
router.get('/task/done/:id', taskDone);

export default router;
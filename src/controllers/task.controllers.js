import Task from '../models/task.models';

export const viewIndex = async (req, res) => {
    const tasks = await Task.find().lean();
    res.render('index', { tasks: tasks });
}

export const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        const saveTask = await newTask.save();
        req.flash('success', 'Task saved successfully');
        res.redirect('/');
    } catch (error) {
        req.flash('error', 'Error saving task');
    }
}

export const viewAbout = (req, res) => {
    res.render('about');
}
export const viewEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id).lean();
        res.render('edit', { task: task}); 
    } catch (error) {
      console.log(error)  
    }

}
export const editTask = async (req, res) => {
    try{
        const { id } = req.params;
        const { title,description } = req.body;
        const updateTask = await Task.findByIdAndUpdate(id, { title, description});
        req.flash('success', 'Task updated successfully');
        res.redirect('/');
    }
    catch(error){
        req.flash('error', 'Error updating task');
    }
}
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);
        req.flash('success', 'Task deleted successfully');
        res.redirect('/');
    } catch (error) {
        req.flash('error', 'Error deleting task');
    }
}

export const taskDone = async (req, res) => {
    try{
        const { id } = req.params;
        const task = await Task.findById(id);
        task.done = !task.done;
        await task.save();
        res.redirect('/');
    }
    catch(error){
        console.log(error);
    }
}
const Task = require("../models/Task");

module.exports = class TaskControllers {

    static async home(req, res) {
       try {
        const tasks = await Task.showTasks()
        
        res.render('tasks/home',{tasks})
        
       } catch (error) {
            req.flash('message','ocorreu algum erro')
            res.redirect('/logout')
       }
        
    }

    static async createTask(req,res) {
        res.render('tasks/create')
    }
    static async createTaskPost(req,res) {
        const {title,done} = req.body;
        const task = new Task(title,done)
        await task.create()
        res.redirect('/')
    }





    static async deleteTask(req,res) {
        const {_id} = req.body;
        try {
            await Task.deleteTask(_id)          
        } catch (error) {
            req.flash('message',error.message)      
        }
        res.redirect('/')
    }
}
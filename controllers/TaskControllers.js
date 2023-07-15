const Task = require("../models/Task");

module.exports = class TaskControllers {

    static async home(req, res) {
        const userId = req.session.userid;
       try {
        const tasks = await Task.showTasks(userId)
       
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
        const userId = req.session.userid
        const task = new Task(title,done,userId)
        await task.create()
        res.redirect('/')
    }

    static async editTask(req,res) {
        const{title,done,_id,userId} = req.body;
        let status = false
        if(done == "on"){
            status = true
        }
        console.log(status)
        try {
            const task = new Task(title,status,userId)
            await task.edit(_id)
            res.redirect('/')
        } catch (error) {
            console.log('error in update field')
            req.flash('an error as been ocurred')
            res.redirect('/')
        }
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
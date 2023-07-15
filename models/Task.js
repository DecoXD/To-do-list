const conn = require('../db/conn')
const {ObjectId} = require('mongodb')
class Task {
    
    constructor(title,done ){
        this.title = title;
        this.done = done;
    }

    static async showTasks () {
        const tasks = await conn.db().collection('tasks').find().toArray()
        return tasks
    }

    static async deleteTask(id) {
       
        try {
            await conn.db().collection('tasks').deleteOne({_id: new ObjectId(id)})
            return

        } catch (error) {
           console.log(error)
           return
        }
    }

    async create() {
        if(this.done == 0){
            this.done = false
        }
       await conn.db().collection('tasks').insertOne({
            title:this.title,
            done:this.done
        })
        return
    }

}

module.exports = Task
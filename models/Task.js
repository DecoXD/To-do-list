const conn = require('../db/conn')
const {ObjectId} = require('mongodb')
class Task {
    
    constructor(title,done,userId ){
        this.title = title;
        this.done = done;
        this.userId = userId
    }

    static async showTasks (userId) {
        const tasks = await conn.db().collection('tasks').find({userId:userId}).toArray()
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
            done:this.done,
            userId:this.userId,
        })
        return
    }

    async edit(id){
       try {
        await conn.db().collection('tasks').updateOne({_id:new ObjectId(id)},{$set:this})
        return
       } catch (error) {
        console.log('erro na edção',error.message)
        return
       }
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

}

module.exports = Task
const conn = require('../db/conn');
const bcrypt = require('bcrypt')
class User {

    constructor(name,login,password,confirmPassword){
        this.name = name;
        this.login = login;
        this.password = password;
        this.confirmPassword = confirmPassword
    }

    
    static async checkUserExists(login) {
        const user = await conn.db().collection('users').findOne({login})
        return user
    }

    async create () {
       try {
         //check password
        if(this.password.length < 6 && this.login.length < 6) {
             throw new Error('The login and password must have at least 6 characters') 
        }
        if(this.password != this.confirmPassword){       
             throw new Error('Diferrent password ')   
        } 
        //check if user already exists
        const exists = await User.checkUserExists(this.login)
        console.log(exists)
        if(exists){
            throw new Error('user already exists')
        }
        //crypt password
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(this.password,salt) 
        //create user
        const user = conn.db().collection('users').insertOne(
           { 
            name:this.name,
            login:this.login,
            password:hashPassword
        }
        )

        return user
       } catch (error) {
            console.log('register error')
            return error.message
       }
       
    }

}


module.exports = User
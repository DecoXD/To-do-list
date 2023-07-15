const User = require("../models/User");
const {ObjectId} = require('mongodb')
const bcrypt = require('bcrypt')
module.exports = class AuthControllers{

    static checkErros(data){
        if(typeof(data) != 'string'){
            return false
        }
        if(data.includes('Diferrent')){
            return 'message','Diferrent Password'
        }
        if(data.includes('exists')){
          
            return 'message','usuário existente'
        }
        if(data.includes('characters')){   
            return 'message','the login and password must have at least 6 characters'
        }
        
    }

    static login(req,res)  {
        res.render('auth/login')
    }

    static async loginPost(req,res)  {
        const {login,password} = req.body;
       try {
         //check if user already exists
         const exists = await User.checkUserExists(login)       
         if(!exists){
             throw new Error('dados incorretos')
         }
         //check the password
        const {password:userPassword} = exists
        const checkedPassword = bcrypt.compareSync(password,userPassword)
        if(!checkedPassword){
            throw new Error('dados incorretos')
        }
        req.session.userid = exists._id
        req.session.save(() => {
            res.redirect('/')
        })

       } catch (error) {
            console.log('error no login')
            req.flash('message',error.message)
       }

    }

    static register(req,res) {
        res.render('auth/register')
    }

    static async registerPost(req,res){
        const {name,login,password,confirmPassword} = req.body;

        try {
            const Userdata = new User(name,login,password,confirmPassword)
            const data = await Userdata.create()
            const error = AuthControllers.checkErros(data)
            if(error){
                req.flash("message",error)
                res.render('auth/register')
                return
            }
            const id = new ObjectId(data.insertedId).toString()
            
            req.session.userid = id
            req.session.save(() => {               
                res.redirect('/')
            })
        } catch (error) {
            req.flash('message','ocorreu algum erro, tente novamente mais tarde')
            res.render('auth/register')
            return
        }
       
       
       
    }

    static logout(req,res) {
        req.session.destroy()
        res.redirect('/')
    }
}

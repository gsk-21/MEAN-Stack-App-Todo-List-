const mongoose = require('mongoose')

const TodoItemSchema = mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    dueDate:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    }
})

const Item = module.exports = mongoose.model('TodoItem',TodoItemSchema)


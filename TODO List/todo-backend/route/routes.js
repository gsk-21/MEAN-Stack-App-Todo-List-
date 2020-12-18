var express = require('express')
var router = express.Router()

const TodoItem = require('../model/TodoItem')

router.get('/getTasks',(req,res,next)=>{
    TodoItem.find(function(err,TodoItems){
        if(err){
            res.json(err)
        }else{
            res.json(TodoItems)
        }
    })
})

router.post('/addTask',(request,response,next)=>{
    let newTodoItem = new TodoItem({
        'task':request.body.task,
        'dueDate':request.body.dueDate,
        'completed':request.body.completed
    })

    newTodoItem.save((err,todoItem)=>{
        if(err){
            response.json(err)
        }else{
            response.json(todoItem)
        }
    })

})

router.put('/updateTask/:id',(request,response,next)=>{
    TodoItem.findOneAndUpdate({_id:request.params.id},{
        $set:{
            'task':request.body.task,
            'dueDate':request.body.dueDate,
            'completed':request.body.completed 
        }
    },function(err,result) {
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }        
    })
})


router.delete('/deleteTask/:id',(request,response,next)=>{
    TodoItem.remove({_id:request.params.id},function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})


module.exports = router
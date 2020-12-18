
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Task } from '../Task'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  taskList: any = []
  taskName: String = ""
  dueDate: Date
  completed: Boolean = false
  showTaskForm:Boolean=false
  task:Task
  update:Boolean = false
  _id:any
  constructor(private data: DataService) { }

  ngOnInit(): void {
    console.log("Inited");
    this.getTasks()
    
  }

  getTasks() {
    this.data.getTasks().subscribe(resp => {
      this.taskList = resp

    })
  }

  addClick(){
    this.showTaskForm = true
    this.update = false
    
  }

  addTask() {
    let newTask: Task = {
      task: this.taskName,
      dueDate: this.dueDate,
      completed: this.completed,
    }

    this.data.addTask(newTask).subscribe(data =>{
      console.log(data);
      this.showTaskForm = false
      document.getElementById("close").click();
      this.getTasks()
      this.taskName = ""
      
    })
  }

  editClick(task:Task){
    this.task = task
    document.getElementById("addTask").click();
    this.update = true

  }

  updateTask(){
    console.log("updating");

    let updatedtask: Task = {
      _id:this.task._id,
      task: this.taskName,
      dueDate: this.dueDate,
      completed: this.completed,
    }
    console.log(updatedtask);
    this.data.updateTask(updatedtask).subscribe(data=>{
      document.getElementById("close").click();
      this.getTasks()
    })
  }

  complete(task){
    let updatedtask: Task = {
      _id:task._id,
      task: task.task,
      dueDate: task.dueDate,
      completed: true,
    }
    console.log(updatedtask);
    this.data.updateTask(updatedtask).subscribe(data=>{
      this.getTasks()
    })
  }

  deleteTask(task){
    this.data.delete(task._id).subscribe(data=>{
      console.log(data);
      this.getTasks()
      
    })
  }

  checkDay(date){
    let x = date.split('-')[2]
    let today = new Date().getDate()

    if((x==today) || (x==(today-1)) || (x==(today+1))){
      return true
    }else{
      return false
    }
  }
  

  getDay(date){
    let x = date.split('-')[2]
    let today = new Date().getDate()

    if(x==today){
      return "Today"
    }else if(x==(today-1)){
      return "Yesterday"
    }else if(x==(today+1)){
      return "Tomorrow"
    }

  }



}

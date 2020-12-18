import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'



@Injectable({
  providedIn: 'root'
})

export class DataService {

  readonly API_URL:String = "http://localhost:3000/api/"

  constructor(private http:HttpClient) { }

  getTasks(){
    return this.http.get(this.API_URL+'getTasks')
  }

  addTask(task){
    let headers = new HttpHeaders()
    headers.append('content-Type','application/json')
    return this.http.post(this.API_URL+'addTask',task,{headers:headers})
  }
  
  updateTask(task){
    console.log("I got ",task);
    
    let headers = new HttpHeaders()
    headers.append('content-Type','application/json')
    return this.http.put(this.API_URL+'updateTask/'+task._id,task,{headers:headers})
  }

  delete(id){
    return this.http.delete(this.API_URL+'deleteTask/'+id)
  }

} 

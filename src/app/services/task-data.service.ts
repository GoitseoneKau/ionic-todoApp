import { Injectable } from '@angular/core';

export type Task = {
  id?:number;
  title: string;
  description:string;
  done:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  // tasks
  tasks: Task[] = [
    {
      id:1,
      title:"do laundry",
      description:"wash and fold",
      done:false
    }, 
    {
      id:2,
      title:"clean room",
      description:"vacuum and dust",
      done:true
    }, 
    {
      id:3,
      title:"takeout trash",
      description:"take out the trash",
      done:false
    }
  ]
  
  constructor() { }

  // get tasks
  getTasks(){
    return this.tasks
  }


  // add task
  addTask(task:any){
    console.log(task)
    task.description = task.description? task.description : "no description";
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
  }
  
  // remove task
  removeTask(task:any){
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    return this.tasks;
  }

  // update task
  updateTask(task:any){
    return this.tasks.map((t) => t.id === task.id? {...t,...task}: t);
  }
}

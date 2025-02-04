import { Task } from './../services/task-data.service';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader,
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton,
  IonButtons,
  IonInput,
  IonItem,
  IonModal,
  IonList,
  IonLabel,
  IonListHeader,
  IonItemOption, IonItemOptions, IonItemSliding,
  IonText,IonFab,IonFabButton, IonFabList, IonIcon,
  IonCheckbox
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, trashOutline } from 'ionicons/icons';

import { IonModalCustomEvent,OverlayEventDetail } from '@ionic/core';
import { TaskDataService } from '../services/task-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar,
    IonTitle, IonContent,
    IonButton,IonButtons,
    IonInput,IonItem,
    IonModal,FormsModule,
    IonList,IonHeader,
    IonLabel,IonListHeader,
    IonItemOption, IonItemOptions, IonItemSliding,
    IonText,IonFab,IonFabButton, IonIcon,
    IonCheckbox,
    NgFor,NgClass,
    TitleCasePipe
  ],
})
export class HomePage {
// get modal
  @ViewChild(IonModal) modal!: IonModal;

  // get tasks
  tasks:Task[] = [];
  title=""
  description=""
   // inject task service
  constructor(private taskService:TaskDataService) {
    addIcons({add,trashOutline});
    this.tasks = this.taskService.getTasks();
  }


  onWillDismiss(event: IonModalCustomEvent<OverlayEventDetail<any>>) {
  // add task if confirm button is clicked
    if (event.detail.role === 'confirm') {
      this.title=""
      this.description=""
      this.taskService.addTask(event.detail.data);
    }
  }

  //close modal
  cancel() {
    this.modal.dismiss();
  }

  // confirm task in modal
  confirm() {

    // dont add task if title is empty
    if(!this.title) {
      return;
    }
    this.modal.dismiss({title:this.title,description:this.description},'confirm');
  }

  // delete task
  deleteTask(task: Task) {
   this.tasks =  this.taskService.removeTask(task);
  }

  // complete task
  completeTask(task: Task) {
    task.done = !task.done;
    this.tasks = this.taskService.updateTask(task);
    console.log(this.tasks)
  }
}

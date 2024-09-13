import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit  {
  userId = input.required<string>();
  // order= input<'asc' | 'desc' >()
  order= signal<'asc' | 'desc'>( 'desc') ;
  private activateRoute = inject(ActivatedRoute)
  private tasksService= inject(TasksService)
  private destoryRef = inject(DestroyRef);
  userTasks = computed(()=> this.tasksService.allTasks().filter((task)=> task.userId === this.userId()).sort((a,b)=>{
    if(this.order() === 'desc'){
      return a.id > b.id ? -1: 1 
    }else{
      return a.id > b.id ? 1: -1 

    }
    
  }))

  trackById(index: number, task: Task) {
    return task.id;
  }
  ngOnInit() {
    const subscription = this.activateRoute.queryParams.subscribe({
      next: (params)=> (this.order.set(params['order']))
    })
    this.destoryRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
  }


  

}

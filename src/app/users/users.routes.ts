import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";

export const routes : Routes=[
    {
        path:'',
        redirectTo:'tasks', 
        pathMatch:'prefix'
    },
    {
        path:'tasks',//<your-domain>/user/userdId/tasks
        component:TasksComponent,
        runGuardsAndResolvers:'always'
    
    },
    {
        path:'tasks/new',
        component:NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
    }
]
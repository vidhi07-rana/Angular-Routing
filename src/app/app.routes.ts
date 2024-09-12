import { Routes } from "@angular/router";
import { routes as userRoutes } from "./users/users.routes";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes=[
    {
        path:'',//<domain>/componet
        component:NoTaskComponent
    },
            //dynamic  routesb
    {

        path:'users/:userId',//<your-domain>/users/userId(eg.u1):dynamic path segment 
        component:UserTasksComponent,
        children:userRoutes
    },
    {
        path:'**',
        component:NotFoundComponent
    }
    

    
]   
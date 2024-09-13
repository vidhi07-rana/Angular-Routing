import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { routes as userRoutes } from "./users/users.routes";
import { resolveTittle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";


 const  dummyCanMatch : CanMatchFn =(route, segment)=>{
    const router = inject(Router)
    const shouldlsGetAccess = Math.random()

    if(shouldlsGetAccess < 0.5){
    return true
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'))
 }
export const routes: Routes=[
    {
        path:'',//<domain>/componet
        component:NoTaskComponent,
        title:'No task Selected'

    },
            //dynamic  routesb
    {

        path:'users/:userId',//<your-domain>/users/userId(eg.u1):dynamic path segment 
        component:UserTasksComponent,
        children:userRoutes,
        title: resolveTittle,
        data:{
            message: 'Hello'
        },
        resolve:
        {
           userName: resolveUserName
        }


    },
    {
        path:'**',
        component:NotFoundComponent
    }
    

    
]   
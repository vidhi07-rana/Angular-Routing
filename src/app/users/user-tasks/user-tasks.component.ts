import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports:[RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
message = input.required<string>()
// userId = input.required<string>();
private usersService = inject(UsersService)
private   activatedRoute = inject(ActivatedRoute)
  userName='';
  private destroyRef = inject(DestroyRef)
// userName = computed(()=>this.usersService.users.find(u=> u.id === this.userId())?.name)

ngOnInit() {
  this.activatedRoute.data.subscribe({
    next:(data)=>{
      console.log(data)
    }
  })
  console.log('Input Data: ' + this.message); // Fix: Access input without parentheses
  console.log(this.activatedRoute);
 const subscription= this.activatedRoute.paramMap.subscribe({
    next:(paramMap)=>
      this.userName=this.usersService.users.find((u)=>u.id === paramMap.get('userId'))?.name || ''
  })
this.destroyRef.onDestroy(()=>{
  subscription.unsubscribe();
})
}
}

export const resolveUserName: ResolveFn<string> =(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot)=>{
const usersService = inject(UsersService)
const userName = usersService.users.find((u)=>u.id === activatedRoute.paramMap.get('userId'))?.name || ''

return userName;
}

export const resolveTittle : ResolveFn<string>= (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot)=>{

  return resolveUserName(activatedRoute,routerState)+ '\'s Tasks'

}


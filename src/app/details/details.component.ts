import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, RouterLink } from '@angular/router';
import {  UserService } from '../userService';
import { IUsers } from '../IUsers';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  user:IUsers[] = [];
  id:any = '';
  userDetials:IUsers={
    id:0,
    email:'',
    first_name:'',
    last_name:'',
    avatar:''
  }
  constructor(private activateRoute: ActivatedRoute, private _UserService:UserService){}
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((result:ParamMap)=>{
      this.id = result.get('id')
      console.log(this.id)
    })
    this._UserService.getDetails(this.id).subscribe({
      next:(response)=> {
        this.userDetials = response.data;
        console.log(this.id)
        console.log(this.userDetials)
      }
    })
  

  }
}

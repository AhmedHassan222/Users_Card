import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {path:'home' , component:HomeComponent , title:'task - Home page'},
    {path:'details/:id', component:DetailsComponent , title:'task - Details page'},
    {path:'search',component:SearchComponent,title:'task - Search Page'},
    {path:'',redirectTo:'home', pathMatch:'full' , title:'task - Home page'},
    {path:'**',component:NotfoundComponent , title:'task - Notfound page - 404'}
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import {CreatePostComponent} from './post/create-post/create-post.component';
import {CreatePhotosComponent} from './photos/create-photos/create-photos.component';
import {ListPhotosComponent} from './photos/list-photos/list-photos.component';
import {ViewPostComponent} from './post/view-post/view-post.component';
import {UserProfileComponent} from './auth/user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view-post/:id', component: ViewPostComponent},
  { path: 'create-photos', component: CreatePhotosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

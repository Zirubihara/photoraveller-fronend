import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpRequestPayload} from './SignUpRequestPayload';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpRequestPayload: SignUpRequestPayload;
  signupForm: FormGroup;

  constructor() {
    // this.signupForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', Validators.required)
    // });
    this.signUpRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): any {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signup(): any {
    this.signUpRequestPayload.username = this.signupForm.get('username').value;
    this.signUpRequestPayload.email = this.signupForm.get('email').value;
    this.signUpRequestPayload.password = this.signupForm.get('password').value;

  }

}

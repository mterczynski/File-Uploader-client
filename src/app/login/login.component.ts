import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  successMessage = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    // this.errorMessage = 'Error with connecting to server';
    this.successMessage = 'Logged in';
    this.errorMessage = '';
  }

}

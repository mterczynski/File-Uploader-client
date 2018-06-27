import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Form {
  usernameOrEmail: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  successMessage = '';
  form;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      usernameOrEmail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit({value, valid}: {value: Form, valid: boolean}) {
    if (!valid) {
      return;
    }

    this.authService.logIn(value).subscribe((data) => {
      if (data.err) {
        this.successMessage = null;
        this.errorMessage = data.err;
      } else if (data.token) {
        this.authService.saveToken(data.token);
        this.successMessage = 'Logged in';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 400);
      } else {
        this.successMessage = null;
        this.errorMessage = 'Server error';
      }
    });
  }

}

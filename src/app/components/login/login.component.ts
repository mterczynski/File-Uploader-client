import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Form {
  usernameOrEmail: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  errorMessage = '';
  successMessage = '';
  form = new FormGroup({
    usernameOrEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit({value, valid}: {value: Form, valid: boolean}) {
    if (!valid) {
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

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
      this.isLoading = false;
    }, (err) => {
      this.successMessage = null;
      this.errorMessage = `Could not connect to server`;
      this.isLoading = false;
    });
  }
}

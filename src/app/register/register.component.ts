import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface FormData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  errorMessage = null;
  successMessage = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    // function passwordMatchValidator(g: FormGroup) {
    //    return g.controls.password.value === g.controls.repeatPassword.value
    //       ? null : {'mismatch': true};
    // }

    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
      // passwordMatchValidator
    );
  }

  onSubmit({value, valid}: {value: FormData, valid: boolean}) {
    if (value.password !== value.repeatPassword) {
      return;
    }
    if (!valid) {
      return;
    }

    this.authService.register(value).subscribe((data) => {
      if (data.token) {
        this.authService.saveToken(data.token);
        this.successMessage = 'Registered';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 400);
      } else if (data.err) {
        this.errorMessage = data.err;
        this.successMessage = null;
      } else {
        this.errorMessage = 'Server error';
        this.successMessage = null;
      }
    }, (err) => {
      this.errorMessage = err.message;
      this.successMessage = null;
    });
  }
}

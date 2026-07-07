import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private router = inject(Router);
  login = '';
  password = '';
  hidePassword = true;

  onLogin(): void {
    console.log('Login:', this.login);
    console.log('Password:', this.password);

    // Ici plus tard :
    // appel Spring Boot ou fallback si Okta indisponible
    if(this.login == "admin" && this.password == "1234") {
      this.router.navigate(['/search']);
    }
  }
}
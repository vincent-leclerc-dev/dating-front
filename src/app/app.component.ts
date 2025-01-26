import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // prefer inject() syntax over constructor injection
  // alow us to extend the class without changing the constructor
  // inject() work only on constructor phase
  http= inject(HttpClient);
  private accountService = inject(AccountService);
  title = 'DatingApp';
  users: any;

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if(!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  getUsers() {
     // http get return an Observable of the response body
     this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => {
        console.log(response);
        this.users = response;
      },
      error: (error) => {
        // ex: CORS error
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    });
  }
}

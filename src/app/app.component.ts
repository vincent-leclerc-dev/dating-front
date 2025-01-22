import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // prefer inject() syntax over constructor injection
  // alow us to extend the class without changing the constructor
  // inject() work only on constructor phase
  http= inject(HttpClient);
  title = 'DatingApp';
  users: any;

  ngOnInit(): void {
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

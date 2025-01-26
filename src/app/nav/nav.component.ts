import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);

  model: any = {
    username: '',
    password: ''
  };

  error: string = '';

  alertIconClose = faXmark;
  dropdownVisible = false;
  dropdownIcon = this.dropdownVisible ? faCaretUp : faCaretDown;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    this.dropdownIcon = this.dropdownVisible ? faCaretUp : faCaretDown;
  }

  login() {
    if(this.model.username === '' || this.model.password === '') {
      this.error = 'Username and password are required';
      return;
    }

    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);

        this.error = '';
      },
      error: error => {
        console.error(error.error);
        this.error = 'Username or password is incorrect';
      }
    });
  }

  logout() {
    this.accountService.logout();
  }

  resetError() {
    this.error = '';
  }
}

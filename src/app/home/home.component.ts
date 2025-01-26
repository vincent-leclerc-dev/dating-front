import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  registerMode = false;

  state = signal<{counter: number}>({ counter: 0});

  setCounter() {
    this.state.set({ counter: 10});
  }

  updateCounter() {
    const currentState = this.state();
    this.state.set({ ...currentState, counter: currentState.counter + 1 });
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  counterValue() {
    return this.state().counter;
  }

  doubleCounterValue = computed(() => {

    return this.state().counter * 2

    });
}

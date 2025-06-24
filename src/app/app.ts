import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DoseCalculatorComponent} from './Component/dose-calculator/dose-calculator.component';

@Component({
  selector: 'app-root',
  imports: [
    DoseCalculatorComponent
  ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected title = 'demo';
}

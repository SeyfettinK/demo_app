import {Component, Input} from '@angular/core';
import {Medication} from "../../data/medications";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-medication-info',
  imports: [
    NgIf
  ],
  templateUrl: './medication-info.component.html',
  standalone: true,
  styleUrl: './medication-info.component.css'
})
export class MedicationInfoComponent {
  @Input() medication!: Medication;

}

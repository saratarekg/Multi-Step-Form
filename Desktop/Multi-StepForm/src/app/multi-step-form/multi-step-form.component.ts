import { Component } from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [
    JsonPipe,
    MatFormField,
    MatInput,
    MatLabel,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgForOf,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatButton
  ],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css'
})
export class MultiStepFormComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.secondFormGroup = this._formBuilder.group({
      courses: this._formBuilder.array([
        this.createCourse()
      ])
    });
  }

  get courses(): FormArray {
    return this.secondFormGroup.get('courses') as FormArray;
  }

  createCourse(): FormGroup {
    return this._formBuilder.group({
      Title: ['', Validators.required],
      creditHours: ['', Validators.required]
    });
  }

  addAddress(): void {
    this.courses.push(this.createCourse());
  }

  onSubmit(): void {
    console.log('First Step:', this.firstFormGroup.value);
    console.log('Second Step:', this.secondFormGroup.value);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Rate, RateType } from '@models/rate';
import { RateService } from '@services/rates.service';

@Component({
  selector: 'app-rate-edit-view',
  templateUrl: './rate-edit-view.component.html',
  styleUrls: ['./rate-edit-view.component.scss']
})
export class RateEditView implements OnInit, OnDestroy {

  pageTitle = 'Edición de Curso';
  errorMessage: string;
  rateForm: FormGroup;

  rate: Rate;
  RATE_TYPES: RateType[] = Rate.getRateTypes();

  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rateService: RateService) { }

  ngOnInit() {
    this.rateForm = this.fb.group({
      current: true,
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });

    // Read the student Id from the route parameter
    const rateId = this.route.snapshot.paramMap.get('id');
    this.getRate(rateId);
  }

  ngOnDestroy(): void {
  }

  getRate(id: string): void {
    this.rateService.getRate(id)
      .subscribe({
        next: (rate: Rate) => {
          this.rate = rate;
          this.displayRate();
        },
        error: err => this.errorMessage = err
      });
  }

  displayRate(): void {

    if (this.rateForm) {
      this.rateForm.reset();
    }

    if (this.rate.id === '0') {
      this.pageTitle = 'Creando una nueva tarifa';
    } else {
      this.pageTitle = `Editando la tarifa: ${this.rate.name}`;
    }

    // Update the data on the form
    this.rateForm.patchValue({
      current: this.rate.current,
      name: this.rate.name,
      type: this.rate.type,
      price: this.rate.price
    });
  }

  deleteRate(): void {
    if (this.rate.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Realmente quieres eliminar: ${this.rate.name}?`)) {
        this.rateService.deleteRate(this.rate.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onResetForm(): void {
    this.rateForm.reset();
  }

  onSaveForm(): void {
    if (this.rateForm.valid) {

        const item = { ...this.rate, ...this.rateForm.value };

        if (item.id === '0') {
          this.rateService.createRate(item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.rateService.updateRate(item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.rateForm.reset();
    this.router.navigate([`/${Rate.PATH_URL}`]);
  }

  goBack(): void {
    // Reset the form to clear the flags
    this.rateForm.reset();
    this.router.navigate([`/${Rate.PATH_URL}`]);
  }
}

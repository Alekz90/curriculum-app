import { AbstractControl, FormArray } from '@angular/forms';

export class FormValidators {
  
  // Obtener error de un control
  static getFieldError(control: AbstractControl | null): string {
    if (!control) return '';
    
    if (control.hasError('required')) {
      return 'Esta información es obligatoria';
    }
    
    if (control.hasError('email')) {
      return 'Email no válido';
    }
    
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Esta información no puede exceder ${maxLength} caracteres`;
    }
    
    if (control.hasError('min')) {
      const min = control.getError('min').min;
      return `El valor mínimo es ${min}`;
    }
    
    if (control.hasError('max')) {
      const max = control.getError('max').max;
      return `El valor máximo es ${max}`;
    }
    
    if (control.hasError('pattern')) {
      return 'Formato no válido';
    }
    
    if (control.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }
    
    return '';
  }

  // Obtener error de un control en FormArray
  static getFieldArrayError(formArray: FormArray, index: number, fieldName: string): string {
    const control = formArray.at(index)?.get(fieldName);
    return FormValidators.getFieldError(control);
  }

  // Marcar todos los campos como tocados
  static markFormGroupTouched(formGroup: any): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      // Si es un FormGroup o FormArray anidado, marcar recursivamente
      if (control instanceof FormArray || control?.get) {
        FormValidators.markFormGroupTouched(control);
      }
    });
  }

  static getInvalidField(control: AbstractControl | null): boolean {
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
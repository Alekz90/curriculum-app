import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';
import { Constants } from './constants';

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

  static getPasswordError(control: AbstractControl | null): string {
    if (control?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (control?.hasError('pattern')) {
      return `Formato de contraseña no válido: ${Constants.PATTERN_PASSWORD_MESSAGE}`;
    }
    if (control?.hasError('passwordMatch')) {
      return 'La nueva contraseña no puede ser igual a la anterior';
    }
    return '';
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  static passwordMatchValidator(passwordControl: AbstractControl | null, confirmControl: AbstractControl | null): ValidationErrors | null {
    const password = passwordControl?.value;
    const confirmPassword = confirmControl?.value;
    
    // Si ambos campos tienen valor y no coinciden, retorna error
    if (password && confirmPassword && password !== confirmPassword) {
      // Asigna el error al campo confirmPassword
      confirmControl?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    // Si coinciden, limpia el error passwordMismatch del confirmPassword
    const confirmPasswordControl = confirmControl;
    if (confirmPasswordControl?.hasError('passwordMismatch')) {
      confirmPasswordControl.setErrors(null);
    }
    
    return null;
  }
 

  // Validador personalizado para verificar que las contraseñas no sea iguales
  static passwordNotMatchValidator(oldPasswordControl: AbstractControl | null, newPasswordControl: AbstractControl | null): ValidationErrors | null {
    const oldPassword = oldPasswordControl?.value;
    const newPassword = newPasswordControl?.value;
    
    // Si ambos campos tienen valor y no coinciden, retorna error
    if (oldPassword && newPassword && oldPassword === newPassword) {
      // Asigna el error al campo confirmPassword
      newPasswordControl?.setErrors({ passwordMatch: true });
      return { passwordMatch: true };
    }
    
    // Si coinciden, limpia el error passwordMatch del confirmPassword
    const confirmPasswordControl = newPasswordControl;
    if (confirmPasswordControl?.hasError('passwordMatch')) {
      confirmPasswordControl.setErrors(null);
    }
    
    return null;
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
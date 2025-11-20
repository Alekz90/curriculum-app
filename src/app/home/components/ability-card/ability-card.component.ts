import { Component, inject, input, signal } from '@angular/core';
import { MaterialCardModule } from '@modules/material-card.module';
import { AbilityGroupResponse, AbilityResponse } from '@interfaces/ability.interface';
import { Constants } from '@app/utils/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';

@Component({
  selector: 'ability-card',
  imports: [MaterialCardModule],
  templateUrl: './ability-card.component.html',
})
export class AbilityCardComponent {

  readonly DASHBOARD = Constants.DASHBOARD;
  readonly EDITION = Constants.EDITION;
  readonly FORM = Constants.FORM;
  
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);
  
  abilityGroups = input.required<AbilityGroupResponse[]>();
  viewType = input<string>(Constants.DASHBOARD);

  editForm!: FormGroup;

  groupId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');
  groupAbilities = signal<AbilityGroupResponse | undefined>(undefined);  

  ngOnInit(): void {
    this.groupAbilities.set(this.abilityGroups().find(g => g.id === this.groupId()));
    console.log('Loaded group:', this.groupAbilities());

    this.editForm = this.formBuilder.group({
      id: [this.groupAbilities()?.id || null],
      groupName: ['', [Validators.required, Validators.maxLength(100)]],
      abilities: this.formBuilder.array([]) // FormArray para habilidades dinámicas
    });

    if (this.groupAbilities()) {
      this.editForm.patchValue({
        groupName: this.groupAbilities()?.name || '',
      });

      this.groupAbilities()?.abilities.forEach(ability => {
        this.abilities.push(this.formBuilder.group({
          id: [ability.id || null],
          name: [ability.name, [Validators.required, Validators.maxLength(100)]],
          percentage: [ability.percentage, [Validators.required, Validators.min(0), Validators.max(100)]]
        }));
      });
    } else {
      // Si no se encuentra el grupo, inicializar con una habilidad vacía
      this.addAbility();
    }
  }

  // Agregar nueva habilidad
  addAbility(): void {
    this.abilities.push(this.createAbility());
  }

  // Crear un FormGroup para una habilidad
  createAbility(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      percentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  // Eliminar habilidad por índice
  removeAbility(index: number): void {
    if (this.abilities.length > 1) {
      console.log('Attempting to remove ability at index:', this.abilities.at(index));
      this.abilities.removeAt(index);
      this.editForm.removeControl(index.toString());
    }
  }

  // Getter para acceder al FormArray
  get abilities(): FormArray {
    return this.editForm.get('abilities') as FormArray;
  }

  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      //console.log('Ability Form data:', this.editForm.value);
      console.log('Ability Form data:', this.editForm.controls);
      // Aquí puedes agregar la lógica de autenticación
      // Por ejemplo: this.authService.login(this.abilityForm.value);
    }
  }

  deleteItem() {
    throw new Error('Method not implemented.');
  }

  cancel(): void {
    if (this.editForm.pristine) {
      this.goToEditMode();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.goToEditMode();
      }
    });
  }

  getAbilitiesJoinText(abilities: AbilityResponse[]): String {
    return abilities.map(ability => ability.name).join(', ');
  }

  goToEditMode(): void {
    this.router.navigate([ConstantsRoutes.abilities.pathLink]);
  }
  
  goToFormMode(id: string): void {
    this.router.navigate([ConstantsRoutes.abilityForm.pathLink, id]);
  }

  getFieldError(fieldName: string): string {
    const control = this.editForm.get(fieldName);
    if (control?.hasError('required')) return `Esta informacion es obligatoria`;
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Esta información no puede exceder ${maxLength} caracteres`;
    }
    return '';
  }

  getFieldArrayError(index: number, name: string): string {
    const control = this.abilities.at(index).get(name);
    if (control?.hasError('required')) return `Esta informacion es obligatoria`;
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Esta información no puede exceder ${maxLength} caracteres`;
    }
    return '';
  }

}

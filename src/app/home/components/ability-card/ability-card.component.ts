import { Component, inject, input, signal } from '@angular/core';
import { MaterialCardModule } from '@modules/material-card.module';
import { AbilityGroupResponse, AbilityResponse } from '@interfaces/ability.interface';
import { Constants } from '@utils/constants';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { FormValidators } from '@utils/form-validators';
import { NavigationUtils } from '@utils/navigation-utils';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'ability-card',
  imports: [MaterialCardModule],
  templateUrl: './ability-card.component.html',
})
export class AbilityCardComponent {

  readonly DASHBOARD = Constants.DASHBOARD_MODE;
  readonly EDITION = Constants.VIEW_MODE;
  readonly FORM = Constants.FORM_MODE;
  readonly PATH_NEW = Constants.PATH_NEW;

  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private curriculumService = inject(CurriculumService);
  protected navigation      = inject(NavigationUtils);

  abilityGroups = input.required<AbilityGroupResponse[]>();
  detailId = input<string>('');
  viewType = input<string>(Constants.DASHBOARD_MODE);

  groupId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  editForm!: FormGroup;
  groupAbilities = signal<AbilityGroupResponse | undefined>(undefined);  

  ngOnInit(): void {
    this.groupAbilities.set(this.abilityGroups().find(g => g.id === this.groupId()));

    this.editForm = this.formBuilder.group({
      id: [this.groupAbilities()?.id || null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      abilities: this.formBuilder.array([]) // FormArray para habilidades dinámicas
    });

    if (this.groupAbilities()) {
      this.editForm.patchValue({
        name: this.groupAbilities()?.name || '',
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
      this.curriculumService.saveAbilityGroup(this.detailId(), this.groupId(), this.editForm.value)
        .subscribe({
          next: (response) => {
            if (response.id === Constants.ID_SUCCESS) {
              this.navigation.goToEditAbility();
            }
          },
        });
    }
  }

  deleteAbilityGroupItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.DELETE_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.curriculumService.deleteAbilityGroup(this.detailId(), id)
          .subscribe(
            (deleted) => {
              if (deleted) {
                this.abilityGroups().splice(this.abilityGroups().findIndex(group => group.id === id), 1);
              }
            }
          );
      }
    });
  }

  cancel(): void {
    if (this.editForm.pristine) {
      this.navigation.goToEditAbility();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.navigation.goToEditAbility();
      }
    });
  }

  getAbilitiesJoinText(abilities: AbilityResponse[]): String {
    return abilities.map(ability => ability.name).join(', ');
  }

  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.editForm.get(fieldName));
  }

  getFieldArrayError(index: number, name: string): string {
    return FormValidators.getFieldError(this.abilities.at(index).get(name));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.editForm.get(fieldName));
  }
  
  getInvalidFieldArray(index: number, name: string): boolean {
    return FormValidators.getInvalidField(this.abilities.at(index).get(name));
  }
}

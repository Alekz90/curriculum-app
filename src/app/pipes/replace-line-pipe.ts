import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceLine',
  standalone: true
})
export class ReplaceLinePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
    name: 'dateFormatter',
})
export class PickerDatePipe implements PipeTransform {
    public transform(value: Date | null, formatter: string | ((date: Date) => string)): string {
        if (!value) {
            return '';
        } else if (typeof formatter === 'string') {
            return format(value, formatter);
        } else {
            return formatter(value);
        }
    }
}

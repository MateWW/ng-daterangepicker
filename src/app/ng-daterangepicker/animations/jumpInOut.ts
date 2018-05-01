import { animate, style, transition, trigger } from '@angular/animations';

export const jumpInOut = trigger('jumpInOut', [
    transition(':enter', [style({ transform: 'scale(0)' }), animate('300ms', style({ transform: 'scale(1)' }))]),
]);

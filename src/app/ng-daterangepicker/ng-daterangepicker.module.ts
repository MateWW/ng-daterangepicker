import { NgModule } from '@angular/core';

import { InputComponent } from './components/input.component';
import { NgDateRangePickerComponent } from './ng-daterangepicker.component';

@NgModule({
    declarations: [NgDateRangePickerComponent, InputComponent],
    exports: [NgDateRangePickerComponent],
})
export class NgDateRangePickerModule {}

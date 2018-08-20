import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarComponent } from './components/calendar.component';
import { InputComponent } from './components/input.component';
import { NgDateRangePickerComponent } from './ng-daterangepicker.component';
import { PickerDatePipe } from './pipes/picker-date.pipe';
import { NgDaterangepickerService } from './service/ng-daterangepicker.service';

describe('NgDaterangepickerComponent', () => {
    let component: NgDateRangePickerComponent;
    let fixture: ComponentFixture<NgDateRangePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, BrowserAnimationsModule],
            declarations: [NgDateRangePickerComponent, InputComponent, CalendarComponent, PickerDatePipe],
            providers: [NgDaterangepickerService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgDateRangePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

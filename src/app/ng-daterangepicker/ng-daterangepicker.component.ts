import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as dateFns from 'date-fns';

import { IDay } from './models/IDay';
import { getOptions, NgDateRangePickerOptions } from './models/NgDateRangePickerOptions';

export let DATERANGEPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgDateRangePickerComponent),
    multi: true,
};

@Component({
    selector: 'ng-daterangepicker',
    template: `
        <div class="ng-daterangepicker"
             [ngClass]="{ 'is-active': !!opened,
                  'theme-green': options.theme === 'green',
                  'theme-teal': options.theme === 'teal',
                  'theme-cyan': options.theme === 'cyan',
                  'theme-grape': options.theme === 'grape',
                  'theme-red': options.theme === 'red',
                  'theme-gray': options.theme === 'gray' }">

            <div class="input-section" (click)="toggleCalendar($event, 'from')">
                <span class="label-txt">{{options.presetNames[6]}}</span>
                <span class="value-txt">{{ dateFrom | date:options.dateFormat }}</span>
                <span class="cal-icon">
                  <svg width="94px" height="94px" viewBox="3 3 94 94" version="1.1">
                    <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(3.000000, 3.000000)">
                      <path d="M67.166,20.168 C69.238,20.168 70.916,18.489 70.916,16.418 L70.916,4.085 C70.916,2.014 69.238,0.335 67.166,0.335 C65.096,0.335 63.416,2.014 63.416,4.085 L63.416,16.418 C63.416,18.489 65.096,20.168 67.166,20.168 Z M26.834,20.168 C28.904,20.168 30.584,18.489 30.584,16.418 L30.584,4.085 C30.584,2.014 28.904,0.335 26.834,0.335 C24.762,0.335 23.084,2.014 23.084,4.085 L23.084,16.418 C23.084,18.489 24.762,20.168 26.834,20.168 Z M88.833,9.5 L75.416,9.5 L75.416,16.418 C75.416,20.967 71.715,24.668 67.166,24.668 C62.617,24.668 58.916,20.967 58.916,16.418 L58.916,9.5 L35.084,9.5 L35.084,16.418 C35.084,20.967 31.383,24.668 26.834,24.668 C22.285,24.668 18.584,20.967 18.584,16.418 L18.584,9.5 L5.167,9.5 C2.405,9.5 0.167,11.738 0.167,14.5 L0.167,35 L93.833,35 L93.833,14.5 C93.833,11.738 91.595,9.5 88.833,9.5 Z M0.167,88.167 C0.167,90.929 2.405,93.167 5.167,93.167 L88.833,93.167 C91.595,93.167 93.833,90.929 93.833,88.167 L93.833,39 L0.167,39 L0.167,88.167 Z M69.387,50.875 L82.179,50.875 L82.179,63.667 L69.387,63.667 L69.387,50.875 Z M69.387,69.125 L82.179,69.125 L82.179,81.917 L69.387,81.917 L69.387,69.125 Z M50.198,50.875 L62.99,50.875 L62.99,63.667 L50.198,63.667 L50.198,50.875 Z M50.198,69.125 L62.99,69.125 L62.99,81.917 L50.198,81.917 L50.198,69.125 Z M31.01,50.875 L43.802,50.875 L43.802,63.667 L31.01,63.667 L31.01,50.875 Z M31.01,69.125 L43.802,69.125 L43.802,81.917 L31.01,81.917 L31.01,69.125 Z M11.821,50.875 L24.613,50.875 L24.613,63.667 L11.821,63.667 L11.821,50.875 Z M11.821,69.125 L24.613,69.125 L24.613,81.917 L11.821,81.917 L11.821,69.125 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path>
                    </g>
                  </svg>
                </span>
            </div>

            <div class="input-section" (click)="toggleCalendar($event, 'to')">
                <span class="label-txt">{{options.presetNames[7]}}</span>
                <span class="value-txt">{{ dateTo | date:options.dateFormat }}</span>
                <span class="cal-icon">
                  <svg width="94px" height="94px" viewBox="3 3 94 94" version="1.1">
                    <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(3.000000, 3.000000)">
                      <path d="M67.166,20.168 C69.238,20.168 70.916,18.489 70.916,16.418 L70.916,4.085 C70.916,2.014 69.238,0.335 67.166,0.335 C65.096,0.335 63.416,2.014 63.416,4.085 L63.416,16.418 C63.416,18.489 65.096,20.168 67.166,20.168 Z M26.834,20.168 C28.904,20.168 30.584,18.489 30.584,16.418 L30.584,4.085 C30.584,2.014 28.904,0.335 26.834,0.335 C24.762,0.335 23.084,2.014 23.084,4.085 L23.084,16.418 C23.084,18.489 24.762,20.168 26.834,20.168 Z M88.833,9.5 L75.416,9.5 L75.416,16.418 C75.416,20.967 71.715,24.668 67.166,24.668 C62.617,24.668 58.916,20.967 58.916,16.418 L58.916,9.5 L35.084,9.5 L35.084,16.418 C35.084,20.967 31.383,24.668 26.834,24.668 C22.285,24.668 18.584,20.967 18.584,16.418 L18.584,9.5 L5.167,9.5 C2.405,9.5 0.167,11.738 0.167,14.5 L0.167,35 L93.833,35 L93.833,14.5 C93.833,11.738 91.595,9.5 88.833,9.5 Z M0.167,88.167 C0.167,90.929 2.405,93.167 5.167,93.167 L88.833,93.167 C91.595,93.167 93.833,90.929 93.833,88.167 L93.833,39 L0.167,39 L0.167,88.167 Z M69.387,50.875 L82.179,50.875 L82.179,63.667 L69.387,63.667 L69.387,50.875 Z M69.387,69.125 L82.179,69.125 L82.179,81.917 L69.387,81.917 L69.387,69.125 Z M50.198,50.875 L62.99,50.875 L62.99,63.667 L50.198,63.667 L50.198,50.875 Z M50.198,69.125 L62.99,69.125 L62.99,81.917 L50.198,81.917 L50.198,69.125 Z M31.01,50.875 L43.802,50.875 L43.802,63.667 L31.01,63.667 L31.01,50.875 Z M31.01,69.125 L43.802,69.125 L43.802,81.917 L31.01,81.917 L31.01,69.125 Z M11.821,50.875 L24.613,50.875 L24.613,63.667 L11.821,63.667 L11.821,50.875 Z M11.821,69.125 L24.613,69.125 L24.613,81.917 L11.821,81.917 L11.821,69.125 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path>
                    </g>
                  </svg>
                </span>
            </div>

            <div class="calendar" [ngClass]="{ 'is-opened': !!opened, 'is-to': opened === 'to' }">
                <div class="calendar-container">
                    <div class="controls">
                        <span class="control-icon" (click)="prevMonth()">
                          <svg width="13px" height="20px" viewBox="0 44 13 20" version="1.1">
                            <path d="M11.7062895,64 C11.6273879,64 11.5477012,63.9744846 11.480576,63.921491 L0.139160349,54.9910879 C0.0551556781,54.9247477 0.00451734852,54.8250413 0.000199351429,54.7174839 C-0.00333355528,54.6107116 0.0402389608,54.5074722 0.119140544,54.4356364 L11.4605562,44.095211 C11.6093308,43.9589979 11.8401474,43.9707742 11.9751829,44.1187637 C12.1110036,44.2675384 12.1004048,44.4983549 11.9516302,44.6333905 L0.928176181,54.6841175 L11.9323955,63.3491601 C12.0905912,63.4735969 12.1176768,63.7028433 11.9928475,63.861039 C11.9206191,63.9521095 11.8138469,64 11.7062895,64 Z" id="Shape" stroke="none" fill="#000000" fill-rule="nonzero"></path>
                          </svg>
                        </span>
                        <span class="control-title">{{ date | date:'MMMM y' }}</span>
                        <span class="control-icon" (click)="nextMonth()">
                          <svg width="13px" height="20px" viewBox="21 44 13 20">
                            <path d="M32.7062895,64 C32.6273879,64 32.5477012,63.9744846 32.480576,63.921491 L21.1391603,54.9910879 C21.0551557,54.9247477 21.0045173,54.8250413 21.0001994,54.7174839 C20.9966664,54.6107116 21.040239,54.5074722 21.1191405,54.4356364 L32.4605562,44.095211 C32.6093308,43.9589979 32.8401474,43.9707742 32.9751829,44.1187637 C33.1110036,44.2675384 33.1004048,44.4983549 32.9516302,44.6333905 L21.9281762,54.6841175 L32.9323955,63.3491601 C33.0905912,63.4735969 33.1176768,63.7028433 32.9928475,63.861039 C32.9206191,63.9521095 32.8138469,64 32.7062895,64 Z" id="Shape" stroke="none" fill="#000000" fill-rule="nonzero" transform="translate(27.035642, 54.000000) scale(-1, 1) translate(-27.035642, -54.000000) "></path>
                          </svg>
                        </span>
                    </div>
                    <div class="day-names">
                        <span class="day-name" *ngFor="let name of dayNames">{{ name }}</span>
                    </div>
                    <div class="days">
                        <div class="day"
                             *ngFor="let d of days; let i = index;"
                             [ngClass]="{
                                   'is-within-range': d.isWithinRange,
                                   'is-from': d.from,
                                   'is-to': d.to,
                                   'is-first-weekday': d.weekday === 1 || d.firstMonthDay,
                                   'is-last-weekday': d.weekday === 0 || d.lastMonthDay
                                }"
                             (click)="selectDate($event, i)"
                        >
                            <span *ngIf="d.visible" class="day-num" [class.is-active]="d.from || d.to">{{ d.day }}</span>
                        </div>
                    </div>
                </div>
                <div class="side-container">
                    <div class="side-container-buttons">
                        <button type="button" class="side-button" (click)="selectRange('tm')" [class.is-active]="range === 'tm'">{{options.presetNames[0]}}</button>
                        <button type="button" class="side-button" (click)="selectRange('lm')" [class.is-active]="range === 'lm'">{{options.presetNames[1]}}</button>
                        <button type="button" class="side-button" (click)="selectRange('tw')" [class.is-active]="range === 'tw'">{{options.presetNames[2]}}</button>
                        <button type="button" class="side-button" (click)="selectRange('lw')" [class.is-active]="range === 'lw'">{{options.presetNames[3]}}</button>
                        <button type="button" class="side-button" (click)="selectRange('ty')" [class.is-active]="range === 'ty'">{{options.presetNames[4]}}</button>
                        <button type="button" class="side-button" (click)="selectRange('ly')" [class.is-active]="range === 'ly'">{{options.presetNames[5]}}</button>
                    </div>
                    <span class="close-icon" (click)="closeCalendar($event)">
                        <svg width="20px" height="20px" viewBox="47 44 20 20" version="1.1">
                          <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(48.000000, 44.000000)">
                            <path d="M19.6876399,20 C19.6047542,19.999927 19.52529,19.9669423 19.4667175,19.9082976 L0.0839056416,0.525743396 C-0.0308734765,0.402566324 -0.0274867013,0.210616527 0.0915663128,0.0915650956 C0.210619327,-0.0274863359 0.402571676,-0.030873066 0.525750385,0.0839045261 L19.9085623,19.4664587 C19.9978567,19.5558631 20.0245499,19.6902301 19.9762091,19.8069762 C19.9278683,19.9237223 19.8139998,19.9998889 19.6876399,20 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path>
                            <path d="M0.312360116,20 C0.186000167,19.9998889 0.0721317315,19.9237223 0.0237909073,19.8069762 C-0.0245499168,19.6902301 0.0021432967,19.5558631 0.0914377445,19.4664587 L19.4742496,0.0839045261 C19.5974283,-0.030873066 19.7893807,-0.0274863359 19.9084337,0.0915650956 C20.0274867,0.210616527 20.0308735,0.402566324 19.9160944,0.525743396 L0.533282488,19.9082976 C0.474709982,19.9669423 0.395245751,19.999927 0.312360116,20 L0.312360116,20 Z" id="Shape" fill="#000000" fill-rule="nonzero"></path>
                          </g>
                        </svg>
                    </span>
                </div>
            </div>
        </div>

    `,
    styleUrls: ['./ng-daterangepicker.component.scss'],
    providers: [DATERANGEPICKER_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDateRangePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() public options: NgDateRangePickerOptions;

    date

    public modelValue: string;
    public opened: false | 'from' | 'to';
    public date: Date;
    public dateFrom: Date;
    public dateTo: Date;
    public dayNames: string[];
    public days: IDay[];
    public range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';

    private onTouchedCallback: () => void = () => {};
    private onChangeCallback: (_: any) => void = () => {};

    constructor(private elementRef: ElementRef) {}

    public get value(): string {
        return this.modelValue;
    }

    public set value(value: string) {
        if (!value) {
            return;
        }
        this.modelValue = value;
        this.onChangeCallback(value);
    }

    public writeValue(value: string): void {
        if (!value) {
            return;
        }
        this.modelValue = value;
    }

    public registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    public ngOnInit(): void {
        this.opened = false;
        this.date = dateFns.startOfDay(new Date());
        this.options = getOptions(this.options);
        this.initNames();
        this.selectRange(this.options.range);
    }

    public ngOnChanges(): void {
        this.options = getOptions(this.options);
    }

    public initNames(): void {
        this.dayNames = this.options.dayNames;
    }

    public generateCalendar(): void {
        this.days = [];
        const start: Date = dateFns.startOfMonth(this.date);
        const end: Date = dateFns.endOfMonth(this.date);

        const days: IDay[] = dateFns.eachDay(start, end).map(d => {
            return {
                date: d,
                day: dateFns.getDate(d),
                weekday: dateFns.getDay(d),
                today: dateFns.isToday(d),
                firstMonthDay: dateFns.isFirstDayOfMonth(d),
                lastMonthDay: dateFns.isLastDayOfMonth(d),
                visible: true,
                from: dateFns.isSameDay(this.dateFrom, d),
                to: dateFns.isSameDay(this.dateTo, d),
                isWithinRange: dateFns.isWithinRange(d, this.dateFrom, this.dateTo),
            };
        });

        const prevMonthDayNum = dateFns.getDay(start) === 0 ? 6 : dateFns.getDay(start) - 1;
        let prevMonthDays: IDay[] = [];
        if (prevMonthDayNum > 0) {
            prevMonthDays = Array.from(Array(prevMonthDayNum).keys()).map(i => {
                const d = dateFns.subDays(start, prevMonthDayNum - i);
                return {
                    date: d,
                    day: dateFns.getDate(d),
                    weekday: dateFns.getDay(d),
                    firstMonthDay: dateFns.isFirstDayOfMonth(d),
                    lastMonthDay: dateFns.isLastDayOfMonth(d),
                    today: false,
                    visible: false,
                    from: false,
                    to: false,
                    isWithinRange: false,
                };
            });
        }

        this.days = prevMonthDays.concat(days);
        this.value = `${dateFns.format(this.dateFrom, this.options.outputFormat)}-${dateFns.format(
            this.dateTo,
            this.options.outputFormat,
        )}`;
    }

    public toggleCalendar(_: MouseEvent, selection: 'from' | 'to'): void {
        if (this.opened && this.opened !== selection) {
            this.opened = selection;
        } else {
            this.opened = this.opened ? false : selection;
        }
    }

    public closeCalendar(): void {
        this.opened = false;
    }

    public selectDate(e: MouseEvent, index: number): void {
        e.preventDefault();
        const selectedDate: Date = this.days[index].date;
        if (
            (this.opened === 'from' && dateFns.isAfter(selectedDate, this.dateTo)) ||
            (this.opened === 'to' && dateFns.isBefore(selectedDate, this.dateFrom))
        ) {
            return;
        }

        if (this.opened === 'from') {
            this.dateFrom = selectedDate;
            this.opened = 'to';
        } else if (this.opened === 'to') {
            this.dateTo = selectedDate;
            this.opened = 'from';
        }

        this.generateCalendar();
    }

    public prevMonth(): void {
        this.date = dateFns.subMonths(this.date, 1);
        this.generateCalendar();
    }

    public nextMonth(): void {
        this.date = dateFns.addMonths(this.date, 1);
        this.generateCalendar();
    }

    public selectRange(range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly'): void {
        let today = dateFns.startOfDay(new Date());

        switch (range) {
            case 'tm':
                this.dateFrom = dateFns.startOfMonth(today);
                this.dateTo = dateFns.endOfMonth(today);
                break;
            case 'lm':
                today = dateFns.subMonths(today, 1);
                this.dateFrom = dateFns.startOfMonth(today);
                this.dateTo = dateFns.endOfMonth(today);
                break;
            case 'lw':
                today = dateFns.subWeeks(today, 1);
                this.dateFrom = dateFns.startOfWeek(today, { weekStartsOn: this.options.startOfWeek });
                this.dateTo = dateFns.endOfWeek(today, { weekStartsOn: this.options.startOfWeek });
                break;
            case 'tw':
                this.dateFrom = dateFns.startOfWeek(today, { weekStartsOn: this.options.startOfWeek });
                this.dateTo = dateFns.endOfWeek(today, { weekStartsOn: this.options.startOfWeek });
                break;
            case 'ty':
                this.dateFrom = dateFns.startOfYear(today);
                this.dateTo = dateFns.endOfYear(today);
                break;
            default:
                // case 'ly'
                today = dateFns.subYears(today, 1);
                this.dateFrom = dateFns.startOfYear(today);
                this.dateTo = dateFns.endOfYear(today);
                break;
        }

        this.range = range;
        this.generateCalendar();
    }

    @HostListener('document:click', ['$event'])
    public handleBlurClick(e: MouseEvent): void {
        const target = e.srcElement || e.target;
        if (!this.elementRef.nativeElement.contains(e.target) && !(target as Element).classList.contains('day-num')) {
            this.opened = false;
        }
    }
}

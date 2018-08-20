# Angular DateRange Picker II


This date picker is forked from [this repo](https://github.com/jkuri/ng-daterangepicker) authored by [jankuri.](https://github.com/jkuri)
The date picker is completely re-factored. It contain fixes for issues from original repo and implements a few new features.

You can try it live on [stackblitz](https://stackblitz.com/edit/ng-daterangepicker-2?file=src/app/app.module.ts)

## Installation
---
```sh
npm i @matew/ng-daterangepicker-2 --save
```
or
```sh
yarn add @matew/ng-daterangepicker-2
```

## Configuration
---

```ts
interface NgDateRangePickerOptions {
    initialDateRange: NgDateRange;
    inputFormat: (input: any) => NgDateRange;
    outputFormat: (dateRange: NgDateRange) => any;
    startOfWeek: number;
    dayNames: string[];
    inputNames: {
        from: string;
        to: string;
    };
    visibleDateFormat: string | ((date: Date) => string);
    alignment: 'left' | 'center' | 'right';
    shortCuts: 'thisMonth' | 'lastMonth' | 'lastWeek' | 'thisWeek' | 'thisYear' | 'lastYear' | NgDaterangeShortcutEntity;
    limitRange?: NgDateRange | null;
}
```
```ts
interface NgDaterangeShortcutEntity {
    title: string;
    range: (now: Date) => NgDateRange;
    visibleMonth: (state: 'from' | 'to') => Date;
}

```
```ts
interface NgDateRange {
    from: Date;
    to: Date;
}
```


| Variable   |      Default      |  Description |
|----------|:-------------:|------|
| initialDateRange |  ```{ from: now, to: now }``` | This value will used when you don't set value by formControl or ngModel |
| inputFormat |    ```(input: NgDateRange) => NgDateRange```   | Allow you to map input value |
| outputFormat | ```(data: NgDateRange) => NgDateRange``` | Allow you to map output value |
| startOfWeek | ```number``` | Allow you to apply offset for week start e.g value 0 mark sunday as first day of week |
| dayNames | ```['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']``` | Allow you to define prefixes of days visible on top of calendar. It's relative to `startOfWeek`  |
| inputNames | ```{ from: 'Start', to: 'End'}``` | Allow you to set label for inputs  |
| visibleDateFormat | ```DD-MM-YYYY``` | Allow you to define visible [date format](https://date-fns.org/v1.29.0/docs/format) |
| alignment | ```left``` | Allow you to select alignment of calendar |
| shortCuts | ```['thisMonth', 'lastMonth', 'lastWeek', 'thisWeek', 'thisYear', 'lastYear']``` | Allow you to use predefined shortcuts or define own shortcuts visible next to calendar |
| limitRange | ```null``` | Allow you to set limit range |

## Running the demo
---

```sh
git clone https://github.com/jkuri/ng-daterangepicker.git --depth 1
cd ng-daterangepicker
npm start
```

## Licence
---
MIT

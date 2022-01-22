import {reactive} from 'vue';
//import axios from 'axios';
import { date } from 'quasar';

export interface Person {
    name: string;
    kana: string;
    title: string;
    age: number;
    born: Date;
    rip: Date;
}

export interface DiffYearDays{
    year: number;
    days: number;
}
  

const moc_persons = <Person[]>[
    {
        name: '餅よもぎ',
        kana: 'もちよもぎ',
        born: new Date('1985-08-28T00:00:00+09:00'),
        age: 30,
        title: '同人声優',
        rip: new Date('2016-04-01T00:00:00+09:00'),
    },
    {
        name: '餅よもぎ2',
        kana: 'もちよもぎ',
        born: new Date('1985-08-28T00:00:00+09:00'),
        age: 30,
        title: '同人声優',
        rip: new Date('2016-04-01T00:00:00+09:00'),
    }
]

export class PersonStore {
    private static instance: PersonStore;
    
    public db = reactive({
        persons: moc_persons
    })

    private getMonth(dt: Date){
        return dt.getMonth()+1
    }

    /* うるう年の追加分の日数を計算する */
    public getUruDaysDelta(start: Date, end: Date){
        let result = 0;
        function isUruYear(year: number){
            return year % 4 == 0 && !(year % 100 == 0) 
        }
        
        for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
            if (year == start.getFullYear()) {
                if (isUruYear(year) && this.getMonth(start) <= 2) {
                    result++;
                }
            } else if (year == end.getFullYear()) {
                if (isUruYear(year) &&
                    (this.getMonth(end) > 2 || this.getMonth(end) == 2 && end.getDate() == 29)
                ) {
                    result++;
                }
            } else {
                if (isUruYear(year)) {
                    result++;
                }
            }
        }
        return result;
    }

    /* 次回の法要までの日数を算出 */
    public nextHoyoDays(rip: Date, today= new Date()){
        const hoyoDate = this.nextHoyoDate(rip, today)
        date.getDateDiff(hoyoDate, today)
        return date.getDateDiff(hoyoDate, today)
    }
    /* 次回の法要日を算出 */
    public nextHoyoDate(rip: Date, today = new Date()):Date{
        const hoyoDate = new Date(`${today.getFullYear()}-${date.formatDate(rip, 'MM') }-${ date.formatDate(rip, 'DD') }`)
        if (today > hoyoDate){
            hoyoDate.setFullYear(hoyoDate.getFullYear() + 1)
        }
        return hoyoDate;
    }
    /* 年と日の差分を取得する */
    public getYearDaysDiff(today: Date, rip: Date): DiffYearDays{
        const delta = date.getDateDiff(today, rip)
        const years = ~~(delta / 365);
        const uruDays = this.getUruDaysDelta(rip, today)
        const days = ((delta - uruDays) % 365);
        return {
            year: years,
            days: days
        }
    }
    /* 現在の年齢を取得する */
    public getNowAge(born: Date, today = new Date()){
        const delta = date.getDateDiff(today, born)
        const uruDays = this.getUruDaysDelta(born, today); 
        const age = ~~((delta - uruDays) / 365);
        return age
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor(){}

    public static get getInstance():PersonStore{
        if (!this.instance){
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.instance = new PersonStore();
        }
        return this.instance;
    }
}

export function usePersonStore():PersonStore{
    return PersonStore.getInstance
}
import { describe, expect, it } from '@jest/globals';
import { usePersonStore, DiffYearDays} from '../../../src/stores/PersonStore'
import { date } from 'quasar';


test('nextHoyoDate', ()=>{
    expect(usePersonStore().nextHoyoDate(new Date('2022-01-09'), new Date('2022-01-22'))).toStrictEqual(new Date('2023-01-09'));
    expect(usePersonStore().nextHoyoDate(new Date('2022-01-09'), new Date('2022-01-09'))).toStrictEqual(new Date('2022-01-09'));
    expect(usePersonStore().nextHoyoDate(new Date('2022-01-09'), new Date('2022-01-08'))).toStrictEqual(new Date('2022-01-09'));
})

test('nextHoyoDays', ()=>{
    expect(usePersonStore().nextHoyoDate(new Date('2011-01-09'), new Date('2022-01-08'))).toStrictEqual(new Date('2022-01-09'));
    expect(usePersonStore().nextHoyoDays(new Date('2011-01-09'), new Date('2022-01-07'))).toStrictEqual(2);
    expect(usePersonStore().nextHoyoDays(new Date('2011-01-09'), new Date('2022-01-08'))).toStrictEqual(1);
    expect(usePersonStore().nextHoyoDays(new Date('2011-01-09'), new Date('2022-01-09'))).toStrictEqual(0);
    expect(usePersonStore().nextHoyoDays(new Date('2011-01-09'), new Date('2022-01-10'))).toStrictEqual(364);
    expect(usePersonStore().nextHoyoDays(new Date('2011-01-09'), new Date('2022-01-11'))).toStrictEqual(363);
    expect(usePersonStore().nextHoyoDays(new Date('2011-01-09'), new Date('2024-01-10'))).toStrictEqual(365); //uru year;
})

test('getUruDaysDelta', ()=>{
    expect(usePersonStore().getUruDaysDelta(new Date('2010-01-09'), new Date('2024-12-30'))).toEqual(4);
    expect(usePersonStore().getUruDaysDelta(new Date('2010-01-09'), new Date('2024-01-30'))).toEqual(3);
    expect(usePersonStore().getUruDaysDelta(new Date('2010-01-09'), new Date('2024-02-28'))).toEqual(3);
    expect(usePersonStore().getUruDaysDelta(new Date('2010-01-09'), new Date('2024-02-29'))).toEqual(4);
    expect(usePersonStore().getUruDaysDelta(new Date('2010-01-09'), new Date('2024-03-01'))).toEqual(4);
    
})

test('getYearDaysDiff', ()=>{
    expect(usePersonStore().getYearDaysDiff(new Date('2022-01-09'), new Date('2011-01-09'))).toStrictEqual(
        <DiffYearDays>{
            year: 11,
            days: 0
        }
    );
})

test('getNowAge', ()=>{
    expect(usePersonStore().getNowAge(new Date('2010-01-09'), new Date('2022-01-09'))).toEqual(12);
    expect(usePersonStore().getNowAge(new Date('2010-01-09'), new Date('2022-01-08'))).toEqual(11);
})
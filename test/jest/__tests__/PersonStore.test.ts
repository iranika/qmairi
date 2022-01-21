import { describe, expect, it } from '@jest/globals';
import {usePersonStore} from '../../../src/stores/PersonStore'

test('PersonStoreTest', ()=>{
    expect(usePersonStore().nextHoyoDate(new Date('2022-01-09'))).toStrictEqual(new Date('2023-01-09'));
})
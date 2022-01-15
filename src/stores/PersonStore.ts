import {reactive} from 'vue';
//import axios from 'axios';

export interface Person {
    name: string;
    kana: string;
    title: string;
    age: number;
    born: Date;
    rip: Date;
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
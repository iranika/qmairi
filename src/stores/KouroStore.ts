import {reactive} from 'vue';
import { Person } from './PersonStore';
//import axios from 'axios';
import { collection, getDocs, query, Timestamp } from 'firebase/firestore';
import { firestoreSimple, firestore } from '../firebase/firebase';

export interface Senkou {
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    color: string,
    putDate: Date
}

export interface Kouro extends Senkou {
    id: string
}

const mocSenkou = <Senkou>{
    x1:500,
    x2:500,
    y1:300,
    y2:600,
    color: 'green',
    putDate: new Date()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const range = {
    left: 650,
    right: 350,
    up: 590,
    down: 620 
}

export class KouroStore {
    private static instance: KouroStore;
    
    public db = reactive({
        senkou: <Array<Senkou>>[mocSenkou],
    })

    public senkouIsOdd(){
        return (this.db.senkou.length % 2) == 0 ? true : false
    }

    public getRandomSenkou(_color='green'){
        const random = Math.floor( Math.random () * 151)
        const upperRandom = (random % 10) >= 6 ? random : random + 5;
        const yRange = 20;
        if (this.db.senkou.length == 0){
            return <Senkou>{
                x1:500,
                x2:500,
                y1:305,
                y2:605,
                color: _color,
                putDate: new Date()
            };
        }else if (this.db.senkou.length % 2 == 0){
            return <Senkou>{
                x1:500 + upperRandom,
                x2:500 + upperRandom,
                y1:305 + random % yRange,
                y2:605 + random % yRange,
                color: _color,
                putDate: new Date()
            };
        }else{
            return <Senkou>{
                x1:500 - upperRandom,
                x2:500 - upperRandom,
                y1:305 + random % yRange,
                y2:605 + random % yRange,
                color: _color,
                putDate: new Date()
            };
        }
    }

    public addSenkou(color='green'){
        //TODO: 線香は一日一本まで
        this.db.senkou.push(this.getRandomSenkou(color))
    }

    public startUpdateKouro(){
        //MEMO: 60秒に1回線香の状態をチェックして燃焼時間(30分)を超過したらsenkouから削除する
        //TODO: 1m or 10mに一回、線香を短くする
        //TODO: senkouはfirestoreで共有するが、取得する際は燃焼時間を超過しているものはfetchしないようにする
        //TODO: putDateと現在時間からsenkouの長さを算出するように変更する(fetchしたデータとの整合性を取るために)

        const fpm = 10000;
        function addMinites(dt: Date, minites: number){
            return new Date(dt.getTime() + minites*fpm)
        }
        setInterval(()=>{
            this.db.senkou = this.db.senkou.filter(v => (new Date()) < addMinites(v.putDate, 30));
            this.db.senkou = this.db.senkou.map(v => {
                if (v.y1 +10 < v.y2){
                    v.y1 += 10;
                }
                return v
            })            
        }, fpm)
    }
    public async syncKouroWithFirebase(person: Person){
        //person idが一致したところのkouroを
        const q = query(collection(firestore, `/mairi/v1/person/${person.id}/kouro`))
        const docs = (await getDocs(q)).docs.map(d => d.data()).map(v => {
            v.putDate = (<Timestamp>v.putDate).toDate();
            return <Senkou>v;
        });
        console.log('syncKouro', person.id, docs);
        this.db.senkou = docs;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor(person: Person){
        void this.syncKouroWithFirebase(person);
    }

    public static getInstance(person: Person):KouroStore{
        if (!this.instance){
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.instance = new KouroStore(person);
            this.instance.startUpdateKouro();
        }
        return this.instance;
    }
}

export function useKouroStore(person: Person):KouroStore{
    return KouroStore.getInstance(person)
}
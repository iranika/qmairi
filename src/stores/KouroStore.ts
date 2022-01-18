import {reactive} from 'vue';
//import axios from 'axios';


export interface Senkou {
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    color: string,
    putDate: Date
}

export interface Kouro {
    name: string;
    kana: string;
    title: string;
    age: number;
    born: Date;
    rip: Date;
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

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor(){}

    public static get getInstance():KouroStore{
        if (!this.instance){
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.instance = new KouroStore();
            this.instance.startUpdateKouro();
        }
        return this.instance;
    }
}

export function useKouroStore():KouroStore{
    return KouroStore.getInstance
}
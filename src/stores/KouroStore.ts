import {reactive} from 'vue';
//import axios from 'axios';


export interface Senkou {
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    color: string,
}

export interface Kouro {
    name: string;
    kana: string;
    title: string;
    age: number;
    born: Date;
    rip: Date;
}

/*
const mocSenkou = <Senkou>{
    x1:500,
    x2:500,
    y1:300,
    y2:600,
    color: 'green',
}

const range = {
    left: 650,
    right: 350,
    up: 590,
    down: 620 
}
*/
export class KouroStore {
    private static instance: KouroStore;
    
    public db = reactive({
        senkou: <Array<Senkou>>[],
    })

    public senkouIsOdd(){
        return (this.db.senkou.length % 2) == 0 ? true : false
    }

    public getRandomSenkou(_color='green'){
        const random = Math.floor( Math.random () * 151)
        const upperRandom = (random % 10) >= 6 ? random : random + 5;
        if (this.db.senkou.length == 0){
            return <Senkou>{
                x1:500,
                x2:500,
                y1:305,
                y2:605,
                color: _color,
            };
        }else if (this.db.senkou.length % 2 == 0){
            return <Senkou>{
                x1:500 + upperRandom,
                x2:500 + upperRandom,
                y1:305 + random % 15,
                y2:605 + random % 15,
                color: _color,
            };
        }else{
            return <Senkou>{
                x1:500 - upperRandom,
                x2:500 - upperRandom,
                y1:305 + random % 16,
                y2:605 + random % 16,
                color: _color,
            };
        }
    }

    public addSenkou(color='green'){
        //TODO: 線香は一日一本まで
        this.db.senkou.push(this.getRandomSenkou(color))
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor(){}

    public static get getInstance():KouroStore{
        if (!this.instance){
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.instance = new KouroStore();
        }
        return this.instance;
    }
}

export function useKouroStore():KouroStore{
    return KouroStore.getInstance
}
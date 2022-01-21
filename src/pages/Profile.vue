<template>
  <q-page class="text-center">
    <q-card flat class="profile-box">
      <q-card-section>
        <div class="text-h4">{{ person.name }}</div>
        <div class="text-subtitle1">{{ person.kana }}</div>
        <div class="text-subtitle1">{{ date.formatDate(person.born, "YYYY") }} - {{ date.formatDate(person.rip, "YYYY") }}</div>
        <div class="text-subtitle1">{{ person.title }}</div>
      </q-card-section>
      <q-card-section>
        <div>亡くなってから{{ `${sinceAfterRip.year}年${sinceAfterRip.days}日`}}が過ぎました。</div>        
        <div>{{ person.age }}歳で亡くなりました。現在の年齢は{{ getNowAge(person.born) }}歳です。</div>
        <div>{{ date.formatDate(person.born, "YYYY年MM月DD日") }}に誕生、{{ date.formatDate(person.rip, "YYYY年MM月DD日") }}に亡くなりました。</div>
        <div>次の法要は{{ nextHoyoDays(person.rip) }}日後、{{ date.formatDate(nextHoyoDate(person.rip), "YYYY年MM月DD日") }}です。</div>
        <div>今日は{{ nextHoyoDays(person.rip) }}人が訪れました。</div>
        <div>先週:{{ 11 }}人 先月:{{ 70 }}人 今年:{{ 300 }}人が訪れました。</div>
      </q-card-section>
    </q-card>
    <q-card flat class="profile-box">
      <q-card-section>
        <div class="text-h6">線香</div>
      </q-card-section>
      <q-card-section>
        <kouro />
      </q-card-section>
      <q-card-section>
        <!-- TODO: 200文字以内に限定する -->
        <div class="text-h6">メッセージ</div>
        <q-input type="textarea" outlined></q-input>
        <button>送信</button>
      </q-card-section>
    </q-card>
    <div class="row inline justify-center">
      <q-card v-for="t in text" :key="t" class="message-card">
        <q-card-section>
          <div class="message-text">{{ t }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style>

.message-text{
  white-space: pre-line;
  text-align: left;
}

.message-card{
  width: 350px;
  margin: 5px 5px;
}

.profile-box{
  max-width: 500px;
  margin: 0 auto;
}

</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePersonStore } from 'src/stores/PersonStore';
import { date } from 'quasar';
//import Footer from 'src/components/Footer.vue';
import Kouro from 'components/Kouro.vue';

interface DiffYearDays{
  year: number;
  days: number;
}

const text = [
  'ふと思い出してしまうのはどうしてでしょうか。\n悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。受け入れられない私をどうか許してください。',
  'ふと思い出してしまうのはどうしてでしょうか。',
  'ふと思い出してしまうのはどうしてでしょうか。悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。受け入れられない私をどうか許してください。',
  'ふと思い出してしまうのはどうしてでしょうか。悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。',
  'ふと思い出してしまうのはどうしてでしょうか。悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。受け入れられない私をどうか許してください。',
  'ふと思い出してしまうのはどうしてでしょうか。悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。受け入れられない私をどうか許してください。',
]

export default defineComponent({
  // name: 'PageName'
  components:{
//  Footer
    Kouro
  },
  props:{
    name: String
  },
  setup(props){
    const persons = usePersonStore().db.persons.filter(x => x.name == props.name)
    const person = persons[0];
    const today = new Date();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    function getMonth(dt: Date){
      //getMonthは0~11を返すので！！！(# ﾟДﾟ)
      return dt.getMonth()+1
    }
    function getUruDaysDelta(start: Date, end: Date){
      //TODO: うるう年の追加分の日数を計算する
      var result = 0;

      /*
      for (var dt = start; dt <= end; dt.setDate(dt.getDate() + 1)){
        if (getMonth(dt) == 2 && dt.getDate() == 29){          
          console.log("date", dt.toString())
          result++;
        }
      }
      */
      function isUruYear(year: number){
        return year % 4 == 0 && !(year % 100 == 0) 
      }
      
      for (var year = start.getFullYear(); year <= end.getFullYear(); year++){
        if (year == start.getFullYear()){
          if (getMonth(start) <= 2 && isUruYear(year)){
            result++;
          }
        }else if(year == end.getFullYear()){
          if (getMonth(start) > 2 && isUruYear(year)){
            result++;
          }
        }else{
          if (isUruYear(year)){
            result++;
          }
        }
      }      
      return result;
    }

    /* 次回の法要までの日数を算出 */
    function nextHoyoDays(rip: Date){
      const today = new Date();
      const hoyoDate = nextHoyoDate(rip)
      date.getDateDiff(hoyoDate, today)
      return date.getDateDiff(hoyoDate, today)
    }
    /* 次回の法要日を算出 */
    function nextHoyoDate(rip: Date){
      const today = new Date();
      var hoyoDate = new Date(`${today.getFullYear()}-${getMonth(rip)}-${rip.getDate()}`)
      console.log(hoyoDate, today.getMonth())
      if (today > hoyoDate){
        hoyoDate.setFullYear(hoyoDate.getFullYear() + 1)
      }
      return hoyoDate;
    }

    function getYearDaysDiff(today: Date, rip: Date): DiffYearDays{
      const delta = date.getDateDiff(today, rip)
      const years = ~~(delta / 365);
      const uruDays = getUruDaysDelta(rip, today)
      const days = ((delta - uruDays) % 365);
      return {
        year: years,
        days: days
      }
    }
    function getNowAge(born: Date){
      const delta = date.getDateDiff(today, born)
      const uruDays = getUruDaysDelta(born, today); 
      const age = ~~((delta - uruDays) / 365);
      return age
    }
    const sinceAfterRip = getYearDaysDiff(today, person.rip)

    return {
      date,
      sinceAfterRip,
      person,
      getNowAge,
      nextHoyoDays,
      nextHoyoDate,
      text
    }
  }
})
</script>

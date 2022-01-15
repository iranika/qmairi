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
        <div>1週:{{ 11 }}人 1ヶ月:{{ 70 }}人 1年:が訪れました。</div>
      </q-card-section>
    </q-card>
    <q-card flat class="profile-box">
      <q-card-section>
        <div class="text-h6">線香</div>
      </q-card-section>
      <q-card-section>
        TODO:ここに線香のシステム組む
      </q-card-section>
      <q-card-section>
        <div class="text-h6">メッセージ</div>
        <q-input type="textarea" outlined></q-input>
        <button>送信</button>
      </q-card-section>
      <q-card-section>
        <!-- TODO:メッセージカードはGridでFlexな感じにする -->
        <q-card>
          <q-card-section>
            <div>
              ふと思い出してしまうのはどうしてでしょうか。
              悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。受け入れられない私をどうか許してください。
            </div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <div>
              ふと思い出してしまうのはどうしてでしょうか。
              悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。受け入れられない私をどうか許してください。
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>

.profile-box{
  max-width: 500px;
  margin: 0 auto;
}

</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePersonStore, Person } from 'src/stores/PersonStore';
import { date } from 'quasar';
//import Footer from 'src/components/Footer.vue';


interface DiffYearDays{
  year: number;
  days: number;
}

const text = [
  "ふと思い出してしまうのはどうしてでしょうか。悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。受け入れられない私をどうか許してください。",
  "ふと思い出してしまうのはどうしてでしょうか。悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。受け入れられない私をどうか許してください。",
  "ふと思い出してしまうのはどうしてでしょうか。悲しくて堪らなくて、もう2度と聞けないと思っていたあなたの声を集め直しました。やはり、悲しくて最後まで聞けませんでした。こんなにも素敵なものを生み出してくれてありがとうございます。受け入れられない私をどうか許してください。",
]

export default defineComponent({
  // name: 'PageName'
  components:{
//    Footer
  },
  props:{
    name: String
  },
  setup(props){
    const persons = usePersonStore().db.persons.filter(x => x.name == props.name)
    const person = persons[0];
    const today = new Date();

    function getUruDaysDelta(start: Date, end: Date){
      //TODO: うるう年の追加分の日数を計算する
      return 2
    }
    function nextHoyoDays(rip: Date){
      //TODO: 次の法要までの日数を計算する
      return 76
    }
    function nextHoyoDate(rip: Date){
      //TODO: 
      return new Date('2022-04-01')
    }

    function getYearDaysDiff(today: Date, rip: Date): DiffYearDays{
      const delta = date.getDateDiff(today, rip)
      const years = ~~(delta / 365);
      const uruDays = getUruDaysDelta(rip, today)
      const days = (delta % 365) - uruDays;
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

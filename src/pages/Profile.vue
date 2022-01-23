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
        <div>{{ `亡くなってから${sinceAfterRip.year}年${sinceAfterRip.days}日が過ぎました。`}}</div>
        <div>{{ `${ Profile.getNowAge(person.born, person.rip) }歳で亡くなりました。現在の年齢は${ Profile.getNowAge(person.born) }歳です。`}}</div>
        <div>{{ `${date.formatDate(person.born, "YYYY年MM月DD日") }に誕生、${ date.formatDate(person.rip, "YYYY年MM月DD日") }に亡くなりました。`}}</div>
        <div>{{ `次の法要は${ Profile.nextHoyoDays(person.rip) }日後、${ date.formatDate(Profile.nextHoyoDate(person.rip), "YYYY年MM月DD日") }です。`}}</div>
        <div>{{ `今日は${ Profile.nextHoyoDays(person.rip) }人が訪れました。` }}</div>
        <div>先週:{{ 11 }}人 先月:{{ 70 }}人 今年:{{ 300 }}人が訪れました。</div>
      </q-card-section>
    </q-card>
    <q-card flat class="profile-box">
      <q-card-section>
        <div class="text-h6">線香</div>
      </q-card-section>
      <q-card-section>
        <kouro :person="person"/>
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
    //Footer
    Kouro
  },
  props:{
    name: String
  },
  setup(props){
    const persons = usePersonStore().db.persons.filter(x => x.name == props.name)
    const person = persons[0];
    const Profile = usePersonStore()
    const sinceAfterRip = Profile.getYearDaysDiff(new Date(), person.rip)
    return {
      date,
      person,
      text,
      Profile,
      sinceAfterRip
    }
  }
})
</script>
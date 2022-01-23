<template>
  <q-page class="text-center">
    <div>今日は {{ date.formatDate(today,"YYYY年MM月DD日") }} です</div>
    <q-card flat class="infomation">
      <q-card-section>
        <div>氏名（漢字・ひらがな）で検索できます</div>
        <input v-model="search" autocomplete="none"><button>検索</button>
        <!--
        <q-input outlined/>
        -->
      </q-card-section>
    </q-card>
    <!-- おしらせ -->
    <q-card class="infomation" flat>
      <q-card-section>
        <div class="text-h6">おしらせ</div>
      </q-card-section>
    </q-card>
    <!-- 命日の近い著名人 -->
    <q-card class="infomation" flat>
      <q-card-section>
        <div class="text-h6">命日の近い著名人</div>
        <ul style="list-style-type: none;">
          <li v-for="p in usePersonStore().db.persons" :key="p">
            <router-link :to="`/${p.name}`"><a class="text-subtitle1">{{ p.name }}</a></router-link> ({{ usePersonStore().getNowAge(p.born) }}) {{ date.formatDate(p.rip, 'YYYY.MM.DD') }} <div class="inline text-green">{{ p.title }}</div>
          </li>
        </ul>
      </q-card-section>
    </q-card>
    <!-- 広告 -->
    <q-card class="infomation" flat>
      <q-card-section>
        <div class="text-h6">広告</div>
        <q-card style="max-width:400px; margin: 0 auto;">
          <q-card-section>
            ここに広告リンクを貼る
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.inline{
  display: inline;
}

.infomation{
  max-width: 600px;
  margin: 0 auto;
}
</style>

<script lang="ts">
//import { Todo, Meta } from 'components/models';
//import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from 'vue';
import { usePersonStore } from 'src/stores/PersonStore';
import { date } from 'quasar';

export default defineComponent({
  name: 'PageIndex',
  components: { 
    //ExampleComponent
  },
  setup() {
    const today = new Date();
    const search = ref('')
    return {
      date,
      usePersonStore,
      search,
      today
    };
  }
});
</script>

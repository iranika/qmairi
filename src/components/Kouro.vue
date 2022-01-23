<template>
  <div>
    <div style="width:300px; height:300px; margin:0 auto;">
      <svg viewBox="0 0 1000.0 1000.0">
        <image style="width:1000px; height:1000px;" xlink:href = "/img/kouro.png" />
        <!--
        <template v-for="s in senkou" :key="s">
          <line :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2" :stroke="s.color" stroke-width="6" />
          <line :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y1 - 20" stroke="orange" stroke-width="7" />
        </template>
        -->
        <template v-for="s in kouro.db.senkou" :key="s">
          <line :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2" :stroke="s.color" stroke-width="2" />
          <line :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y1 - 20" stroke="orange" stroke-width="3" />
        </template>
      </svg>
    </div>
    <button @click="kouro.addSenkou()">線香を上げる</button>
    <div>線香:{{ kouro.db.senkou.length }}</div>
  </div>
</template>

<style scoped>
svg{
  border: solid 1px;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useKouroStore } from 'src/stores/KouroStore';
import { Person } from 'src/stores/PersonStore';

const colors = [
  'green',
  'pink',
  'gray',
]

export default defineComponent({
  // name: 'ComponentName'
  props:{
    person: {
      type: Object,
      required: true,
    },
  },
  setup(props){
    const color = ref(colors[0]);
    const kouro = useKouroStore(<Person>props.person)
    return {
      kouro,
      colors,
      color
    }
  }
})
</script>

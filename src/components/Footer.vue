<template>
  <div>
    <q-toolbar>
      <q-toolbar-title class="toolbar-title">
        <q-btn flat to="/" size="lg" outline><div class="text-h5">HOME</div></q-btn>        
      </q-toolbar-title>
    </q-toolbar>
    <q-toolbar class="justify-center">
      <a v-for="link in footerLink" :key="link" :href="link.href" style="margin: 0 5px 0 5px;">{{ link.text }} </a>
    </q-toolbar>
  </div>
</template>

<style scoped>
.bg-qbar {
  background: rgba(0, 0, 0, 0);
  color: black;
}
.toolbar-title{
  text-align: center;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

const footerLink = [
  {
    text: '登録',
    href: '/'
  },
  {
    text: '編集',
    href: '/'
  },
  {
    text: '検索',
    href: '/'
  },
  {
    text: 'おくやみ',
    href: '/'
  },
  {
    text: '法要',
    href: '/'
  },
  {
    text: 'おしらせ',
    href: '/'
  },
  {
    text: 'プライバシーポリシー',
    href: '/'
  },
  {
    text: 'お問い合わせ',
    href: '/'
  },
  {
    text: 'Twitter',
    href: '/'
  }
];

export default defineComponent({
  // name: 'ComponentName'
  setup(){
    return {
      footerLink,
    }
  }
})
</script>

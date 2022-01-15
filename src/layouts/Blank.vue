<template>
  <q-layout view="lHh Lpr lFf">
    <div class="toolbar-title">
      <q-btn flat to="/" size="lg" outline><div class="text-h5">まいり:Prototype</div></q-btn>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<style scoped>
.bg-qbar {
  background: rgba(0, 0, 0, 0);
  color: black;
}
.toolbar-title{
  text-align: center;
  margin: 0 auto;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Footer from 'src/components/Footer.vue';


export default defineComponent({
  name: 'MainLayout',

  components: {
    //EssentialLink
    Footer
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

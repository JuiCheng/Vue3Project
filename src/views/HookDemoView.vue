<template>
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Title{{count}}</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="inc(2)">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon @click="dec(3)">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon @click="set(1)">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useCount from '@/components/hook/useCount'

export default defineComponent({
  name: 'CountDemo',
  setup () {
    const { current: count, inc, dec, set, reset } = useCount(2, {
      min: 1,
      max: 15
    })

    return {
      count,
      inc,
      dec,
      set,
      reset
    }
  }
})
</script>

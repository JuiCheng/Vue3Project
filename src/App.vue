<template>
  <v-app>
    <div>

            <p>{{ t('回首頁') }}</p>
        </div>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'App',

  setup () {
    const { t, locale } = useI18n()
    console.log(process.env.NODE_ENV)
    watch(locale, (newlocale) => {
      localStorage.setItem('locale', newlocale)
    })

    return {
      t,
      locale
    }
  }
})
</script>

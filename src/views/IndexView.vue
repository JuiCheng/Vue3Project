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
    <v-app-bar-title>Title{{msg}}{{$store.state.UserInfo.id}}</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="test">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <Search v-model:inputText="searchText" @search="handleSearch"/>
    {{ name }}
    {{ searchText }}
  </v-app-bar>
</template>

<script lang="ts">
import Search from '@/components/Search.vue'
import { useStore } from 'vuex'
import { defineComponent, computed, onMounted, onErrorCaptured, ref, reactive, watch, watchEffect, provide, readonly } from 'vue'
interface Student {
  name: string
  class?: string
  age: number
}
// Component API
export default defineComponent({
  name: 'IndexView',
  components: { Search },
  setup () {
    // vuex
    const store = useStore()
    console.log(store.state.UserInfo.id) // vuex 取值
    store.commit('auth/setToken', 'tttttt') // vuex mutations 呼叫
    console.log(store.state.auth.token)// vuex auth取值
    const setLang = () => { // vuex actions 呼叫
      const response = store.dispatch('RESTfulGet', {
        // eslint-disable-next-line no-undef
        URL: `${store.state.Url.I18NLang}`
      })
      response.then(function (response) {
        console.log(response)
      })
    }

    // ref reactive
    // ref : 可以接受任何型態的資料，但是不會對物件或陣列內部的屬性變動做監聽。
    // reactive : 只能接受 Object 或 Array，會對內部的屬性變動做深層的監聽，取資料時不需要 .value。
    const msg = ref('123')
    const num = ref(0)
    const month = ref<string | number>('9')
    month.value = 9 // OK
    const student = reactive<Student>({ name: '阿勇', age: 16 })

    // components v-model 範例
    const searchText = ref('')
    const handleSearch = () => {
      console.log(searchText.value)
    }

    // function
    const test = () => {
      // ref 取值必須.value
      msg.value = '123546'
      return msg.value
    }

    // watch 監聽 msg，無法監聽整個物件
    watch(msg, (newVal, oldVal) => {
      console.log('ref-newVal:', newVal)
      console.log('ref-oldVal:', oldVal)
      console.log('ref:', msg.value)
    })

    // watch 監聽多個屬性值
    // watch([mood, target], ([curMood, curTarget], [preMood, preTarget]) => {
    //   console.log('curMood', curMood)
    //   console.log('preMood', preMood)
    //   console.log('curTarget', curTarget)
    //   console.log('preTarget', preTarget)
    // }, {
    //   // 配置項
    // })

    // watch 監聽引用資料型別時，如果只監聽其中某個屬性
    // watch(() => obj.name, (curValue, preValue) => {
    //   // 幀聽引用資料型別的某個屬性
    // }, {
    //   // 配置項
    // })

    // watchEffect 它會監聽引用資料型別的所有屬性，不需要具體到某個屬性，一旦執行就會立即監聽，元件解除安裝的時候會停止監聽。
    const obj = reactive({ name: 'qq', sex: '女' })
    watchEffect(() => {
      console.log('msg', msg.value)
      console.log('name', obj.name)
      console.log('sex', obj.sex)
    })

    // Provide  Inject
    const name = ref('name')
    provide('name', name)
    const states = reactive({
      name: 'James',
      old: 75
      // ...
    })
    const handleAfterBirthday = () => {
      states.old = states.old + 1
    }
    provide('grandpaStates', readonly(states)) // readonly 保護他，只有修改函式可以更動 states 。
    provide('grandpaDispatch', { handleAfterBirthday })

    // Mounted 畫面載入完成後呼叫
    onMounted(() => {
      // 呼叫Vuex mutations
      store.commit('SetUserInfo', { id: 3, account: '113' })
      // 呼叫Vuex actions
      // store.dispatch({
      //   type: 'incrementAsync',
      //   amount: 10
      // })
    })

    // computed 計算式
    const nums = computed(() => {
      return num.value * 3
    })

    // 捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。
    onErrorCaptured((err, vm, info) => {
      console.log(err)
      console.log(vm)
      console.log(info)
      return false
    })
    return {
      obj,
      msg,
      student,
      month,
      nums,
      test,
      searchText,
      handleSearch,
      name
    }
  }
})
</script>

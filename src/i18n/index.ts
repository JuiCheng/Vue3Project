/* global $ */
import Vue from 'vue'
import { createI18n } from 'vue-i18n'

// 自訂語言檔
import en from './Language/en.json'
import tw from './Language/tw.json'
// var en = require('./Language/en.json') // require可放URL動態載入
// var tw = require('./Language/tw.json')
// var cn = require('./Language/cn.json')
// 使用插件

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') ?? 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages: {
    'zh-TW': tw,
    'en-US': en
    // "ja-JP": ja
  }
})
// $.get('https://cloud.geosat.com.tw/geoapi/I18n/Load?lang=en-us').done((result) => { // json格式错误无法触发回调
//   // 动态设置
//   console.log(result)

// })
export default i18n

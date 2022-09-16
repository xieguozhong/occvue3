import { createI18n } from 'vue-i18n'

import zh_CN from './zh-CN.js'
import en_US from './en-US.js'

const messages = {
    'zh-CN': zh_CN,
    'en-US': en_US
}

// function getLang() {
//     const locale = navigator.language ?? 'en-US';
//     console.log({locale})
//     if (Reflect.has(messages, locale)) {
//         return locale
//     }

//     return 'en-US'
// }

const i18n = createI18n({
    locale: navigator.language ?? 'en-US',
    fallbackLocale: 'en-US',
    legacy:false,
    warnHtmlMessage: false,
    messages
})

export default i18n

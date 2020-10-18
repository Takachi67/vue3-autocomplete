// @ts-ignore
import Autocomplete from '@/components/Autocomplete/Autocomplete'
import { createApp } from 'vue'
// @ts-ignore
import App from '@/App'

const ComponentLibrary = {
    // @ts-ignore
    install(Vue, options = {}) {
        Vue.component('Autocomplete', Autocomplete)
    }
}

export default ComponentLibrary

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
    // @ts-ignore
    window.Vue.use(ComponentLibrary)
}

createApp(App).mount('#app')
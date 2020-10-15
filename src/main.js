import Autocomplete from "@/components/Autocomplete/Autocomplete";

const ComponentLibrary = {
    install(Vue, options = {}) {
        Vue.component('Autocomplete', Autocomplete)
    }
}

export default ComponentLibrary

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ComponentLibrary)
}
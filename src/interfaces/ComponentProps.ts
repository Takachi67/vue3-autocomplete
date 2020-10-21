export default interface ComponentProps {

    debounce: number
    inputClass: Array<String>
    results: Array<any>
    resultsContainerClass: Array<String>
    resultsItemClass: Array<String>
    max: number

    displayItem(item: Object|String): String

}
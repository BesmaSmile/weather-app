export function capitalizeFirstLetter(string){
    return string && string.length>0
        ? string[0].toUpperCase() +string.slice(1)
        : ''
}

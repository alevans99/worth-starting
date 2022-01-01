export const screenIsPortrait = () => {
    return window.innerHeight > window.innerWidth
}


export const imageCheck = (objectToCheck) => {
    return objectToCheck.image !== null && objectToCheck.image.medium !== null
    
}
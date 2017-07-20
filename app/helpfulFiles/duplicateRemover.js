
const duplicateRemover = (sampleMeals) => {
  let eventList = sampleMeals.map(item => item.date)
  let filteredList = []
  
  eventList.sort()
  filteredList[0] = eventList[0]
  for(let i=1; i < eventList.length; i++){
    let newLength = filteredList.length
    if(eventList[i] !== filteredList[newLength-1]){
      filteredList[newLength] = eventList[i]
    }//if
  }//for

  return filteredList
}//duplicateRemover

export default duplicateRemover
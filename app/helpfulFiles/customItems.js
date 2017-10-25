
//duplicate removal

export const duplicateRemover = (itemToCleanUp) => {
  let a = [...itemToCleanUp], r=0

  while(r < a.length){
    let v = r+1
    while(v < a.length){
      if(a[r] === a[v]){
        a.splice(v,1)
      }  else {
        v++
      }//if-else
    }//while inner v loop
    r++
  }//while outter loop

  return a
}//duplicateRemover




// Date management stuff
export const refDates = function(passedDate){
  let chosenDate
  if(typeof(passedDate) === 'string'){ 
    let yr = passedDate.slice(0,4)
    let mon = passedDate.slice(5,7)
    let dy = passedDate.slice(8,10)
    chosenDate = new Date(yr,mon-1,dy)
  } 
  else { 
    chosenDate = passedDate
  }
  
  let theDay = chosenDate.getDay()
  let theDayOfTheMonth = chosenDate.getDate()
  let theMonthNum = chosenDate.getMonth()
  let theYearNum = chosenDate.getFullYear()
  let leapYears = [2016, 2020, 2024, 2028, 2032, 2036]
  let monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
  let dayList = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
  let lowMonths = [1,3,5,8,10]
  let thirtyOneMonths = [0,7]
  let weekStart, weekEnding, lastWeek, nextWeek, yesterday, tomorrow

  

  //startOfWeek
  if(theDay === 0){ weekStart = theDayOfTheMonth }
  else if(theDayOfTheMonth > 6){ weekStart = theDayOfTheMonth-theDay } 
  else if(theMonthNum === 2){
    if(leapYears.includes(theYearNum)){ weekStart = 29-(theDay - theDayOfTheMonth) } 
    else { weekStart = 28-(theDay - theDayOfTheMonth) }
  }
  else if(lowMonths.includes(theMonthNum)){ weekStart = 31-(theDay - theDayOfTheMonth) }
  else { weekStart = (thirtyOneMonths.includes(theMonthNum) ? 31 : 30)-(theDay - theDayOfTheMonth) }//add the contingency for august and january which have a prev month of 31 days

  //end of week
  if(theDay === 6){ weekEnding = theDayOfTheMonth } 
  else if(theMonthNum === 1){
    if(leapYears.includes(theYearNum)){
      if(theDayOfTheMonth + 6 > 29){ weekEnding = (6 - theDay) - (29 - theDayOfTheMonth)}
      else {weekEnding = theDayOfTheMonth + (6 - theDay)}
    } 
    else {
      if(theDayOfTheMonth + 6 > 28){ weekEnding = (6 - theDay) - (28 - theDayOfTheMonth)}
      else {weekEnding = theDayOfTheMonth + (6 - theDay)}
    }
  }
  else if(lowMonths.includes(theMonthNum)){
    if(theDayOfTheMonth + 6 > 30){ weekEnding = (6 - theDay) - (30 - theDayOfTheMonth)}
    else {weekEnding = theDayOfTheMonth + (6 - theDay)}
  }
  else {
    if(theDayOfTheMonth + 6 > 31){ weekEnding = (6 - theDay) - (31 - theDayOfTheMonth)}
    else {weekEnding = theDayOfTheMonth + (6 - theDay)}
  }
  
  //determine the month
  let startMonth = weekStart > theDayOfTheMonth ? (theMonthNum === 0 ? 11 : theMonthNum-1) : theMonthNum
  let endMonth = weekEnding < theDayOfTheMonth ? (theMonthNum === 11 ? 0 : theMonthNum+1) : theMonthNum


  //determine the year
  let startYear = (theMonthNum === 0 && weekStart > theDayOfTheMonth) ? theYearNum-1 : theYearNum
  let endYear = (theMonthNum === 11 && weekEnding < theDayOfTheMonth) ? theYearNum+1 : theYearNum

  const milliStartOfWeek =  new Date(startYear,startMonth,weekStart)
  const milliEndOfWeek =  new Date(endYear,endMonth,weekEnding)


  //now to calculate last week
  if(theDayOfTheMonth > 7){
    lastWeek = new Date(theYearNum, theMonthNum, (theDayOfTheMonth - 7))
  }
  else if(theMonthNum === 2){
    if(leapYears.includes(theYearNum)){
      lastWeek = new Date(theYearNum, 1, 29 - (7 - theDayOfTheMonth))
    }
    else{
      lastWeek = new Date(theYearNum, 1, 28 - (7 - theDayOfTheMonth))
      }
  }//leap year
  else if(lowMonths.includes(theMonthNum)){
    lastWeek = new Date(theYearNum, theMonthNum-1, 31 - (7 - theDayOfTheMonth))
  }//low month
  else{
        lastWeek = new Date((theMonthNum === 0 ? theYearNum-1 : theYearNum), (theMonthNum === 0 ? 11 : theMonthNum-1), ((thirtyOneMonths.includes(theMonthNum) ? 31 : 30) - (7-theDayOfTheMonth)))
  }//high month



  //nextWeek
  if(theDayOfTheMonth < 22){
    nextWeek = new Date(theYearNum, theMonthNum, (theDayOfTheMonth + 7))
  }
  else if(theMonthNum === 1){
    if(leapYears.includes(theYearNum)){
      nextWeek = new Date(theYearNum, (theDayOfTheMonth === 22 ? theMonthNum : theMonthNum+1), (theDayOfTheMonth === 22 ? 29: (7-(29 - theDayOfTheMonth))))
    }
    else{
      nextWeek = new Date(theYearNum, 2, (7-(28 - theDayOfTheMonth)) )
    }
  }//leap year
  else if(lowMonths.includes(theMonthNum)){
    if(theDayOfTheMonth < 24){
      nextWeek = new Date(theYearNum, theMonthNum, (theDayOfTheMonth + 7))
    }
    else{
      nextWeek = new Date(theYearNum, theMonthNum+1, 7-(30-theDayOfTheMonth))
    }
  }//low month
  else{
    if(theDayOfTheMonth < 25){
      nextWeek = new Date(theYearNum, theMonthNum, (theDayOfTheMonth + 7))
    }
    else{
      nextWeek = new Date((theMonthNum === 11 ? theYearNum+1 : theYearNum), (theMonthNum === 11 ? 0 : theMonthNum+1), 7-(31-theDayOfTheMonth))
    }
  }//high month


  //yesterday
  if(theDayOfTheMonth > 1){
    yesterday = new Date(theYearNum, theMonthNum, theDayOfTheMonth-1)
  }
  else if(theMonthNum === 2){
    if(leapYears.includes(theYearNum)){
      yesterday = new Date(theYearNum, 1, 29)
    }
    else{
      yesterday = new Date(theYearNum, 1, 28)
    }
  }//leap Year
  else if(lowMonths.includes(theMonthNum)){
    yesterday = new Date(theYearNum, theMonthNum-1, 31)
  }//lowMonths
  else{
    yesterday = new Date((theMonthNum === 0 ? theYearNum-1 : theYearNum), (theMonthNum === 0 ? 11 : theMonthNum-1), (thirtyOneMonths.includes(theMonthNum) ? 31 : 30))
  }


  //tomorrow
  if(theDayOfTheMonth < 28){
    tomorrow = new Date(theYearNum, theMonthNum, theDayOfTheMonth+1)
  }
  else if(theMonthNum === 1){
    if(leapYears.includes(theYearNum)){
      tomorrow = new Date(theYearNum, (theDayOfTheMonth === 28 ? 1 : 2), (theDayOfTheMonth === 28 ? 29 : 1))
    }
    else{
      tomorrow = new Date(theYearNum, 2, 1)
    }
  }//leap Year
  else{
    if(theDayOfTheMonth === 31){
      tomorrow = new Date((theMonthNum === 11 ? theYearNum+1 : theYearNum), (theMonthNum === 11 ? 0 : theMonthNum+1), 1)
    }
    else if(lowMonths.includes(theMonthNum) && theDayOfTheMonth === 30){
      tomorrow = new Date(theYearNum, theMonthNum+1, 1)
    }
    else {
      tomorrow = new Date(theYearNum, theMonthNum, theDayOfTheMonth+1)
    }
  }

  return (
    {
      chosenDate: chosenDate,
      stringDate: theYearNum + '-' + (theMonthNum < 9 ? '0' : '') + (theMonthNum+1) + '-' + (theDayOfTheMonth < 10 ? '0' : '') + theDayOfTheMonth,
      stringDayLabel: dayList[theDay] + ' - ' + monthList[theMonthNum] + ' ' + chosenDate.getDate(),
      calMonth: theYearNum + '-' + (theMonthNum < 9 ? '0' : '') + (theMonthNum+1) + '-' + '01',
      stringWeekRange: monthList[milliStartOfWeek.getMonth()] + ' ' + milliStartOfWeek.getDate() + ' - ' + monthList[milliEndOfWeek.getMonth()] + ' ' + milliEndOfWeek.getDate(),
      startOfWeek: milliStartOfWeek,
      endOfWeek: milliEndOfWeek,
      millisec: chosenDate.getTime(),
      lastWeek: lastWeek,
      nextWeek: nextWeek,
      yesterday: yesterday,
      tomorrow: tomorrow,
    }
  )//return
}//refDates
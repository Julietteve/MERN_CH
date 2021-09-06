const isInvalidInput = (digit) => {
    if( ( isNaN(digit) || digit === null || digit === '' ) && digit !== undefined ){
        return true
    }
  else { 
    return false 
  } 
}

const addition = (firstDigit, secondDigit) => {
    if(isInvalidInput(firstDigit) || isInvalidInput(secondDigit)){
        return 'Input must be a number'
    }
    if(firstDigit === undefined || secondDigit === undefined){
        return 'Must enter at least two digits'
      }
    return parseInt(firstDigit) + parseInt(secondDigit)
}

const subtraction = (firstDigit, secondDigit) => {
    if(isInvalidInput(firstDigit) || isInvalidInput(secondDigit)){
        return 'Input must be a number'
    }
    if(firstDigit === undefined || secondDigit === undefined){
        return 'Must enter at least two digits'
      }
    return parseInt(firstDigit) - parseInt(secondDigit)
}

const multiplication = (firstDigit, secondDigit) => {
    if(isInvalidInput(firstDigit) || isInvalidInput(secondDigit)){
        return 'Input must be a number'
    }
    if(firstDigit === undefined || secondDigit === undefined){
        return 'Must enter at least two digits'
    }
    return parseInt(firstDigit) * parseInt(secondDigit)
}

const division = (firstDigit, secondDigit) => {
    if(isInvalidInput(firstDigit) || isInvalidInput(secondDigit)){
        return 'Input must be a number'
    }
    if(firstDigit === undefined || secondDigit === undefined){
        return 'Must enter at least two digits'
    }
    if(firstDigit == 0 || secondDigit == 0 ){
        return "Can't divide by 0"
    }
    return parseInt(firstDigit) / parseInt(secondDigit)
}

module.exports = {
    addition,
    subtraction,
    multiplication,
    division
}
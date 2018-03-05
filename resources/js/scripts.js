//array representing the expression 3+2, 15*3 etc.
var theExpression=[''];

//The joined expression
var totalExpression;

//Valid characters for the expression
var nums = [0,1,2,3,4,5,6,7,8,9];
//Valid operators for the expression
var validOperators=["+","-","/","*"];

//Other valid operators, currently on the decimal
var otherOperators=["."]; 

$(document).ready(function(){

    // When user clicks a button
    //determine if the button was to:
    // 1. Clear
    // 2. Delete last character
    // 3. Total the current expression
    // 4. Get value of last input
    $('a').on('click', function(){
      //if(this.id === 'deleteAll'){
      if(isClearKey(this)){
        clearExpression();
      }else if (isDeleteKey(this)){
         deleteLastInput();
     // }else if (this.id === "total"){
    }else if (isEqualKey(this)){
         getCalcTotal();
      }else{
        getCalcValue(this);
      }
    });
});

function isClearKey(key){
  if($(key).attr("id") === 'clearKey'){
    return true;
  }else{
    return false;
  }
}

function isDeleteKey(key){
  if($(key).attr("id") === 'deleteKey'){
    return true;
  }else{
    return false;
  }
}

function isEqualKey(key){
  if($(key).attr("id") === 'equalKey'){
   return true;
  }else{
   return false;
  }    
}


function thereAreDuplicatePeriods(input){
    //The last element included a '.' character and another is being added 99.. etc.
    if(otherOperators.includes(theExpression[theExpression.length-1]) === true && input === "."){
        return true;
    }else{
        return false;
    }

}

function isTheFirstCharacterOperator(input){
    if(theExpression.length === 1 && validOperators.includes(input) === true){
        return true;
     }else{
         return false;
     }
}


function isTheFirstCharacterOtherOperator(input){
    if(theExpression.length === 1 && otherOperators.includes(input) === true){
        return true;
     }else{
         return false;
     }
}


function isTheFirstCharacterNumber(input){
    if(theExpression.length === 1 && validOperators.includes(input) === false){
        return true;
    }else{
        return false;
    }
}

function wasTheLastCharacterNumber(input){
    if(validOperators.includes(theExpression[theExpression.length - 1]) === false ){
        return true;
    }else{
        return false;
    }
}

function isValidNumber(input){
    if(nums.includes(Number(input))){
        return true;
    }else{
        return false;
    }
}

function inputValidates(input){
    if(isValidNumber(input) || wasTheLastCharacterNumber(input) || isTheFirstCharacterNumber(input)){
        return true;
    }else{
        return false;
    }
    
}

function getCalcValue(key){
    
    var theInput = $(key).attr("id");
    if(thereAreDuplicatePeriods(theInput)){
       console.log('Duplicate "."')  
    }else if(isTheFirstCharacterOperator(theInput)){
        console.log('Operator cannot be first character');
    }else if(isTheFirstCharacterOtherOperator(theInput)){
        console.log('Period cannot be first character');
    }else if(inputValidates(theInput)){
        theExpression.push(theInput);
    }
    updateCalcTotals();
}

function clearExpression(){
  theExpression=[''];
  updateCalcTotals();
}

function deleteLastInput(){
  theExpression.pop();
  updateCalcTotals();
}

function updateCalcTotals(){
  totalExpression = theExpression.join('');
  $('#steps').text(totalExpression);
}

function getCalcTotal(){
  totalExpression = theExpression.join('');
  $('#steps').html(eval(totalExpression).toFixed(4));
}

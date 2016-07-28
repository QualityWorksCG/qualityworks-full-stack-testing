'use strict';

//Four simple functions that can be used for unit testing.

function sumNumbers(a,b){
    return a+b;
}

function subtractNumbers(a,b){
    return a-b;
}

function divideNumbers(a,b){
    if(b != 0){
        return a/b;
    }else{
        return null;
    }
}

function multiplyNumbers(a,b){
    return a*b;
}

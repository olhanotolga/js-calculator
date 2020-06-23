let input1;
let input2;

let operator;

// maybe worth creating isInput1Float and isInput2Float ?
let isInput1Float = false;
let isInput2Float = false;

const setInput = value => {
    // display current value
    // if operator undefined, concatenate the next entered value to the previous one, save it and display it as input1
    // if operator defined, set the input2
    // if input2 defined, concat the next entered value to the previous one, save it and display it as input2
    if (!input1) {
        displayInput(value);
        if (value == 0) {
            input1 = value;
        } else {
            input1 = Number(value);
            console.log(typeof input1);
        }
        
    } else {
        if(!operator) {
            let twoDigitInput1 = input1.toString().concat(value);
            
            input1 = Number(twoDigitInput1);
            displayInput(input1);
            console.log(input1);
            
        } else {
            if (!input2) {
                displayInput(value);
                input2 = Number(value);
            } else {
                let twoDigitInput2 = input2.toString().concat(value);
                
                input2 = Number(twoDigitInput2);
                displayInput(input2);
                console.log(input2);
                
                
            }
        }
    }
}

// display entered values
const displayInput = value => {
    document.querySelector('.display').innerHTML = value;
}

// function to reset the values and display on button click
const reset = () => {
    clear();
    document.querySelector('.display').innerHTML = 0;
}
// function to clear input and operator
const clear = () => {
    input1 = undefined;
    input2 = undefined;
    operator = undefined;
    isInput1Float = false;
    isInput2Float = false;
}

const setOperator = value => {
    operator = value;
    console.log(operator);
}

// CALCULATION FUNCTIONS

const add = (a, b) => {
    if (isInput1Float == true || isInput2Float == true) {
        return (a + b).toFixed(5);
    } else {
        return a + b;
    }
};
const subtract = (a, b) => {
    if (isInput1Float == true || isInput2Float == true) {
        return (a - b).toFixed(5);
    } else {
        return a - b;
    }
};
const multiply = (a, b) => {
    if (isInput1Float == true || isInput2Float == true) {
        return (a * b).toFixed(5);
    } else {
        return a * b;
    }
};
const divide = (a, b) => {
    if (b == 0) {
        return document.querySelector('.display').innerHTML = "don't you ever divide by zero!";
    }
    if (isInput1Float == true || isInput2Float == true) {
        return (a / b).toFixed(5);
    } else {
        return a / b;
    }
};

// NUMBER MANIPULATIONS

const calcPercent = () => {
    // if there is input, divide by 100 and reassign the value
    // if there is no input, do nothing
    if (input2) {
        input2 /= 100;
        displayInput(input2);
        return input2;
    }
    if (input1) {
        input1 /= 100;
        displayInput(input1);
        return input1;
    }
};
const changeSign = () => {
    if (input2) {
        input2 *= -1;
        displayInput(input2);
        return input2;
    }
    if (input1) {
        if(operator) {
            // there is a problem with that: if I try to change the sign twice, it returns NaN (after multiplying the "-" string by -1)
            input2 = "-";
            displayInput(input2);
        } else {
            input1 *= -1;
            displayInput(input1);
            return input1;
        }
    }
    if (!input1) {
        // there is a problem with that: if I try to change the sign twice, it returns NaN (after multiplying the "-" string by -1)
        input1 = "-";
        displayInput(input1);
    }
}
const addFloatingPoint = () => {
    if (input2) {
        if (isInput2Float == false) {
            input2 = input2.toString().concat(".");
            displayInput(input2);
            isInput2Float = true;
        }
    } else if (!input1) {
        input1 = "0.";
        displayInput(input1);
        isInput1Float = true;
    } else /* input1 is set */ {
        if(operator) {
            input2 = "0.";
            displayInput(input2);
            isInput2Float = true;
        } else {
            if (isInput1Float == false) {
                input1 = input1.toString().concat(".");
                displayInput(input1);
                isInput1Float = true;
            } 
        }
    }
}

// CACULATING RESULT

const calculate = () => {
    switch(operator){
        case 'addition':
            document.querySelector('.display').innerHTML = add(input1, input2);
            clear();
            break;
        case 'subtraction':
            document.querySelector('.display').innerHTML = subtract(input1, input2);
            clear();
            break;
        case 'multiplication':
            document.querySelector('.display').innerHTML = multiply(input1, input2);
            clear();
            break;
        case 'division':
            document.querySelector('.display').innerHTML = divide(input1, input2);
            clear();
            break;
        default:
            console.log('no operator selected');
    }   
}






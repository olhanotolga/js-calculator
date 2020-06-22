let input1;
let input2;

let operator;

const setInput = value => {
    
    // display current value
    // if operator undefined, concatenate the next entered value to the previous one, save it and display it as input1
    // if operator defined, set the input2
    // if input2 defined, concat the next entered value to the previous one, save it and display it as input2
    if (!input1) {
        displayInput(value);
        input1 = Number(value);
    } else {
        if(!operator) {
            let twoDigitInput1 = input1.toString().concat(value);
            input1 = Number(twoDigitInput1);
            displayInput(twoDigitInput1);
            console.log(twoDigitInput1);
        } else {
            if (!input2) {
                displayInput(value);
                input2 = Number(value);
            } else {
                let twoDigitInput2 = input2.toString().concat(value);
                input2 = Number(twoDigitInput2);
                displayInput(twoDigitInput2);
                console.log(twoDigitInput2);
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
}

const setOperator = value => {
    operator = value;
    console.log(operator);
}

// calculation functions
const add = (a, b) => {
    return a + b;
};
const subtract = (a, b) => {
    return a - b;
};
const multiply = (a, b) => {
    return a * b;
};
const divide = (a, b) => {
    if (b == 0) {
        return document.querySelector('.display').innerHTML = "don't you ever divide by zero!";
    }
    return a / b;
};

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

// TODO:
// Refactor
// Allow input of 2-digit (and more) numbers
// Display 2-digit (and more) numbers in the display




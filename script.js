let input1;
let input2;

let operator;

const setInput = value => {
    // if input1 is defined, then store the 2nd value in input2
    displayInput(value);
    if (input1) {
        input2 = Number(value);
        // if operator is not defined, then add value to input1
        if(!operator) {
            let twoDigitInput = input1.toString().concat(value);
            input1 = Number(twoDigitInput);
            console.log(twoDigitInput);
        }
    } else {
        input1 = Number(value);
    }
    console.log(input1, input2);
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

// addition
const add = (a, b) => {
    return a + b;
};
// subtraction
const subtract = (a, b) => {
    return a - b;
};
// multiplication
const multiply = (a, b) => {
    return a * b;
};
// division
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
// Inspect subtraction with a negative sum
// Allow input of 2-digit (and more) numbers
// Display 2-digit (and more) numbers in the display




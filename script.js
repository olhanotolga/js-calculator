let input1;
let input2;

let operator;

const setInput = value => {
    // if input1 is defined, then store the 2nd value in input2
    displayInput(value);
    if (input1) {
        input2 = Number(value);
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

const add = (a, b) => {
    operator = 'addition';
    let sum = a + b;
    //console.log(sum);
    return sum;
};

const calculate = () => {
    //console.log(add(input1, input2));
    document.querySelector('.display').innerHTML = add(input1, input2);
    console.log(input1, input2, operator);
    clear();
    console.log(input1, input2, operator);
}


let input1;
let input2;

let operator;

const setInput = value => {
    // if input1 is defined, then store the 2nd value in input2
    if (input1) {
        input2 = Number(value);
    } else {
        input1 = Number(value);
    }
    console.log(input1, input2);
}

const add = (a, b) => {
    operator = 'addition';
    let sum = a + b;
    console.log(sum);
    return sum;
};

const calculate = () => {
    console.log(add(input1, input2));
}
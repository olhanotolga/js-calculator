/*
+ if calculation is followed by input (not operator), reassign input1 as value
+ if calculation is followed by operator, reassign input1 as result
+ allow inputs that start with -0.
+ disable inputs that start with 0 and are not floats
+ disable inputs that start with multiple 0s
+ fix the issue with integers becoming floats with trailing 0s
+ fix floats becoming crazy: 2.0001 + 0.0003 = 2.0004000000000004
+ add the 'back to normal' button which reverts the division-by-zero animation
+ when "," is pressed after result is calculated, instead of concatenating consequent digits, input is reset <-- "," does not currently reset the result!
*/

let input1 = null;
let input2 = null;
let result = null;
let operator = null;

// maybe worth creating isInput1Float and isInput2Float ?
let isInput1Float = false;
let isInput2Float = false;

const setInput = value => {

    // if we have result stored from the previous calculation, we should reset it back to null
    if (result !== null) {
        isInput1Float = false;
        displayInput(value);
        result = null;
        return input1 = value;
    }

    if (input1 === null) {
        displayInput(value);
        input1 = value;
        console.log(input1, typeof input1);
    } else {
        if(!operator) {
            input1 = input1.concat(value);
            if (input1[0] === "0" && input1[1] !== ".") {
                input1 = input1.substr(1);
            }
            displayInput(input1);
            console.log(input1);
            
        } else {
            console.log(input1)
            if (!input2) {
                displayInput(value);
                input2 = value;
            } else {
                input2 = input2.concat(value);
                if (input2[0] === "0" && input2[1] !== ".") {
                    input2 = input2.substr(1);
                }
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

// reset the values and clear the display on button click
const clearDisplay = () => {
    reset();
    result = null;
    isInput1Float = false;
    displayInput(0);
}

// reset the values of inputs and operator
const reset = () => {
    input1 = null;
    input2 = null;
    operator = null;
    isInput2Float = false;
}

const setOperator = value => {
    if (result) {
        input1 = result;
        result = null;
        operator = value;
    } else {
        if (input2) {
            calculate();
            input1 = result;
            operator = value;
            result = null;
        } else {
            operator = value;
            input1 = Number(input1);
            displayInput(input1);
        }
    }
    console.log(input1, operator);
}

// CALCULATION FUNCTIONS

const add = (a, b) => {
    result = Number((Number(a) + Number(b)).toFixed(10));
    return result;
};

const subtract = (a, b) => {
    result = Number((Number(a) - Number(b)).toFixed(10));
    return result;
};

const multiply = (a, b) => {
    result = Number((Number(a) * Number(b)).toFixed(10));    
    return result;
};

const divide = (a, b) => {
    if (b == 0) {
        dividedByZero();
        return document.querySelector('.display').innerHTML = "don't you ever divide by zero!";
    } else {
        result = Number((Number(a) / Number(b)).toFixed(10));
        return result;
    }
};

// NUMBER MANIPULATIONS

const calcPercent = () => {
    if (input2) {
        input2 /= 100;
        // console.log(typeof input2);
        if (input2 < 1) {
            isInput2Float = true;
        }
        displayInput(input2);
        return input2;
    }
    if (input1) {
        input1 /= 100;
        // console.log(typeof input1);
        if (input1 < 1) {
            isInput1Float = true;
        }
        displayInput(input1);
        return input1;
    }
    if (result) {
        result /= 100;
        displayInput(result);
        return result;
    }
};
const changeSign = () => {
    if (result) {
        result *= -1;
        displayInput(result);
        return result;
    }
    if (input2) {
        input2 *= -1;
        displayInput(input2);
        return input2;
    }
    if (input1) {
        if(operator) {
            input2 = "-";
            displayInput(input2);
        } else if (input1 === "-") {
            input1 = null;
            displayInput("0");
            return input1;
        } else {
            input1 *= -1;
            displayInput(input1);
            return input1;
        }
    }
    if (!input1) {
        input1 = "-";
        displayInput(input1);
    }
};

// maybe replace the check with native Number.isInteger(num) method?
const addFloatingPoint = () => {
    if (result) {
        result = null;
    }
    console.log(`input1: ${input1}, input2: ${input2}, result: ${result}`);
    if (input2) {
        if (isInput2Float === false) {
            input2 = input2.toString().concat(".");
            displayInput(input2);
            isInput2Float = true;
        }
    } else if (!input1) {
        input1 = "0.";
        displayInput(input1);
        isInput1Float = true;
    } else /* input1 is set */ {

        if (operator) {
            input2 = "0.";
            displayInput(input2);
            isInput2Float = true;
        } else {
            if (isInput1Float === false) {
                if (input1 === "-") {
                    input1 = "-0.";
                } else {
                    input1 = input1.concat(".");
                }
                displayInput(input1);
                isInput1Float = true;
            } 
        }
    }
}

// CACULATING RESULT

const calculate = () => {
    
    console.log(input1, typeof input1, operator, input2, typeof input2);

    switch (operator) {
        case 'addition':
            displayInput(add(input1, input2));
            break;
        case 'subtraction':
            displayInput(subtract(input1, input2));
            break;
        case 'multiplication':
            displayInput(multiply(input1, input2));
            break;
        case 'division':
            displayInput(divide(input1, input2));
            break;
        default:
            console.log('no operator selected');
    }

    reset();
};

// wreaks havoc upon division by zero
const dividedByZero = () => {

    // changes some styling:
    const bckground = document.querySelector("body");
    bckground.classList.add("brokenBckground");
    const display = document.querySelector(".display");
    display.classList.add("brokenDisplay");

    setTimeout(() => {
        const startAnewBtn = document.getElementById("startAnewBtn");
        startAnewBtn.classList.add("emergeFreshStartBtn");
    }, 4000)
    

    // function moves each button away from its start position
    const buttons = document.querySelectorAll(".calcBtn");

    for (let button of buttons) {
        button.classList.add("brokenBtns");
        
        const randomMinusPlus50 = [Math.floor(Math.random() * 100 + 1), Math.floor(Math.random() * -100 - 1)];
        const finalPosX = randomMinusPlus50[Math.round(Math.random())];
        const finalPosY = randomMinusPlus50[Math.round(Math.random())];

        let pos = 0;

        const animate = () => {
            if (Math.abs(pos) >= Math.abs(finalPosX) || Math.abs(pos) >= Math.abs(finalPosY)) {
                clearInterval(animation);
            }
            if (Math.abs(finalPosX) > Math.abs(pos)) {
                if (finalPosX < 0) {
                    pos -= 1;
                } else {
                    pos += 3;
                }
                button.style.left = pos + "px";
            }
            if (Math.abs(finalPosY) > Math.abs(pos)) {
                if (finalPosY < 0) {
                    pos -= 2;
                } else {
                    pos += 4;
                }
                button.style.top = pos + "px";
            }
        }
        const animation = setInterval(animate, 100);
    }
};

// undoes the animation mess:
const freshStart = () => {
    clearDisplay();
    
    const bckground = document.querySelector("body");
    bckground.classList.remove("brokenBckground");
    
    const display = document.querySelector(".display");
    display.classList.remove("brokenDisplay");
    displayInput("*(^-^)*");

    const buttons = document.querySelectorAll(".calcBtn");
    const position = 0;
    for (let button of buttons) {
        // for each button, the styling is changed
        button.classList.remove("brokenBtns");
        button.style.left = position;
        button.style.top = position;
    }

    const startAnewBtn = document.getElementById("startAnewBtn");
    startAnewBtn.classList.remove("emergeFreshStartBtn");
    
}
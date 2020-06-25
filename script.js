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
    if (input1 === undefined) {
        displayInput(value);
        input1 = value;
        console.log(input1, typeof input1);
        
    } else {
        if(!operator) {
            let twoDigitInput1 = input1.toString().concat(value);
            // input1 = Number(twoDigitInput1);
            input1 = twoDigitInput1;
            displayInput(input1);
            console.log(input1);
            
        } else {
            console.log(input1)
            if (!input2) {
                displayInput(value);
                // input2 = Number(value);
                input2 = value;
            } else {
                let twoDigitInput2 = input2.toString().concat(value);
                // input2 = Number(twoDigitInput2);
                input2 = twoDigitInput2;
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
    document.querySelector('.display').innerHTML = 0;
}

// reset the values of inputs and operator
const reset = () => {
    input1 = undefined;
    input2 = undefined;
    operator = undefined;
    isInput1Float = false;
    isInput2Float = false;
}

const setOperator = value => {
    operator = value;
    input1 = Number(input1);
    displayInput(input1);
    console.log(input1, operator);
}

// CALCULATION FUNCTIONS

const add = (a, b) => {
    console.log(input1, typeof input1, input2, typeof input2);
    if (isInput1Float == true || isInput2Float == true) {
        return (Number(a) + Number(b)).toFixed(5);
    } else {
        return Number(a) + Number(b);
    }
};
const subtract = (a, b) => {
    if (isInput1Float == true || isInput2Float == true) {
        return (Number(a) - Number(b)).toFixed(5);
    } else {
        return Number(a) - Number(b);
    }
};
const multiply = (a, b) => {
    if (isInput1Float == true || isInput2Float == true) {
        return (Number(a) * Number(b)).toFixed(5);
    } else {
        return Number(a) * Number(b);
    }
};
const divide = (a, b) => {
    if (b == 0) {
        dividedByZero();
        return document.querySelector('.display').innerHTML = "don't you ever divide by zero!";
        
    }
    if (isInput1Float == true || isInput2Float == true) {
        return (Number(a) / Number(b)).toFixed(5);
    } else {
        return Number(a) / Number(b);
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
        } else if (input1 === "-") {
            input1 = undefined;
            displayInput("+");
            return input1;
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
};

// maybe replace the check with native Number.isInteger(num) method?
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
    
    console.log(input1, typeof input1, operator, input2, typeof input2);

    const display = document.querySelector('.display');

    switch (operator) {
        case 'addition':
            display.innerHTML = add(input1, input2);
            reset();
            break;
        case 'subtraction':
            display.innerHTML = subtract(input1, input2);
            reset();
            break;
        case 'multiplication':
            display.innerHTML = multiply(input1, input2);
            reset();
            break;
        case 'division':
            display.innerHTML = divide(input1, input2);
            reset();
            break;
        default:
            console.log('no operator selected');
    }
};

// function moves each button by x value for left position and by y value for top position
const dividedByZero = () => {
    // function call changes some styling:
    const bckground = document.querySelector("body");
    bckground.style.backgroundColor = "black";
    const display = document.querySelector(".display");
    display.style.backgroundColor = "firebrick";
    display.style.position = "relative";
    display.style.transform = "translate(0px, 150px) rotate(-25deg) scale(1.1)";
    
    display.style.zIndex = "3";

    const buttons = document.querySelectorAll("button");

    for (let button of buttons) {
        // for each button, the styling is changed
        button.style.backgroundColor = "gold";
        
        // final x and y positions are set
        const randomMinusPlus50 = [Math.floor(Math.random() * 100 + 1), Math.floor(Math.random() * -100 - 1)];
        const finalPosX = randomMinusPlus50[Math.round(Math.random())];
        const finalPosY = randomMinusPlus50[Math.round(Math.random())];

        // the initial x and y is 0
        let pos = 0;

        // for each button, the movement from position 0 to position x and y is animated
        
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
                console.log(pos);
            }
            if (Math.abs(finalPosY) > Math.abs(pos)) {
                
                if (finalPosY < 0) {
                    pos -= 2;
                } else {
                    pos += 4;
                }
                button.style.top = pos + "px";
                console.log(pos);
            }
        }
        const animation = setInterval(animate, 100);
    }
    
};


// const bckground = document.querySelector("body");
//         bckground.style.backgroundColor = "black";
//         const display = document.querySelector(".display");
//         display.style.backgroundColor = "firebrick";

//         const buttons = document.querySelectorAll("button");
        
//         const randomMinusPlus50 = [Math.floor(Math.random() * 100 + 1), Math.floor(Math.random() * -100 - 1)];
//         // let randomValue = randomMinusPlus50[Math.round(Math.random())];
//         let pos = 0;
        
//         for (let button of buttons) {
//             let randomValueTop = randomMinusPlus50[Math.round(Math.random())];
//             let randomValueLeft = randomMinusPlus50[Math.round(Math.random())];
//             // button.style.top = randomValue + "px";
//             // button.style.left = randomValue + "px";
//             button.style.top = randomValueTop + "px";
//             button.style.left = randomValueLeft + "px";
//             button.style.backgroundColor = "gold";
            
            
//             const animation = () => {
//                 if (Math.abs(pos) > Math.abs(randomValueTop) && Math.abs(pos) > Math.abs(randomValueLeft)) {
//                     clearInterval(animate);
                    
//                 } else {
//                     if (pos < 0) {
//                         pos -= 5;
//                     } else {
//                         pos += 5;
//                     };
//                     button.style.top = pos + "px";
//                     console.log(button.style.top);
//                     button.style.left = pos + "px";
//                     console.log(button.style.left);
//                 }
//             };
//             const animate = setInterval(animation, 400);
//         }










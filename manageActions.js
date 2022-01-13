function addEventstoButton() {
    let allButtons = document.body.querySelectorAll("button");
    console.log("yo" + allButtons);
    Array.from(allButtons).map(button =>
        button.addEventListener("click", showCharacter)
    );
}

function getPrecedence(c) {
    if (c == '+' || c == '-') {
        return 1;
    }
    return 2;
}

function solve(a, b, op) {

    if (op == '+') {
        return a + b;
    } else if (op == '-') {
        return a - b;
    } else if (op == '%') {
        return a / b;
    } else
        return a * b;

}

function validate(exp) {
    if (exp.length == 0 || exp[exp.length - 1] == '+' || exp[exp.length - 1] == '%++++++++++++++++++++++++++++++' || exp[exp.length - 1] == '-' || exp[exp.length - 1] == 'x') {
        return false;
    }
    return true;
}

function evaluate(expression) {
    if (!validate(expression)) {
        alert("please enter valid input!");
        return "invalid";
    }
    let prev = null;
    let operand = [];
    let operator = [];
    for (let i = 0; i < expression.length; i++) {
        let cc = expression[i];
        if (cc.match(/[0-9]/)) {
            if (prev != null && Number(prev) >= 0 && Number(prev) <= 9) {
                operand.push(Number(operand.pop() + "" + cc));
            } else {
                operand.push(Number(cc));
            }
        } else {

            if (operator.length == 0) {
                operator.push(cc);
            } else {
                if (getPrecedence(cc) <= getPrecedence(operator[operator.length - 1])) {
                    let b = operand.pop();
                    let a = operand.pop();
                    let oper = operator.pop();
                    operand.push(solve(a, b, oper));

                }
                operator.push(cc);
            }
        }
        prev = cc;
    }
    while (operator.length > 0) {
        let b = operand.pop();
        let a = operand.pop();
        let oper = operator.pop();
        operand.push(solve(a, b, oper));
    }


    return operand.pop();

}
let textbox = document.body.querySelector("#showExpression");
let ans = document.body.querySelector("#ans");

function showCharacter(e) {
    let y = e.target.innerText;
    console.log(y);
    if (y[y.length - 1] !== 'C' && y[y.length - 1] !== '=')
        textbox.innerText = textbox.innerText + e.target.innerText;
    else if (e.target.innerText === 'C')
        textbox.innerText = "";
    else
        ans.innerText = "Ans : " + evaluate(textbox.innerText);
}
addEventstoButton();
"use strict";

class Calculator {
    constructor () {
        this.upperValue = document.querySelector("#upper-number");
        this.resultValue = document.querySelector("#result-number");
        this.reset = false;
    }

    sum (n1, n2) {
        return n1 + n2;
    }

    menos (n1, n2) {
        return n1 - n2;
    }

    multiplication (n1, n2) {
        return n1 * n2;
    }

    division (n1, n2) {
        try {
            if (n2 === 0) {
                throw new Error("Divisão por zero!");
            }
            return n1 / n2;
        } catch (error) {
            return `Erro: ${error.message}`;
        }
    }

    btnPress = (event) => {
        event.preventDefault();
        const button = event.target.textContent;
        let currentExpressions = this.upperValue.textContent;

        if (button === 'AC') {
            this.clearValue();
            return;
        }

        if (button === '=') {
            const result = this.resolve(currentExpressions);
            this.resultValue.textContent = result;
            this.upperValue.textContent = currentExpressions;
            this.reset = true;
            return;
        }

        if (this.reset && /^\d+$/.test(button)) {
            currentExpressions = '';
            this.reset = false;
        }

        if (currentExpressions === '0' && /^\d+$/.test(button)) {
            currentExpressions = button;
        } else {
            currentExpressions += button;
        }

        this.upperValue.textContent = currentExpressions;
    }

    clearValue () {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
        this.reset = false;
    }

    resolve (expressao) {
        const tokens = expressao.replace(/x/g, '*').match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
        if (!tokens) {
            return `Erro`;
        }

        let stack = [];

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];

            if (token === '*' || token === '/') {
                const n1 = parseFloat(stack.pop());
                const n2 = parseFloat(tokens[++i]);

                let result = token === '*' ? this.multiplication(n1, n2) : this.division(n1, n2);

                if (typeof result === 'string') {
                    return result;
                }

                stack.push(result);
            } else {
                stack.push(token);
            }
        }

        let result = parseFloat(stack[0]);
        for (let i = 1; i < stack.length; i += 2) {
            const operator = stack[i];
            const num = parseFloat(stack[i + 1]);
            if (operator === '+') result = this.sum(result, num);
            if (operator === '-') result = this.menos(result, num);
        }

        return result;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const calc = new Calculator();
    const buttons = [...document.querySelectorAll(".btn")];
    buttons.forEach((botao) => {
        botao.addEventListener("click", calc.btnPress);
    });
});

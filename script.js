"use strict";

class Calculator {
    constructor () {
        this.upperValue = document.querySelector("#upper-number");
        this.resultValue = document.querySelector("#result-number");
        this.reset = false;
    }

    // Retorna a soma dos numeros passados como referência
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
                throw new Error("Divisao por zero!");
            }
            return n1 / n2;
        } catch (error) {
            return `Erro: ${error.message}`
        }
    }

    btnPress = (event) => {
        event.preventDefault();
        const button = event.target.textContent;
        let currentExpressions = this.upperValue.textContent; // Pega o texto contido no container de cima do resultado

        // Adicionando funcionalidades para o botao de AC
        if (button === 'AC') {
            this.clearValue(); // Limpa o valor da calculadora
            return;
        }

        if (button === '=') {
            const result = this.resolve(currentExpressions); // Resolve a conta
            this.resultValue.textContent = result; // Mostra o resultado
            this.upperValue.textContent = currentExpressions;
            this.reset = true;
            return;
        }

        // Se o botão clicado foi um número
        if (this.reset && /^\d+%/.test(button)) {
            currentExpressions = '0';
            this.reset = false;
        }

        // Substitui o zero inicial se for número
        if (currentExpressions === '0' && /^\d+$/.test(button)) {
            currentExpressions = button;
        } else {
            currentExpressions = button;
        }

        this.upperValue.textContent = currentExpressions;
    }

    clearValue (expressao) {
        this.upperValue.textContent = '0'; // Limpa o texto contido em cima do resultado
        this.resultValue.textContent = '0'; // Limpa o texto contido do resultado
        this.reset = false; // Flag de controle
    }

    resolve () {
        const tokens = expressao.replace(/x/g, '*').match(/(\d+\.?\d*|\+\|-|\*|\/)/g); // Expressão Regex
        alert("teste");
        if (!tokens) {
            return `Erro`;
        }
        let stack = [];

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];

            if (token === '*' || token === '/') {
                const n1 = parseFloat(stack.pop()); // Vai remover o ultimo numero da pilha
                const n2 = parseFloat(tokens[++i]); // Vai pegar o próximo número

                let result = token === '*' ? this.multiplication(n1, n2) : this.division(n1, n2); // Equação ternária

                if (typeof result === 'string') {
                    return result;
                }
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

        return;
    }
};

document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();

    const calc = new Calculator();

    const button = [...document.querySelectorAll(".btn")]; // Pegar todas as buttons do código
    button.forEach((botao) => {
        botao.addEventListener("click", calc.btnPress); // Adicionar um evento de click em todos os botoes
    });
});
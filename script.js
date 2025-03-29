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
};

document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();

    const calc = new Calculator();

    let resultado = calc.sum(5, 3);

    resultado = calc.menos(10, 5);

    resultado = calc.multiplication(3, 4);
    document.querySelector("#result-number").textContent = resultado;

    resultado = calc.division(3, 0);

    let button = document.querySelectorAll(".btn");
    button.forEach((botao, indice) => {
        botao[indice].addEventListener("click", calc.btnPress);
    })
    
});


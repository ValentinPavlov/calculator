const main_buttons = document.querySelector('.main_buttons')
const calc_process = document.querySelector('.calc_history')
const keyboard = document.querySelector('.keyboard')
const calculation = document.querySelector('.calculation')
const result = document.querySelector('.result')
// const calcHistory = require("./src/history")
// import {calcHistory} from './src/history.js';
let calcHistory = []
let keyClass = ''
let selectedKey
let expression = ''
main_buttons.addEventListener('click', showTargets)
keyboard.addEventListener("click", showTargets); // регистрируем обработчик события "click" для элемента <div>

function showTargets(event) {
  keyClass = event.target.className
  selectedKey = specMathFuncs(event.target.textContent)

  if (selectedKey != 'not a number') {
    selectedKey = Number(selectedKey)
    if (!isNaN(selectedKey)) {
      expression += selectedKey
      calculation.innerHTML = expression
    }
  }
}



const specMathFuncs = (selectedKey) => {
  switch (keyClass) {
    case 'sin':
      result.innerHTML = Math.sin(Number(+expression))
      // calculation.innerHTML = ''
      calcHistory.push(`sin${expression}=${Math.sin(Number(+expression))}`)
        calculation.innerHTML = ''
      expression = ''
      return 'not a number'
    case 'equals':
      if (calculation.textContent.charAt(calculation.length - 1) != selectedKey && calculation.textContent.length >= 3) {
        result.innerHTML = eval(calculation.textContent)
        expression = eval(calculation.textContent)
        calcHistory.push(`${(calculation.textContent)}=${expression}`)
        calculation.innerHTML = ''
        expression = ''
        return 'not a number'
      } else return 'not a number'
    case 'plus':
      expression += '+'
      calculation.innerHTML = expression
      return 'not a number'
    case 'minus':
      expression += '-'
      calculation.innerHTML = expression
      return 'not a number'
    case 'division':
      expression += '/'
      calculation.innerHTML = expression
      return 'not a number'
    case 'x':
      expression += '*'
      calculation.innerHTML = expression
      return 'not a number'
    case '%':

      break;
    case 'delete':
      expression = ''
      calculation.innerHTML = ''
      result.innerHTML = ''
      return 'not a number'
      break;
    case 'cancel':
      expression = expression.substring(0, expression.length - 1)
      calculation.innerHTML = expression
      break;
      case 'hist':
        for (let i = 0; i<calcHistory.length; i++) {
          const p = document.createElement("p");
          p.className = `history${i}`
          calc_process.appendChild(p)
          document.querySelector(`.history${i}`).innerHTML = calcHistory[i]
        }

        break;


    default:
      return selectedKey
  }
}
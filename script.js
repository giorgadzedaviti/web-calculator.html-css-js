class Calculator { //where we store the onformation
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1) //slice method is used to get last value from the string(currentOperand).to delete last element.
    }

    currentOperand = '' //we need empty string because we can not use toString methond on something that is undefined.

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))return //this statement helps us to use only 1 period in each numbers.

        this.currentOperand = this.currentOperand.toString() + number.toString()//we are converting to string every number because js will instantly 
    }                                                                              //do the number operation and we junst need numbers to be together.

    chooseOperation(operation){   //when we type any numbers and next click operation buttons the number automatically be on previousOperand.
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation
        this.previousOperand = this.currentOperand   
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case'+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;        //kind of bunch of if statements LOL :DD
                break
            case '*':
                computation = prev * current; 
                break
            case '÷':
                computation = prev / current;          
                break
            default:     //default is used for if none of this cases(if statements) executed                        
                return;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay;  
        }
    }

    previousOperand = ''  // we need this empty string because when we type first numbers previous operand wont be undefined.

    updateDisplay(){//when we click anu operation button numbers automaticaly be on previousOperand
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");



const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})


equalsButton.addEventListener('click',button =>{  //equal sign eventlistener  we create equal function at the top
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button =>{          //AC eventlistener we already created AC function at the top
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button =>{              //delete button listener we already create delete function at the top 
    calculator.delete()                                         //it is used for to delete last element
    calculator.updateDisplay()
})
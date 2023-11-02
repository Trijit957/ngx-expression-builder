import { OperatorSymbolEnum } from "../ng-expression-builder.types";
import { operators } from "./operators";

const operatorsArray = operators.map(operator => operator.symbol).filter(operator => !['(', ')'].includes(operator));

export function convertToPostfix(infixExpression: Array<string>): string[] {
   let output: string[] = [];
   let stack: string[] = [];

   for (let i = 0, expressionLength = infixExpression.length; i < expressionLength; i++) {
      var character = infixExpression[i];

      if (operatorsArray.includes(character as OperatorSymbolEnum)) {
         while (
           stack.length !== 0 && 
           stack[stack.length - 1] !== '(' &&
           getPrecedence(character) <= getPrecedence(stack[stack.length - 1])
         ) {
            output.push(stack.pop()!);
         }

         stack.push(character);
         
      } else if (character === '(') {
         stack.push(character);
      } else if (character === ')') {
         while (stack.length !== 0 && stack[stack.length - 1] !== '(') {
            output.push(stack.pop()!);
         }
         stack.pop();
      } else {
         output.push(character);
      }
   }
   
   while (stack.length != 0) {
      output.push(stack.pop()!);    
   }

   return output;
}


function getPrecedence(character: string) {
   let clonedOperatorsArray = [...operatorsArray];
   let precedenceArray = [...clonedOperatorsArray.reverse()];
   if(!precedenceArray.includes(character as OperatorSymbolEnum)) return 0;
   return precedenceArray.indexOf(character as OperatorSymbolEnum) + 1;
}
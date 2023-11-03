import { Injectable } from '@angular/core';
import { MappedOperatorEnum, OperatorNameEnum, OperatorSymbolEnum, OperatorType } from './ng-expression-builder.types';
import { convertToPostfix } from './helpers/infix-to-postfix-expression';
import { ExpressionTree } from './helpers/postfix-to-expression-tree';
import { operators } from './helpers/operators';

@Injectable()
export class NgExpressionBuilderService {

  private operatorFunctions: any = {
    [OperatorSymbolEnum.ADD]: (a: number, b: number) => a + b ,
    [OperatorSymbolEnum.SUBSTRACT]: (a: number, b: number) => a - b ,
    [OperatorSymbolEnum.MULTIPLY]: (a: number, b: number) => a * b ,
    [OperatorSymbolEnum.DIVIDE]: (a: number, b: number) => a / b,
    [OperatorSymbolEnum.EXPONENTIATION]: (a: number, b: number) => Math.pow(a, b) 
  };

  constructor() { }
  
  private isOperator({characterString, isMapped}: { characterString: string, isMapped?: boolean }) {
    return operators.find(operator => ( isMapped ? operator.mappedSymbol : operator.symbol ) === characterString || ( isMapped ? operator.mappedSymbol : operator.secondarySymbol ) === characterString ) ? true : false;
  }

  private getOperator({characterString, isMapped}: { characterString: string, isMapped?: boolean }) {
    return operators.find(operator => ( isMapped ? operator.mappedSymbol : operator.symbol ) === characterString || ( isMapped ? operator.mappedSymbol : operator.secondarySymbol ) === characterString);
  }
  
  private buildExpression(rawQueryString: string): Array<string> {
    rawQueryString = `${OperatorSymbolEnum.OPENNING_BRACKET}${rawQueryString}${OperatorSymbolEnum.CLOSING_BRACKET}`;

    Object.keys(MappedOperatorEnum).forEach(key => {
      rawQueryString = rawQueryString.replaceAll(OperatorSymbolEnum[key as keyof typeof MappedOperatorEnum], MappedOperatorEnum[key as keyof typeof MappedOperatorEnum]);
    });

    let previousOperatorIndex = 0;
    let partOfStringBeforeOperator!: string;
    let expressionArray: string[] = [];

    for(let i = 0, length = rawQueryString.length; i < length; i++) {
       if(rawQueryString[i] && this.isOperator({ characterString: rawQueryString[i], isMapped: true })) {
          let operator = rawQueryString[i];
          if(!previousOperatorIndex) {
            partOfStringBeforeOperator =  rawQueryString.slice(0, i);
            previousOperatorIndex = i + 1;
            let actualOperator = this.getOperator({ characterString: operator, isMapped: true });
            if(actualOperator) {
              if(partOfStringBeforeOperator.trim()) {
                expressionArray.push(partOfStringBeforeOperator.trim());
              }
              expressionArray.push(actualOperator?.symbol);
            }
          } else {
            partOfStringBeforeOperator = rawQueryString.slice(previousOperatorIndex, i);
            previousOperatorIndex = i + 1;
            let actualOperator = this.getOperator({ characterString: operator, isMapped: true });
            if(actualOperator) {
              if(partOfStringBeforeOperator.trim()) {
                expressionArray.push(partOfStringBeforeOperator.trim());
              }
              expressionArray.push(actualOperator?.symbol);
            }      
          }
       }
    }

    
    for(let i = 0; i < expressionArray.length; i++) {
      if(this.isOperator({ characterString: expressionArray[i], isMapped: false }) && ['+', '-'].includes(expressionArray[i + 1])) {
         expressionArray[i + 1] += expressionArray[i + 2];
         expressionArray.splice(i + 2, 1);
      }
    }

    return expressionArray;
  }

  public generateExpressionTree(rawQueryString: string) {

    let expressionArray = this.buildExpression(rawQueryString);

    let postfixExpressionArray: string[] = convertToPostfix(expressionArray);

    let expressionTree = new ExpressionTree();

    let tree = expressionTree.generateExpressionTree(postfixExpressionArray);

    return tree;

  }

  public evaluateExpression(infixExpressionString: string) {

    let expressionArray = this.buildExpression(infixExpressionString);

    let mathematicalExpressionRegex = /[0-9\+\-\*/\(\)\^]/

    expressionArray.forEach(node => {
      if(!mathematicalExpressionRegex.test(node)) {
         throw new Error(`ParseError: ${infixExpressionString} is Not a valid mathematical expression`);
      }
    });

    let postfixExpressionArray: string[] = convertToPostfix(expressionArray);

    let postfixExpressionString = postfixExpressionArray.join(' ');

    let stack: any = [];
    let currentChar: string; 
  
    for(let i = 0, length = postfixExpressionString.length; i < length;  i++) {
  
      currentChar = postfixExpressionString[i];
  
      if(/\d/.test(currentChar)) {
        stack.push(currentChar);
      } else if (currentChar in this.operatorFunctions) {
  
        let b: string | number = +stack.pop()!;
        let a: string | number = +stack.pop()!;
  
        let value: string | number = this.operatorFunctions[currentChar](a, b);
        stack.push(value);
  
      }
    
    }
  
    if(stack.length > 1) {
      throw `ParseError: ${infixExpressionString}`;
    }

      if(Number(stack[0])) {
        return stack[0];
      } else {
        throw new Error(`ParseError: ${infixExpressionString} is Not a valid mathematical expression`);
      }
  
  }
 
}


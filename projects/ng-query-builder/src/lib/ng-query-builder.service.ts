import { Injectable } from '@angular/core';
import { MappedOperatorEnum, OperatorNameEnum, OperatorSymbolEnum, OperatorType } from './ng-query-builder.types';
import { convertToPostfix } from './helpers/infix-to-postfix-expression';
import { ExpressionTree } from './helpers/postfix-to-expression-tree';
import { operators } from './helpers/operators';

@Injectable({
  providedIn: 'root'
})
export class NgQueryBuilderService {
 
  private mappedOperators: Array<string> = [
    OperatorSymbolEnum.AND,
    OperatorSymbolEnum.OR,
    OperatorSymbolEnum.GREATER_THAN_EQUALS_TO,
    OperatorSymbolEnum.LESS_THAN_EQUALS_TO
  ];

  private operatorFunctions: any = {
    "+": (a: number, b: number) => a + b ,
    "-": (a: number, b: number) => a - b ,
    "*": (a: number, b: number) => a * b ,
    "/": (a: number, b: number) => a / b 
  };

  constructor() { }
  
  private isOperator({characterString, isMapped}: { characterString: string, isMapped?: boolean }) {
    return operators.find(operator => ( isMapped ? operator.mappedSymbol : operator.symbol ) === characterString || ( isMapped ? operator.mappedSymbol : operator.secondarySymbol ) === characterString ) ? true : false;
  }

  private getOperator({characterString, isMapped}: { characterString: string, isMapped?: boolean }) {
    return operators.find(operator => ( isMapped ? operator.mappedSymbol : operator.symbol ) === characterString || ( isMapped ? operator.mappedSymbol : operator.secondarySymbol ) === characterString);
  }
  
  private buildQuery(rawQueryString: string): Array<string> {
    rawQueryString = `${OperatorSymbolEnum.OPENNING_BRACKET}${rawQueryString}${OperatorSymbolEnum.CLOSING_BRACKET}`;

    Object.keys(MappedOperatorEnum).forEach((key, index) => {
      rawQueryString = rawQueryString.replaceAll(OperatorSymbolEnum[key as keyof typeof MappedOperatorEnum], MappedOperatorEnum[key as keyof typeof MappedOperatorEnum]);
    });

    console.log('rawQueryString', rawQueryString);

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

    console.log("expressionArray", expressionArray);

    return expressionArray;
  }

  public generateExpressionTree(rawQueryString: string) {

    let expressionArray = this.buildQuery(rawQueryString);

    let postfixExpressionArray: string[] = convertToPostfix(expressionArray);

    console.log("postfixExpressionArray", postfixExpressionArray)

    let expressionTree = new ExpressionTree();

    let tree = expressionTree.generateExpressionTree(postfixExpressionArray);

    console.log("tree", tree)
  }

  public evaluateExpression(infixExpressionString: string) {

    let expressionArray = this.buildQuery(infixExpressionString);

    console.log("expressionArray =>", expressionArray)

    let postfixExpressionArray: string[] = convertToPostfix(expressionArray);

    console.log("postfixExpressionArray =>", postfixExpressionArray)

    let postfixExpressionString = postfixExpressionArray.join(' ');

    console.log("postfixExpressionString =>", postfixExpressionString);

    let stack: any = [];
    let currentChar: string; 
  
    for (var k = 0, length = postfixExpressionString.length; k < length;  k++) {
  
      currentChar = postfixExpressionString[k];
  
      if (/\d/.test(currentChar)) {
        stack.push(currentChar);
      } else if (currentChar in this.operatorFunctions) {
  
        let b: string | number = +stack.pop()!;
        let a: string | number = +stack.pop()!;
  
        let value: string | number = this.operatorFunctions[currentChar](a, b);
        stack.push(value);
  
      }
    
    }
  
    if (stack.length > 1)
      throw "ParseError: " + infixExpressionString + ", stack: " + stack;
  
    return stack[0];
  }


}

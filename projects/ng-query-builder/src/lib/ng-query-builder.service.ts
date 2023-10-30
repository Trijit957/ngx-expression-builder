import { Injectable } from '@angular/core';

enum OperatorNameEnum {
  ADD = 'Add',
  SUBSTRACT = 'Substract',
  MULTIPLY = 'Multiply',
  DIVIDE = 'Divide',
  GREATER_THAN = 'Greater than',
  LESS_THAN = 'Less than',
  GREATER_THAN_EQUALS_TO = 'Greater than and equals to',
  LESS_THAN_EQUALS_TO = 'Less than and equals to',
  EQUALS_TO = ' Equals to',
  OPENNING_BRACKET = 'Openning bracket',
  CLOSING_BRACKET = 'Closing bracket',
  AND = 'And',
  OR = 'Or'
}

enum OperatorSymbolEnum {
  ADD = '+',
  SUBSTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  GREATER_THAN = '>',
  LESS_THAN = '<',
  GREATER_THAN_EQUALS_TO = '>=',
  LESS_THAN_EQUALS_TO = '<=',
  EQUALS_TO = '=',
  OPENNING_BRACKET = '(',
  CLOSING_BRACKET = ')',
  AND = 'AND',
  OR = 'OR'
}

enum MappedOperatorEnum {
  GREATER_THAN_EQUALS_TO = '&',
  LESS_THAN_EQUALS_TO = '$',
  AND = '@',
  OR = '#'
}

type OperatorType = {
  name: OperatorNameEnum;
  symbol: OperatorSymbolEnum;
  mappedOperators?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NgQueryBuilderService {

  private operators: Array<OperatorType> = [
    {
      name: OperatorNameEnum.ADD,
      symbol: OperatorSymbolEnum.ADD
    },
    {
      name: OperatorNameEnum.SUBSTRACT,
      symbol: OperatorSymbolEnum.SUBSTRACT
    },
    {
      name: OperatorNameEnum.MULTIPLY,
      symbol: OperatorSymbolEnum.MULTIPLY
    },
    {
      name: OperatorNameEnum.DIVIDE,
      symbol: OperatorSymbolEnum.SUBSTRACT
    },
    {
      name: OperatorNameEnum.GREATER_THAN,
      symbol: OperatorSymbolEnum.GREATER_THAN
    }, 
    {
      name: OperatorNameEnum.LESS_THAN,
      symbol: OperatorSymbolEnum.LESS_THAN
    }, 
    {
      name: OperatorNameEnum.GREATER_THAN_EQUALS_TO,
      symbol: OperatorSymbolEnum.GREATER_THAN_EQUALS_TO,
      mappedOperators: MappedOperatorEnum.GREATER_THAN_EQUALS_TO
    },
    {
      name: OperatorNameEnum.LESS_THAN_EQUALS_TO,
      symbol: OperatorSymbolEnum.LESS_THAN_EQUALS_TO,
      mappedOperators: MappedOperatorEnum.LESS_THAN_EQUALS_TO
    },
    {
      name: OperatorNameEnum.OPENNING_BRACKET,
      symbol: OperatorSymbolEnum.OPENNING_BRACKET,
    },
    {
      name: OperatorNameEnum.CLOSING_BRACKET,
      symbol: OperatorSymbolEnum.CLOSING_BRACKET,
    },
    {
      name: OperatorNameEnum.AND,
      symbol: OperatorSymbolEnum.AND,
      mappedOperators: MappedOperatorEnum.AND
    },
    {
      name: OperatorNameEnum.OR,
      symbol: OperatorSymbolEnum.OR,
      mappedOperators: MappedOperatorEnum.OR
    }
  ];

  constructor() { }
  
  private isOperator(characterString: string) {
    return this.operators.find(operator => operator.symbol === characterString) ? true : false;
  }
  
  public buildQuery(rawQueryString: string) {
    rawQueryString = `${OperatorSymbolEnum.OPENNING_BRACKET}${rawQueryString}${OperatorSymbolEnum.CLOSING_BRACKET}`;

    Object.keys(MappedOperatorEnum).forEach((key, index) => {
      rawQueryString = rawQueryString.replaceAll(OperatorSymbolEnum[key as keyof typeof MappedOperatorEnum], MappedOperatorEnum[key as keyof typeof MappedOperatorEnum]);
    });

    console.log('rawQueryString', rawQueryString);

    for(let i = 0, length = rawQueryString.length; i < length; i++) {
      
    }
  }

}

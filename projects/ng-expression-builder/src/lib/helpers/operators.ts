import { MappedOperatorEnum, OperatorNameEnum, OperatorSymbolEnum, OperatorType } from "../ng-expression-builder.types";

export const operators: Array<OperatorType> = [
    {
      name: OperatorNameEnum.EXPONENTIATION,
      symbol: OperatorSymbolEnum.EXPONENTIATION,
      mappedSymbol: OperatorSymbolEnum.EXPONENTIATION
    },
    {
      name: OperatorNameEnum.MULTIPLY,
      symbol: OperatorSymbolEnum.MULTIPLY,
      mappedSymbol: OperatorSymbolEnum.MULTIPLY
    },
    {
      name: OperatorNameEnum.DIVIDE,
      symbol: OperatorSymbolEnum.DIVIDE,
      mappedSymbol: OperatorSymbolEnum.DIVIDE
    },
    {
      name: OperatorNameEnum.ADD,
      symbol: OperatorSymbolEnum.ADD,
      mappedSymbol: OperatorSymbolEnum.ADD
    },
    {
      name: OperatorNameEnum.SUBSTRACT,
      symbol: OperatorSymbolEnum.SUBSTRACT,
      mappedSymbol: OperatorSymbolEnum.SUBSTRACT
    },
    {
      name: OperatorNameEnum.GREATER_THAN,
      symbol: OperatorSymbolEnum.GREATER_THAN,
      mappedSymbol: OperatorSymbolEnum.GREATER_THAN
    }, 
    {
      name: OperatorNameEnum.LESS_THAN,
      symbol: OperatorSymbolEnum.LESS_THAN,
      mappedSymbol: OperatorSymbolEnum.LESS_THAN
    }, 
    {
      name: OperatorNameEnum.LESS_THAN_EQUALS_TO,
      symbol: OperatorSymbolEnum.LESS_THAN_EQUALS_TO,
      mappedSymbol: MappedOperatorEnum.LESS_THAN_EQUALS_TO
    },
    {
      name: OperatorNameEnum.GREATER_THAN_EQUALS_TO,
      symbol: OperatorSymbolEnum.GREATER_THAN_EQUALS_TO,
      mappedSymbol: MappedOperatorEnum.GREATER_THAN_EQUALS_TO
    },
    {
      name: OperatorNameEnum.NOT_EQUAL_TO,
      symbol: OperatorSymbolEnum.NOT_EQUAL_TO,
      mappedSymbol: OperatorSymbolEnum.NOT_EQUAL_TO
    },
    {
      name: OperatorNameEnum.EQUALS_TO,
      symbol: OperatorSymbolEnum.EQUALS_TO,
      mappedSymbol: OperatorSymbolEnum.EQUALS_TO
    },
    {
      name: OperatorNameEnum.NOT,
      symbol: OperatorSymbolEnum.NOT,
      mappedSymbol: OperatorSymbolEnum.NOT
    },
    {
      name: OperatorNameEnum.AND,
      symbol: OperatorSymbolEnum.AND,
      secondarySymbol: OperatorSymbolEnum.AND_SYMBOL,
      mappedSymbol: MappedOperatorEnum.AND
    },
    {
      name: OperatorNameEnum.OR,
      symbol: OperatorSymbolEnum.OR,
      secondarySymbol: OperatorSymbolEnum.OR_SYMBOL,
      mappedSymbol: MappedOperatorEnum.OR
    },
    {
      name: OperatorNameEnum.OPENNING_BRACKET,
      symbol: OperatorSymbolEnum.OPENNING_BRACKET,
      mappedSymbol: OperatorSymbolEnum.OPENNING_BRACKET
    },
    {
      name: OperatorNameEnum.CLOSING_BRACKET,
      symbol: OperatorSymbolEnum.CLOSING_BRACKET,
      mappedSymbol: OperatorSymbolEnum.CLOSING_BRACKET
    }
];


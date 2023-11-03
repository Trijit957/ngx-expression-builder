export type OperatorType = {
    name: OperatorNameEnum;
    symbol: OperatorSymbolEnum;
    secondarySymbol?: string;
    mappedSymbol: string;
}

export enum OperatorNameEnum {
    ADD = 'Add',
    SUBSTRACT = 'Substract',
    MULTIPLY = 'Multiply',
    DIVIDE = 'Divide',
    EXPONENTIATION = 'Exponentiation',
    GREATER_THAN = 'Greater than',
    LESS_THAN = 'Less than',
    GREATER_THAN_EQUALS_TO = 'Greater than and equals to',
    LESS_THAN_EQUALS_TO = 'Less than and equals to',
    EQUALS_TO = 'Equals to',
    NOT_EQUAL_TO = 'Not equal to',
    OPENNING_BRACKET = 'Openning bracket',
    CLOSING_BRACKET = 'Closing bracket',
    AND = 'And',
    OR = 'Or',
    NOT = 'Not'
}

export enum OperatorSymbolEnum {
    ADD = '+',
    SUBSTRACT = '-',
    MULTIPLY = '*',
    DIVIDE = '/',
    EXPONENTIATION = '^',
    GREATER_THAN = '>',
    LESS_THAN = '<',
    GREATER_THAN_EQUALS_TO = '>=',
    LESS_THAN_EQUALS_TO = '<=',
    EQUALS_TO = '=',
    NOT_EQUAL_TO = '!=',
    OPENNING_BRACKET = '(',
    CLOSING_BRACKET = ')',
    AND = ' AND ',
    AND_SYMBOL = ' && ',
    OR = ' OR ',
    OR_SYMBOL = ' || ',
    NOT = '!'
}

export enum MappedOperatorEnum {
    GREATER_THAN_EQUALS_TO = '&',
    LESS_THAN_EQUALS_TO = '$',
    NOT_EQUAL_TO = '~',
    AND = '@',
    OR = '#',
    AND_SYMBOL = '@',
    OR_SYMBOL = '#'
}
import { OperatorSymbolEnum } from "../ng-expression-builder.types"; 
import { operators } from "./operators";

class Node {
    public operatorSymbol: any;
    public operatorName: any;
    public children: Array<any>;

    constructor(data: any) {
        if(data.symbol && data.name) {
            this.operatorSymbol = data.symbol.trim();
            this.operatorName = data.name;
        } else {
            this.operatorSymbol = data;
            this.operatorName = data;
        } 
        this.children = [];
    }
}

export class ExpressionTree {

    private operatorsArray = operators.map(operator => operator.symbol).filter(operator => !['(', ')'].includes(operator));

    private isOperator(character: OperatorSymbolEnum) {
       return this.operatorsArray.includes(character);
    }

    public generateExpressionTree(postfixExpressionArray: Array<string>) {
        let stack = [];
        let child, leftChild, rightChild, temp;

        for(let i = 0, l = postfixExpressionArray.length; i < l; i++) {
            let character = postfixExpressionArray[i];
            let selectedOperator = operators.find(operatorObj => operatorObj.symbol === character);

            if(this.isOperator(character as OperatorSymbolEnum)) {

                if(character === OperatorSymbolEnum.NOT) {
                    child = stack.pop();            
                    temp = new Node(selectedOperator);

                    let dataType: string;
                    let value: number | boolean | string;

                    if(['true', 'false'].includes(child)) {
                        dataType = 'boolean';
                        value = JSON.parse(child);
                    } else if(Number(child)) {
                        dataType = 'number';
                        value = Number(child);
                    } else if(typeof child === 'string') {
                        dataType = 'string';
                        value = String(child);
                    } else {
                        dataType = 'Node';
                        value = child;
                    }

                    temp.children.push({
                        value,
                        nodeType: 'single child',
                        type: dataType
                    });

                } else {

                    rightChild = stack.pop();
                    leftChild = stack.pop();
                    temp = new Node(selectedOperator);

                    let leftChildDataType: string, rightChildDataType: string;
                    let leftChildValue: number | boolean | string, rightChildValue: number | boolean | string;

                    if(['true', 'false'].includes(leftChild)) {
                        leftChildDataType = 'boolean';
                        leftChildValue = JSON.parse(leftChild);
                    } else if(Number(leftChild)) {
                        leftChildDataType = 'number';
                        leftChildValue = Number(leftChild);
                    } else if(typeof leftChild === 'string') {
                        leftChildDataType = 'string';
                        leftChildValue = leftChild;
                    } else {
                        leftChildDataType = 'Node';
                        leftChildValue = leftChild;
                    }

                    if(['true', 'false'].includes(rightChild)) {
                        rightChildDataType = 'boolean';
                        rightChildValue = JSON.parse(rightChild);
                    } else if(Number(rightChild)) {
                        rightChildDataType = 'number';
                        rightChildValue = Number(rightChild);
                    } else if(typeof leftChild === 'string') {
                        rightChildDataType = 'string';
                        rightChildValue = rightChild;
                    } else {
                        rightChildDataType = 'Node';
                        rightChildValue = rightChild;
                    }
                    
                    temp.children.push(
                        {
                            value: leftChildValue,
                            nodeType: 'Left node',
                            type: leftChildDataType
                        },
                        {
                            value: rightChildValue,
                            nodeType: 'Right node',
                            type: rightChildDataType
                        }
                    );
                } 

                stack.push(temp);
            } else {
                temp = new Node(character);
                stack.push(temp.operatorSymbol.trim());
            }

        }

        temp = stack.pop();

        return temp;
    }


}
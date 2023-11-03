# ng-expression-builder

> A minimalistic Angular package for evaluating mathematical expression and creating expression tree from infix notation

[![NPM](https://img.shields.io/npm/v/ng-expression-builder)](https://www.npmjs.com/package/ng-expression-builder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ng-expression-builder
```

## Usage

> Include the service **NgExpressionBuilderService** into the providers array of corresponding module or component

```tsx
import { NgExpressionBuilderService } from 'ng-expression-builder';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
  ],
  providers: [NgExpressionBuilderService], // here
  exports: [
    ...
  ]
})
export class MyModule { }
```

```tsx
@Component({
  selector: 'my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss'],
  providers: [NgExpressionBuilderService] // here
})
export class MyComponent { ... }
```

> Now inject the service into the corresponding Angular component through constructor

```
constructor(private readonly ngExpressionBuilderService: NgExpressionBuilderService) { ... }
```
> There are only two public methods:
| Name           | Input | Output | Description |
| -------------- | -------- | ---------------- | ---------- |
| `generateExpressionTree` | infix expression (string) |  expression tree structure |  Converts the infix expression into a binary tree structure |
| `evaluateExpression`   | infix expression (string) |   value (number)   |  Evaluates the value of the expression  |              


## Example
```
const infixExpression: string = '((2*(6-1))/2+5)*4';
const answer = this.ngExpressionBuilderService.evaluateExpression(infixExpression);
console.log(answer);

// Output:
40
```

```
const infixExpression: string = '(a + b) > 10 AND (c * (-5))/100';
const tree = this.ngExpressionBuilderService.generateExpressionTree(this.rawQueryString);
console.log(tree);

// Output:

{
    "operatorSymbol": "AND",
    "operatorName": "And",
    "children": [
        {
            "value": {
                "operatorSymbol": ">",
                "operatorName": "Greater than",
                "children": [
                    {
                        "value": {
                            "operatorSymbol": "+",
                            "operatorName": "Add",
                            "children": [
                                {
                                    "value": "a",
                                    "nodeType": "Left node",
                                    "type": "string"
                                },
                                {
                                    "value": "b",
                                    "nodeType": "Right node",
                                    "type": "string"
                                }
                            ]
                        },
                        "nodeType": "Left node",
                        "type": "Node"
                    },
                    {
                        "value": 10,
                        "nodeType": "Right node",
                        "type": "number"
                    }
                ]
            },
            "nodeType": "Left node",
            "type": "Node"
        },
        {
            "value": {
                "operatorSymbol": "/",
                "operatorName": "Divide",
                "children": [
                    {
                        "value": {
                            "operatorSymbol": "*",
                            "operatorName": "Multiply",
                            "children": [
                                {
                                    "value": "c",
                                    "nodeType": "Left node",
                                    "type": "string"
                                },
                                {
                                    "value": -5,
                                    "nodeType": "Right node",
                                    "type": "number"
                                }
                            ]
                        },
                        "nodeType": "Left node",
                        "type": "Node"
                    },
                    {
                        "value": 100,
                        "nodeType": "Right node",
                        "type": "number"
                    }
                ]
            },
            "nodeType": "Right node",
            "type": "Node"
        }
    ]
}
```

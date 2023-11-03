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
| Name           | Required | Default          | Description                                                                                                                                                                                                                       |
| -------------- | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reels`     | yes      |                  |  Array of Objects Containing all the necessary information about each reel.                                                                                                                                                      |
| `reelMetaInfo`       | no      |                  | Meta Details of the Reels Component such as Background colour, height, width etc.                                                                                                                                                                         |
| `onMenuItemClicked`      | no      |                  | Callback Function that is called when any of menu items is clicked (When Right Menu is used).                                                                                                                                                               |
| `onLikeClicked`  | no       |             | Callback Function that is called when like button is clicked (It automatically updates the count accordingly).                                                                                                                                                                                                 |
| `onDislikeClicked`  | no       |                  | Callback Function that is called when dislike button is clicked (It automatically updates the count accordingly).                                                                                                                                                              |
| `onCommentClicked`    | no       |                  | Callback Function that is called when comment button is clicked.                                                                                                                                                         |
| `onShareClicked` | no       |                  |Callback Function that is called when share button is clicked.                                                                                                                                                            |
| `onAvatarClicked`   | no       |                  | Callback Function that is called when Avatar is clicked.               


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

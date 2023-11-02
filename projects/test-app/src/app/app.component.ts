import { Component } from '@angular/core';
import { NgExpressionBuilderService } from 'ng-expression-builder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgExpressionBuilderService]
})
export class AppComponent {
  title = 'test-app';
  rawQueryString!: string;

  constructor(
    private ngExpressionBuilderService: NgExpressionBuilderService
  ) { }

  buildQuery() {
    let tree = this.ngExpressionBuilderService.generateExpressionTree(this.rawQueryString);
    console.log("TREE", tree)
    let ans = this.ngExpressionBuilderService.evaluateExpression('2 + (3 * 6)');
    console.log("ANS", ans)
  }
}

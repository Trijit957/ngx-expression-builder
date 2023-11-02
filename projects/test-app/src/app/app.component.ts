import { NgQueryBuilderService } from './../../../ng-query-builder/src/lib/ng-query-builder.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-app';
  rawQueryString!: string;

  constructor(
    private ngQueryBuilderService: NgQueryBuilderService
  ) { }

  buildQuery() {
    this.ngQueryBuilderService.generateExpressionTree(this.rawQueryString);
    let ans = this.ngQueryBuilderService.evaluateExpression('2 + (3 * hjlsahd)');
    console.log("ANS", ans)
  }
}

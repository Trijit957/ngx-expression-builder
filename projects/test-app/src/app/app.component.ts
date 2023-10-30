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
    this.ngQueryBuilderService.buildQuery(this.rawQueryString);
  }
}

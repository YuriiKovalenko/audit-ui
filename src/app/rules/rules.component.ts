import { Component, OnInit } from '@angular/core';

import { RulesService } from './rules.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  public rules: any[];

  constructor(private readonly rulesService: RulesService) {
    this.rules = [];
  }

  ngOnInit(): void {
    this.initRules();
  }

  private initRules() {
    this.rulesService.getRules().subscribe(rules => this.rules = rules);
  }
  public saveRules() {
    this.rulesService.updateRules(this.rules).subscribe();
  }
}

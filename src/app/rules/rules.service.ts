import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rule } from './rule.model';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private readonly apiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.apiUrl = '/rules';
  }

  public getRules() {
    return this.http.get<Rule[]>(this.apiUrl);
  }

  public updateRules(rules: Rule[]) {
    return this.http.put(this.apiUrl, rules);
  }
}

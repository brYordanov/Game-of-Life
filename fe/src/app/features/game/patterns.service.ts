import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface PatternSummary {
  _id: string;
  name: string;
  description: string;
}

export interface Pattern extends PatternSummary {
  cells: boolean[];
  width: number;
  height: number;
}

@Injectable({ providedIn: 'root' })
export class PatternsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/patterns';

  getAll() {
    return this.http.get<PatternSummary[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<Pattern>(`${this.baseUrl}/${id}`);
  }
}

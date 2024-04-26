import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCoursesService {

  private url: string = "https://webbutveckling.miun.se/files/ramschema_ht23.json";

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any>(this.url)
  }
}

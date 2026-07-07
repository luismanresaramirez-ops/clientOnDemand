import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Document {

  private apiUrl = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient) { 
  }

    getDocuments() {
      return this.http.get<Document[]>(this.apiUrl);
    }

    getPdf(id: number) {
      return this.http.get(`${this.apiUrl}/${id}/pdf`, {
      responseType: 'blob'
      });
    }
}

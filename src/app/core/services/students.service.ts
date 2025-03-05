import { Injectable } from "@angular/core";
import { Observable, concatMap} from "rxjs";
import { Student } from "../../modules/dashboard/pages/students/models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";


@Injectable ({ providedIn: 'root'})
export class StudentService {
    constructor(private httpClient: HttpClient) {}

    getStudentDetail (id: string): Observable<Student> {
        return this.httpClient.get<Student>(`${environment.baseApiUrl}/students/${id}`)
    }

    updateStudentById(id: string, data: { name: string, lastName: string, age:number, course:string }): Observable<Student[]> {
        return this.httpClient.patch<Student>(`${environment.baseApiUrl}/students/${id}`, data)
        .pipe(concatMap(() => this.getStudents()));
      }

    addStudent(payload: { name: string, lastName: string, age:number, course:string  }): Observable<Student[]>{

        return this.httpClient
        .post<Student>(`${environment.baseApiUrl}/students`, payload)
        .pipe(concatMap(() => this.getStudents()));
    }
    getStudents(): Observable<Student[]> {

        const myHeaders = new HttpHeaders().append('Authorization', localStorage.getItem('access_token') || '' )
        return this.httpClient.get<Student[]>(`${environment.baseApiUrl}/students`, {
            headers: myHeaders,
        });
    }

    deleteStudentById(id: string): Observable<Student[]> {
        return (this.httpClient.delete(`${environment.baseApiUrl}/students/${id}`)
        .pipe(concatMap(() => this.getStudents()))
        );
    }
}
import { Injectable } from "@angular/core";
import { Observable, concatMap} from "rxjs";
import { Teacher } from "../../modules/dashboard/pages/teachers/models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";


@Injectable ({ providedIn: 'root'})
export class TeacherService {
    constructor(private httpClient: HttpClient) {}

    getTeacherDetail (id: string): Observable<Teacher> {
        return this.httpClient.get<Teacher>(`${environment.baseApiUrl}/teachers/${id}`)
    }

    updateTeacherById(id: string, data: { name: string, lastName: string, age:number, course:string }): Observable<Teacher[]> {
        return this.httpClient.patch<Teacher>(`${environment.baseApiUrl}/teachers/${id}`, data)
        .pipe(concatMap(() => this.getTeachers()));
      }

    addTeacher(payload: { name: string, lastName: string, age:number, course:string  }): Observable<Teacher[]>{

        return this.httpClient
        .post<Teacher>(`${environment.baseApiUrl}/teachers`, payload)
        .pipe(concatMap(() => this.getTeachers()));
    }
    getTeachers(): Observable<Teacher[]> {

        const myHeaders = new HttpHeaders().append('Authorization', localStorage.getItem('access_token') || '' )
        return this.httpClient.get<Teacher[]>(`${environment.baseApiUrl}/teachers`, {
            headers: myHeaders,
        });
    }

    deleteTeacherById(id: string): Observable<Teacher[]> {
        return (this.httpClient.delete(`${environment.baseApiUrl}/teachers/${id}`)
        .pipe(concatMap(() => this.getTeachers()))
        );
    }
}
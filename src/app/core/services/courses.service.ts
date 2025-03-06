import { Injectable } from "@angular/core";
import { Observable, concatMap} from "rxjs";
import { Course } from "../../modules/dashboard/pages/courses/models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";


@Injectable ({ providedIn: 'root'})
export class CourseService {
    constructor(private httpClient: HttpClient) {}

    getCourseDetail (id: string): Observable<Course> {
        return this.httpClient.get<Course>(`${environment.baseApiUrl}/courses/${id}?_embed=teachers&_embed=students`)
    }
    
    removeStudentFromCourse(courseId: string, studentId: string): Observable<void> {
        return this.httpClient.delete<void>(`${environment.baseApiUrl}/courses/${courseId}/students/${studentId}`);
      }
    

    updateCourseById(id: string, data: { name: string, credits:number, duration:string }): Observable<Course[]> {
        return this.httpClient.patch<Course>(`${environment.baseApiUrl}/courses/${id}`, data)
        .pipe(concatMap(() => this.getCourses()));
      }

    addCourse(payload: { name:string, credits:number, duration:string }): Observable<Course[]>{

        return this.httpClient
        .post<Course>(`${environment.baseApiUrl}/courses`, payload)
        .pipe(concatMap(() => this.getCourses()));
    }
    getCourses(): Observable<Course[]> {

        const myHeaders = new HttpHeaders().append('Authorization', localStorage.getItem('access_token') || '' )
        return this.httpClient.get<Course[]>(`${environment.baseApiUrl}/courses`, {
            headers: myHeaders,
        });
    }

    deleteCourseById(id: string): Observable<Course[]> {
        return (this.httpClient.delete(`${environment.baseApiUrl}/courses/${id}`)
        .pipe(concatMap(() => this.getCourses()))
        );
    }
}
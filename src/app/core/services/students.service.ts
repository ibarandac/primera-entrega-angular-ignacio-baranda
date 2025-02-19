import { Injectable } from "@angular/core";
import { Student } from "../../modules/dashboard/pages/students/models";
import { generateRandomString } from "../../shared/utils";
import { Observable, interval } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StudentsService {

    getStudentsPromise(): Promise<Student[]>{
        return new Promise((resolve, reject) =>{
            reject("Error de conexión");

            setTimeout(() => {
                resolve([
                    {
                        id: generateRandomString(6),
                        name: 'Manuel',
                        lastName: 'Baranda',
                        age: 35,
                        country: 'Chile'
                    },
                ]);
            }, 3000);
        });
    }

    getStudentsObservable (): Observable<Student[]> {
        return new Observable <Student[]>((subscriber) => {
            const students = [
                {
                    id: generateRandomString(6),
                    name: 'Manuel',
                    lastName: 'Baranda',
                    age: 35,
                    country: 'Chile'
                },
                {
                  id: generateRandomString(6),
                  name: 'Lukas',
                  lastName: 'Walker',
                  age: 32,
                  country: 'Chile'
              },
              {
                id: generateRandomString(6),
                name: 'Gabriel',
                lastName: 'Olivares',
                age: 32,
                country: 'Chile'
            },
            ];
            setInterval(() => {
                students.push({
                  id: generateRandomString(6),
                  name: 'NUEVO',
                  lastName: 'ESTUDIENTE ' + students.length,
                  age: 20,
                  country: 'País',
                });
        
                
                subscriber.next(students);
        
                
                if (students.length === 4) {
                  subscriber.complete(); 
                }
              }, 1000);
            });
          }
        
          getInterval(): Observable<number> {
            return interval(1000);
          }
        }
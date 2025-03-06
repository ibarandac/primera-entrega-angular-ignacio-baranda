import { Enrollment } from "../../enrollments/models";
import { Student } from "../../students/models";
import { Teacher } from "../../teachers/models";

export interface Course {
    id: string;
    name: string;
    credits: number;
    duration: string;
    teachers?: Teacher[],
    students?: Student[],
    enrollments?: Enrollment[],
}
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    accessToken: string;
    role: string;
    //role: 'ADMIN' | 'EMPLOYEE' | 'STUDENT';
}
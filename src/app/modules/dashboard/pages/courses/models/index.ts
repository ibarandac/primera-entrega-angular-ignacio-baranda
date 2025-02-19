import { Teacher } from "../../teachers/models";

export interface Course {
    id: string;
    name: string;
    credits: number;
    duration: string;
    teachers?: Teacher[]
}
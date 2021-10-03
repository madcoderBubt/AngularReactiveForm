//import * as internal from "assert";

export interface IEmployee{
    id:number;
    fullName:string;
    email:string;
    phone?:string;
    skills: ISkill[];
}

export interface ISkill{
    skillName:string;
    expInYear:number;
    proficiency:string;
}
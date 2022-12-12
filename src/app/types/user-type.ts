export interface SignUser {
    firstName:string;
    lastName?:string;
    mail?:string;
    password1?:string;
    password2?:string;
}

export type LogUser = Pick<SignUser, "mail" | "password1"> 


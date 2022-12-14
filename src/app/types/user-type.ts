export interface SignUser {
    file?:string;
    firstName?:string;
    lastName?:string;
    mail?:string;
    password1?:string;
    password2?:string;
    isLogged?:boolean;
    id?:string;
}

export type LogUser = Pick<SignUser, "mail" | "password1" | "isLogged"> 


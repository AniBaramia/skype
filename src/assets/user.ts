export interface User{
    id?:number;
    firstname?:string;
    lastname?:string;
    username?:string;
    password?:string;

}

export interface Friend{
    id?:number;
    username?: string;

}

export interface Message{
    id?:number;
    body?: string;
}
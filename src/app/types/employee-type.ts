import { Observable } from "rxjs";

export interface Employee {
  id?:string;
  name?:string;
  wage?:number;
  status?:Object;
  category?:string;
  rating?:number;
  email?:string;
  image?:Observable<string>;
}
  
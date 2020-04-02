import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginInfo} from './LoginInfo';
import {Observable} from 'rxjs';
import {RegisterInfo} from './RegisterInfo';


const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/signin';
  private signUpUrl = 'http://localhost:8080/api/signup';
  private profileUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  login(creadentials: LoginInfo): Observable<any> {
    return this.http.post<any>(this.loginUrl, creadentials, httpOptions);
  }
  register(info: RegisterInfo): Observable<RegisterInfo> {
    return this.http.post<RegisterInfo>(this.signUpUrl, info, httpOptions);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/id/${id}`);
  }
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.profileUrl}/username/${username}`);
  }
  updateUser(user: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.profileUrl}/update/${id}`, user);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.profileUrl}/delete/${id}`, { responseType: 'text' });
  }
  findAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.profileUrl}/findAllUsers`);
  }

}

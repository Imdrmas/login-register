import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginInfo} from './LoginInfo';
import {Observable} from 'rxjs';
import {RegisterInfo} from './RegisterInfo';
import {ProfileInfo} from './ProfileInfo';


const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(creadentials: LoginInfo): Observable<any> {
    return this.http.post<any>('http://localhost:8082/api/auth/signin', creadentials, httpOptions);
  }
  register(info: RegisterInfo): Observable<RegisterInfo> {
    return this.http.post<RegisterInfo>('http://localhost:8082/api/auth/signup', info, httpOptions);
  }
  findUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8082/api/auth/findUserByUsername/${username}`);
  }
  findUserById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8888/api/findUserById/${id}`);
  }
  updateUser(user: any, id: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8888/api/updateUser/${id}`, user);
  }
  deleteUser(id: number) {
    return this.http.delete(`http://localhost:8888/api/deleteUser/${id}`, { responseType: 'text' });
  }
  findAllUsers(users: ProfileInfo): Observable<ProfileInfo[]> {
    return this.http.get<ProfileInfo[]>(`http://localhost:8888/api/findAllUsers`);
  }

}

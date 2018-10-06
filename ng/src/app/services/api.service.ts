import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokenManager } from './auth-token-manager.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private authTokenManager: AuthTokenManager) { }

  login(phone: string, password: string): Observable<any> {    
    return this.extractToken(this.authTokenManager
      .post("/user/authenticate", {
        phone,
        password
      }));
  }

  private extractToken(base: Observable<any>) : Observable<any> {
    return base.pipe(
      map(data => {
        console.log(data);
        return data;
        if (data.success) {          
          this.authTokenManager.setAuthToken(data.token);

          data.token = '';
        }

        return data;
      })
    );
  }

  logout() {
    this.authTokenManager.setAuthToken('');
  }

  register(name: string, phone: string, password: string) : Observable<any> {
    const base = this.authTokenManager.post('/user/register', {
      name,
      phone,
      password
    });

    return this.extractToken(base);
  }
}
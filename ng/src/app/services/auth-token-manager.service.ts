import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "./loader.service";
import { NotificationService } from "./notification.service";
import { Observable, throwError } from "rxjs";
import { retry, catchError, finalize } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenManager {
  private authTokenKey = "auth_token";

  constructor(private http: HttpClient,
    private loaderService: LoaderService,
    private notifications: NotificationService) { }

  getAuthToken() : string {
    return localStorage.getItem(this.authTokenKey);
  }

  isLoggedIn() : boolean {
    if (this.getAuthToken())
      return true;
      
    return false;
  }

  private makeUrl(url: string) {
    return environment.apiUrl + url;
  }

  setAuthToken(authToken: string) {
    if (!authToken) {
      localStorage.removeItem(this.authTokenKey);
    }
    else {
      localStorage.setItem(this.authTokenKey, authToken);
    }
  }

  getHeaders() {
    return { headers: { Authorization: 'Bearer ' + this.getAuthToken() }};
  }

  // ----------- REQUEST ------------------------

  private apply(obj: Observable<any>) {
    return obj.pipe(
      retry(2),
      catchError(err => {
        console.log(err);
  
        this.notifications.show('Connection to ther server failed!');
  
        return throwError(err);
      }),
      finalize(() => this.loaderService.hide())
    )
  }

  post(url: string, body: any, extra = {}) : Observable<any> {

    this.loaderService.show();

    if (this.getAuthToken())
    {
        return this.apply(this.http.post(this.makeUrl(url), body, {
          ...this.getHeaders(),
          ...extra
        }));
    }
    else {
      return this.apply(this.http.post(this.makeUrl(url), body));
    }
  }

  patch(url: string, body: any) : Observable<any> {

    this.loaderService.show();

    if (this.getAuthToken())
    {
        return this.apply(this.http.patch(this.makeUrl(url), body, this.getHeaders()));
    }
    else {
      return this.apply(this.http.patch(this.makeUrl(url), body));
    }
  }

  get(url: string) : Observable<any> {
    
    this.loaderService.show();

    if (this.getAuthToken())
    {
        return this.apply(this.http.get(this.makeUrl(url), this.getHeaders()));
    }
    else {
      return this.apply(this.http.get(this.makeUrl(url)));
    }
  }

  delete(url: string) : Observable<any> {

    this.loaderService.show();

    return this.apply(this.http.delete(this.makeUrl(url), this.getHeaders()));
  }

  fileUpload(url: string, key: string, fileToUpload: File) : Observable<any> {

    this.loaderService.show();

    const formData = new FormData();
    formData.append(key, fileToUpload, fileToUpload.name);

    return this.apply(this.http.post(this.makeUrl(url), formData, this.getHeaders()));
  }
}
import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

// Functional interceptor
export function AuthInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  if (request.url.includes('/auth/login') || request.url.includes('/auth/register')) {
    return next(request);
  }

  let token = localStorage.getItem("Token");
  request = request.clone({
    setHeaders:
      {Authorization: `Bearer ${token}`}
  });

  return next(request);
}

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Bypass the token in headers on login/register page
//     if (request.url.includes('/auth/login') || request.url.includes('/auth/register')) {
//       return next.handle(request);
//     }
//
//     let token = localStorage.getItem("Token");
//     request = request.clone({
//       setHeaders:
//         {Authorization: `Bearer ${token}`}
//     });
//
//     return next.handle(request);
//   }
// }

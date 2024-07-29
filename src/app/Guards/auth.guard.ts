import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../Services/auth.service";

// Functional guard
export const AuthGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true
  }

  router.navigateByUrl('/login')
  return false
}

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private router: Router,
//     private authService: AuthService) {}
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     if (this.authService.isLoggedIn()) {
//       return true
//     }
//
//     this.router.navigateByUrl('/login')
//     return false
//   }
// }

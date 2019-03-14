import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router) { }
  
    canActivate() {
        
      
        if (true) { return true; }
        this.router.navigate(['/cst']);
        return false;
    }


}
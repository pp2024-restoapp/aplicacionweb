import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAdmin = localStorage.getItem('is_staff') === 'true';
  const token = localStorage.getItem('token');

  console.log(isAdmin)
  
  if (!token || !isAdmin) {
    router.navigate(['/carta']);
    return false;
  }

  return true;
};

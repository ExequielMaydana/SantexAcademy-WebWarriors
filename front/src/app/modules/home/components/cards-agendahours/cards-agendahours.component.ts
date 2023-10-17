import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-cards-agendahours',
  templateUrl: './cards-agendahours.component.html',
  styleUrls: ['./cards-agendahours.component.css']
})
export class CardsAgendahoursComponent {
  constructor(private router: Router, private authService: AuthService) { }

  redirectToPage(page: string) {
    if (page === 'voluntariados') {
      this.router.navigate(['/voluntariados']);
    } else if (page === 'dashboard') {
      // Verifica si el usuario está autenticado
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/dashboard']);
      } else {
        // modal

      }
    }
  }
}






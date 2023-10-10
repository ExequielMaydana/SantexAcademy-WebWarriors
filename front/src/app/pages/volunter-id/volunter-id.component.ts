import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/core/auth.selectors';
import { VolunteeringService } from 'src/app/services/volunteering.service';

@Component({
  selector: 'app-volunter-id',
  templateUrl: './volunter-id.component.html',
  styleUrls: ['./volunter-id.component.css'],
})
export class VolunterIdComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private volunteeringServices: VolunteeringService,
    private datePipe: DatePipe,
    private store: Store
  ) {}

  volunteering: any = {};
  onModalAfterApplication: boolean = false;
  statusModalAfterApplication: string = '';
  messageModalAfterApplication: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.volunteeringServices.getVolunteerById(params['id']).subscribe({
        next: (response) => {
          console.log(response);

          this.volunteering = response.volunteeringFound;
        },
        error: (error) => {
          console.error('Error in bringing the organization', error);
        },
        complete: () => {},
      });
    });
  }

  formatCreatedAtDate(dateString: string): string {
    const createdAtDate = new Date(dateString);

    if (isNaN(createdAtDate.getTime())) {
      return 'Fecha de creación inválida';
    }

    const now = new Date();
    const diffInMilliseconds = now.getTime() - createdAtDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 3600 * 24));
    if (diffInDays === 0) {
      return 'Publicado hoy';
    } else if (diffInDays === 1) {
      return 'Publicado ayer';
    } else {
      return `Publicado el ${this.datePipe.transform(
        createdAtDate,
        'dd/MM/yyyy'
      )}`;
    }
  }

  generateApplication() {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.volunteeringServices
          .applicationVoluntering(
            token,
            this.volunteering.organizationId,
            this.volunteering.idVolunteering
          )
          .subscribe({
            next: (res) => {
              console.log(res);
              this.onModalAfterApplication = true;
              this.statusModalAfterApplication = 'success';
              this.messageModalAfterApplication =
                ' ¡Felicidades! Tu solicitud para participar en el voluntariado ha sido exitosa. Agradecemos tu interés en ser parte de nuestro equipo y contribuir a nuestra causa. Pronto te contactaremos con más detalles sobre tu participación en este voluntariado. Mientras tanto, puedes explorar más oportunidades de voluntariado o visitar tu panel de control para ver el estado de tus postulaciones.';
            },
            error: (err) => {
              console.log(err);
              this.onModalAfterApplication = true;
              this.statusModalAfterApplication = 'failed';
              this.messageModalAfterApplication =
                'Lamentablemente, la solicitud para el voluntariado no se pudo procesar en este momento. Por favor, inténtalo nuevamente más tarde o ponte en contacto con nosotros para obtener asistencia.';
            },
          });
      }
    });
  }

  closeModalAfterApplication() {
    this.onModalAfterApplication = false;
  }
}

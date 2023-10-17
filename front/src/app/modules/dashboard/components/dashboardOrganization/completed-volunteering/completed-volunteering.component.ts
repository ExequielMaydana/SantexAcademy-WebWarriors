import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../services/organization.service';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/core/auth.selectors';

@Component({
  selector: 'app-completed-volunteering',
  templateUrl: './completed-volunteering.component.html',
  styleUrls: ['./completed-volunteering.component.css'],
})
export class CompletedVolunteeringComponent implements OnInit {
  volunteeringsCompleted: any;
  statusModal: string = '';
  messageModal: string = '';
  textBtnModal: string = '';
  onModal: boolean = false;
  constructor(private orgServices: OrganizationService, private store: Store) {}
  ngOnInit(): void {
    this.getVolunteeringsFinish();
  }

  getVolunteeringsFinish() {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.orgServices.getVolunteeringsCompleted(token).subscribe({
          next: (res) => {
            console.log(res);

            this.volunteeringsCompleted = res;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  creditReward(action: string, idPostulation: number) {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        const data = { action: action, idPostulation: idPostulation };
        this.orgServices.creditRewardVolunteer(token, data).subscribe({
          next: (res) => {
            this.onModal = true;
            this.statusModal = 'success';
            this.messageModal =
              action === 'acreditar'
                ? 'La recompensa ha sido acredita'
                : 'La postulación ha sido rechazada';
            setTimeout(() => {
              this.onModal = false;
              window.location.reload();
            }, 2000);
          },
          error: (err) => {
            this.onModal = true;
            this.statusModal = 'failed';
            this.messageModal =
              'Ocurrió un error al acreditar la recompensa al usuario, por favor, intenta más tarde.';
            this.textBtnModal = 'Aceptar';
          },
        });
      }
    });
  }

  closeModal() {
    this.onModal = !this.onModal;
  }
}

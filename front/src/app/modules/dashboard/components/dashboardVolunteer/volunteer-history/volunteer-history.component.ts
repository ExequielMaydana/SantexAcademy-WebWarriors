import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../../services/volunteer.service';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/core/auth.selectors';

@Component({
  selector: 'app-volunteer-history',
  templateUrl: './volunteer-history.component.html',
  styleUrls: ['./volunteer-history.component.css'],
})
export class VolunteerHistoryComponent implements OnInit {
  meVolunteerings: any;
  constructor(private store: Store, private volServices: VolunteerService) {}
  onModalViewResult: boolean = false;
  statusModalView: string = '';
  messageModalView: string = '';
  textBtnModalView: string = '';
  ngOnInit(): void {
    this.getAllVolunteering();
  }

  getAllVolunteering() {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.volServices.getMePostulations(token).subscribe({
          next: (res) => {
            console.log(res);
            this.meVolunteerings = res;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  updateStatusPostulation(status: string, idPostulation: string) {
    const data = { status: status };
    this.volServices.updateStatusPostulation(data, idPostulation).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePostulation(idPostulation: string) {
    this.volServices.deletePostulation(idPostulation.toString()).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  viewResultPostulation(index: number) {
    this.onModalViewResult = true;
    this.statusModalView = 'procesed';
    this.textBtnModalView = 'Aceptar';
    this.messageModalView = this.meVolunteerings[index]?.observations;
  }

  closeModalView() {
    this.onModalViewResult = false;
  }

  deleteViewPostulationFinished(postulateId: any) {
    const data = this.meVolunteerings.find(
      (item: { postulateId: any }) => item.postulateId === postulateId
    );
    if (data) {
      data.isVisible = false;
    }

    this.onModalViewResult = true;
    this.statusModalView = 'procesed';
    this.textBtnModalView = 'Aceptar';
    this.messageModalView = 'El registro ha sido eliminado exitosamente.';
  }
}

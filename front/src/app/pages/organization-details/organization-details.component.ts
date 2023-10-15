import { Component, OnInit } from '@angular/core';
import { OrgServicesService } from 'src/app/services/org-services.service';
import { OrganizationService } from '../../../app/modules/dashboard/services/organization.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { volunteering } from '../../../app/modules/dashboard/models/volunteerings.model';
import { selectToken } from '../../core/auth.selectors';
@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
})
export class OrganizationDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private orgS: OrgServicesService,
    private store: Store, private orgServices: OrganizationService
  ) {}
  organizationId: number = 0;
  organization: any = {};
  volunteerings: volunteering[] = [];

  ngOnInit(): void {

    this.route.queryParams.subscribe((queryParams) => {
      this.organizationId = +queryParams['id'];
      this.orgS.getOrganizationById(this.organizationId.toString()).subscribe({
        next: (response) => {
          console.log(response);

          this.organization = response;
          this.getAllMeVolunteerings();
        },
        error: (error) => {
          console.error('Error in bringing the organization', error);
        },
        complete: () => {},
      });
    });
  }

  getAllMeVolunteerings() {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.orgServices.volunteeringByIdOrg(token).subscribe({
          next: (res) => {
            this.volunteerings = res;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }






}

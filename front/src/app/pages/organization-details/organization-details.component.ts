import { Component, OnInit } from '@angular/core';
import { OrgServicesService } from 'src/app/services/org-services.service';
import { OrganizationService } from '../../../app/modules/dashboard/services/organization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { volunteering } from '../../../app/modules/dashboard/models/volunteerings.model';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
})
export class OrganizationDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private orgS: OrgServicesService,
    private orgServices: OrganizationService,
    private router: Router
  ) {}
  organizationId: number = 0;
  organization: any = {};
  volunteerings: volunteering[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.organizationId = +queryParams['id'];
      this.orgS.getOrganizationById(this.organizationId.toString()).subscribe({
        next: (response) => {
          console.log('organization', response);

          this.organization = response;
        },
        error: (error) => {
          console.error('Error in bringing the organization', error);
        },
        complete: () => {},
      });

      this.orgServices.volsByIdOrg(this.organizationId.toString()).subscribe({
        next: (res) => {
          this.volunteerings = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  viewVolunteering(id: any) {
    this.router.navigateByUrl(`/voluntariado/${id}`);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { organization } from 'src/app/models/organization.model';
import { volunteering } from 'src/app/models/volunteering.model';
import { OrgServicesService } from 'src/app/services/org-services.service';
import { VolunteeringService } from 'src/app/services/volunteering.service';

@Component({
  selector: 'app-volunteer-filters',
  templateUrl: './volunteer-filters.component.html',
  styleUrls: ['./volunteer-filters.component.css'],
})
export class VolunteerFiltersComponent implements OnInit {
  keySelected: string = '';
  valueSelected: string = '';
  dataOrganizations: organization[] = [];
  dataVolunteerings: volunteering[] = [];
  filteredVolunteerings: volunteering[] = [];
  allVolunteerings: volunteering[] = [];

  constructor(
    private orgServices: OrgServicesService,
    private volunteeringService: VolunteeringService
  ) {}
  @Output() selectFiltered = new EventEmitter<string[]>();
  @Output() selectOrgByName = new EventEmitter<string[]>();
  @Output() selectDate = new EventEmitter<string[]>();
  @Output() selectedCategory = new EventEmitter<string[]>();

  @Output() getAllVolunteers = new EventEmitter();

  ngOnInit(): void {
    this.orgServices.getAllOrganization().subscribe({
      next: (res) => {
        this.dataOrganizations = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.volunteeringService.getVolunteers().subscribe({
      next: (res) => {
        this.allVolunteerings = res.volunteerings;
        this.filteredVolunteerings = this.allVolunteerings; // Inicializa los voluntariados filtrados
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectedFilters: { [key: string]: Set<string> } = {};

  onChangeLocation(key: string, value: string) {
    if (!this.selectedFilters[key]) {
      this.selectedFilters[key] = new Set<string>();
    }
    if (this.selectedFilters[key].has(value)) {
      this.selectedFilters[key].delete(value);
    } else {
      this.selectedFilters[key].add(value);
    }
    const selectedValues = Array.from(this.selectedFilters[key]);
    if (selectedValues.length === 0) {
      delete this.selectedFilters[key];
    }
    this.getAllVolunteerings();
  }

  onChangeModeWord(key: string, value: string) {
    if (!this.selectedFilters[key]) {
      this.selectedFilters[key] = new Set<string>();
    }
    if (this.selectedFilters[key].has(value)) {
      this.selectedFilters[key].delete(value);
    } else {
      this.selectedFilters[key].add(value);
    }
    const selectedValues = Array.from(this.selectedFilters[key]);
    if (selectedValues.length === 0) {
      delete this.selectedFilters[key];
    }
    this.selectFiltered.emit([key, ...selectedValues]);
  }

  onChangeCategory(key: string, value: string) {
    if (!this.selectedFilters[key]) {
      this.selectedFilters[key] = new Set<string>();
    }
    if (this.selectedFilters[key].has(value)) {
      this.selectedFilters[key].delete(value);
    } else {
      this.selectedFilters[key].add(value);
    }
    const selectedValues = Array.from(this.selectedFilters[key]);
    if (selectedValues.length === 0) {
      delete this.selectedFilters[key];
    }
    this.selectedCategory.emit([key, ...selectedValues]);
  }

  onChangeOrgByName(key: string, value: string) {
    if (!this.selectedFilters[key]) {
      this.selectedFilters[key] = new Set<string>();
    }
    if (this.selectedFilters[key].has(value)) {
      this.selectedFilters[key].delete(value);
    } else {
      this.selectedFilters[key].add(value);
    }
    const selectedValues = Array.from(this.selectedFilters[key]);
    if (selectedValues.length === 0) {
      delete this.selectedFilters[key];
    }
    this.selectOrgByName.emit([key, ...selectedValues]);
  }

  onChangeDate(key: string, value: string) {
    if (!this.selectedFilters[key]) {
      this.selectedFilters[key] = new Set<string>();
    }
    if (this.selectedFilters[key].has(value)) {
      this.selectedFilters[key].delete(value);
    } else {
      this.selectedFilters[key].add(value);
    }
    const selectedValues = Array.from(this.selectedFilters[key]);
    if (selectedValues.length === 0) {
      delete this.selectedFilters[key];
    }
    this.selectDate.emit([key, ...selectedValues]);
  }

  getAllVolunteerings() {
    if (this.selectedFilters['address']) {
      const selectedAddresses = Array.from(this.selectedFilters['address']);
      // Emitir las ubicaciones seleccionadas
      this.selectFiltered.emit(selectedAddresses);
    } else {
      // Si no hay direcciones seleccionadas, emitir un arreglo vacío
      this.selectFiltered.emit([]);
    }
  }

  modeOfwork = [
    { key: 'modeOfwork', value: 'Presencial', label: 'Presencial' },
    { key: 'modeOfwork', value: 'Hibrido', label: 'Hibrido' },
    { key: 'modeOfwork', value: 'Remoto', label: 'Remoto' },
  ];
  category = [
    {
      key: 'category',
      value: 'medioambiente y fauna',
      label: 'Medio Ambiente y Fauna.',
    },
    {
      key: 'category',
      value: 'asistencia social',
      label: 'Asistencia Social.',
    },
    {
      key: 'category',
      value: 'salud y discapacidad',
      label: 'Salud y Discapacidad.',
    },
  ];
  publicationDate = [
    {
      key: 'createdAt',
      value: 'ultimas 24 horas',
      label: 'En las últimas 24 horas.',
    },
    {
      key: 'createdAt',
      value: 'semana pasada',
      label: 'La semana pasada.',
    },
    {
      key: 'createdAt',
      value: 'mes pasado',
      label: 'El mes pasado.',
    },
  ];
}

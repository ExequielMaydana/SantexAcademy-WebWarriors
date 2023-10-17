import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-coordinators-register',
  templateUrl: './form-coordinators-register.component.html',
  styleUrls: ['./form-coordinators-register.component.css'],
})
export class FormCoordinatorsRegisterComponent {
  registerCoordinator: FormGroup;

  loading: boolean = false

  onModal: boolean = false;
  statusSession: string = '';
  messageModal: string = '';
  routeBtnContinue: string = '';
  textBtn: string = '';
  errors: any = {};

  showPassword: boolean = false;
  subscription: Subscription | null = null;

  imageUrl: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.registerCoordinator = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      cuit: ['', Validators.required],
      urlWebSite: [''],
      location: ['', Validators.required],
      category: ['', Validators.required],
      file: [null],
    });
  }

  sendValues() {
    if (this.registerCoordinator.valid) {
      const formData = new FormData();
      Object.keys(this.registerCoordinator.controls).forEach((key) => {
        const control = this.registerCoordinator.get(key);
        if (key === 'file' && control instanceof FileList) {
          for (let i = 0; i < control.length; i++) {
            const file = control.item(i);
            if (file) {
              formData.append('file', file);
            }
          }
        } else {
          if (control !== null && control !== undefined) {
            const value = control.value;
            if (value !== null && value !== undefined) {
              formData.append(key, value);
            }
          }
        }
      });

      this.authService.registerCoordinator(formData).subscribe({
        next: (response) => {

          this.loading = false;

          if (!response){
            return;
          }

          this.onModal = true;
          this.statusSession = 'success';
          this.messageModal =
            ' ¡Bienvenidos a nuestra plataforma de voluntariado! Nos complace darles la bienvenida a VolunTime, la plataforma que conecta a organizaciones comprometidas con oportunidades de voluntariado significativas. Estamos emocionados de tenerlos a bordo y esperamos colaborar juntos para hacer una diferencia en nuestras comunidades y en el mundo.';
          this.routeBtnContinue = 'auth/login';
          this.textBtn = 'Iniciar Sesión';
        },
        error: (error: any) => {
          this.loading = false;

          if (error.error.emailFound) {
            this.onModal = true;
            this.statusSession = 'failed';
            this.messageModal =
              'Ya existe una cuenta con ese email, por favor, inicie sesión';
            this.routeBtnContinue = 'auth/login';
            this.textBtn = 'Iniciar Sesión';
          } else if (error.status === 500) {
            this.onModal = true;
            this.statusSession = 'failed';
            this.messageModal = error.error.error;
            this.routeBtnContinue = 'auth/coordinator-register';
            this.textBtn = 'Reintentar';
          }
          {
            this.errors = error.error.errors;
            this.onModal = true;
            this.statusSession = 'failed';
            this.routeBtnContinue = 'auth/coordinator-register';
            this.textBtn = 'Reintentar';
          }
        },

        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  sendShowPassword() {
    !this.showPassword
      ? (this.showPassword = true)
      : (this.showPassword = false);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  changeValueModal() {
    this.onModal = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.imageUrl = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);

      this.registerCoordinator.patchValue({
        file: file,
      });
    }
  }

  deleteImage() {
    this.registerCoordinator.patchValue({
      file: null,
    });
    this.imageUrl = null;
  }
}

export interface dataVolunteerRegister {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  file?: any;
}

export interface responsevolunterRegister {
  id: number;
  fullName: string;
  email: string;
}

export interface volunterDataLogin {
  email: string;
  password: string;
}

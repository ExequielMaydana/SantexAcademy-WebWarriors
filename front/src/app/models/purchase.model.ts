export interface Product {
  product: {
    id: number;
    costInHours: number;
    image?: {
      imageUrl: string;
      publicId: string;
    };
    name: string;
    stock: number;
  };
  quantity: number;
}

export interface User {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  province: string;
  zip_code: number;
}

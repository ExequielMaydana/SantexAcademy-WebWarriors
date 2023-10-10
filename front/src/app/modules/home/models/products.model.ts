export interface products {
  id: number;
  costInHours: number;
  image?: {
    imageUrl: string;
    publicId: string;
  };
  name: string;
  stock: number;
}

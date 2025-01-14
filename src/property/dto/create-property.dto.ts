export class CreatePropertyDto {
  name: string;
  image: string[]; // Array of image URLs
  square: number;
  price: number;
  number: number;
  contact: string;
  agent: boolean;
  owner: boolean;
  type: string;
  description: string;
  location: string;
}

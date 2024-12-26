export interface AddressDTO {
  id: string;
  name: string;
  phoneNumber: string;
  description: string | null;
  longitude: string;
  latitude: string;
  isPrimary: boolean;
  createdAt: Date | null;
}

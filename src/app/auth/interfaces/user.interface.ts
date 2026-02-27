import { Email, FullName, Role } from "@products/interfaces/product.interface";

export interface User {
  id:       string;
  email:    Email;
  fullName: FullName;
  isActive: boolean;
  roles:    Role[];
}

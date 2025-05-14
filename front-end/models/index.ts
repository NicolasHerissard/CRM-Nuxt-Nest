export interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  comments?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

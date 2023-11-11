interface DbGetAllTenants {
  id: number;
  email: string;
  first_name?: string;
  password: string;
  last_name?: string;
  phone_number?: string;
  avatar?: string;
  bio?: string;
  stripe_customer_id?: string;
  stripe_payment_method_id?: string;
  card_last_digit?: string;
  card_name?: string;
  invited_by: number;
  role: string;
  onboarded: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
  deleted: any;
  suite?: DbSuite;
  businesses: any[];
}

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
  businesses: DbBusiness[];
}

interface DbBusiness {
  id: number;
  business_name: string;
  days_of_business: string;
  occupation: string;
  hours_of_business_open: string;
  hours_of_business_close: string;
  website: string;
  license: any;
  user_id: number;
  created_at: string;
  updated_at: string;
}

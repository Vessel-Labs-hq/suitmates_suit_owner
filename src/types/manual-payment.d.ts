interface DbGetManualPayments {
  id: number;
  email: string;
  first_name: string;
  password: string;
  last_name: string;
  phone_number: string;
  avatar: string;
  bio: any;
  stripe_customer_id: any;
  stripe_payment_method_id: any;
  card_last_digit: any;
  card_name: any;
  invited_by: any;
  role: string;
  last_payment_date: any;
  onboarded: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
  deleted: any;
  space: DbGetManualPaymentsSpace;
}

interface DbGetManualPaymentsSpace {
  id: number;
  owner_id: number;
  space_name: string;
  space_address: string;
  space_size: string;
  space_amenities: string;
  account_number: string;
  account_name: string;
  routing_number: string;
  created_at: string;
  updated_at: string;
  deleted: any;
  suite: DbGetManualPaymentsSuite[];
}

interface DbGetManualPaymentsSuite {
  id: number;
  suite_number: string;
  suite_type: string;
  suite_size: string;
  suite_cost: number;
  timing: string;
  tenant_id: number;
  space_id: number;
  created_at: string;
  updated_at: string;
  deleted: any;
  tenant: DbGetManualPaymentsTenant;
}

interface DbGetManualPaymentsTenant {
  id: number;
  email: string;
  first_name: string;
  password: string;
  last_name: string;
  phone_number: string;
  avatar: string;
  bio: string;
  stripe_customer_id: any;
  stripe_payment_method_id: any;
  card_last_digit: any;
  card_name: any;
  invited_by: number;
  role: string;
  last_payment_date: any;
  onboarded: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
  deleted: any;
  manual_payments: DbGetManualPaymentsManualPayment[];
}

type DbGetManualPaymentsStatus = "pending" | "approved" | "declined";

interface DbGetManualPaymentsManualPayment {
  id: number;
  image_url: string;
  user_id: number;
  amount: string;
  status: DbGetManualPaymentsStatus;
  created_at: string;
  updated_at: string;
}

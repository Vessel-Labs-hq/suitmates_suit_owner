interface PersonalInfoPayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  bio?: string;
  onboarded?: boolean;
  avatar?: string;
  password?: string;
}

interface DbUpdatePersonalInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar: any;
  bio: string;
  role: string;
  onboarded: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DbCreateSpace {
  id: number;
  user_id: number;
  space_name: string;
  space_address: string;
  space_size: number;
  space_amenities: string;
  account_number: string;
  account_name: string;
  routing_number: string;
  createdAt: string;
  updatedAt: string;
}

interface DbSpace extends Omit<DbCreateSpace, "user_id"> {
  owner_id: string;
  suite?: DbCreateSuite[];
  deleted?: boolean;
}

interface DbCreateSuite {
  id: number;
  suite_number: string;
  suite_type: string;
  suite_size: string;
  suite_cost: number;
  timing: string;
  tenant_id: any;
  space_id: number;
  created_at: string;
  updated_at: string;
  deleted: any;
}

interface DbGetUserDetails extends DbUpdatePersonalInfo {
  stripe_customer_id?: string;
  stripe_payment_method_id?: string;
  card_last_digit?: string;
  card_name?: string;
  space: DbSpace;
}

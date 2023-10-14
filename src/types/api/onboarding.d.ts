interface PersonalInfoPayload {
  // email: string;
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

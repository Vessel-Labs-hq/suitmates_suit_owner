interface DbSuite {
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
}

interface DbImage {
  id: number;
  url: string;
  maintenance_request_id: number;
  created_at: string;
  updated_at: string;
}

interface DbGetAllMaintenanceRequest {
  maintenanceRequests: DbMaintenanceRequest[];
  totalMaintenanceRequests: number;
  pendingMaintenanceRequests: number;
}

interface DbMaintenanceRequest {
  id: number;
  user_id: number;
  suite_id: number;
  priority: RequestPriority;
  category: null | string;
  description: string;
  repair_date: string | null;
  repair_time: string | null;
  status: MaintenanceRequestStatus;
  created_at: string;
  updated_at: string;
  user: DbUser;
  suite: DbSuite;
  images: DbImage[];
  comments: DbComment[];
}

interface DbUser {
  id: number;
  email: string;
  first_name: string;
  password: string;
  last_name: string;
  phone_number: string;
  avatar: string;
  bio: string;
  stripe_customer_id: string;
  stripe_payment_method_id: string;
  card_last_digit: string;
  card_name: string;
  invited_by: number;
  role: string;
  onboarded: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

interface DbComment {
  id: number;
  text: string;
  user_id: number;
  maintenance_request_id: number;
  created_at: string;
  updated_at: string;
  user: DbUser;
}

interface DbCreateCommentRes {
  id: number;
  text: string;
  user_id: number;
  maintenance_request_id: number;
  created_at: string;
  updated_at: string;
}

interface DbGetAllSpaceChatData {
  totalOccupiedSuites: number;
  totalVacantSuites: number;
}

interface DbSpaceChatData {
  data: DbGetAllSpaceChatData;
}

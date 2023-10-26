interface DbGetAllMaintenanceRequest {
  id: number;
  user_id: number;
  suite_id: number;
  priority: string;
  description: string;
  repair_date: any;
  repair_time: any;
  status: string;
  created_at: string;
  updated_at: string;
  user: DbUpdatePersonalInfo;
  suite: DbSuite;
  images: DbImage[];
  comments: any[];
}

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

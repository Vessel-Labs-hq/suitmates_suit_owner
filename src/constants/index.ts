import { MRCProps } from "@/components/molecules/Cards/MaintenanceRequestCard";
import { NextPageWithLayout } from "@/pages/_app";
import { formatWord } from "@/utils";
import { AppProps } from "next/app";

export interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

let time = 1;
type TimeData = { label: string; value: string | number };
const timeArr: Array<TimeData> = [];

while (time < 25) {
  let meridian: "am" | "pm" = "am";

  if (time > 12) {
    meridian = "pm";
    const nTime = time - 12;
    timeArr.push({ label: `${nTime} ${meridian}`, value: time });
  } else {
    timeArr.push({ label: `${time} ${meridian}`, value: time });
  }

  time++;
}

export const WorkingHours = timeArr;

export const DaysOfTheWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

type TSalonOccupations = { label: string; value: string };
export const SalonOccupations: TSalonOccupations[] = [
  { label: "Hairstylist or Hairdresser", value: "hairstylist" },
  { label: "Nail Technician", value: "nail_technician" },
  { label: "Esthetician", value: "esthetician" },
  { label: "Makeup Artist", value: "makeup_artist" },
  { label: "Barber", value: "barber" },
  { label: "Massage Therapist", value: "massage_therapist" },
  { label: "Salon Manager", value: "salon_manager" },
  { label: "Receptionist", value: "receptionist" },
  { label: "Colorist", value: "colorist" },
  { label: "Shampoo Technician", value: "shampoo_technician" },
  { label: "Manicurist/Pedicurist", value: "manicurist_pedicurist" },
  { label: "Eyelash Technician", value: "eyelash_technician" },
  { label: "Waxing Specialist", value: "waxing_specialist" },
  { label: "Aesthetician Assistant", value: "aesthetician_assistant" },
  { label: "Retail Sales Associate", value: "retail_sales_associate" },
];

export const SuiteAmenities = [
  { label: "Event/conference room", value: "Event/conference room" },
  { label: "Wifi / high-speed internet", value: "Wifi / high-speed internet" },
  { label: "Laundry room", value: "Laundry room" },
  { label: "24/7hr door access", value: "24/7hr door access" },
  { label: "Cleaning services", value: "Cleaning services" },
  { label: "Parking", value: "Parking" },
  { label: "Utilities", value: "Utilities" },
  { label: "Security", value: "Security" },
  { label: "Furniture", value: "Furniture" },
  { label: "Pet friendly", value: "Pet friendly" },
];

export const MaintenanceQueries = {
  add_request: "add_request",
  requestId: "requestId",
} as const;

export const MaintenanceRequestCategory = [
  "Appliance",
  "Cleaning",
  "Electrical",
  "General",
  "Painting ",
  "Plumbing",
];

export const SortOptions = ["Date", "Status"];

export const AllMaintenanceRequestStatus: MaintenanceRequestStatus[] = [
  "IN_PROGRESS",
  "PENDING",
  "COMPLETED",
];

export const MaintenanceRequestArr = AllMaintenanceRequestStatus.map((ele) => ({
  label: formatWord(ele.toLowerCase()),
  value: ele,
}));

export const WorkingHoursOptions = WorkingHours.map((time) => ({
  label: time.label,
  value: String(time.value),
}));

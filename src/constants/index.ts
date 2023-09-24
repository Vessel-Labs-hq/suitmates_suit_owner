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

type TSalonOccupations = { name: string; value: string };
export const SalonOccupations: TSalonOccupations[] = [
  { name: "Hairstylist or Hairdresser", value: "hairstylist" },
  { name: "Nail Technician", value: "nail_technician" },
  { name: "Esthetician", value: "esthetician" },
  { name: "Makeup Artist", value: "makeup_artist" },
  { name: "Barber", value: "barber" },
  { name: "Massage Therapist", value: "massage_therapist" },
  { name: "Salon Manager", value: "salon_manager" },
  { name: "Receptionist", value: "receptionist" },
  { name: "Colorist", value: "colorist" },
  { name: "Shampoo Technician", value: "shampoo_technician" },
  { name: "Manicurist/Pedicurist", value: "manicurist_pedicurist" },
  { name: "Eyelash Technician", value: "eyelash_technician" },
  { name: "Waxing Specialist", value: "waxing_specialist" },
  { name: "Aesthetician Assistant", value: "aesthetician_assistant" },
  { name: "Retail Sales Associate", value: "retail_sales_associate" },
];

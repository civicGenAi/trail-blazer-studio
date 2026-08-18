export type Phase = "Calving" | "On the move" | "River crossings" | "Peak crossings";

export const migrationMonths: {
  month: string;
  index: number;
  phase: Phase;
  region: string;
  line: string;
}[] = [
  {
    month: "Jan",
    index: 0,
    phase: "Calving",
    region: "Ndutu, southern plains",
    line: "Herds settle on the short grass as the rains green it.",
  },
  {
    month: "Feb",
    index: 1,
    phase: "Calving",
    region: "Ndutu and Kusini",
    line: "Around 8,000 calves born a day for three weeks.",
  },
  {
    month: "Mar",
    index: 2,
    phase: "Calving",
    region: "Southern Serengeti",
    line: "Last calves drop; predators work the stragglers.",
  },
  {
    month: "Apr",
    index: 3,
    phase: "On the move",
    region: "Moru and Seronera",
    line: "Long rains push the herds north-west in columns.",
  },
  {
    month: "May",
    index: 4,
    phase: "On the move",
    region: "Western corridor",
    line: "The rut begins; columns stretch up to 40 km.",
  },
  {
    month: "Jun",
    index: 5,
    phase: "River crossings",
    region: "Grumeti River",
    line: "First crossings at the Grumeti, with resident crocodile.",
  },
  {
    month: "Jul",
    index: 6,
    phase: "Peak crossings",
    region: "Northern Serengeti",
    line: "Herds reach the Mara River line at Kogatende.",
  },
  {
    month: "Aug",
    index: 7,
    phase: "Peak crossings",
    region: "Mara River, Kogatende",
    line: "Highest crossing frequency of the year.",
  },
  {
    month: "Sep",
    index: 8,
    phase: "Peak crossings",
    region: "Lamai wedge and Maasai Mara",
    line: "Herds move back and forth across the river.",
  },
  {
    month: "Oct",
    index: 9,
    phase: "River crossings",
    region: "Northern Serengeti",
    line: "Return crossings south as the north dries out.",
  },
  {
    month: "Nov",
    index: 10,
    phase: "On the move",
    region: "Lobo and Seronera",
    line: "Short rains start; herds drift down the eastern side.",
  },
  {
    month: "Dec",
    index: 11,
    phase: "On the move",
    region: "Ndutu and eastern plains",
    line: "Herds spread across the southern plains again.",
  },
];

export const migrationStats = [
  { value: "1.5M", label: "Wildebeest in the herd" },
  { value: "Jul–Oct", label: "Mara crossing window" },
  { value: "Jan–Mar", label: "Calving window" },
  { value: "5 of 5", label: "Big Five present" },
];

export const migrationFaq = [
  {
    q: "Can you guarantee I will see a river crossing?",
    a: "No. Herds gather at a bank and may wait hours or turn back. Booking three or more nights at Kogatende in August raises the odds to roughly 80% based on our own trip logs.",
  },
  {
    q: "Which month is best?",
    a: "August for river crossings, February for calving and predator action. July and September are close to August and cost less.",
  },
  {
    q: "How far in advance should I book?",
    a: "Northern camps for August sell out 9–12 months ahead. February camps at Ndutu sell out around 6 months ahead.",
  },
  {
    q: "Is the migration only in the Serengeti?",
    a: "The herd moves through the Serengeti–Mara ecosystem across Tanzania and Kenya. It is in Tanzania for roughly nine months of the year.",
  },
  {
    q: "What does a migration trip cost?",
    a: "From USD 3,450 per person for six days, based on two sharing, including park fees, full board and a private 4WD.",
  },
];

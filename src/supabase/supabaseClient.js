import { createClient } from "@supabase/supabase-js";
import { customStorage } from "./customStorage";

const supabaseUrl = "https://ruxahlmouzxteusekeys.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eGFobG1vdXp4dGV1c2VrZXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1OTAzNjIsImV4cCI6MjA3MTE2NjM2Mn0.HwK1ESyha_pFCNxXgtmtUeQkTB1lN5zuuw5NJkKkPCI";
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: customStorage, // استفاده از ذخیره‌سازی سفارشی
  },
});

import {Calendar} from "@/components/ui/calendar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {format, isBefore, startOfDay} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {useState} from "react";
import type {DateRange} from "react-day-picker";

export default function HotelDatePicker() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const today = startOfDay(new Date());
  const nights = dateRange?.from && dateRange?.to ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  return (
    <Card className="max-w-md mx-auto"><CardHeader><CardTitle>Book Your Stay</CardTitle><p className="text-sm text-muted-foreground">Select check-in and check-out dates</p></CardHeader><CardContent>
      <Popover><PopoverTrigger asChild><Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{dateRange?.from ? (dateRange.to ? `${format(dateRange.from, "LLL dd")} - ${format(dateRange.to, "LLL dd")}` : format(dateRange.from, "LLL dd, y")) : "Pick dates"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="range" selected={dateRange} onSelect={setDateRange} disabled={(date) => isBefore(date, today)} numberOfMonths={2} /></PopoverContent></Popover>
      {nights > 0 && <p className="mt-4 text-sm text-muted-foreground">{nights} night{nights > 1 ? "s" : ""}</p>}
    </CardContent></Card>
  );
}

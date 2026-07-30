import {useState} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {DateRange} from 'react-day-picker';
import {addDays, isBefore, startOfDay} from 'date-fns';

export default function HotelBookingDatePicker() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const today = startOfDay(new Date());

  const nights = dateRange?.from && dateRange?.to
    ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Stay</CardTitle>
        <CardDescription>Select your check-in and check-out dates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          disabled={(date) => isBefore(date, today)}
          numberOfMonths={2}
        />
        {dateRange?.from && dateRange?.to && (
          <div className="space-y-1">
            <p className="text-sm font-medium">{nights} night{nights !== 1 ? 's' : ''} selected</p>
            <p className="text-sm text-muted-foreground">
              {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

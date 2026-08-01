import * as React from 'react';
import {Calendar} from '../components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '../components/ui/popover';
import {Button} from '../components/ui/button';
import {addDays, format, isBefore, startOfDay} from 'date-fns';
import {DateRange} from 'react-day-picker';

export default function HotelDatePicker() {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const today = startOfDay(new Date());

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-semibold">Select Your Stay</h2>
      <p className="text-sm text-muted-foreground">
        Pick your check-in and check-out dates
      </p>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(day) => isBefore(day, today)}
          />
        </PopoverContent>
      </Popover>
      {date?.from && date?.to && (
        <div className="rounded-md bg-muted p-3 space-y-1">
          <p className="text-sm">Check-in: {format(date.from, 'PPP')}</p>
          <p className="text-sm">Check-out: {format(date.to, 'PPP')}</p>
        </div>
      )}
    </div>
  );
}

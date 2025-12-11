'use client';

import { useState, useEffect } from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon, Check, ChevronDown, Clock, Scissors, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { barbers, services, timeSlots } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

function useRequireAuth() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  return { user, loading: isUserLoading };
};


export default function BookAppointmentPage() {
  const { user, loading } = useRequireAuth();
  const { toast } = useToast();

  const [service, setService] = useState<string | undefined>();
  const [barber, setBarber] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | undefined>();
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = () => {
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      toast({
        title: 'Appointment Booked!',
        description: `Your appointment is confirmed for ${format(date!, 'PPP')} at ${time}.`,
      });
      // Reset form
      setService(undefined);
      setBarber(undefined);
      setTime(undefined);
    }, 1500);
  };

  const selectedService = services.find((s) => s.id === service);

  if (loading || !user) {
    return (
      <div className="container py-12 md:py-20">
         <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
               <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-40 w-full" />
                   <div className="space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-32" />
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Book Your Appointment</CardTitle>
            <CardDescription>
              Select your service, preferred barber, and a time that works for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-2">
              <Label htmlFor="service" className="font-bold text-lg">1. Select a Service</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger id="service" className="text-base h-12">
                  <SelectValue placeholder="Choose a service..." />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id} className="text-base">
                      <div className="flex justify-between w-full">
                        <span>{s.name}</span>
                        <span className="text-muted-foreground">${s.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="barber" className="font-bold text-lg">2. Select a Barber</Label>
              <Select value={barber} onValueChange={setBarber}>
                <SelectTrigger id="barber" className="text-base h-12">
                  <SelectValue placeholder="Choose a barber..." />
                </SelectTrigger>
                <SelectContent>
                  {barbers.map((b) => (
                    <SelectItem key={b.id} value={b.id} className="text-base">
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
               <Label className="font-bold text-lg">3. Select Date & Time</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal h-12 text-base',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date() || date > addDays(new Date(), 60)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="space-y-2">
                  <RadioGroup value={time} onValueChange={setTime} className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <RadioGroupItem key={slot} value={slot} id={slot} className="sr-only" />
                    ))}
                    {timeSlots.map((slot) => (
                        <Label
                          key={slot}
                          htmlFor={slot}
                          className={cn(
                            'block w-full text-center rounded-md border p-3 cursor-pointer',
                            time === slot ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'
                          )}
                        >
                          {slot}
                        </Label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            {selectedService && barber && date && time && (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center"><Scissors className="w-4 h-4 mr-2 text-primary" /> Service: {services.find(s => s.id === service)?.name} (${services.find(s => s.id === service)?.price})</div>
                  <div className="flex items-center"><User className="w-4 h-4 mr-2 text-primary" /> Barber: {barbers.find(b => b.id === barber)?.name}</div>
                  <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary" /> Time: {format(date, "EEEE, MMMM do")} at {time}</div>
                </CardContent>
              </Card>
            )}

          </CardContent>
          <CardFooter>
            <Button
              size="lg"
              onClick={handleBooking}
              disabled={!service || !barber || !date || !time || isBooking}
              className="w-full md:w-auto"
            >
              {isBooking ? 'Booking...' : 'Confirm Appointment'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

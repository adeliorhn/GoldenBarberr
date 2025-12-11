import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { barbers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';

export const metadata = {
  title: 'Meet Our Barbers',
};

function BarberRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`}
        />
      ))}
    </div>
  );
}

export default function BarbersPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Meet Our Barbers</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Our team of master barbers is dedicated to the craft of traditional and modern grooming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {barbers.map((barber) => {
          const barberImage = PlaceHolderImages.find((img) => img.id === barber.imageId);
          return (
          <Card key={barber.id} className="text-center p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary shadow-lg">
              {barberImage && (
                <AvatarImage src={barberImage.imageUrl} alt={barber.name} data-ai-hint={barberImage.imageHint}/>
              )}
              <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardHeader className="p-0">
              <CardTitle className="font-headline text-2xl">{barber.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-2">
              <p className="text-primary font-semibold">{barber.specialization}</p>
              <p className="text-sm text-muted-foreground mt-1">{barber.experience} of experience</p>
              <div className="mt-4 flex justify-center">
                <BarberRating rating={Math.floor(Math.random() * 2) + 4} />
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
    </div>
  );
}

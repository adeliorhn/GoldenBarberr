import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { barbers, services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight, Scissors } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold text-primary">
            GoldenBarber
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-background">
            Experience the Golden Touch of Classic Barbering
          </p>
          <Button asChild className="mt-8" size="lg">
            <Link href="/book-appointment">Book an Appointment</Link>
          </Button>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => {
              const serviceImage = PlaceHolderImages.find((img) => img.id === service.imageId);
              return(
              <Card key={service.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                {serviceImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={serviceImage.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover"
                      data-ai-hint={serviceImage.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                <div className="p-6 pt-0 flex justify-between items-center">
                  <p className="text-lg font-bold text-primary">${service.price}</p>
                  <Button variant="ghost" asChild>
                    <Link href="/book-appointment">Book Now <ChevronRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </Card>
            )})}
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="barbers" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Meet Our Barbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {barbers.map((barber) => {
              const barberImage = PlaceHolderImages.find((img) => img.id === barber.imageId);
              return (
              <div key={barber.id} className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
                  {barberImage && (
                    <AvatarImage src={barberImage.imageUrl} alt={barber.name} data-ai-hint={barberImage.imageHint} />
                  )}
                  <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-headline font-bold">{barber.name}</h3>
                <p className="text-primary">{barber.specialization}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      <section className="bg-accent text-accent-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Scissors className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Ready for a Fresh Look?
          </h2>
          <p className="max-w-xl mx-auto mb-8">
            Let our expert barbers craft the perfect style for you. Quality, precision, and a touch of gold in every cut.
          </p>
          <Button asChild size="lg" variant="default">
            <Link href="/book-appointment">Book Your Chair</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

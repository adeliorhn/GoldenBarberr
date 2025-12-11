import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata = {
  title: 'Our Services',
};

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Services</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find the perfect treatment to refine your style. Each service is a promise of quality and precision.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const serviceImage = PlaceHolderImages.find((img) => img.id === service.imageId);
          return(
          <Card key={service.id} className="flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
            {serviceImage && (
              <div className="relative h-56 w-full">
                <Image
                  src={serviceImage.imageUrl}
                  alt={service.name}
                  fill
                  className="object-cover rounded-t-lg"
                  data-ai-hint={serviceImage.imageHint}
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{service.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-2xl font-bold text-primary">${service.price}</span>
              <Button asChild>
                <Link href="/book-appointment">Book Now</Link>
              </Button>
            </CardFooter>
          </Card>
        )})}
      </div>
    </div>
  );
}

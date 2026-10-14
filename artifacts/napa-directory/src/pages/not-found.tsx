import { Link } from "wouter";
import { WineOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <WineOff className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-5xl font-display font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8 font-light">
          Oops! It looks like this barrel is empty.
        </p>
        <Link 
          href="/" 
          className="inline-flex px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-md hover:bg-primary/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

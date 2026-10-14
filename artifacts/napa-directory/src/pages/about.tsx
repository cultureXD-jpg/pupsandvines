import { Link } from "wouter";
import { Wine, Heart, Globe, Mail } from "lucide-react";
import { GoogleAd } from "@/components/google-ad";
import { PageMeta } from "@/components/page-meta";

export default function About() {
  return (
    <div className="w-full bg-background">
      <PageMeta
        title="About Pups & Vines"
        description="Learn about Pups & Vines — your guide to dog-friendly wine tasting in Napa Valley and Sonoma County. Every winery listing is personally verified."
        canonical="/about"
      />
      {/* Hero */}
      <div className="relative bg-primary py-24 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">About Pups & Vines</h1>
          <p className="text-xl text-primary-foreground/90 font-light">
            Your guide to dog-friendly wine tasting in Napa Valley & Sonoma County.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        
        <div className="prose prose-lg prose-stone max-w-none mb-20">
          <p className="lead text-2xl font-display text-foreground mb-8">
            At the heart of our platform is a simple idea: enjoying great wine shouldn't mean leaving your best friend behind.
          </p>
          <p>
            We created this directory after realizing how difficult it was to find dog-friendly wineries in Napa Valley. What should be a relaxing and enjoyable experience often turned into hours of searching — visiting multiple websites, digging through policies, and still not being completely sure which wineries truly welcome dogs.
          </p>
          <p>
            As dog lovers ourselves, we saw an opportunity to simplify that process.
          </p>
          <p>
            Our mission is to make it easy for people to discover wineries where they can comfortably bring their dogs along. By bringing all this information into one place, we help you spend less time researching and more time enjoying what matters — great wine, beautiful scenery, and unforgettable moments with your dog by your side.
          </p>
          <p>
            Whether you're planning a casual outing or a full wine-tasting day, we're here to make the experience seamless, inclusive, and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Independent</h3>
            <p className="text-muted-foreground text-sm">We are not a booking agency. We provide unbiased directory listings to help you choose.</p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Local Focus</h3>
            <p className="text-muted-foreground text-sm">Dedicated entirely to the nuanced sub-regions of Napa and Sonoma counties.</p>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Wine className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3">Curated</h3>
            <p className="text-muted-foreground text-sm">We manually verify amenities and policies to ensure your visit is seamless.</p>
          </div>
        </div>

        <GoogleAd className="mb-12" />

        <div className="bg-secondary/50 rounded-3xl p-10 md:p-16 border border-border text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Are you a winery owner?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Ensure your listing is accurate, upload premium photos, and highlight your unique amenities by claiming your profile. We offer both free and premium directory placements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:pupsandvines@gmail.com?subject=Claim%20My%20Winery%20Listing"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-md hover:bg-primary/90 transition-colors inline-block"
            >
              Claim Your Listing
            </a>
            <a href="mailto:pupsandvines@gmail.com" className="px-8 py-3 bg-white text-foreground rounded-xl font-bold border border-border shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> Contact Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

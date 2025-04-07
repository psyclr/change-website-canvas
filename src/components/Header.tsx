
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-display text-primary mr-1">Change</span>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#services" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Services</a>
          <a href="#process" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Process</a>
          <a href="#contact" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Contact</a>
          <Button asChild size="sm" className="rounded-full">
            <a href="#get-started">Get Started</a>
          </Button>
        </div>
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4 mt-8">
              <a href="#services" className="text-foreground/80 hover:text-foreground transition-colors py-2">Services</a>
              <a href="#process" className="text-foreground/80 hover:text-foreground transition-colors py-2">Process</a>
              <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors py-2">Contact</a>
              <Button asChild className="mt-4 rounded-full">
                <a href="#get-started">Get Started</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

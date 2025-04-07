
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="py-10 md:py-12">
      <div className="container mx-auto px-6 sm:px-10 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-display text-primary">Change</span>
        </div>
        
        <div className="hidden md:flex space-x-10 items-center">
          <a href="#services" className="text-foreground/70 hover:text-foreground transition-colors">What we do</a>
          <a href="#process" className="text-foreground/70 hover:text-foreground transition-colors">How we work</a>
          <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</a>
          <Button asChild size="sm" className="rounded-full ml-4 bg-primary/90 hover:bg-primary">
            <a href="#get-started">Start project</a>
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
            <nav className="flex flex-col space-y-6 mt-10">
              <a href="#services" className="text-foreground/70 hover:text-foreground transition-colors py-2">What we do</a>
              <a href="#process" className="text-foreground/70 hover:text-foreground transition-colors py-2">How we work</a>
              <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors py-2">Contact</a>
              <Button asChild className="mt-6 rounded-full bg-primary/90 hover:bg-primary">
                <a href="#get-started">Start project</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

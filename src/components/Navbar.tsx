import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  const handleGetStarted = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
    setIsPopupOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSubmitProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const details = (form.elements.namedItem("details") as HTMLTextAreaElement)
      .value;

    const message = `
New Project Inquiry:
Name: ${name}
Email: ${email}
Phone: ${phone}
Project Details: ${details}
    `;

    const whatsappUrl = `https://wa.me/918128166631?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    setIsPopupOpen(false);
    form.reset();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#home" className="flex flex-col items-end gap-0">
            <img
              src="/Ziu_Logo.png"
              alt="ZIU Infotech Logo"
              className="w-18 h-9"
            />
            <span className="text-sm font-medium gradient-text">Infotech</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <Button variant="hero" size="sm" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 p-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button
                variant="hero"
                size="sm"
                className="mt-2"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= POPUP MODAL ================= */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-background rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-2">
              Submit Your Project Details
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Fill the details below and we’ll contact you shortly.
            </p>

            <form onSubmit={handleSubmitProject} className="space-y-4">
              <Input name="name" placeholder="Your Name" required />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                required
              />
              <Input name="phone" placeholder="Phone Number" required />
              <Textarea
                name="details"
                placeholder="Project Details"
                rows={4}
                required
              />

              <Button type="submit" className="w-full">
                Submit via WhatsApp
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

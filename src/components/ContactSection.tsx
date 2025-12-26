import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Globe, MapPin, Send, ArrowRight } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, phone, subject, message } = formData;

    const whatsappMessage = `Name: ${name}
Email: ${email}િ
Phone: ${phone}
Subject: ${subject}
Message: ${message}`;

    const whatsappUrl = `https://wa.me/918128166631?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@ziuinfotech.in",
      href: "mailto:info@ziuinfotech.in",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8128166631",
      href: "tel:+918128166631",
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.ziuinfotech.in",
      href: "https://www.ziuinfotech.in",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Surat, Gujarat, India",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="rounded-2xl p-8 glass-card">
            <h3 className="text-xl font-semibold mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <Input
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />

              <Input
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
              />

              <Textarea
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />

              <Button type="submit" className="w-full">
                {isSubmitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Contact info */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="p-5 rounded-xl glass-card"
              >
                <info.icon className="w-5 h-5 mb-2 text-primary" />
                <h4 className="text-sm font-semibold">{info.label}</h4>
                <p className="text-sm text-muted-foreground">
                  {info.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

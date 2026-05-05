import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const mailto = `mailto:shachi.origami@example.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 px-6 bg-parchment">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-wood mb-3">Get in touch</p>
        <h2 className="font-serif font-light text-5xl text-ink mb-4">Contact</h2>
        <p className="font-sans font-light text-muted text-sm leading-relaxed mb-12">
          For commissions, exhibition inquiries, or just to say hello — Shachi would love to hear from you.
        </p>

        {sent ? (
          <div className="py-16">
            <p className="font-serif italic text-2xl text-wood">Thank you for reaching out.</p>
            <p className="font-sans text-muted text-sm mt-3">Your message is on its way.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full bg-cream border border-parchment px-4 py-3 font-sans text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-wood transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-cream border border-parchment px-4 py-3 font-sans text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-wood transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-cream border border-parchment px-4 py-3 font-sans text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-wood transition-colors resize-none"
                placeholder="Tell Shachi about your interest..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-wood text-cream font-sans text-sm tracking-widest uppercase hover:bg-wood-dark transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

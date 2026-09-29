import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Satyam Tiwari | Full Stack Developer, SaaS Architect & Cyber Security Consultant",
    description: "Building modern SaaS platforms (Golewah), FinTech web apps (StockDox), mobile applications, and hardened cybersecurity systems for startups worldwide.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Satyam Tiwari | Full Stack Developer & Cyber Security Consultant Portfolio Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyam Tiwari | Developer Portfolio",
    description: "Explore my portfolio featuring Golewah SaaS, StockDox, Curbi, Flat Rate Bookkeeping, cybersecurity solutions, and modern web & mobile applications.",
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        "name": siteConfig.name,
        "jobTitle": "Full Stack Developer, SaaS Architect & Cyber Security Consultant",
        "url": siteConfig.url,
        "image": siteConfig.hero.avatarUrl,
        "sameAs": [
          siteConfig.socials.linkedin,
          siteConfig.socials.github,
        ],
        "knowsAbout": [
          "React",
          "React Native",
          "Next.js",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Prisma",
          "SaaS Multi-tenancy",
          "Firebase",
          "Android",
          "Cyber Security",
          "Penetration Testing",
          "API Development",
          "Cloud Deployment"
        ]
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": `${siteConfig.name} Portfolio`,
        "url": siteConfig.url,
        "logo": siteConfig.hero.avatarUrl
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        "url": siteConfig.url,
        "name": `${siteConfig.name} Developer Portfolio`,
        "publisher": {
          "@id": `${siteConfig.url}/#person`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url
          }
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        "name": `${siteConfig.name} Freelance Development & Security Consulting`,
        "url": siteConfig.url,
        "priceRange": "$$",
        "image": siteConfig.hero.avatarUrl,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "telephone": `+${siteConfig.whatsappNumber}`
      }
    ]
  };

  return (
    <html lang="en" className={`h-full scroll-smooth antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-full bg-background text-white selection:bg-accent/20 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}

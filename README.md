# SellerMath — Complete SEO-First Seller Profit Calculator Website

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Tests](https://img.shields.io/badge/tests-30%20passed-success)]()
[![License: Proprietary](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)]()
[![Framework: Next.js 16](https://img.shields.io/badge/Next.js-16%20App%20Router-black)]()
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38B2AC)]()

**SellerMath** is a production-ready, SEO-first web application designed for online merchants, resellers, flippers, and e-commerce entrepreneurs in the **United States, United Kingdom, and Canada**.

The application operates **100% client-side** with zero backend databases or paid APIs, running seamlessly on Vercel's free tier. It provides accurate financial models for calculating net profit, profit margins, return on product cost (ROI), break-even selling prices, marketplace commissions (eBay, Etsy, Amazon FBA), and advertising break-even ROAS.

---

## Table of Contents

1. [Features & Architecture](#features--architecture)
2. [Route Sitemap](#route-sitemap)
3. [Calculation Formulas](#calculation-formulas)
4. [Tech Stack](#tech-stack)
5. [Local Development](#local-development)
6. [Testing](#testing)
7. [Deploying to Vercel (Free Tier)](#deploying-to-vercel-free-tier)
8. [Connecting a Custom Domain](#connecting-a-custom-domain)
9. [Setting up Google Search Console & Google Analytics](#setting-up-google-search-console--google-analytics)
10. [Google AdSense Readiness](#google-adsense-readiness)
11. [Pre-Launch Checklist](#pre-launch-checklist)

---

## Features & Architecture

- **Universal Product Profit Calculator**: Primary tool computing gross revenue, COGS, customer shipping, carrier postage, packaging supplies, platform fees, payment processing spreads, ad spend, return reserves, net profit, margin %, ROI, break-even price, and target-margin price.
- **Marketplace-Specific Engines**:
  - **eBay**: Models Final Value Fees (FVF), store subscriber tiers, consumer electronics/apparel/media category rates, and Promoted Listings.
  - **Etsy**: Models listing fees ($0.20), 6.5% transaction commission on order + shipping, regional Etsy Payments (US/UK/CA), and 12%-15% Offsite Ads.
  - **Amazon FBA**: Models category referral fees (8-15%), FBA pick & pack size tiers (Small standard, Large standard 1-2 lbs, Bulky), and monthly storage.
- **Break-Even ROAS Calculator**: Computes pre-ad contribution margin, break-even ROAS, maximum allowable CPA, and target ROAS.
- **Target Profit Margin Price Calculator**: Reverse-engineers the exact retail selling price needed to achieve a desired margin %, with automatic detection of impossible targets (fees + margin $\ge$ 100%).
- **Multi-Currency Support**: Switch between **USD ($)**, **GBP (£)**, and **CAD (CA$)** with live recalculations and formatted regional symbols.
- **Pure Client-Side Logic**: Calculations run in pure TypeScript functions under `lib/calculations/` without external network latency or privacy risks.
- **SEO & Structured Data**: Automated Open Graph tags, canonical URLs, dynamic XML sitemap (`/sitemap.xml`), robots.txt (`/robots.txt`), Schema.org `WebApplication`, `BreadcrumbList`, `FAQPage`, and `Article` JSON-LD.
- **AdSense Ready**: Reserved-dimension ad slots prevent Cumulative Layout Shift (CLS). Ads remain disabled by default until your domain is approved by Google AdSense.

---

## Route Sitemap

| Route | Purpose | Features & Schema |
|---|---|---|
| `/` | Homepage | Hero, calculator catalog, value prop, FAQs, guides preview |
| `/calculators/product-profit-calculator` | Universal Profit Tool | Full financial model, breakdown table, worked example, FAQs |
| `/calculators/ebay-profit-calculator` | eBay Seller Tool | FVF tiers, store toggle, Promoted Listings, UK/CA regional rules |
| `/calculators/etsy-fee-calculator` | Etsy Fee Tool | 6.5% transaction fee, listing fee, Etsy Payments, Offsite Ads |
| `/calculators/amazon-fba-profit-calculator` | Amazon FBA Tool | Referral rates, size tiers, monthly storage, individual vs pro |
| `/calculators/break-even-roas-calculator` | Ad Spend Tool | Pre-ad contribution, break-even ROAS, target ROAS, max CPA |
| `/calculators/target-profit-price-calculator` | Pricing Tool | Reverse pricing formula, impossible margin detection |
| `/guides` | Guides Hub | Article cards with read times and topic tags |
| `/guides/profit-margin-vs-markup` | Tutorial | Mathematical differences, formulas, conversion table |
| `/guides/how-to-calculate-product-profit` | Tutorial | Step-by-step masterclass, 4 hidden profit leaks |
| `/guides/break-even-roas-explained` | Tutorial | Advertising unit economics, pre-ad contribution, target ROAS |
| `/about` | Company | Mission, calculation methodology, client-side privacy, independence |
| `/contact` | Support & Inquiries | Functional mailto contact link and feedback form (`hgoraya522@gmail.com`) |
| `/security` | Security & VDP | RFC 9116, Safe Harbor, security headers, client-side sandbox |
| `/privacy-policy` | Legal | Client-side privacy, analytics, AdSense, GDPR/CCPA/PIPEDA |
| `/terms` | Legal | Terms of service, estimate limitations, intellectual property |
| `/disclaimer` | Legal | Fee accuracy limitations, non-affiliation disclaimer |
| `/.well-known/security.txt` | Security | RFC 9116 standardized security contact (`hgoraya522@gmail.com`) |
| `/sitemap.xml` | SEO | Dynamic XML sitemap listing all routes |
| `/robots.txt` | SEO | Crawler directives and sitemap link |

---

## Calculation Formulas

### 1. Universal Product Profit

$$\text{Revenue} = \text{Selling Price} + \text{Shipping Charged to Customer}$$

$$\text{Marketplace Fee} = \text{Revenue} \times \left(\frac{\text{Marketplace Fee \%}}{100}\right)$$

$$\text{Payment Fee} = \text{Revenue} \times \left(\frac{\text{Processing \%}}{100}\right) + \text{Fixed Fee}$$

$$\text{Return Allowance} = \text{Revenue} \times \left(\frac{\text{Return Rate \%}}{100}\right)$$

$$\text{Total Costs} = \text{COGS} + \text{Shipping Paid} + \text{Packaging} + \text{Marketplace Fee} + \text{Payment Fee} + \text{Ad Spend} + \text{Other Expenses} + \text{Return Allowance}$$

$$\text{Net Profit} = \text{Revenue} - \text{Total Costs}$$

$$\text{Profit Margin \%} = \frac{\text{Net Profit}}{\text{Revenue}} \times 100 \quad (\text{when Revenue} > 0)$$

$$\text{ROI on Product Cost \%} = \frac{\text{Net Profit}}{\text{COGS}} \times 100 \quad (\text{when COGS} > 0)$$

### 2. Break-Even Selling Price

Let $F = \text{COGS} + \text{Shipping Paid} + \text{Packaging} + \text{Fixed Fee} + \text{Ad Spend} + \text{Other Expenses}$  
Let $v = \frac{\text{Marketplace Fee \%} + \text{Processing \%} + \text{Return Rate \%}}{100}$

$$\text{Break-Even Selling Price} = \frac{F}{1 - v} - \text{Shipping Charged}$$

*(If $v \ge 1$, break-even is mathematically impossible).*

### 3. Target Profit Margin Price

Let $m = \frac{\text{Target Margin \%}}{100}$

$$\text{Target Selling Price} = \frac{F}{1 - v - m} - \text{Shipping Charged}$$

*(If $v + m \ge 1$, the target margin is mathematically impossible because variable fees plus desired profit equal or exceed 100% of revenue).*

### 4. Break-Even & Target ROAS

$$\text{Pre-Ad Contribution} = \text{Selling Price} - \text{All Non-Ad Costs}$$

$$\text{Break-Even Ad Spend (Max CPA)} = \text{Pre-Ad Contribution}$$

$$\text{Break-Even ROAS} = \frac{\text{Selling Price}}{\text{Break-Even Ad Spend}}$$

$$\text{Target Max Ad Spend} = \text{Pre-Ad Contribution} - \text{Desired Profit Per Order}$$

$$\text{Target ROAS} = \frac{\text{Selling Price}}{\text{Target Max Ad Spend}}$$

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Node.js Native Test Runner](https://nodejs.org/api/test.html) & [tsx](https://github.com/privatenumber/tsx)

---

## Local Development

### Prerequisites

- Node.js 20 or later (`node -v`)
- npm 10 or later (`npm -v`)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sellermath.git
cd sellermath

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing

The project includes an automated test suite covering normal profitable orders, free shipping, negative-profit orders, zero revenue, invalid inputs, impossible target margins, ROAS formulas, marketplace fee rules, and currency rounding precision:

```bash
# Run all unit tests
npm test
```

### Build Verification

```bash
# Verify TypeScript compilation and static page prerendering
npm run build
```

---

## Deploying to Vercel (Free Tier)

This application is 100% static and serverless compatible. It requires no database, Redis, or external backend, making it ideal for Vercel's free Hobby tier:

1. Push your repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SellerMath website"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/sellermath.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `sellermath` GitHub repository.
4. Framework Preset will automatically detect **Next.js**.
5. *(Optional)* Under **Environment Variables**, add:
   - `NEXT_PUBLIC_BRAND_NAME`: `SellerMath`
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.com`
   - `NEXT_PUBLIC_DOMAIN`: `your-domain.com`
6. Click **Deploy**. Your site will be live within 60 seconds on a `*.vercel.app` domain.

---

## Connecting a Custom Domain

1. In your **Vercel Project Dashboard**, navigate to **Settings** &rarr; **Domains**.
2. Enter your custom domain (e.g., `sellermath.com` and `www.sellermath.com`).
3. Add the DNS records provided by Vercel to your domain registrar (Namecheap, Cloudflare, GoDaddy):
   - **Type A**: Name `@`, Value `76.76.21.21`
   - **Type CNAME**: Name `www`, Value `cname.vercel-dns.com`
4. Update `NEXT_PUBLIC_SITE_URL` in your Vercel Environment Variables to your custom domain (`https://sellermath.com`).

---

## Setting up Google Search Console & Google Analytics

### 1. Google Search Console

1. Visit [Google Search Console](https://search.google.com/search-console).
2. Add your custom domain property (`sellermath.com`).
3. Verify ownership via DNS TXT record or HTML tag.
4. Navigate to **Sitemaps** in the sidebar.
5. Enter your sitemap URL: `https://sellermath.com/sitemap.xml` and click **Submit**.
6. Google will automatically crawl all 22 static routes, indexing your calculators and guides.

### 2. Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com).
2. Copy your Measurement ID (`G-XXXXXXXXXX`).
3. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to your `.env.local` or Vercel environment variables.

---

## Google AdSense Readiness

SellerMath includes pre-built `<AdSlot />` components with reserved min-heights (`min-h-[90px]`, `min-h-[250px]`) to prevent Cumulative Layout Shift (CLS), in compliance with Google Web Vitals guidelines.

### AdSense Compliance Guidelines:

- **Disabled by Default**: Per AdSense policy, ads should remain disabled until your website is published, has indexed organic traffic, and receives official AdSense approval.
- **To Activate Ads Post-Approval**:
  1. Open `.env.local` (or Vercel Environment Variables).
  2. Set:
     ```env
     NEXT_PUBLIC_ADS_ENABLED=true
     NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
     ```
  3. Redeploy the application.
- **No Deceptive Placements**: Ad slots are clearly labeled with &quot;Advertisement&quot; and never mimic buttons, input controls, or calculation results.

---

## Pre-Launch Checklist

- [x] All 31 calculation and compliance unit tests pass (`npm test`).
- [x] Production build passes with 0 errors (`npm run build`).
- [x] Responsive layout verified on desktop and mobile viewports.
- [x] Interactive reset buttons, example loaders, and currency toggles work without page reload.
- [x] Dynamic XML sitemap (`/sitemap.xml`) and robots.txt (`/robots.txt`) verified.
- [x] Schema.org JSON-LD markup (`WebApplication`, `FAQPage`, `Article`, `BreadcrumbList`) present on all pages.
- [x] Verified fee source URLs, effective dates, and last-verified dates documented for eBay, Etsy, and Amazon.
- [x] Privacy Policy, Terms of Service, Disclaimer, and Security Center pages published.
- [x] Standardized RFC 9116 security policy published at `/.well-known/security.txt`.
- [x] Production HTTP security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) active.
- [x] GDPR & CCPA compliant Cookie Consent Banner with localStorage persistence active.
- [x] Centralized inquiry contact email `hgoraya522@gmail.com` integrated across all legal touchpoints.
- [x] Functional contact page with copy-to-clipboard and mailto routing established.

---

## Ownership & License
Copyright &copy; 2026. All Rights Reserved.

This website and its software codebase are proprietary. Unauthorized copying, cloning, scraping, or commercial redistribution is strictly prohibited under international copyright law. For licensing inquiries, contact `hgoraya522@gmail.com`.


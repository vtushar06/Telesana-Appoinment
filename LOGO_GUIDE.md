# Telesana Logo Components

This project includes several logo components for different use cases:

## Components

### 1. TelesanaLogo (Main SVG Logo)
Located: `/components/telesana-logo.jsx`

```jsx
import TelesanaLogo from "@/components/telesana-logo";

<TelesanaLogo className="h-10 w-10" />
```

**Features:**
- Full medical cross design with pulse line
- Video call icon
- Gradient colors (emerald to teal)

---

### 2. TelesanaIcon (Simplified Icon)
Located: `/components/telesana-icon.jsx`

```jsx
import TelesanaIcon from "@/components/telesana-icon";

<TelesanaIcon className="h-8 w-8" />
```

**Features:**
- Circular background
- Medical cross
- Pulse line
- Perfect for small spaces, favicons, etc.

---

### 3. TelesanaFullLogo (Logo with Text)
Located: `/components/telesana-full-logo.jsx`

```jsx
import TelesanaFullLogo from "@/components/telesana-full-logo";

<TelesanaFullLogo 
  logoSize="h-12 w-12"
  showTagline={true}
  className="my-custom-class"
/>
```

**Props:**
- `logoSize`: Size of the logo icon (default: "h-12 w-12")
- `showTagline`: Show/hide "HEALTHCARE REDEFINED" text (default: true)
- `className`: Additional CSS classes

---

## Usage in Header

The header component automatically uses the TelesanaLogo:

```jsx
// components/header.jsx
<Link href="/" className="flex items-center gap-3 cursor-pointer group">
  <TelesanaLogo className="h-10 w-10 transition-transform group-hover:scale-110" />
  <div className="flex flex-col">
    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
      Telesana
    </span>
    <span className="text-[10px] text-muted-foreground -mt-1 tracking-wider">
      HEALTHCARE
    </span>
  </div>
</Link>
```

---

## Brand Colors

The logo uses the following gradient colors:
- Primary: `#10b981` (emerald-500)
- Secondary: `#14b8a6` (teal-500)

---

## Customization

You can customize the logo colors by modifying the gradient definitions in each component:

```jsx
<linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stopColor="#10b981" />
  <stop offset="100%" stopColor="#14b8a6" />
</linearGradient>
```

---

## Replacing with Image

If you prefer to use an image logo instead:

1. Place your logo images in the `/public` folder
2. Update the header component to use Next.js Image:

```jsx
import Image from "next/image";

<Image
  src="/your-logo.png"
  alt="Telesana Logo"
  width={40}
  height={40}
  className="h-10 w-auto"
/>
```
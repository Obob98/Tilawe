import '@/ui/global.css';
import { inter } from '@/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Tilawe Dashboard',
    default: 'Tilawe Dashboard',
  },
  description: 'Database for tilawe meat merchants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
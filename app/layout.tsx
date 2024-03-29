import '@/app/ui/global.css';
import { actor } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${actor.className} antialiased`}>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'MyExpenseManager',
  description: 'Manage your expenses efficiently!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


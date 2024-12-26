<<<<<<< HEAD
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

=======
// frontend/app/layout.js
import '../styles/globals.css';

export const metadata = {
  title: 'MyExpenseManager',
  description: 'An expense management app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Welcome to MyExpenseManager</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

>>>>>>> kiban

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p className="text-foreground">&copy; {year} Your name here. All rights reserved.</p>
    </footer>
  );
}

export default function ThemeScript() {
  const script = `
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light") {
        document.documentElement.classList.add("light");
      }
    } catch (e) {}
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
import Link from 'next/link';
import SearchBar from './components/SearchBar';
import SettingsModal from './components/SettingsModal';

export default function Home() {
  const categories = [
    {
      title: "Hírek",
      links: [
        { name: "Index", url: "https://index.hu" },
        { name: "Telex", url: "https://telex.hu" },
        { name: "24.hu", url: "https://24.hu" },
        { name: "Portfolio", url: "https://portfolio.hu" }
      ]
    },
    {
      title: "Szórakozás",
      links: [
        { name: "YouTube", url: "https://youtube.com" },
        { name: "Reddit", url: "https://reddit.com" },
        { name: "9GAG", url: "https://9gag.com" }
      ]
    },
    {
      title: "Tech",
      links: [
        { name: "Prohardver", url: "https://prohardver.hu" },
        { name: "HWSW", url: "https://hwsw.hu" },
        { name: "The Verge", url: "https://theverge.com" }
      ]
    },
    {
      title: "Hasznos",
      links: [
        { name: "Időkép", url: "https://idokep.hu" },
        { name: "Google Maps", url: "https://maps.google.com" },
        { name: "Wikipedia", url: "https://wikipedia.hu" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-12 max-w-7xl mx-auto">
      <header className="w-full flex justify-between items-center py-6 mb-12">
        <div className="flex items-center gap-2">
          {/* Logo icon */}
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xl">
            K
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Kapu1</h1>
        </div>

        {/* Navigation links placeholder like in the image */}
        <nav className="flex items-center gap-6 text-sm font-medium text-muted">
          <SettingsModal />
          <Link href="https://github.com/miliomos/kapu1.hu" className="hover:text-foreground transition-colors hidden sm:block">Kontribució</Link>
          {/*div className="bg-card border border-border px-4 py-2 rounded-full text-foreground hover:bg-card-hover transition-colors cursor-pointer flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            Keresés
          </div*/}
        </nav>
      </header>

      <main className="flex-1 w-full max-w-5xl">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">Kezdd a napod a <span className="text-brand">Kapu1</span><br />segítségével</h2>
          <p className="text-muted max-w-xl text-lg mb-8">
            Modern, gyors és testreszabható startlap a magyar internethez. A sötét téma és az átlátható kártyarendszer segít a fókuszálásban.
          </p>

          <SearchBar />
        </div>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              Kategóriák
              <span className="text-xs font-normal bg-card border border-border px-3 py-1 rounded-full text-muted">Összes mutatása</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.title} className="bg-card p-6 border border-border rounded-[24px] hover:bg-card-hover transition-all group">
                  <h4 className="text-lg font-semibold mb-6 text-foreground/90 group-hover:text-brand transition-colors">{category.title}</h4>
                  <ul className="space-y-4">
                    {category.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-muted hover:text-foreground transition-colors py-1 group/link"
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-border group-hover/link:bg-brand transition-colors"></span>
                            {link.name}
                          </span>
                          <svg className="opacity-0 group-hover/link:opacity-100 transition-opacity text-brand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* "Ez a rész üres..." card placeholder based on screenshot */}
              <div className="bg-card p-6 border border-border border-dashed rounded-[24px] opacity-70 flex flex-col justify-center items-center text-center hover:opacity-100 transition-opacity">
                <h4 className="text-lg font-semibold mb-2">Ez a rész üres...</h4>
                <p className="text-sm text-muted mb-6">Szeretnél hozzájárulni a Kapu1 fejlődéséhez?</p>
                <button className="bg-background border border-border px-5 py-2.5 rounded-full text-sm font-medium hover:text-brand hover:border-brand transition-colors">
                  Kapcsolatfelvétel
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-5xl mt-24 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
        <p>Copyright © 2026, All Rights Reserved</p>
        {/*div className="flex gap-4">
          <Link href="#" className="hover:text-foreground transition-colors">Adatkezelés</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Rólunk</Link>
        </div*/}
      </footer>
    </div>
  );
}

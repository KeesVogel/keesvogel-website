import Link from 'next/link'
import Image from 'next/image'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-[#e8f0f8] bg-white">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="KeesVogel.ai" width={140} height={36} className="h-8 w-auto" />
          </Link>
          <Link href="/" className="text-[#3d6080] font-dm text-sm hover:text-[#00b4d8] transition-colors">
            ← Terug
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-syne font-extrabold text-[#0d1f3c] text-4xl mb-2">Privacybeleid</h1>
        <p className="text-[#7a9bb8] font-dm text-sm mb-10">Laatst bijgewerkt: mei 2026</p>

        <div className="prose prose-slate max-w-none font-dm text-[#3d6080] leading-relaxed space-y-8">

          <section>
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl mb-3">1. Wie zijn wij?</h2>
            <p>
              KeesVogel.ai is een handelsnaam van <strong className="text-[#0d1f3c]">[Jouw bedrijfsnaam]</strong>,
              ingeschreven bij de Kamer van Koophandel onder nummer <strong className="text-[#0d1f3c]">[KVK-nummer]</strong>.
            </p>
            <p className="mt-2">
              <strong className="text-[#0d1f3c]">Contactgegevens:</strong><br />
              E-mail: hallo@keesvogel.nl<br />
              Telefoon: 06 28 73 72 95<br />
              Adres: [Jouw zakelijk adres]
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl mb-3">2. Welke gegevens verzamelen wij?</h2>
            <p>Via onze website verzamelen wij de volgende persoonsgegevens:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Naam (voornaam en/of achternaam)</li>
              <li>E-mailadres</li>
              <li>IP-adres (automatisch via webserver)</li>
              <li>Datum en tijd van aanmelding</li>
              <li>Welke freebies zijn gedownload</li>
            </ul>
          </section>

          <section>
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl mb-3">3. Waarvoor gebruiken wij uw gegevens?</h2>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li><strong className="text-[#0d1f3c]">Toegang tot freebies</strong> — Om u toegang te geven tot de gratis downloads</li>
              <li><strong className="text-[#0d1f3c]">Nieuwsbrief</strong> — Alleen als u hiervoor expliciet toestemming heeft gegeven: het sturen van wekelijkse AI tips en aanbiedingen via e-mail</li>
              <li><strong className="text-[#0d1f3c]">Verbetering van onze diensten</strong> — Analyseren welke content populair is</li>
            </ul>
          </section>

          <section>
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl mb-3">4. Rechtsgrondslag</h2>
            <p>Wij verwerken uw persoonsgegevens op basis van:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-[#0d1f3c]">Toestemming (Art. 6 lid 1a AVG)</strong> — Voor het versturen van de nieuwsbrief</li>
              <li><strong className="text-[#0d1f3c]">Gerechtvaardigd belang (Art. 6 lid 1f AVG)</strong> — Voor het bijhouden van downloads en verbetering van de website</li>
            </ul>
          </section>

          <section>
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl mb-3">5. Bewaartermijn</h2>
            <p>
              Wij bewaren uw gegevens zolang u ingeschreven staat voor onze nieuwsbrief.
              Na uitschrijving verwijderen wij uw e-mailadres binnen <strong className="text-[#0d1f3c]">30 dagen</strong>.
              Download-statistieken worden geanonimiseerd bewaard voor maximaal <strong className="text-[#0d1f3c]">3 jaar</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl mb-3">6. Delen met derden</h2>
            <p>Wij delen uw gegevens met de volgende partijen:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-[#0d1f3c]">Supabase</strong> — Databaseopslag (servers in de EU)</li>
              <li><strong className="text-[#0d1f3c]">Vercel</strong> — Webhosting (verwerkt IP-adressen)</li>
            </ul>
            <p className="mt-2">Wij verkopen uw gegevens nooit aan derden.</p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl mb-3">7. Uw rechten</h2>
            <p>Op basis van de AVG heeft u de volgende rechten:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-[#0d1f3c]">Inzage</strong> — Opvragen welke gegevens wij van u bewaren</li>
              <li><strong className="text-[#0d1f3c]">Rectificatie</strong> — Onjuiste gegevens laten corrigeren</li>
              <li><strong className="text-[#0d1f3c]">Verwijdering</strong> — Verzoek om uw gegevens te laten wissen</li>
              <li><strong className="text-[#0d1f3c]">Bezwaar</strong> — Bezwaar maken tegen verwerking</li>
              <li><strong className="text-[#0d1f3c]">Uitschrijven nieuwsbrief</strong> — Via de afmeldlink onderaan elke e-mail</li>
            </ul>
            <p className="mt-2">
              Stuur uw verzoek naar <a href="mailto:hallo@keesvogel.nl" className="text-[#00b4d8] hover:underline">hallo@keesvogel.nl</a>.
              Wij reageren binnen 30 dagen.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl mb-3">8. Klachten</h2>
            <p>
              Bent u niet tevreden met hoe wij omgaan met uw gegevens? U kunt een klacht indienen bij de{' '}
              <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-[#00b4d8] hover:underline">
                Autoriteit Persoonsgegevens
              </a>.
            </p>
          </section>

        </div>

        {/* Important notice */}
        <div className="mt-12 p-5 rounded-2xl"
          style={{ background: 'rgba(255,180,0,0.06)', border: '1px solid rgba(255,180,0,0.2)' }}>
          <p className="font-dm text-sm text-[#3d6080]">
            ⚠️ <strong className="text-[#0d1f3c]">Let op (voor de eigenaar):</strong> Vul [Jouw bedrijfsnaam], [KVK-nummer] en [Jouw zakelijk adres] in voordat je dit live zet. Dit is wettelijk verplicht.
          </p>
        </div>
      </div>
    </main>
  )
}

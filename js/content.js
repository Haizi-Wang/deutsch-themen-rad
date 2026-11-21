export const APP = {
  name: "Einsatz C1",
  tagline: "30 Tage. Ab 30. Oktober. Kein Ausweichen.",
};

export const QUESTS = [
  {
    id: "mundtagebuch",
    xp: 30,
    minutes: 6,
    route: "tagebuch",
    kicker: "Output I",
    title: "Mundtagebuch",
    blurb: "Drei Minuten ungeschönt sprechen. Danach drei Nachhaken, wie von einem Freund, der nicht lockerlässt.",
  },
  {
    id: "denkduell",
    xp: 40,
    minutes: 10,
    route: "duell",
    kicker: "Output II",
    title: "Denkduell",
    blurb: "Thema würfeln, 45 Sekunden denken, Stellungnahme, dann bewusst die Gegenposition. Prüfungstreu und ungemütlich.",
  },
  {
    id: "gespraech",
    xp: 40,
    minutes: 12,
    route: "gespraech",
    kicker: "Output III",
    title: "Gesprächspartner",
    blurb: "Ein Gegenüber, das unterbricht, zweifelt, Partikeln streut und dich in umgangssprachliches Tempo zieht.",
  },
  {
    id: "feinschliff",
    xp: 25,
    minutes: 8,
    route: "feinschliff",
    kicker: "Mikro",
    title: "Feinschliff",
    blurb: "Register, Modalpartikeln, Kollokationen. Der Unterschied zwischen korrekt und deutsch.",
  },
  {
    id: "schreibsprint",
    xp: 30,
    minutes: 15,
    route: "schreiben",
    kicker: "Schrift",
    title: "Schreibsprint",
    blurb: "180–220 Wörter, klare Linie, C1-Kriterien. Kein Aufsatzmuseum, sondern Argument unter Zeitdruck.",
  },
  {
    id: "ohr",
    xp: 20,
    minutes: 12,
    route: "hoeren",
    kicker: "Input",
    title: "Ohrenschärfe",
    blurb: "Echte Sendungen, dann mündliche Zusammenfassung plus eine spitze Nachfrage. Kein Anfänger-Hörbuch.",
  },
  {
    id: "zeitung",
    xp: 22,
    minutes: 10,
    route: "zeitung",
    kicker: "Stimme",
    title: "Zeitung vorlesen",
    blurb: "Zehn Minuten Lautlesen: Rhythmus, Intonation, C1-Prosodie. Danach eine mündliche Pointe — kein Vokabelzettel.",
  },
  {
    id: "zuege",
    xp: 25,
    minutes: 8,
    route: "zuege",
    kicker: "Züge",
    title: "Sprechzüge",
    blurb: "Drei Haltungsformeln, eine Rede. Kein Vokabelzettel: sie müssen die Argumentation tragen.",
  },
];

export const DIARY_PROMPTS = [
  {
    hook: "Was ist dir heute wirklich unter die Haut gegangen?",
    followups: [
      "Warum gerade das — und nicht der Rest des Tages?",
      "Wenn jemand das bagatellisieren würde: wie widersprichst du, ohne zu predigen?",
      "Sag denselben Gedanken nochmal, aber so, als säßest du mit einem Kumpel in der Küche.",
    ],
  },
  {
    hook: "Welche Entscheidung hast du heute aufgeschoben — und was verrät das über dich?",
    followups: [
      "Ist das Faulheit, Angst oder einfach Priorität?",
      "Wie würdest du das einem Vorgesetzten erklären, ohne dich klein zu machen?",
      "Formuliere einen Satz mit „eigentlich“, der ehrlich klingt, nicht ausweichend.",
    ],
  },
  {
    hook: "Erzähl von einer Begegnung, die du im Kopf nochmal umgeschrieben hast.",
    followups: [
      "Was hättest du schärfer sagen sollen?",
      "Was wäre zu scharf gewesen?",
      "Spiele beide Versionen laut: einmal höflich-distanziert, einmal direkt.",
    ],
  },
  {
    hook: "Worüber könntest du dich heute berechtigt aufregen — tust es aber nicht?",
    followups: [
      "Ist Zurückhaltung hier Stärke oder Selbstverrat?",
      "Wie klingt derselbe Ärger auf Deutsch, ohne ins Klagen zu kippen?",
      "Bring drei Modalpartikeln unter: doch, halt, eben.",
    ],
  },
  {
    hook: "Welcher Gedanke hat dich heute unproduktiv gemacht?",
    followups: [
      "Kannst du ihn in einem Satz entzaubern?",
      "Was wäre die erwachsene Version dieses Gedankens?",
      "Sprich 40 Sekunden nur in kurzen, klaren Sätzen. Kein Schachtelsatz.",
    ],
  },
  {
    hook: "Was hast du heute so gesagt, dass es fast wahr klang — aber nicht ganz war?",
    followups: [
      "Korrigiere dich jetzt, ohne dich zu entschuldigen.",
      "Wo liegt die Nuance zwischen Diplomatie und Unehrlichkeit?",
      "Finde ein deutsches Idiom, das den Sachverhalt besser trifft als deine erste Formulierung.",
    ],
  },
];

export const WHEEL_TOPICS = [
  { label: "Alltag", name: "Alltag, der hängen bleibt", hint: "Nicht das Wetter. Ein Moment, der dich entlarvt hat." },
  { label: "Beruf", name: "Arbeit und Macht", hint: "Hierarchie, Unsichtbarkeit, Anerkennung — ohne LinkedIn-Sprech." },
  { label: "Gesellschaft", name: "Gesellschaftlicher Riss", hint: "Nimm eine Position. Halte sie. Dann brich sie selbst." },
  { label: "Kultur", name: "Kultur und Zugehörigkeit", hint: "Wo fühlst du dich fremd, obwohl du die Sprache kannst?" },
  { label: "Sport", name: "Körper und Ehrgeiz", hint: "Disziplin, Verletzlichkeit, Vergleich — ohne Motivationsposter." },
  { label: "Reisen", name: "Orte und Klassenfrage", hint: "Wer darf reisen, wer gehört, wer bleibt Kulisse?" },
  { label: "Essen", name: "Essen als Haltung", hint: "Geschmack, Herkunft, Moral. Nicht das Rezept." },
  { label: "Bindung", name: "Nähe und Distanz", hint: "Freundschaft, Familie, das Unausgesprochene." },
  { label: "Bildung", name: "Bildung und Dünkel", hint: "Was misst Sprache wirklich — und was täuscht sie vor?" },
  { label: "Umwelt", name: "Klima ohne Predigt", hint: "Widerspruch aushalten: Anspruch gegen Alltag." },
  { label: "Medien", name: "Medien und Aufmerksamkeit", hint: "Was formt deine Meinung, ohne dass du es merkst?" },
  { label: "Freizeit", name: "Freizeit als Inszenierung", hint: "Hobby, Flucht, Identität. Sei unsentimental." },
];

export const THESES = [
  "Homeoffice macht uns bequemer, nicht freier.",
  "Integration scheitert öfter an Erwartungen als an Sprache.",
  "Soziale Medien haben die Scham zerstört, nicht die Öffentlichkeit.",
  "Wer ständig über Work-Life-Balance redet, hat oft keine drängende Arbeit.",
  "Deutschland diskutiert zu viel und entscheidet zu spät.",
  "KI macht mittelmäßige Texte billig — und gute Texte teurer.",
  "Höflichkeit ist in Deutschland oft eine Form von Distanz, nicht von Wärme.",
  "Universitäten züchten Absicherung, nicht Urteilskraft.",
  "Klimaschutz ohne Verzichtssprache ist Selbstbetrug.",
  "Wer nur in der Muttersprache denkt, bleibt in der Zweitsprache höflich und unscharf.",
  "Prüfungen messen Leistung unter Angst, nicht Können unter Leben.",
  "Freundlichkeit im Service ist in DE oft optional — und das ist kein Kulturstolz, sondern Nachlässigkeit.",
  "Migration debattiert man ehrlicher am Stammtisch als in der Sonntagsrede. Das ist ein Problem.",
  "Wer C1 hat, darf aufhören, dankbar zu klingen, und anfangen, unbequem zu argumentieren.",
];

export const SCENES = [
  {
    id: "gehalt",
    title: "Gehaltsgespräch",
    role: "Teamleitung, knapp, nicht unfreundlich",
    register: "formell, aber druckvoll",
    opening: "Gut, dann legen wir los. Sie wollen mehr. Warum jetzt — und warum ausgerechnet so viel?",
    probes: [
      "Das klingt nach Gefühl. Geben Sie mir eine Zahl und eine Begründung, die ich weiterreichen kann.",
      "Ihr Kollege macht denselben Job. Warum Sie?",
      "Wenn ich nein sage: was dann? Drohen Sie — oder verhandeln Sie?",
      "Formulieren Sie denselben Anspruch nochmal kürzer. Ohne Weichspüler.",
    ],
  },
  {
    id: "stammtisch",
    title: "Küchentisch, 23 Uhr",
    role: "Freundin, die widerspricht, weil sie dich ernst nimmt",
    register: "umgangssprachlich, schnell, mit Partikeln",
    opening: "Na warte. Das, was du eben gesagt hast — meinst du das ernst oder klingt das nur schlau?",
    probes: [
      "Halt, halt. Du schiebst das Problem auf 'die Gesellschaft'. Was ist dein Anteil?",
      "Klingt irgendwie nach Ausrede. Oder hör ich das nur so?",
      "Okay, dann spitz: Was soll man deiner Meinung nach konkret tun? Nicht das große WIR.",
      "Sag das nochmal, aber so, dass deine Oma es nicht für eine Sonntagsrede hält.",
    ],
  },
  {
    id: "vermieter",
    title: "Beim Vermieter",
    role: "Sachbearbeiterin, formal, leicht genervt",
    register: "förmlich, Paragraphenluft",
    opening: "Ich habe Ihre Mail gelesen. Bevor wir uns im Ton vergreifen: Was genau fordern Sie — und auf welcher Grundlage?",
    probes: [
      "Das ist Ihre Wahrnehmung. Haben Sie Belege oder nur Ärger?",
      "Andere Mieter kommen damit klar. Warum Sie nicht?",
      "Wir können den Vorgang aufsetzen. Wollen Sie Eskalation oder eine Lösung in diesem Monat?",
      "Bitte einen Satz, den ich ins Protokoll schreiben kann. Keine Empörung.",
    ],
  },
  {
    id: "podcast",
    title: "Podcast-Interview",
    role: "Moderatorin, höflich, aber sie lässt Sie nicht entkommen",
    register: "öffentlich, pointiert",
    opening: "Sie sitzen hier als jemand, der zwischen Sprachen lebt. Was verlieren Sie auf Deutsch — und was gewinnen Sie, das niemand sieht?",
    probes: [
      "Das war elegant. Jetzt bitte unbequem.",
      "Ihre These würde in Berlin Applaus bekommen. Überlebt sie außerhalb der Blase?",
      "Ein Satz, den Sie früher nicht hätten sagen dürfen. Sagen Sie ihn jetzt.",
      "Wenn ich Sie falsch verstanden habe, korrigieren Sie mich scharf, nicht höflich.",
    ],
  },
  {
    id: "konferenz",
    title: "Standup, 9:12",
    role: "Kollege, der alles 'kurz' machen will und trotzdem bohrt",
    register: "Bürodeutsch mit Ironie",
    opening: "Kurz, ja? Du warst gestern nicht überzeugt. Was genau knirscht — Zeit, Zuständigkeit oder die Idee selbst?",
    probes: [
      "Das ist zu weich. Blockiert das den Sprint oder nur dein Bauchgefühl?",
      "Wenn du die Entscheidung träfest: wen verprellst du bewusst?",
      "Sag den Satz, den im Protokoll niemand schreiben will.",
      "Jetzt auf C1-Chefdeutsch, dann nochmal auf Mensch.",
    ],
  },
  {
    id: "pruefung",
    title: "TELC C1 · mündliche Prüfung",
    role: "Prüferin, die Lücken in der Argumentation riecht",
    register: "akademisch, unerbittlich höflich",
    opening: "Gut. Vorbereitung ist um. Sie haben das Wort — bitte Ihre Präsentation, ohne abzulesen.",
    probes: [
      "Ein Gegenbeispiel, bitte. Kein Strohmann.",
      "Unterscheiden Sie Ursache, Anlass und Vorwand.",
      "Sie generalisieren. Für wen gilt das nicht?",
      "Schließen Sie in vier Sätzen, ohne 'zusammenfassend möchte ich sagen'.",
    ],
  },
];

/** Solo-Simulation der telc Deutsch C1 (Paarprüfung, dein Anteil). */
export const TELC = {
  official: [
    {
      id: "vorbereitung",
      label: "Vorbereitung",
      secs: 20 * 60,
      partner: false,
      hint: "20 Minuten, offiziell. Stichworte nur. Keine ausformulierten Sätze zum Ablesen. Gliederung: Einstieg, zwei Argumente, ein Einwand, Landung.",
    },
    {
      id: "praesentation",
      label: "Präsentation",
      secs: 4 * 60,
      partner: false,
      hint: "Ca. 4 Minuten — dein Anteil als Einzelkandidat. Linie in 20 Sekunden, nicht vorlesen, landen ohne Floskel.",
    },
    {
      id: "nachfragen",
      label: "Nachfragen",
      secs: 3 * 60,
      partner: true,
      hint: "Prüferin bohrt. Kurz, präzise, nicht die Präsentation wiederholen.",
    },
    {
      id: "diskussion",
      label: "Diskussion",
      secs: 6 * 60,
      partner: true,
      hint: "Streitfrage. Du hältst, räumst ein, widersprichst. Kein Referat zu zweit.",
    },
  ],
  kurz: [
    {
      id: "vorbereitung",
      label: "Vorbereitung",
      secs: 5 * 60,
      partner: false,
      hint: "Kurzmodus: 5 Minuten Stichworte. Dieselbe Gliederung wie im Ernstfall.",
    },
    {
      id: "praesentation",
      label: "Präsentation",
      secs: 3 * 60,
      partner: false,
      hint: "3 Minuten. Linie, ein Einwand, Landung.",
    },
    {
      id: "nachfragen",
      label: "Nachfragen",
      secs: 2 * 60,
      partner: true,
      hint: "Zwei Minuten Nachhaken. Nicht ausweichen.",
    },
    {
      id: "diskussion",
      label: "Diskussion",
      secs: 4 * 60,
      partner: true,
      hint: "4 Minuten Diskussion. Gegenposition ernst nehmen.",
    },
  ],
};

export const TELC_PROBES = {
  nachfragen: [
    "Wo ist der schwächste Punkt — und warum tragen Sie die These trotzdem?",
    "Ein Gegenbeispiel, bitte. Kein Strohmann.",
    "Unterscheiden Sie Ursache, Anlass und Vorwand.",
    "Für wen gilt das nicht?",
  ],
  diskussion: [
    "Ich sehe das anders. Begründen Sie, ohne zu predigen.",
    "Was wäre die erwachsene Version Ihrer Gegnerposition?",
    "Spitz: was soll konkret passieren — nicht das große WIR?",
    "Schließen Sie in vier Sätzen, ohne 'zusammenfassend möchte ich sagen'.",
  ],
};

export const KI_SYSTEM = `Du bist kein Lehrer und keine Bewertungsmaschine.
Auftrag: nur Sprachgefühl. Keine Note, kein Punktestand, kein C1/C2-Label, kein „gut gemacht“, keine Grammatikvorlesung, keine Listen, kein Englisch, keine Didaktik.

Wenn die letzte Äußerung unnativ klingt (Register daneben, tote Kollokation, Calque, Weichspüler, fehlende Partikel, Lehrbuchrhythmus):
- Genau ein Satz: „So eher: …“ (eine gesprächsfähige Variante)
- Dann sofort in der Rolle weiterreden, 1–3 Sätze, Inhalt vorantreiben.

Wenn es schon sitzt: nichts korrigieren. Nur in der Rolle antworten.
Zweifle am Argument, nicht am Menschen. Bleib im Register der Szene.`;

export const KI_LAUTLESEN = `Zusatz: Lautlesen einer Zeitung, kein Gespräch.
Du korrigierst Aussprache und Sprachgefühl nach dem Vorlesen.
Keine Note, kein Punktestand, kein C1/C2, kein „gut gemacht“, keine Grammatikvorlesung, kein Vokabelzettel, kein Englisch.

Form, knapp:
- Höchstens drei Treffer. Jeder beginnt mit „So eher: …“
- Danach ein kurzer Klanghinweis: Betonung, Silbe, Verschleifung, Pause, Register — WIE es klingen soll, nicht WARUM die Regel gilt.
- Triff Partikeln, Kollokationen, Rhythmus, Wortakzent. Nicht den Inhalt des Artikels zensieren.
- Transkript kann lückenhaft sein. Wenn es dünn ist: typische Lautlese-Haltung (Monotonie, Lehrbuchsilben, fehlende Reduktion), nicht raten, was jemand „falsch übersetzt“ hat.
- Bleib kurz.`;

export const LAUTLESEN_LOCAL = [
  {
    line: "nicht jede Silbe gleich laut. Last aufs Inhaltswort, der/und/zu nur mitlaufen lassen.",
    sound: "ein Atembogen, dann ein Schlag — nicht: Tak-Tak-Tak wie im Lehrbuch.",
  },
  {
    line: "ham wir / is’ halt so — leichte Verschleifung, kein ausgeschriebenes „haben wir“.",
    sound: "die zweite Silbe von haben fast weg; nicht schlampig, nur verbunden.",
  },
  {
    line: "Wortakzent vorziehen: poLItik, wirtSCHAFT, nicht PO-li-tik auf jeder Silbe.",
    sound: "eine betonte Silbe, der Rest fällt. Finger auf die betonte.",
  },
  {
    line: "am Komma atmen, nicht mitten im Relativsatz. Die Stimme am Satzende fallen lassen.",
    sound: "Nachrichtenton: Landung, kein Fragebogen, wo keiner hingehört.",
  },
  {
    line: "Monotonie kappen: ein Satz höher ansetzen, der nächste tiefer — Haltung, nicht Singsang.",
    sound: "Kommentar: eine Spur Ironie in der Stimme, nicht in der Lautstärke.",
  },
  {
    line: "Zahlen voll und ruhig, Namen nicht verschlucken. Danach eine Mini-Pause.",
    sound: "die Zahl trägt; drumherum leiser. Kein Beschleunigen aus Nervosität.",
  },
  {
    line: "Partikel hörbar, aber unbetont: doch, halt, eben — nicht als Fremdwort markieren.",
    sound: "kurz, mittig, ohne Extra-Druck. Wenn du sie betonst, klingt’s nach Übung.",
  },
  {
    line: "Register halten: Nachricht bleibt kühl, Kommentar darf spitz, Interview zwei Stimmen.",
    sound: "Zitat eine Spur höher oder enger; Einordnung wieder in deiner Stimme.",
  },
];

export const PARTNER_FILLERS = [
  "Mhm.",
  "Na ja.",
  "Echt jetzt?",
  "Moment.",
  "Das musst du genauer sagen.",
  "Klingt rund, ist aber glatt.",
  "Okay — und der Haken?",
  "Das überzeugt mich halb.",
];

export const NUANCE = [
  {
    tag: "Partikel",
    off: "Das ist ein Problem.",
    task: "Mach den Satz gesprächsfähig: Zweifel, Gemeinsamkeit, leichte Ungeduld. Mindestens eine Partikel.",
    natives: [
      "Das ist halt ein Problem.",
      "Das ist doch ein Problem, oder?",
      "Naja, das ist schon ein Problem.",
    ],
    why: "Ohne Partikel klingt C1 oft wie ein Lehrbuch. 'halt/doch/schon' tragen Haltung, nicht nur Inhalt.",
  },
  {
    tag: "Register",
    off: "Ich möchte Ihnen mitteilen, dass ich mit der Situation unzufrieden bin.",
    task: "Zwei Versionen: 1) Mail an die Behörde. 2) Satz zu einer Freundin. Nicht dieselbe Höflichkeit.",
    natives: [
      "Behörde: Hiermit möchte ich mein Unverständnis über den bisherigen Ablauf zum Ausdruck bringen.",
      "Freundin: Ich find das echt nicht in Ordnung.",
      "Mitte: Mir reicht's langsam mit der Nummer.",
    ],
    why: "C1 heißt nicht 'immer förmlich'. C1 heißt, das Register treffen, nicht das höchste.",
  },
  {
    tag: "Kollokation",
    off: "Diese Idee macht eine große Wirkung auf die Leute.",
    task: "Ersetze das Verb-Noun-Paar durch etwas, das man so sagt.",
    natives: [
      "Diese Idee kommt gut an.",
      "Das schlägt ganz schön ein.",
      "Das zieht Kreise.",
    ],
    why: "'eine Wirkung machen' ist calque. Deutsch: Wirkung erzielen, ankommen, einschlagen.",
  },
  {
    tag: "Schärfe",
    off: "Ich bin nicht einverstanden mit Ihrer Meinung.",
    task: "Widersprich, ohne steif zu wirken. Eine Version scharf, eine diplomatisch.",
    natives: [
      "Da muss ich widersprechen.",
      "So würde ich das nicht sehen.",
      "Moment, das sehe ich anders — und zwar deshalb:",
    ],
    why: "'nicht einverstanden sein mit' ist korrekt und tot. Widerspruch braucht Bewegung.",
  },
  {
    tag: "Weichspüler",
    off: "Vielleicht könnte man eventuell irgendwie darüber nachdenken, ob das möglich wäre.",
    task: "Streiche die Absicherung. Ein klarer Satz. Dann ein klarer Satz mit genau einer Absicherung.",
    natives: [
      "Das sollten wir prüfen.",
      "Das geht. Punkt.",
      "Das geht, sofern die Frist hält.",
    ],
    why: "Fortgeschrittene verstecken Unsicherheit in Modalverben. C1 darf präzise weich sein, nicht neblig.",
  },
  {
    tag: "False Friend",
    off: "Ich werde das Buch bekommen. / Das ist aktuell nicht möglich. / Eventuell komme ich.",
    task: "Erkläre die Fallen und sag die Sätze so, wie ein Muttersprachler sie meint.",
    natives: [
      "bekommen = erhalten, nicht 'become'.",
      "aktuell = derzeit, nicht 'actual'.",
      "eventuell = möglicherweise, oft schwächer als 'eventually'.",
    ],
    why: "Diese drei überleben bis C1, weil sie 'fast' stimmen. Fast ist hier falsch.",
  },
  {
    tag: "Idiom",
    off: "Das ist nicht meine Tasse Tee, aber ich werde mein Bestes geben.",
    task: "Weniger Kalauer, mehr Alltag. Finde zwei Idiome, die nicht nach Austauschjahr klingen.",
    natives: [
      "Liegt mir nicht so, aber ich zieh's durch.",
      "Nicht mein Ding — ich mach's trotzdem anständig.",
      "Da beiß ich mich durch.",
    ],
    why: "Lehrbuch-Idiome markieren dich. Alltagsidiome tun so, als wärst du schon länger da.",
  },
  {
    tag: "Satzrhythmus",
    off: "Weil ich gestern keine Zeit hatte, habe ich das nicht gemacht, obwohl ich eigentlich vorhatte, das zu erledigen.",
    task: "Brich ihn. Setze einen Schlag. Dann einen Nachsatz.",
    natives: [
      "Gestern: keine Zeit. Deshalb liegt's noch.",
      "Ich wollt's machen. Kam nichts bei rum.",
      "Geplant war's. Passiert ist nichts.",
    ],
    why: "Mündlichkeit lebt von Kola, nicht von Weil-Nebensatz-Kaskaden.",
  },
  {
    tag: "Haltung",
    off: "Man sollte mehr tun.",
    task: "Ersetze 'man'. Nimm Stellung. Wen meinst du — und was genau?",
    natives: [
      "Die Stadt muss die Taktung erhöhen. Nicht 'man'.",
      "Ich halt die Klappe zu oft. Das ändert sich.",
      "Wer hier entscheidet, muss sichtbarer werden.",
    ],
    why: "'man' ist die Flucht vor Verantwortung. In Debatten ein C1-Verräter.",
  },
  {
    tag: "Ironie",
    off: "Das ist sehr interessant.",
    task: "Einmal ernst, einmal leicht giftig, einmal eindeutig positiv. Betonung entscheidet.",
    natives: [
      "Interessant. Wirklich.",
      "Na das ist ja mal interessant.",
      "Das find ich tatsächlich spannend — wegen X.",
    ],
    why: "Ohne Prosodie ist Deutsch oft missverständlich. Sag, welche Haltung du meinst.",
  },
];

export const WRITING = [
  {
    title: "Leserkommentar",
    prompt: "Eine Stadt streicht den Nachtverkehr, 'weil zu wenig Nachfrage'. Schreiben Sie 180–220 Wörter: These, ein Gegenargument, das Sie ernst nehmen, dann Ihre Linie. Kein Moralisieren.",
  },
  {
    title: "Interne Mail",
    prompt: "Ein Projekt kippt, weil zwei Abteilungen sich die Zuständigkeit zuschieben. Schreiben Sie eine Mail an beide Leitungen: klar, knapp, ohne Schuldzuweisungstheater, mit einer konkreten Bitte.",
  },
  {
    title: "Stellungnahme",
    prompt: "„Prüfungen auf C1 sollten Sprechen stärker gewichten als Schreiben.“ Position beziehen. Ein Beispiel aus Ihrem Alltag. Ein Limit Ihrer These.",
  },
  {
    title: "Gegendarstellung",
    prompt: "Jemand behauptet, mehrsprachige Menschen seien automatisch weltoffener. Widersprechen Sie differenziert, nicht giftig. 180–220 Wörter.",
  },
  {
    title: "Szene in Prosa",
    prompt: "Beschreiben Sie 180 Wörter lang einen Raum, in dem eine unangenehme Wahrheit gesagt wird. Mehr Haltung als Adjektive. Dialog maximal drei Zeilen.",
  },
];

export const LISTEN = [
  {
    name: "Tagesschau",
    url: "https://www.tagesschau.de",
    why: "Standardregister, Tempo der Nachrichten, politische Kollokationen.",
    task: "90 Sekunden mündliche Zusammenfassung, dann eine Frage, die in der Meldung nicht beantwortet wird.",
  },
  {
    name: "Deutschlandfunk — Interview",
    url: "https://www.deutschlandfunk.de",
    why: "Lange Atemzüge, Einwände, höfliches Bohren. Ideal für Prüfungsdiskussion.",
    task: "Notiere drei Einwürfe des Moderators. Sprich sie nach, dann antworte, als wärst du Gast.",
  },
  {
    name: "DW — Fokus Europa / Themen",
    url: "https://www.dw.com/de",
    why: "Klare Argumentbögen, weniger Boulevard, gute Überleitungen.",
    task: "Gib die Gegenseite wieder, fairer als der Beitrag selbst.",
  },
  {
    name: "ZEIT / SZ — ein Leitartikel",
    url: "https://www.zeit.de",
    why: "Satzbau der meinungsstarken Presse. Lesen, dann frei nacherzählen.",
    task: "Kürze den Text mündlich auf fünf Sätze, ohne die Pointe zu verlieren.",
  },
  {
    name: "Fest & Flauschig / Hofmeisters / ein Talk",
    url: "https://open.spotify.com",
    why: "Partikeln, Abbrüche, Timing, Berliner/norddeutsches Plaudern.",
    task: "Shadowing: 20 Sekunden nachsprechen, dann denselben Inhalt 'sauber' und 'kneipig'.",
  },
];

/** Tägliches Lautlesen. Links zu Rubriken/Aufmachern — kein Abschreiben ganzer Artikel. */
export const PRESS = [
  {
    outlet: "Tagesschau",
    genre: "Nachricht",
    title: "Inland-Aufmacher",
    url: "https://www.tagesschau.de/inland",
    read: "Nimm den ersten Inland-Aufmacher. Lies die ersten vier Absätze laut, Namen und Zahlen voll, ohne zu stocken.",
    followup: "60 Sekunden: Was stellt die Meldung als Fakt hin, das eine Haltung ist? Sag es, ohne die Sendung nachzuplappern.",
  },
  {
    outlet: "ZEIT",
    genre: "Kommentar",
    title: "Meinung, erster Leittext",
    url: "https://www.zeit.de/meinung",
    read: "Öffne den obersten Kommentar. Lies ihn laut bis zur Pointe — Betonung auf Kontrast und Konjunktiv, nicht auf Lautstärke.",
    followup: "90 Sekunden Kritik: Wo wird zugespitzt, wo wird geschont? Eine Satzmelodie, die du behalten willst.",
  },
  {
    outlet: "SZ",
    genre: "Reportage",
    title: "Gesellschaft vor Ort",
    url: "https://www.sueddeutsche.de/thema/Gesellschaft",
    read: "Eine Reportage, kein Kurzmeldungstext. Lies eine Szene (ca. 250 Wörter) so, als säßest du in der Küche, nicht im Studio.",
    followup: "60 Sekunden: Welche Figur kommt zu kurz — und wie würdest du den Absatz mündlich umbauen?",
  },
  {
    outlet: "DW",
    genre: "Nachricht",
    title: "Klima ohne Predigt",
    url: "https://www.dw.com/de/thema/klima/s-11798",
    read: "Wähle den aktuellen Klima-Text. Lautlesen: Fachwörter nicht verschlucken, Relativsätze atmen.",
    followup: "Eine mündliche Pointe: Was bleibt Verzicht, was bleibt Technikglaube? 60 Sekunden, kein Man.",
  },
  {
    outlet: "ZEIT",
    genre: "Interview",
    title: "Arbeit und Macht",
    url: "https://www.zeit.de/arbeit",
    read: "Ein Interview oder langes Porträt. Lies drei Frage-Antwort-Paare laut: zwei Stimmen, zwei Tempi.",
    followup: "Du bist der Gast. 60 Sekunden Antwort auf die schärfste Frage — ohne Weichspüler.",
  },
  {
    outlet: "Tagesschau",
    genre: "Reportage",
    title: "Investigativ / langer Atem",
    url: "https://www.tagesschau.de/investigativ",
    read: "Ein längerer Text, nicht die 20-Uhr-Kurzfassung. Lies den Einstieg plus den Absatz mit der entscheidenden Zahl.",
    followup: "90 Sekunden: die Zahl nochmal, dann was sie nicht erklärt.",
  },
  {
    outlet: "SZ",
    genre: "Kommentar",
    title: "Leitartikel Politik",
    url: "https://www.sueddeutsche.de/meinung",
    read: "Der Leitkommentar des Tages. Laut, prüfungstauglich: klare Absätze, keine Schaukelstimme.",
    followup: "Widersprich der These 60 Sekunden, als säße die Autorin gegenüber.",
  },
  {
    outlet: "DW",
    genre: "Interview",
    title: "Deutschland, nachgefragt",
    url: "https://www.dw.com/de/deutschland/s-1432",
    read: "Text mit Zitaten oder Interviewpassagen. Lies Zitat und Einordnung in zwei Registern.",
    followup: "Eine Nachfrage, die im Text fehlt. Laut, 40 Sekunden, dann deine Antwort.",
  },
  {
    outlet: "ZEIT",
    genre: "Nachricht",
    title: "Wirtschaft, Zahlen tragen",
    url: "https://www.zeit.de/wirtschaft",
    read: "Aufmacher Wirtschaft. Jede Zahl voll aussprechen, kein „irgendwas Prozent“.",
    followup: "60 Sekunden: Was würde ein Betriebsrat anders betonen?",
  },
  {
    outlet: "Tagesschau",
    genre: "Nachricht",
    title: "Wohnen / Alltagspolitik",
    url: "https://www.tagesschau.de/thema/wohnen",
    read: "Ein Text zu Miete, Bau, Stadt. Lautlesen bis zur ersten konkreten Frist oder Forderung.",
    followup: "Du bist Mieterin. 60 Sekunden an die Verwaltung — förmlich, nicht klein.",
  },
  {
    outlet: "SZ",
    genre: "Kommentar",
    title: "Kultur und Feuilleton",
    url: "https://www.sueddeutsche.de/kultur",
    read: "Ein Kulturkommentar. Satzmelodie mitdenken: Ironie markieren, ohne zu grinsen.",
    followup: "Kürze den Text mündlich auf fünf Sätze. Die Pointe muss überleben.",
  },
  {
    outlet: "DW",
    genre: "Reportage",
    title: "Sprache, Bildung, Dünkel",
    url: "https://www.dw.com/de/thema/bildung/s-5100",
    read: "Ein Bildungsstück. Lies den Absatz, in dem Bewertungen stecken, nicht nur Fakten.",
    followup: "60 Sekunden: Was misst Sprache hier wirklich — und was täuscht sie vor?",
  },
  {
    outlet: "Tagesschau",
    genre: "Nachricht",
    title: "Innenpolitik, Tempo",
    url: "https://www.tagesschau.de/inland/innenpolitik",
    read: "Kurzer, dichter Inlandstext. Tempo hoch, Artikulation bleibt. Kein Verschlucken der Endungen.",
    followup: "Kneipig nacherzählen, 45 Sekunden, Inhalt bleibt, Register kippt.",
  },
  {
    outlet: "ZEIT",
    genre: "Kommentar",
    title: "Hochschule und Urteil",
    url: "https://www.zeit.de/campus",
    read: "Campus- oder Bildungsmeinung. Lautlesen, bis du merkst, wo der Text absichert statt urteilt.",
    followup: "90 Sekunden: Streiche die Absicherung. Sag das Urteil.",
  },
  {
    outlet: "SZ",
    genre: "Interview",
    title: "Politik im Gespräch",
    url: "https://www.sueddeutsche.de/politik",
    read: "Interview oder langes Q&A in der Politikrubrik. Zwei Stimmen, Pausen an den Fragen.",
    followup: "Die unbequeme Nachfrage, die fehlt. Dann 60 Sekunden als Gast.",
  },
  {
    outlet: "DW",
    genre: "Nachricht",
    title: "Europa, klare Linie",
    url: "https://www.dw.com/de/thema/europa/s-1433",
    read: "Europa-Aufmacher. Lies bis zur zweiten Quelle. Intonation: Distanz, nicht Begeisterung.",
    followup: "Überlebt die These außerhalb der Blase? 60 Sekunden, ja oder nein mit Grund.",
  },
  {
    outlet: "Tagesschau",
    genre: "Nachricht",
    title: "Wirtschaft, Standup-Ton",
    url: "https://www.tagesschau.de/wirtschaft",
    read: "Wirtschaftstext, den du in 7 Minuten schaffst. Betonung auf Zuständigkeit, nicht Stimmung.",
    followup: "Ein Satz fürs Protokoll, dann 45 Sekunden Begründung. Kein Bauchgefühl.",
  },
  {
    outlet: "ZEIT",
    genre: "Kommentar",
    title: "Gesellschaftlicher Riss",
    url: "https://www.zeit.de/gesellschaft",
    read: "Gesellschaftskommentar. Laut, ohne Predigtstimme. Wo das Pathos sitzt, runtergehen.",
    followup: "Die Frage, die der Text nicht stellt. Laut. Dann fair die Gegenseite, 60 Sekunden.",
  },
  {
    outlet: "SZ",
    genre: "Reportage",
    title: "Wissen, Ton treffen",
    url: "https://www.sueddeutsche.de/wissen",
    read: "Ein Wissensstück. Fachwörter einmal langsam, dann im Satzfluss. Kein Lehrerduktus.",
    followup: "Erklär denselben Befund einem Kumpel. 60 Sekunden, ohne dümmer zu werden.",
  },
  {
    outlet: "DW",
    genre: "Interview",
    title: "Kulturgespräch",
    url: "https://www.dw.com/de/kultur/s-1441",
    read: "Interview oder Porträt Kultur. Shadow-Lesen: Rhythmus der Antworten stehlen, Haltung behalten.",
    followup: "90 Sekunden eigene Rede im gestohlenen Rhythmus zum selben Thema.",
  },
  {
    outlet: "Tagesschau",
    genre: "Kommentar",
    title: "Kommentar zur Lage",
    url: "https://www.tagesschau.de/kommentar",
    read: "Ein Kommentar, nicht die Nachricht. Lies ihn als Rede: Landung am Schluss, nicht Ausschweifen.",
    followup: "Der Einwand, den du fürchtest. Laut, dann Replik ohne Predigt. 90 Sekunden.",
  },
  {
    outlet: "ZEIT",
    genre: "Nachricht",
    title: "Politik, kurze Sätze laut",
    url: "https://www.zeit.de/politik",
    read: "Politik-Aufmacher. Beim Vorlesen Sätze an den Kommas atmen. Kein Endlosbogen.",
    followup: "Spitz gesagt: 60 Sekunden Zuspitzung, dann eine Nuance zurück — nicht in den Nebel.",
  },
  {
    outlet: "SZ",
    genre: "Kommentar",
    title: "Klima / Umwelt, Meinung",
    url: "https://www.sueddeutsche.de/thema/Klimawandel",
    read: "Meinungs- oder Analysestück Klima. Lautlesen, bis ein Verzichtsargument fällt — oder auffällt, dass keins kommt.",
    followup: "Fairerweise … trotzdem. 60 Sekunden, ein Zugeständnis, ein Haken.",
  },
  {
    outlet: "DW",
    genre: "Nachricht",
    title: "Wirtschaft, Pflicht hat ein Gesicht",
    url: "https://www.dw.com/de/wirtschaft/s-1431",
    read: "Wirtschaftstext mit Akteuren. Namen voll, Funktionen voll. Kein „man“ beim Vorlesen einschmuggeln.",
    followup: "Wen nimmst du in die Pflicht? Name, Handlung, Frist. 60 Sekunden.",
  },
  {
    outlet: "Tagesschau",
    genre: "Reportage",
    title: "Ausland, Szene statt Abstraktum",
    url: "https://www.tagesschau.de/ausland",
    read: "Auslandsreportage oder langer Lagebericht. Eine Szene laut, dann den Einordnungssatz.",
    followup: "Kneipig, 60 Sekunden, dasselbe. Welche Version ist wahrer?",
  },
  {
    outlet: "ZEIT",
    genre: "Kommentar",
    title: "Digital / KI, beide Hände",
    url: "https://www.zeit.de/digital",
    read: "Ein Digital- oder KI-Text. Lies den Absatz, der Begeisterung verkauft, und den, der bremst — gleich laut.",
    followup: "90 Sekunden dagegen, als glaubtest du die Gegenseite. Dann: was hältst du noch?",
  },
  {
    outlet: "SZ",
    genre: "Nachricht",
    title: "Sprache im Blatt",
    url: "https://www.sueddeutsche.de/",
    read: "Aufmacher der Startseite. Markiere beim Lautlesen drei Formulierungen, die fast Englisch denken.",
    followup: "Sag den Absatz nochmal, nativer. 45 Sekunden. Kein Entschuldigen für den ersten Take.",
  },
  {
    outlet: "DW",
    genre: "Interview",
    title: "Wissenschaft im Gespräch",
    url: "https://www.dw.com/de/wissenschaft/s-12525",
    read: "Interview oder Erklärstück Wissenschaft. Fragen als Pausen, Antworten als Linie.",
    followup: "Der Einstieg, den du morgen in einer Prüfung nutzen würdest. Ein Take. 60 Sekunden.",
  },
  {
    outlet: "ZEIT",
    genre: "Reportage",
    title: "Langer Text, eine Linie",
    url: "https://www.zeit.de/gesellschaft",
    read: "Eine Reportage, nicht der Aufmacher. 7 Minuten Lautlesen an einer Stelle, die trägt — nicht springen.",
    followup: "Was klingt nach dir, auf Deutsch, in diesem Stoff? 90 Sekunden, nicht danken, halten.",
  },
  {
    outlet: "Tagesschau",
    genre: "Nachricht",
    title: "Tag-30-Aufmacher",
    url: "https://www.tagesschau.de/",
    read: "Der Aufmacher der Startseite. Ein Durchgang, kein Netz, keine zweite Stimme im Kopf.",
    followup: "Mündliche Prüfung: 60 Sekunden These zum Text, 30 Sekunden Gegenwind, Landung.",
  },
];

export const ZUEGE = [
  {
    fn: "Widersprechen",
    chunk: "So würd ich das nicht stehen lassen.",
    ban: "Nicht: „Ich bin anderer Meinung.“",
    load: "Du nimmst den Satz des Gegenübers vom Tisch. Danach kommt der Grund, sonst ist es Pose.",
  },
  {
    fn: "Einräumen",
    chunk: "Unbestritten — aber das trägt nicht weit.",
    ban: "Nicht: „Ja, aber …“ ohne Gewicht.",
    load: "Du gibst etwas her, damit der Gegenangriff härter sitzt.",
  },
  {
    fn: "Zuspitzen",
    chunk: "Spitz gesagt:",
    ban: "Nicht als Deko vor einem weichen Satz.",
    load: "Danach darf nur noch die schärfste Fassung stehen, nicht die höfliche.",
  },
  {
    fn: "Distanz",
    chunk: "Das unterstellt eine Absicht, die ich so nicht teile.",
    ban: "Nicht: „Das ist unfair.“",
    load: "Du trennst Vorwurf und Sachverhalt, ohne in Beleidigtsein zu kippen.",
  },
  {
    fn: "Alltag",
    chunk: "Da mach ich keinen Hehl draus.",
    ban: "Nicht: „Ich möchte ehrlich sagen.“",
    load: "Haltung vor Inhalt. Der nächste Satz muss konkret werden.",
  },
  {
    fn: "Grenze",
    chunk: "Das geht mir gehörig gegen den Strich.",
    ban: "Nicht: „Das mag ich nicht.“",
    load: "Ärger mit Körper. Sag, was du stattdessen forderst.",
  },
  {
    fn: "Tempo",
    chunk: "Ich halt den Ball erstmal flach — und zwar weil",
    ban: "Nicht: „Vielleicht sollten wir später …“",
    load: "Ruhe als Strategie, nicht als Ausweichen. Der Weil-Satz ist Pflicht.",
  },
  {
    fn: "Leerlauf",
    chunk: "Das läuft ins Leere, wenn",
    ban: "Nicht: „Das bringt nichts.“",
    load: "Du nennst die Bedingung, unter der die Idee stirbt.",
  },
  {
    fn: "Nachlegen",
    chunk: "Da musst du schon nachlegen.",
    ban: "Nicht: „Das ist nicht überzeugend.“",
    load: "Du forderst Substanz. Warte nicht höflich.",
  },
  {
    fn: "Fairness",
    chunk: "Fairerweise: das hat was. Trotzdem",
    ban: "Nicht: „Einerseits, andererseits.“",
    load: "Kurzes Kreditgeben, dann die Linie. Kein Referat.",
  },
  {
    fn: "Verantwortung",
    chunk: "Dann nimm mich in die Pflicht.",
    ban: "Nicht: „Man sollte mehr tun.“",
    load: "Du bietest oder forderst eine Person. Kein Man.",
  },
  {
    fn: "Abbruch",
    chunk: "Schluss mit dem Weichspüler.",
    ban: "Nicht: „Lass uns klarer kommunizieren.“",
    load: "Registerbruch. Danach ein Satz, der weh tun darf.",
  },
];

export const SPEAKING_CRITERIA = [
  "Linie: Man weiß nach 20 Sekunden, worauf du hinauswillst.",
  "Halt: Du bleibst im Register der Szene.",
  "Partikeln: mindestens zwei, die Haltung tragen, nicht Füllmüll.",
  "Widerspruch: du hältst Gegenwind aus, ohne zu kollabieren.",
  "Schluss: du landest. Kein 'ja, das war's dann'.",
];

export const WRITING_CRITERIA = [
  "These im ersten Drittel, nicht im letzten Satz.",
  "Ein ernst genommenes Gegenargument.",
  "Keine leeren Intensivierer (sehr, wirklich, extrem) als Ersatz für Präzision.",
  "Verben der Stellungnahme: einräumen, entgegenhalten, zuspitzen, relativieren.",
  "Schluss ohne 'Zusammenfassend lässt sich sagen'.",
];

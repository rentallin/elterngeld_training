import { useState, useEffect, useRef } from "react";
import { supabase } from './lib/supabase.js';

// ═══════════════════════════════════════════════════════════════════
// KAPITEL & LEKTIONEN — vollständig, 7 Kapitel, 23 Lektionen
// ═══════════════════════════════════════════════════════════════════
const CHAPTERS = [
// ── KAP 01 ──────────────────────────────────────────────────────
  {
    id:1, number:"01", title:"Grundlagen & Anspruch", icon:"📋",
    fullTitle:"Kapitel 1 – Grundlagen des Elterngeldes und Anspruchsvoraussetzungen",
    description:"Wer hat Anspruch? Was sind Basiselterngeld, ElterngeldPlus und Partnerschaftsbonus? Einkommensgrenzen, Zuständigkeit und aktuelle Neuregelungen 2025.",
    lessons:[
      {
        id:"1-1", title:"Was ist Elterngeld? – Überblick & aktuelle Rechtslage 2025", duration:"ca. 12 min",
        objective:"Du kennst die drei Elterngeld-Varianten, die aktuellen Einkommensgrenzen und die wichtigsten Neuregelungen ab April 2024/2025.",
        videoHint:"Screencast: Überblick auf familienportal.de, Erläuterung der drei Varianten am Whiteboard, Einkommensgrenze live im Rechner prüfen.",
        pdfLabel:"Übungsblatt 1-1: Elterngeld-Varianten und Anspruchscheck (Fallbeispiele)",
        checkCriteria:["Alle drei Varianten korrekt benannt und erklärt","Einkommensgrenze 2025: 175.000 € zu versteuerndes Einkommen korrekt","Simultaner Bezug ab 1.4.2024: max. 1 Monat Basiselterngeld","Min./Max.-Beträge korrekt: 300 € / 1.800 € Basiselterngeld","Unterschied zvE vs. Bruttoeinkommen erklärt"],
        content:[
          { type:"heading", text:"Das Elterngeld: Drei Varianten, ein Ziel" },
          { type:"text", text:"Das Elterngeld ersetzt einen Teil des Einkommens, das nach der Geburt wegfällt. Grundlage ist das Bundeselterngeld- und Elternzeitgesetz (BEEG). Es gibt drei Varianten, die frei kombinierbar sind: Basiselterngeld, ElterngeldPlus und den Partnerschaftsbonus." },
          { type:"table", headers:["Variante","Dauer","Betrag","Besonderheit"],
            rows:[["Basiselterngeld","Max. 14 Monate gesamt","65–67% des Nettos, min. 300 €, max. 1.800 €","Nur in ersten 14 Lebensmonaten"],["ElterngeldPlus","Doppelt so lange wie Basis","Max. 50% des Basisbetrags","Sinnvoll bei Teilzeitrückkehr"],["Partnerschaftsbonus","4 Zusatz-EP+-Monate","Wie ElterngeldPlus","Beide Eltern 24–32 Wochenstunden"]]},
          { type:"highlight", label:"⚖️ Aktuelle Einkommensgrenzen 2025", text:"Geburten ab 1.4.2024: 200.000 € zu versteuerndes Jahreseinkommen\nGeburten ab 1.4.2025: 175.000 € zu versteuerndes Jahreseinkommen\nBei Überschreitung: kein Elterngeld-Anspruch\nGilt für Paare UND Alleinerziehende gleichermaßen\nDas zu versteuernde Einkommen steht im Steuerbescheid und ist deutlich geringer als das Bruttoeinkommen." },
          { type:"warning", label:"🚨 Kritische Neuregelung ab 1.4.2024", text:"Simultaner Bezug von Basiselterngeld ist nur noch max. 1 Monat (innerhalb der ersten 12 Lebensmonate) möglich. Früher: 2 Monate. Ausnahmen: Mehrlinge, Frühchen (≥6 Wochen zu früh), Kinder/Geschwister mit Behinderung. Diese Änderung betrifft alle Beratungen ab sofort – informiere Kunden aktiv darüber!" },
          { type:"text", text:"Die Höhe des Elterngeldes richtet sich nach dem Nettoeinkommen vor der Geburt. Die Ersatzrate beträgt 65–67%, für Geringverdiener (Netto unter 1.000 € im Bemessungszeitraum) sogar bis zu 100%. Der Mindestbetrag von 300 € gilt für alle – also auch für Studierende, Hausfrauen oder Arbeitslose." },
          { type:"text", text:"Wichtig für die Beratung: Das zu versteuernde Einkommen ist nicht identisch mit dem Bruttoeinkommen. Es ergibt sich nach Abzug von Sonderausgaben, Vorsorgeaufwendungen und Freibeträgen. Ein Paar mit je 103.500 € Brutto liegt z.B. bei ca. 175.000 € zu versteuerndem Einkommen – also exakt an der Grenze." },
        ],
        quiz:[
          { q:"Ab welchem zu versteuernden Jahreseinkommen entfällt der Anspruch für Geburten ab 1. April 2025?", opts:["150.000 €","200.000 €","175.000 €","250.000 €"], a:2 },
          { q:"Wie viele Monate dürfen beide Elternteile seit 1.4.2024 Basiselterngeld gleichzeitig beziehen?", opts:["2 Monate","Keinen","1 Monat","4 Monate"], a:2 },
          { q:"Wie hoch ist der maximale monatliche Basiselterngeld-Betrag?", opts:["1.200 €","1.500 €","2.000 €","1.800 €"], a:3 },
        ]
      },
      {
        id:"1-2", title:"Anspruchsvoraussetzungen & ausländische Staatsbürger", duration:"ca. 9 min",
        objective:"Du weißt, wer Anspruch hat, welche Wohnsitzbedingungen gelten und welche ausländischen Staatsbürger berechtigt sind.",
        videoHint:"Screencast: Durchgang durch Abschnitt 1 des Antrags – Wohnsitz, Staatsangehörigkeit, Kindschaftsverhältnis. Live-Ausfüllen mit Kommentar.",
        pdfLabel:"Übungsblatt 1-2: Anspruchsprüfung – Fallbeispiele Wohnsitz & Staatsangehörigkeit",
        checkCriteria:["Wohnsitz oder gewöhnlicher Aufenthalt in Deutschland korrekt geprüft","Staatsangehörigkeit korrekt eingetragen (EU / Drittstaaten unterschieden)","Kindschaftsverhältnis angekreuzt","Erwerbstätigkeit ≤ 32 Wochenstunden geprüft","Einkommensgrenze erklärt und Erklärung unterschrieben"],
        content:[
          { type:"heading", text:"Wer hat Anspruch? – Die Checkliste" },
          { type:"text", text:"Elterngeld erhält, wer folgende Voraussetzungen kumulativ erfüllt: Wohnsitz oder gewöhnlicher Aufenthalt in Deutschland; das Kind lebt im eigenen Haushalt; das Kind wird selbst betreut und erzogen; die Erwerbstätigkeit wird auf max. 32 Wochenstunden reduziert (seit 1.4.2024); und das zu versteuernde Jahreseinkommen liegt unter der Einkommensgrenze." },
          { type:"highlight", label:"🌍 Ausländische Staatsbürger", text:"EU-/EWR-Bürger und Schweizer: Anspruch grundsätzlich wie deutsche Staatsbürger\nDrittstaaten: Anspruch nur bei bestimmten Aufenthaltstiteln (Niederlassungserlaubnis, Aufenthaltserlaubnis zur Erwerbstätigkeit etc.)\nGeduldete: in der Regel kein Anspruch\nAsylbewerber: abhängig vom Status\nGrenzgänger: Sonderregelungen → immer eskalieren!" },
          { type:"text", text:"Das Kindschaftsverhältnis ist im Antrag anzukreuzen: leibliches Kind, Kind des Ehepartners (Stiefeltern), Adoptivkind oder Kind in Adoptionspflege. Bei Stiefelternschaft: nur Anspruch, wenn der andere Elternteil kein Elterngeld beansprucht. Adoptionen: Bezugsbeginn ab Haushaltsaufnahme, nicht ab Geburt – bis zum 8. Geburtstag des Kindes." },
          { type:"warning", label:"⚠️ Häufiger Fehler: Falsche Elterngeldstelle", text:"Die zuständige Elterngeldstelle richtet sich nach dem Wohnort der antragstellenden Person – nicht nach dem Geburtsort des Kindes und nicht nach dem Arbeitgeber. Bei Umzügen kurz vor/nach der Geburt immer den aktuellen Wohnort prüfen." },
          { type:"text", text:"Die Erwerbstätigkeit im Bezugszeitraum darf durchschnittlich 32 Wochenstunden nicht überschreiten. Achtung: Resturlaub zählt als Erwerbstätigkeit! Resturlaub vor der Geburt nehmen lassen ist daher meist sinnvoller. Auslandsarbeit: Wer in Deutschland wohnt und im EU-Ausland arbeitet (Grenzgänger), kann ebenfalls Anspruch haben – aber Sonderformular erforderlich, immer eskalieren." },
        ],
        quiz:[
          { q:"Welche maximale Wochenstundenzahl darf man seit 1.4.2024 während des Elterngeldbezugs arbeiten?", opts:["30 Stunden","25 Stunden","40 Stunden","32 Stunden"], a:3 },
          { q:"Wonach richtet sich die zuständige Elterngeldstelle?", opts:["Geburtsort des Kindes","Arbeitgeber des antragstellenden Elternteils","Wohnsitz der antragstellenden Person","Krankenhaus, in dem das Kind geboren wurde"], a:2 },
          { q:"Haben EU-Bürger mit Wohnsitz in Deutschland grundsätzlich Anspruch auf Elterngeld?", opts:["Nein, nur deutsche Staatsbürger","Ja, grundsätzlich gleich wie Deutsche","Nur wenn sie mehr als 5 Jahre in DE wohnen","Nur wenn sie vollständig steuerpflichtig sind"], a:1 },
        ]
      },
      {
        id:"1-3", title:"Zuständigkeit, Fristen & ElterngeldDigital", duration:"ca. 8 min",
        objective:"Du kennst den korrekten Einreichungsweg, die rückwirkende Zahlungsfrist und weißt, wie ElterngeldDigital funktioniert.",
        videoHint:"Screencast: ElterngeldDigital live aufrufen, Bundesland auswählen, Online-Antrag starten. Vergleich: Online vs. Papier – Was ist wann sinnvoll?",
        pdfLabel:"Übungsblatt 1-3: Frist-Rechner – Wann muss der Antrag spätestens eingehen? (Fallbeispiele)",
        checkCriteria:["Rückwirkende Zahlungsfrist: max. 3 Monate vor Antragsmonat korrekt","Eingangsstempel als Fristnachweis benannt","ElterngeldDigital: Zugang und Voraussetzungen erklärt","Soforthilfe-Antrag (1. Seite + Unterschriften) als Fristrettung erklärt","Zuständige Elterngeldstelle korrekt bestimmt (Wohnort)"],
        content:[
          { type:"heading", text:"Fristen, Zuständigkeit & digitale Antragstellung" },
          { type:"text", text:"Das Elterngeld wird rückwirkend nur für die 3 Monate vor dem Antragsmonat gezahlt. Entscheidend ist der Eingangsstempel bei der Elterngeldstelle – nicht das Absendedatum! Familien, die zu lange warten, verlieren unwiederbringlich Monate und damit oft hunderte Euro." },
          { type:"warning", label:"⏰ Die 3-Monats-Frist – häufigster Vermögensverlust", text:"Beispiel: Kind geboren am 15. März → Antragsmonat = Oktober → Monate März, April, Mai gehen verloren.\nRechnung: Antrag im Oktober = rückwirkend ab August bezahlbar.\nBei drohender Fristüberschreitung sofort handeln: leere erste Seite + Unterschriften beider Elternteile einreichen – Unterlagen können nachgereicht werden. Der Eingangsstempel zählt!" },
          { type:"highlight", label:"🖥️ ElterngeldDigital: Der moderne Weg", text:"Verfügbar in: fast allen Bundesländern (Sachsen: elterngeld.sachsen.de)\nVoraussetzung: ELSTER-Zertifikat oder BundID mit Ausweis-App\nVorteil: Kein Postweg, Eingangsbestätigung sofort, Unterlagen digital hochladen\nNachteil: Technische Hürde, Vollmacht für Dritte schwieriger\nFür Beratungsstellen: Kunden können Beraterin bevollmächtigen – aber rechtlich immer genau prüfen" },
          { type:"text", text:"Die Zuständigkeit richtet sich immer nach dem Wohnort der antragstellenden Person zum Zeitpunkt der Antragstellung. In Sachsen: je nach Landkreis oder kreisfreier Stadt (z.B. Zwickau → Elterngeldstelle beim Landkreis Zwickau). Bei Umzug nach der Geburt: die neue Elterngeldstelle kann zuständig werden – kurz prüfen und ggf. den Antrag weiterleiten lassen." },
          { type:"highlight", label:"💡 Beratungspraxis: Immer zuerst klären", text:"Schritt 1: Wann wurde das Kind geboren? → Frist berechnen\nSchritt 2: Wohnort aktuell? → Zuständige Stelle bestimmen\nSchritt 3: Online oder Papier? → Abhängig von technischer Affinität des Kunden\nSchritt 4: Vollständig oder Soforthilfe-Antrag? → Zeitdruck abschätzen" },
        ],
        quiz:[
          { q:"Für wie viele Monate wird Elterngeld rückwirkend gezahlt, wenn der Antrag später als im Geburtsmonat eingeht?", opts:["6 Monate","1 Monat","3 Monate","Unbegrenzt – kein Verlust"], a:2 },
          { q:"Was zählt als Fristnachweis bei der postalischen Einreichung?", opts:["Das Absendedatum auf dem Brief","Der Eingangsstempel bei der Elterngeldstelle","Das Datum der letzten Unterschrift im Antrag","Das Datum der Geburtsurkunde"], a:1 },
          { q:"Was kann man tun, wenn die 3-Monats-Frist kurz vor dem Ablauf steht, aber Unterlagen fehlen?", opts:["Warten und vollständigen Antrag einreichen","Unvollständigen Antrag (Seite 1 + Unterschriften) einreichen und Unterlagen nachreichen","Fristversäumnis akzeptieren – nichts möglich","Bei Elterngeldstelle anrufen – das reicht für die Frist"], a:1 },
        ]
      }
    ]
  },
// ── KAP 02 ──────────────────────────────────────────────────────
  {
    id:2, number:"02", title:"Antrag – Persönliche Daten", icon:"👤",
    fullTitle:"Kapitel 2 – Den Antrag ausfüllen: Persönliche Angaben & Kindesdaten",
    description:"Abschnitte 1 und 2 des Antrags: Angaben zur antragstellenden Person und zum Kind. Typische Fehlerquellen im Detail.",
    lessons:[
      {
        id:"2-1", title:"Abschnitt 1: Angaben zur antragstellenden Person", duration:"ca. 11 min",
        objective:"Du kannst Abschnitt 1 des Antrags vollständig und fehlerfrei ausfüllen – einschließlich Steuer-ID, Steuerklasse und Unterschrift beider Elternteile.",
        videoHint:"Screencast: Live-Ausfüllen Abschnitt 1. Wo steht die Steuer-ID? Wie trägt man Geburtsname ein? Warum müssen beide unterschreiben?",
        pdfLabel:"Übungsblatt 2-1: Abschnitt 1 Antrag – Persönliche Daten (leeres Formular)",
        checkCriteria:["Name, Vorname und ggf. Geburtsname vollständig","Geburtsdatum im Format TT.MM.JJJJ korrekt","Aktuelle Meldeadresse vollständig","Steueridentifikationsnummer: genau 11 Stellen","Steuerklasse zum Zeitpunkt der Geburt angegeben","Unterschriften BEIDER Elternteile vorhanden","Einkommensgrenzen-Erklärung ausgefüllt"],
        content:[
          { type:"heading", text:"Abschnitt 1: Persönliche Daten – die häufigste Fehlerquelle" },
          { type:"text", text:"Abschnitt 1 umfasst die persönlichen Angaben der antragstellenden Person: Name (inkl. Geburtsname), Vorname(n), Geburtsdatum, aktuelle Meldeadresse, Staatsangehörigkeit, Steueridentifikationsnummer und Steuerklasse. Jedes Feld ist Pflicht – und jedes birgt typische Fehlerquellen." },
          { type:"highlight", label:"📋 Pflichtfelder im Überblick", text:"Nachname · Vorname(n) · Geburtsname (immer ausfüllen, auch wenn identisch mit Nachnamen!) · Geburtsdatum (TT.MM.JJJJ) · Anschrift: Straße, Hausnummer, PLZ, Ort · Staatsangehörigkeit · Steueridentifikationsnummer (11 Stellen) · Steuerklasse · Kindschaftsverhältnis · Bankverbindung" },
          { type:"warning", label:"🚨 Fehler Nr. 1 landesweit: Unterschrift fehlt", text:"Jeder Elterngeldantrag muss von BEIDEN Elternteilen unterschrieben werden – auch wenn nur ein Elternteil Elterngeld beantragt! Ausnahmen: nachweislich Alleinerziehende (Alleinsorgerecht dokumentieren) oder Abwesenheit des anderen Elternteils. Fehlt eine Unterschrift → gesamter Antrag wird zurückgesandt." },
          { type:"text", text:"Die Steueridentifikationsnummer (Steuer-ID) hat genau 11 Stellen und wird ein Leben lang nicht geändert. Sie ist nicht identisch mit der Steuernummer des Finanzamts. Die Steuer-ID findet sich auf dem letzten Einkommensteuerbescheid, auf der Lohnsteuerbescheinigung oder kann beim Bundeszentralamt für Steuern abgefragt werden. Häufiger Fehler: Steuernummer statt Steuer-ID eintragen." },
          { type:"highlight", label:"💡 Steuerklasse: Was wirklich gilt", text:"Anzugeben ist die Steuerklasse, die im Bemessungszeitraum (12 Monate vor Geburt/Mutterschutzbeginn) überwiegend galt. Ein Steuerklassenwechsel innerhalb der letzten 12 Monate vor der Geburt ist zulässig – wird aber kritisch geprüft. Der Wechsel muss beim Finanzamt angemeldet worden sein. Steuerklasse III statt V erhöht das Elterngeld erheblich – aber nur, wenn der Wechsel rechtzeitig und korrekt vollzogen wurde." },
        ],
        quiz:[
          { q:"Wie viele Stellen hat die Steueridentifikationsnummer?", opts:["10","13","11","8"], a:2 },
          { q:"Wer muss den Elterngeldantrag unterschreiben?", opts:["Nur der antragstellende Elternteil","Beide Elternteile – auch wenn nur einer beantragt","Nur derjenige, der die Monate beantragt","Beide nur bei simultanen Bezugsmonaten"], a:1 },
          { q:"Was ist beim Steuerklassenwechsel für das Elterngeld zu beachten?", opts:["Wechsel nach der Geburt erhöht rückwirkend","Wechsel wird immer anerkannt","Wechsel muss rechtzeitig beim Finanzamt vollzogen sein","Steuerklasse spielt keine Rolle"], a:2 },
        ]
      },
      {
        id:"2-2", title:"Abschnitt 2: Kindesdaten, Mehrlinge & Geschwisterbonus", duration:"ca. 13 min",
        objective:"Du füllst Abschnitt 2 korrekt aus, erkennst Mehrlingsgeburten und berechnest den Geschwisterbonus richtig.",
        videoHint:"Screencast: Abschnitt 2 live ausfüllen – Geburtsurkunde lesen, Geburtsdatum + Geburtsort übertragen, Geschwisterkinder prüfen, Mehrlingskreuz setzen.",
        pdfLabel:"Übungsblatt 2-2: Abschnitt 2 – Kindesdaten, Mehrlinge & Geschwisterbonus",
        checkCriteria:["Geburtsdatum korrekt aus der Geburtsurkunde","Geburtsort exakt wie auf der Geburtsurkunde","Bei Mehrlingen: 'Mehrlingsgeburt' angekreuzt","Geschwisterbonus: Kind unter 3 Jahren oder zwei Kinder unter 6 Jahren geprüft","Frühgeburt: errechneter Termin vermerkt"],
        content:[
          { type:"heading", text:"Abschnitt 2: Das Kind – Daten korrekt übertragen" },
          { type:"text", text:"In Abschnitt 2 werden die Daten des Kindes eingetragen: Name, Geburtsdatum, Geburtsort, Geschlecht und Geburtenfolge. Die Quelle ist immer die Geburtsurkunde. Bei Abweichungen zwischen Geburtsurkunde und Antrag wird der gesamte Antrag zurückgesandt." },
          { type:"warning", label:"⚠️ Geburtsort: Häufiger Tippfehler", text:"Geburtsort = der amtliche Stadtname, exakt wie auf der Geburtsurkunde.\nNicht: Krankenhaus-Name ('Helios Klinikum Aue')\nNicht: Stadtteil oder Ortsteil\nHausgeburt: Geburtsort ist die Meldeadresse der Mutter\nAusländische Geburtsurkunden: ggf. beglaubigte Übersetzung erforderlich" },
          { type:"highlight", label:"👶👶 Mehrlingsgeburt: Was sich ändert", text:"Für jedes Kind eine separate Geburtsurkunde mit Vermerk 'für Elterngeld'\nFür jedes Kind einen eigenen Antrag stellen\n10% Mehrlingszuschlag pro weiterem Mehrlingsgeschwisterkind automatisch (+300 € Basis / +150 € EG+)\nSimultaner Bezug bei Mehrlingen weiterhin unbeschränkt möglich" },
          { type:"highlight", label:"💰 Geschwisterbonus: 10% mehr Elterngeld", text:"Voraussetzung: Im Haushalt lebt mindestens ein Kind unter 3 Jahren ODER zwei Kinder unter 6 Jahren.\nBonus: +10% des Elterngeldes, mindestens 75 € (Basis) / 37,50 € (EG+)\nWird NICHT automatisch gewährt – muss beantragt werden!\nStichtag: Beginn des Elterngeldbezugs, nicht Geburtsdatum\nBei 14 Monaten: bis zu 1.050 € zusätzliches Elterngeld" },
          { type:"warning", label:"⚠️ Frühgeburt: Extra-Monate beantragen", text:"Für elterngeldrechtliche Frühchen gilt (mind. 6 Wochen vor errechnetem Termin):\n≥6 Wochen → 1 Extra-Monat\n≥8 Wochen → 2 Extra-Monate\n≥12 Wochen → 3 Extra-Monate\n≥16 Wochen → 4 Extra-Monate\nÄrztliche Bescheinigung über errechneten Entbindungstermin ist Pflicht!\nSimultaner Bezug bei Frühchen weiterhin unbeschränkt möglich." },
        ],
        quiz:[
          { q:"Was ist für den Geschwisterbonus Voraussetzung?", opts:["Mindestens ein Geschwisterkind unter 5 Jahren","Min. ein Kind unter 3 Jahren ODER zwei Kinder unter 6 Jahren im Haushalt","Zwillinge","Familie liegt unter dem Durchschnittseinkommen"], a:1 },
          { q:"Was tragen Sie beim 'Geburtsort' ein, wenn das Kind in der Helios-Klinik Aue-Bad Schlema geboren wurde?", opts:["Helios-Klinik Aue","Den amtlichen Stadtnamen (z.B. Aue-Bad Schlema)","Bad Schlema","Sachsen"], a:1 },
          { q:"Wie viele Extra-Monate erhält eine Familie bei Frühgeburt mindestens 8 Wochen vor dem errechneten Termin?", opts:["1 Extra-Monat","3 Extra-Monate","2 Extra-Monate","4 Extra-Monate"], a:2 },
        ]
      }
    ]
  },
// ── KAP 03 ──────────────────────────────────────────────────────
  {
    id:3, number:"03", title:"Bezugszeitraum & Varianten", icon:"📅",
    fullTitle:"Kapitel 3 – Lebensmonate, Basiselterngeld, ElterngeldPlus & Partnerschaftsbonus",
    description:"Die 14-Monats-Logik, simultaner Bezug nach neuem Recht, ElterngeldPlus-Kalkulation, Partnerschaftsbonus-Bedingungen und strategische Monatsplanung.",
    lessons:[
      {
        id:"3-1", title:"Basiselterngeld: Lebensmonate, Aufteilung & Fristen", duration:"ca. 14 min",
        objective:"Du kannst die Monatstabelle korrekt ausfüllen, kennst die Lebensmonat-Logik und weißt, wann rückwirkende Monate möglich sind.",
        videoHint:"Screencast: Die Lebensmonate-Tabelle live ausfüllen. Unterschied Lebensmonat vs. Kalendermonat. Warum Monat 1 und 2 besonders sind. Rückwirkung erklären.",
        pdfLabel:"Übungsblatt 3-1: Monatstabelle Basiselterngeld ausfüllen (4 Fallbeispiele)",
        checkCriteria:["Maximal 14 Basiselterngeld-Monate gesamt korrekt geplant","Simultaner Bezug ab 1.4.2024: max. 1 Monat innerhalb LM 1–12","Mindestbezug 2 Monate pro Elternteil beachtet","Rückwirkung: max. 3 Monate vor Antragsmonat","Lebensmonat vs. Kalendermonat korrekt unterschieden","Mutterschaftsschutzfristen als Elterngeld-Monate der Mutter vermerkt"],
        content:[
          { type:"heading", text:"Die Monatstabelle: Herzstück des Antrags" },
          { type:"text", text:"Das Basiselterngeld wird in 'Lebensmonaten' gezahlt – nicht in Kalendermonaten. Der 1. Lebensmonat beginnt am Geburtstag des Kindes und endet am Tag vor dem entsprechenden Datum im Folgemonat. Beispiel: Kind geboren am 15. März → 1. LM = 15.3. bis 14.4. Das ist wichtig für die genaue Planung – insbesondere bei der sog. 'Randtage-Problematik'." },
          { type:"highlight", label:"📊 Die 14-Monats-Regel", text:"Gesamt: max. 14 Monate Basiselterngeld für beide Elternteile\nBasis: 12 Monate für einen Elternteil (nur bei eigener Einkommensminderung)\n+2 Partnermonate: wenn der andere Elternteil mind. 2 Monate beansprucht\nMindestbezug: 2 Monate pro Elternteil\nAlleinerziehende: bis zu 14 Monate alleine\nSimultaner Bezug ab 1.4.2024: max. 1 Monat gleichzeitig (innerhalb LM 1–12)\nIn LM 13–14: kein simultaner Bezug mehr möglich" },
          { type:"warning", label:"⏰ Frist: Rückwirkend max. 3 Monate", text:"Das Elterngeld wird rückwirkend nur für die 3 Monate vor dem Antragsmonat gezahlt. Entscheidend ist der Eingangsstempel! Bei drohender Fristüberschreitung: auch unvollständigen Antrag (nur erste Seite + Unterschriften) einreichen. Fehlende Unterlagen können nachgereicht werden." },
          { type:"text", text:"Die Monate 1 und 2 (Mutterschutzfristen) gelten automatisch als Elterngeld-Monate der Mutter – auch wenn sie Mutterschaftsgeld bezieht. Das Mutterschaftsgeld wird auf das Elterngeld angerechnet (Differenz wird als Elterngeld gezahlt). Diese Monate verbrauchen also zwei der 14 Monate." },
          { type:"highlight", label:"⚠️ Randtage-Falle: Elternzeit ≠ Kalendermonat", text:"Elternzeit beim Arbeitgeber läuft nach Kalendermonaten, Elterngeld nach Lebensmonaten. Wenn die Elternzeit nicht exakt mit den Lebensmonaten übereinstimmt, entstehen 'Randtage' in denen Einkommen fließt – und das reduziert das Elterngeld für diesen Lebensmonat. Lösung: Elternzeit immer auf den Lebensmonats-Rhythmus abstimmen." },
        ],
        quiz:[
          { q:"Ein Kind wird am 10. Mai geboren. Bis wann kann der Antrag eingehen, um rückwirkend ab dem 1. Lebensmonat zu zahlen?", opts:["Bis zum 10. August","Bis Ende Juli (Antragsmonat August)","Bis zum 10. Oktober","Bis Ende Oktober"], a:1 },
          { q:"Wie viele Monate Basiselterngeld stehen maximal zur Verfügung, wenn beide Elternteile beantragen?", opts:["12 Monate","16 Monate","14 Monate","10 Monate"], a:2 },
          { q:"Die Mutterschutzfristen (ca. 8 Wochen nach Geburt) zählen als...", opts:["Zusätzliche Monate außerhalb der 14","Elterngeld-Monate des Vaters","Keine Elterngeld-Monate","Elterngeld-Monate der Mutter, verbrauchen 2 der 14 Monate"], a:3 },
        ]
      },
      {
        id:"3-2", title:"ElterngeldPlus & Partnerschaftsbonus: Wann lohnt es sich?", duration:"ca. 15 min",
        objective:"Du erklärst den Unterschied zwischen Basis und Plus, erkennst wann EP+ sinnvoll ist und kennst die strengen Bonus-Bedingungen.",
        videoHint:"Screencast: Abschnitt 4 (ElterngeldPlus) im Antrag live ausfüllen. Rechner-Demo: Basis vs. Plus vergleichen. Partnerschaftsbonus-Bedingungen prüfen.",
        pdfLabel:"Übungsblatt 3-2: ElterngeldPlus & Partnerschaftsbonus – Berechnungsübungen",
        checkCriteria:["Anrechnungsregel: 2 Monate EP+ = 1 Monat Basis korrekt","EP+-Betrag = max. 50% des Basisbetrags korrekt","Partnerschaftsbonus-Bedingungen: beide 24–32 Wochenstunden korrekt","4 zusätzliche Bonus-Monate (nicht aus den 14 Monaten) erklärt","Rückforderungsrisiko beim Bonus kommuniziert"],
        content:[
          { type:"heading", text:"ElterngeldPlus: Mehr Zeit, halbes Geld" },
          { type:"text", text:"ElterngeldPlus (EP+) ist die zweite Variante: Man erhält den halben monatlichen Betrag des Basiselterngeldes, dafür doppelt so lange. 2 Monate EP+ werden auf 1 Monat Basiselterngeld angerechnet. EP+ lohnt sich vor allem, wenn man nach der Geburt in Teilzeit arbeitet – das erzielte Teilzeiteinkommen reduziert das EP+ weniger stark als das Basiselterngeld." },
          { type:"table", headers:["Kriterium","Basiselterngeld","ElterngeldPlus"],
            rows:[["Dauer je Monat","1 Lebensmonat","2 Lebensmonate (= 1 Basismonat)"],["Betrag","65–67% des Netto, max. 1.800 €","Max. 50% des Basisbetrags"],["Teilzeit erlaubt","Ja, bis 32 Stunden","Ja, bis 32 Stunden"],["Sinnvoll wenn","Kein/geringes Einkommen danach","Teilzeitrückkehr geplant"]]},
          { type:"highlight", label:"🤝 Partnerschaftsbonus: 4 Extra-Monate EP+", text:"Bedingung: Beide Elternteile arbeiten gleichzeitig 24–32 Wochenstunden (seit 1.4.2024) in 2–4 aufeinanderfolgenden Lebensmonaten\nDauer: 2 bis 4 Monate pro Elternteil wählbar\nDiese Monate kommen ZUSÄTZLICH zu den 14 Grundmonaten\nNachweispflicht: Arbeitgeberbescheinigung für beide Elternteile\nBezug bis Lebensmonat 32 möglich" },
          { type:"warning", label:"🚨 Partnerschaftsbonus: Höchstes Rückforderungsrisiko", text:"Wenn auch nur in einer Woche die Stunden nicht stimmen – Krankheit, Überstunden-Ausgleich, Urlaubstage – kann der gesamte Bonus zurückgefordert werden. Kunden immer klar informieren: Stundenplan gemeinsam mit Arbeitgeber schriftlich fixieren. Im Zweifel: Bonus-Monate lieber weglassen." },
          { type:"text", text:"EP+ lohnt sich in drei Fällen besonders: (1) Beide Elternteile kehren in Teilzeit zurück (Partnerschaftsbonus möglich), (2) Elternteil mit hohem Einkommen verdient in Teilzeit viel – EP+ puffert besser, (3) Familien möchten die Elterngeld-Laufzeit strecken. Immer den offiziellen Rechner des Bundesfamilienministeriums nutzen und mehrere Szenarien durchspielen." },
        ],
        quiz:[
          { q:"Wie viele Monate ElterngeldPlus entsprechen einem Monat Basiselterngeld aus dem 14-Monats-Kontingent?", opts:["1 Monat","3 Monate","4 Monate","2 Monate"], a:3 },
          { q:"Welche Wochenstunden müssen beide Elternteile für den Partnerschaftsbonus (ab 1.4.2024) einhalten?", opts:["20–30 Stunden","15–25 Stunden","24–32 Stunden","30–40 Stunden"], a:2 },
          { q:"Was passiert, wenn ein Elternteil beim Partnerschaftsbonus in einem Monat nur 20 Stunden arbeitet?", opts:["Nur dieser Monat wird nicht anerkannt","Der gesamte Bonus-Zeitraum wird zurückgefordert","Es gibt eine Toleranz von 2 Stunden","Nichts – Krankheit ist immer anerkannt"], a:1 },
        ]
      },
      {
        id:"3-3", title:"Strategische Monatsplanung: Wer nimmt wann was?", duration:"ca. 11 min",
        objective:"Du entwickelst mit Kunden individuelle Bezugspläne, erkennst typische Optimierungspotenziale und kannst verschiedene Szenarien vergleichen.",
        videoHint:"Screencast: Am Whiteboard drei typische Familienkonstellationen durchplanen: klassisch, Teilzeit-Rückkehr, Partnerschaftsbonus. Elterngeldrechner live nutzen.",
        pdfLabel:"Übungsblatt 3-3: Strategieplanung – 4 Familiensituationen optimieren",
        checkCriteria:["Szenario 1 (klassisch) korrekt geplant: Mutter 12 LM, Vater 2 LM","Szenario 2 (EP+): EP+-Monate korrekt in 14-Monate-Kontingent eingerechnet","Szenario 3 (Partnerschaftsbonus): Stunden-Bedingungen und Bonus-Monate korrekt","Geschwisterbonus in Berechnung berücksichtigt","Elterngeldrechner BMFSFJ als Pflicht-Tool benannt"],
        content:[
          { type:"heading", text:"Strategische Planung: Die drei häufigsten Familiensituationen" },
          { type:"text", text:"Es gibt keine Einheitslösung – die optimale Aufteilung hängt von Einkommen, Rückkehrplänen, Arbeitgeber-Flexibilität und persönlichen Prioritäten ab. Als Beraterin erarbeitest du mit dem Kunden den individuellen Plan. Hier sind die drei häufigsten Konstellationen." },
          { type:"highlight", label:"👩‍👧 Szenario 1: Klassische Aufteilung", text:"Mutter: LM 1–12 (inkl. Mutterschutz LM 1–2 mit Mutterschaftsgeld)\nVater: LM 13–14 (die 'Partnermonate')\nGesamt: 14 Monate Basiselterngeld optimal genutzt\nSimultaner Monat: LM 1 (beide gleichzeitig) möglich – z.B. wenn Vater direkt nach Geburt freinimmt\nVorteil: Einfach, klar, kein Rückforderungsrisiko\nNachteil: Vater nur 2 Monate" },
          { type:"highlight", label:"💼 Szenario 2: Teilzeitrückkehr mit EP+", text:"Mutter: LM 1–6 Basiselterngeld, dann EP+ in Teilzeit\nVater: LM 7–8 Basiselterngeld (2 Monate)\nMutter: LM 9–28 ElterngeldPlus (20 Monate = 10 Basiselterngeld-Monate)\nGesamt: 6 + 2 + 10 Basis-äquivalent = 18 Basis-Monate → passt in Kontingent\nVorteil: Längere Laufzeit, Flexibilität, besser bei Teilzeit-Einkommen\nRechnung immer mit Elterngeldrechner prüfen!" },
          { type:"highlight", label:"🤝 Szenario 3: Partnerschaftsbonus", text:"Beide Elternteile kehren in LM 9–12 mit 25 Wochenstunden zurück\nJeder beantragt 4 Bonus-Monate EP+ (LM 9–12)\nBedingung: exakt 24–32h pro Woche, aufeinanderfolgend, Nachweis erforderlich\nBezug: 4 zusätzliche EP+-Monate EXTRA (nicht aus den 14 Monaten)\nRisiko: Strenge Bedingungen → nur empfehlen, wenn Arbeitgeber schriftlich mitspielt" },
          { type:"warning", label:"⚠️ Häufiger Planungsfehler: EP+ falsch in Kontingent gerechnet", text:"1 Monat Basiselterngeld = 2 Monate ElterngeldPlus aus dem 14-Monats-Kontingent. Ein Kunde, der denkt er kann 14 Monate Basis + 28 Monate EP+ beziehen, irrt sich. Immer zuerst das Basiselterngeld-Kontingent ausrechnen, dann EP+ einplanen. Der Elterngeldrechner des BMFSFJ macht das automatisch." },
        ],
        quiz:[
          { q:"Wie viele Basis-Monate sind verbraucht, wenn ein Elternteil 6 Monate Basiselterngeld + 8 Monate ElterngeldPlus bezieht?", opts:["10 Monate","14 Monate","10,5 Monate","8 Monate"], a:0 },
          { q:"Kann der simultane Monat (beide gleichzeitig Basiselterngeld) auch im 1. Lebensmonat genommen werden?", opts:["Nein, ab LM 3 frühestens","Ja, der simultane Monat kann in LM 1–12 frei gewählt werden","Nur wenn Vater Elternzeit hat","Nein, gilt nur für Mütter"], a:1 },
          { q:"Was ist der entscheidende Vorteil von ElterngeldPlus bei Teilzeitrückkehr?", opts:["Höherer monatlicher Betrag","EP+ wird nicht auf Teilzeiteinkommen angerechnet","Das Teilzeiteinkommen reduziert EP+ weniger stark als Basiselterngeld","Man erhält doppelt so viel Geld"], a:2 },
        ]
      }
    ]
  },
// ── KAP 04 ──────────────────────────────────────────────────────
  {
    id:4, number:"04", title:"Einkommensberechnung", icon:"💶",
    fullTitle:"Kapitel 4 – Bemessungszeitraum, Einkommensermittlung & Sonderfälle",
    description:"Das Kernstück der Beratung: Welche 12 Monate zählen? Ausklammerung, Verschiebung, Selbstständige, Sonderzahlungen und der korrekte Umgang mit Mischeinkünften.",
    lessons:[
      {
        id:"4-1", title:"Bemessungszeitraum & Ausklammerung: Die wichtigste Regel", duration:"ca. 16 min",
        objective:"Du bestimmst korrekt den Bemessungszeitraum, erkennst Ausklammerungstatbestände und weißt, wann du eskalierst.",
        videoHint:"Screencast: Am Kalender die 12 Monate bestimmen. Fallbeispiel: Mutter mit Schwangerschaftserkrankung – Monat ausklammen. Zweites Kind – wie verschiebt sich der Zeitraum?",
        pdfLabel:"Übungsblatt 4-1: Bemessungszeitraum bestimmen (6 Fallbeispiele inkl. Ausklammerung)",
        checkCriteria:["Angestellte Mutter: 12 KM vor Mutterschutzbeginn korrekt","Vater: 12 KM vor Geburtsmonat korrekt","Ausklammerung Mutterschaftsgeld: betroffener Monat übersprungen","Ausklammerung älteres Kind: korrekt","Schwangerschaftsbedingte Erkrankung: ausgeklammert","Zweites Kind: korrekte Verschiebung angewendet"],
        content:[
          { type:"heading", text:"Der Bemessungszeitraum: Was wirklich zählt" },
          { type:"text", text:"Der Bemessungszeitraum umfasst immer 12 volle Kalendermonate und liegt vor der Geburt. Für angestellte Mütter: die 12 Monate vor dem Kalendermonat, in dem der Mutterschutz begann. Für Väter und beamtete Mütter: die 12 Monate vor dem Geburtsmonat. Es zählen nur vollständige Kalendermonate." },
          { type:"highlight", label:"📅 Beispiel: Berechnung für die Mutter", text:"Kind geboren am 21. Oktober 2025\nMutterschutz begann am 10. September 2025\nLetzter vollständiger KM vor dem Mutterschutz: August 2025\nBemessungszeitraum: September 2024 bis August 2025\nSeptember 2025 mit Mutterschaftsgeld → wird ausgeklammert\nErsatzmonat: September 2024 → verschiebt sich auf August 2024\nAcht: Dieser Schritt wird oft vergessen – immer selbst prüfen!" },
          { type:"highlight", label:"🔄 Ausklammerungstatbestände (Angestellte)", text:"Diese Monate werden automatisch übersprungen und durch frühere ersetzt:\n1. Monate mit Mutterschaftsgeldbezug (dieses oder ältere Kinder)\n2. Monate mit Basiselterngeld für älteres Kind (max. bis LM 14)\n3. Monate mit schwangerschaftsbedingter Erkrankung und Einkommensverlust\n4. Monate mit Beschäftigungsverbot nach Mutterschutzgesetz" },
          { type:"warning", label:"⚠️ Fehlerquelle Nr. 1 im Bescheid: Ausklammerung vergessen", text:"Wenn die Elterngeldstelle einen Monat mit Elterngeld-Bezug für ein älteres Kind nicht ausklammert, zählt dieser Monat mit 0 € oder reduziertem Einkommen → Durchschnittseinkommen sinkt → Elterngeld zu niedrig. Immer den Bescheid prüfen und ggf. Widerspruch einlegen (Frist: 1 Monat nach Bescheidzugang). Rechtsgrundlage: § 2b Abs. 1 S. 2 BEEG" },
          { type:"text", text:"Für Selbstständige gelten Verschiebetatbestände statt Ausklammerungstatbestände: Der Bemessungszeitraum ist das letzte abgeschlossene Steuerjahr (Veranlagungsjahr). Wenn im Vorjahr Elterngeld für ein älteres Kind bezogen wurde, kann auf Antrag das Vorvorjahr als Bemessungsjahr herangezogen werden. Wichtig: Diese Verschiebung muss aktiv beantragt werden!" },
        ],
        quiz:[
          { q:"Für angestellte Mütter gilt als Startpunkt des Bemessungszeitraums:", opts:["Geburtsmonat des Kindes","Monat des Mutterschutzbeginns (12 Monate davor)","1. Januar des Geburtsjahres","Datum der Schwangerschaftsbestätigung"], a:1 },
          { q:"Was passiert mit einem Monat, in dem die Mutter Mutterschaftsgeld für das ältere Kind bezogen hat?", opts:["Zählt mit dem tatsächlich gezahlten Betrag","Wird ausgeklammert und durch einen früheren Monat ersetzt","Zählt mit 0 €","Wird nicht berücksichtigt, kein Ersatz"], a:1 },
          { q:"Bei welcher Frist muss Widerspruch gegen einen falschen Elterngeld-Bescheid eingelegt werden?", opts:["3 Monate","6 Monate","1 Monat nach Bescheidzugang","2 Wochen"], a:2 },
        ]
      },
      {
        id:"4-2", title:"Einkommensermittlung: Angestellte, Selbstständige & Sonderzahlungen", duration:"ca. 14 min",
        objective:"Du liest Gehaltsabrechnungen korrekt aus, erkennst welche Einkommensarten zählen und weißt, wie Sonderzahlungen behandelt werden.",
        videoHint:"Screencast: Echte Gehaltsabrechnung – welche Zeilen sind relevant? Weihnachtsgeld herausrechnen. Selbstständige: Steuerbescheid auslesen. Kurzarbeit-Fall.",
        pdfLabel:"Übungsblatt 4-2: Einkommensermittlung – Gehaltsabrechnungen auswerten (3 Fallbeispiele)",
        checkCriteria:["Laufendes Bruttoeinkommen korrekt identifiziert","Weihnachtsgeld/Urlaubsgeld/Prämien korrekt herausgerechnet","Sozialabgaben-Pauschale 21% korrekt angewendet","Selbstständige: Jahresgewinn aus Steuerbescheid korrekt","Kurzarbeitergeld: kein Ausklammerungsgrund","Arbeitnehmer-Pauschbetrag 83,33 €/Monat korrekt abgezogen"],
        content:[
          { type:"heading", text:"Was zählt als Einkommen? – Die exakte Berechnung" },
          { type:"text", text:"Das relevante Einkommen für das Elterngeld ist nicht das Netto auf der Gehaltsabrechnung, sondern ein 'elterngeldspezifisches Netto'. Ausgangspunkt ist das laufende Bruttogehalt aus den 12 Bemessungsmonaten. Davon werden pauschal 21% für Sozialabgaben abgezogen, außerdem die tatsächliche Lohnsteuer und ein Arbeitnehmer-Pauschbetrag von monatlich 83,33 €." },
          { type:"warning", label:"🚨 Einmalzahlungen: Nie in die Berechnung!", text:"Weihnachtsgeld, Urlaubsgeld, Leistungsprämien, Sonderzahlungen aller Art und steuerfreie Einmalzahlungen werden NICHT einbezogen. Nur das laufende, regelmäßige monatliche Bruttogehalt zählt. Viele Familien rechnen mit Jahreseinkommen inkl. Weihnachtsgeld und sind dann vom niedrigeren Bescheid enttäuscht." },
          { type:"highlight", label:"📋 Die Berechnungsformel", text:"Monatliches Brutto (laufend, ohne Einmalzahlungen)\n− 21% Sozialabgaben-Pauschale\n− Lohnsteuer (laut Steuerklasse im Bemessungszeitraum)\n− Kirchensteuer (falls anfallend)\n− Arbeitnehmer-Pauschbetrag 83,33 €/Monat\n= Elterngeld-relevantes Netto\n× 65–67% Ersatzrate\n= Elterngeld-Betrag (min. 300 €, max. 1.800 €)" },
          { type:"text", text:"Für Selbstständige: Der Bemessungszeitraum ist das gesamte letzte Steuerjahr. Das relevante Einkommen ist der Gewinn laut Steuerbescheid – nicht Umsatz, Betriebseinnahmen oder Bruttohonorare. Selbstständige mit Mischeinkünften (auch nur einen Tag angestellt im Vorjahr) werden grundsätzlich wie Selbstständige behandelt." },
          { type:"warning", label:"⚠️ Kurzarbeitergeld & Krankengeld: Keine Ausklammerung", text:"Kurzarbeitergeld zählt nicht als Einkommen für das Elterngeld. Monate mit Kurzarbeit gehen mit dem reduzierten Gehalt (nur eigener Anteil) in die Berechnung ein. Diese Monate können aber NICHT ausgeklammert werden (Ausnahme: Corona-Regelung für 1.3.2020–23.9.2022). Gleiches gilt für reguläres Krankengeld." },
        ],
        quiz:[
          { q:"Wie hoch ist der Sozialabgaben-Pauschbetrag bei der Elterngeldberechnung?", opts:["17%","21%","25%","30%"], a:1 },
          { q:"Wie wird ein Weihnachtsgeld bei der Elterngeldberechnung berücksichtigt?", opts:["Auf alle 12 Monate verteilt","Vollständig hinzugerechnet","Gar nicht – Einmalzahlung","Zur Hälfte berücksichtigt"], a:2 },
          { q:"Ein Angestellter hatte in 3 Monaten Kurzarbeit im Bemessungszeitraum. Was passiert?", opts:["Werden ausgeklammert","Gehen mit dem reduzierten Eigenanteil ein, keine Ausklammerung","Kurzarbeitergeld zählt als volles Einkommen","Bemessungszeitraum wird automatisch verschoben"], a:1 },
        ]
      },
      {
        id:"4-3", title:"Geschwisterbonus, Mehrlingszuschlag & die Geschwisterkind-Problematik", duration:"ca. 10 min",
        objective:"Du berechnest Geschwisterbonus und Mehrlingszuschlag korrekt und kennst die Geschwisterkind-Falle bei der Ausklammerung.",
        videoHint:"Screencast: Fallbeispiel – zweites Kind, älteres Geschwister 2,5 Jahre alt. Schritt für Schritt: Bonus prüfen, Bemessungszeitraum verschieben, Ergebnis vergleichen.",
        pdfLabel:"Übungsblatt 4-3: Geschwisterbonus-Fälle (3 Übungen) + Mehrlingszuschlag berechnen",
        checkCriteria:["Geschwisterbonus-Voraussetzung korrekt geprüft (unter 3 / zwei unter 6)","Minimalbetrag Geschwisterbonus korrekt: 75 € (Basis) / 37,50 € (EP+)","Mehrlingszuschlag: +300 €/Basis je weiteres Mehrlingsgeschwisterkind","Geschwisterkind-Problem erkannt: Bemessungszeitraum komplett in Elternzeit","Verschiebung auf Zeitraum vor erstem Kind korrekt angewendet"],
        content:[
          { type:"heading", text:"Geschwisterbonus & Mehrlingszuschlag: Geld, das oft vergessen wird" },
          { type:"text", text:"Der Geschwisterbonus und der Mehrlingszuschlag sind zwei der häufigsten übersehenen Leistungen in der Beratungspraxis – zusammen können sie den Elterngeld-Gesamtbetrag um mehrere tausend Euro erhöhen. Beide müssen aktiv beantragt werden und werden nicht automatisch gewährt." },
          { type:"highlight", label:"💰 Geschwisterbonus im Detail", text:"Voraussetzung: Min. 1 Kind unter 3 Jahren ODER 2 Kinder unter 6 Jahren im Haushalt\nBonus: +10% des berechneten Elterngeldes\nMinimum: 75 €/Monat (Basiselterngeld) / 37,50 €/Monat (ElterngeldPlus)\nStichtag: Beginn des Elterngeldbezugs (nicht Geburtsdatum!)\nÜber 14 Monate: bis zu 1.050 € zusätzlich – immer prüfen!" },
          { type:"highlight", label:"👶👶 Mehrlingszuschlag", text:"Für jedes weitere Mehrlingsgeschwisterkind:\n+300 €/Monat Basiselterngeld\n+150 €/Monat ElterngeldPlus\nBeispiel: Zwillinge → +300 € für das zweite Kind\nDrillinge → +600 € (für 2. und 3. Kind)\nDieser Zuschlag kommt ZUSÄTZLICH zum Geschwisterbonus" },
          { type:"warning", label:"⚠️ Die Geschwisterkind-Falle: Wenn der Bemessungszeitraum komplett in der Elternzeit liegt", text:"Problem: Wenn die Mutter für das zweite Kind in der Elternzeit des ersten war, liegt der normale Bemessungszeitraum (12 Monate vor Mutterschutzbeginn) komplett in der Elternzeit → keine relevanten Einkommensmonate.\nLösung: Nach § 2b Abs. 2 BEEG wird der Bemessungszeitraum auf den Zeitraum VOR der Elternzeit für das erste Kind verschoben.\nDiese Verschiebung muss aktiv beantragt werden und wird von Elterngeldstellen nicht immer automatisch angewendet!" },
          { type:"text", text:"In der Praxis: Wenn ein Ehepaar das zweite Kind in schneller Folge bekommt (weniger als 3 Jahre Abstand), ist die Geschwisterkind-Problematik fast immer relevant. Prüfe immer: War die Mutter im normalen Bemessungszeitraum in Elternzeit oder im Mutterschutz für das erste Kind? Wenn ja → Verschiebung beantragen und entsprechend begründen." },
        ],
        quiz:[
          { q:"Wie hoch ist der Geschwisterbonus-Mindestbetrag bei Basiselterngeld?", opts:["50 €","100 €","75 €","37,50 €"], a:2 },
          { q:"Wie viel Mehrlingszuschlag erhält eine Familie pro weiterem Mehrlingsgeschwisterkind beim Basiselterngeld?", opts:["150 €","500 €","300 €","200 €"], a:2 },
          { q:"Was ist das 'Geschwisterkind-Problem' beim Bemessungszeitraum?", opts:["Das Geschwisterkind kann keinen Bonus beantragen","Der gesamte Bemessungszeitraum liegt in der Elternzeit des ersten Kindes – Einkommen fehlt","Geschwisterkinder teilen die 14 Monate","Geschwisterbonus und Mehrlingszuschlag schließen sich aus"], a:1 },
        ]
      }
    ]
  },
// ── KAP 05 ──────────────────────────────────────────────────────
  {
    id:5, number:"05", title:"Beilagen, Einreichung & Bescheid", icon:"✅",
    fullTitle:"Kapitel 5 – Vollständige Beilagen, Einreichungsweg & Bescheid prüfen",
    description:"Checkliste aller Beilagen, Einreichung je Bundesland, Einreichungsfristen und systematische Bescheidprüfung. Wann und wie Widerspruch einlegen.",
    lessons:[
      {
        id:"5-1", title:"Beilagen-Checkliste: Vollständig einreichen auf Anhieb", duration:"ca. 11 min",
        objective:"Du kennst alle Pflichtbeilagen, erkennst fehlende Dokumente und weißt, welche Beilagen vom Bundesland abhängen.",
        videoHint:"Screencast: Beilagen-Checkliste durchgehen, Geburtsurkunde mit 'Elterngeld'-Vermerk zeigen, Lohnabrechnungen markieren, Arbeitgeberbescheinigung erklären.",
        pdfLabel:"Übungsblatt 5-1: Beilagen-Checkliste (Fallbeispiel: Angestellte Mutter, Selbstständiger Vater)",
        checkCriteria:["Geburtsurkunde mit 'für Elterngeld' als Pflicht erkannt","Lohnabrechnungen: alle 12 Monate des Bemessungszeitraums","Bei Selbstständigen: Einkommensteuerbescheid vorhanden","Mutterschaftsgeld-Bescheinigung beigefügt","Bundesland-spezifische Besonderheiten beachtet"],
        content:[
          { type:"heading", text:"Beilagen: Vollständigkeit ist alles" },
          { type:"text", text:"Der häufigste Grund für Bearbeitungsverzögerungen: fehlende Beilagen. Eine vollständige Einreichung beim ersten Anlauf spart Wochen. Grundsatz: Lieber zu viel als zu wenig beilegen. Bei Unsicherheit: bei der zuständigen Elterngeldstelle vorab nachfragen." },
          { type:"highlight", label:"📎 Standard-Beilagen (fast immer erforderlich)", text:"✓ Ausgefüllter Antrag, unterschrieben von BEIDEN Elternteilen\n✓ Geburtsurkunde mit Vermerk 'für Elterngeld' (bei Mehrlingen: je Kind)\n✓ Lohn-/Gehaltsabrechnungen aller 12 Monate des Bemessungszeitraums\n✓ Bescheinigung der Krankenkasse über Mutterschaftsgeld (Betrag + Zeitraum)\n✓ Bescheinigung des Arbeitgebers über den AG-Zuschuss zum Mutterschaftsgeld" },
          { type:"highlight", label:"📎 Situationsabhängige Beilagen", text:"Selbstständige: letzter Einkommensteuerbescheid + Gewinnermittlung\nTeilzeit-Zuverdienst: Arbeitgeberbescheinigung über Wochenstunden\nGeschwisterbonus: Geburtsurkunde des Geschwisterkindes\nFrühgeburt: ärztliche Bescheinigung über errechneten Entbindungstermin\nPartnerschaftsbonus: Arbeitgeberbescheinigungen beider Elternteile\nAusländische Staatsbürger: Aufenthaltstitel / Niederlassungserlaubnis\nSchwangerschaftsbedingte Erkrankung: ärztliches Attest" },
          { type:"warning", label:"⚠️ Original vs. Kopie: Bundesland prüfen!", text:"Die Anforderungen variieren nach Bundesland. In manchen Ländern (z.B. Bayern) werden Originale der Geburtsurkunde verlangt. In anderen genügen einfache Kopien. Für Sachsen: Original oder einfache Kopie je nach Landkreis – immer vorab klären. Empfehlung: Mit Original einreichen, Rücksendung anfragen." },
          { type:"text", text:"Einreichungswege: Online via ElterngeldDigital (empfohlen), per Post als Einschreiben mit Rückschein (Sendungsverfolgung für Eingangsbeleg), oder persönlich bei der Elterngeldstelle. Für die Fristwahrung zählt der Eingangsstempel. Immer eine Kopie aller Dokumente behalten." },
        ],
        quiz:[
          { q:"Welcher Vermerk muss auf der Geburtsurkunde stehen?", opts:["'Für Standesamt'","'Amtliches Dokument'","'Für Elterngeld'","Kein Vermerk nötig"], a:2 },
          { q:"Wie viele Monate Lohnabrechnungen müssen beigefügt werden?", opts:["Die letzten 3 Monate","Die letzten 6 Monate","Nur der letzte Monat","Alle 12 Monate des Bemessungszeitraums"], a:3 },
          { q:"Was ist der sicherste Weg für postalische Einreichung?", opts:["Normaler Brief","Einschreiben mit Rückschein","Per E-Mail (Scan)","Per Fax"], a:1 },
        ]
      },
      {
        id:"5-2", title:"Bescheid prüfen & Widerspruch einlegen", duration:"ca. 12 min",
        objective:"Du prüfst Bescheide systematisch auf die 5 häufigsten Fehler und weißt, wie und wann ein Widerspruch einzulegen ist.",
        videoHint:"Screencast: Anonymisierten Bescheid durchgehen. Berechnungsanlage analysieren. Widerspruchsschreiben live formulieren.",
        pdfLabel:"Übungsblatt 5-2: Bescheid-Prüfcheckliste anwenden (2 Muster-Bescheide)",
        checkCriteria:["Bewilligungszeitraum korrekt geprüft","Bemessungszeitraum korrekt (12 Monate, Ausklammerungen geprüft)","Einkommensbasis korrekt (keine Einmalzahlungen)","Geschwisterbonus geprüft","Widerspruchsfrist bekannt: 1 Monat nach Bescheidzugang","Widerspruch schriftlich per Einschreiben"],
        content:[
          { type:"heading", text:"Der Bescheid kommt – jetzt genau hinschauen" },
          { type:"text", text:"Ein erheblicher Teil aller Elterngeld-Bescheide enthält Fehler. Die Elterngeldstellen arbeiten unter hohem Zeitdruck. Als Beraterin ist die Bescheidprüfung eine der wichtigsten Dienstleistungen – denn nach 1 Monat ist die Widerspruchsfrist abgelaufen." },
          { type:"highlight", label:"🔍 Die 5 häufigsten Bescheid-Fehler", text:"1. Falscher Bemessungszeitraum – Ausklammerung nicht angewendet\n2. Geschwisterbonus vergessen oder falsch berechnet\n3. Einmalzahlungen fälschlicherweise ins Einkommen eingerechnet\n4. Falsche Steuerklasse angesetzt\n5. Bewilligungszeitraum stimmt nicht mit Antrag überein" },
          { type:"warning", label:"⏱️ Widerspruch: 1 Monat Frist – keine Ausnahme", text:"Der Widerspruch muss schriftlich innerhalb eines Monats nach Zugang des Bescheids bei der Elterngeldstelle eingehen. Wenn die Frist fast abläuft: formlos Widerspruch einlegen ('Hiermit lege ich vorsorglich Widerspruch ein') – Begründung kann nachgereicht werden. Widerspruch immer als Einschreiben!" },
          { type:"highlight", label:"✍️ Widerspruchsschreiben: Grundstruktur", text:"An die [Elterngeldstelle]\nDatum: XX.XX.XXXX\n\nBetreff: Widerspruch gegen Elterngeld-Bescheid vom [Datum], Az.: [Aktenzeichen]\n\nHiermit lege ich Widerspruch gegen den o.g. Bescheid ein.\n\nBegründung: Der Bemessungszeitraum wurde falsch festgestellt. Im [Monat/Jahr] bezog die Antragstellerin Mutterschaftsgeld für das ältere Kind. Dieser Monat hätte gem. § 2b Abs. 1 S. 2 Nr. 2 BEEG ausgeklammert werden müssen.\n\nIch bitte um Überprüfung, Neuberechnung und Eingangsbestätigung.\n[Unterschrift]" },
          { type:"text", text:"Wie liest man den Bescheid? Der Bescheid besteht aus Hauptbescheid (Bewilligung mit Zeitraum und Monatsbetrag) und Berechnungsanlage. In der Berechnungsanlage stehen: Bemessungszeitraum, monatliches Nettoeinkommen, Steuerklasse, Abzüge, Ersatzrate. Schritt für Schritt: Bewilligungszeitraum mit Antrag vergleichen → Bemessungszeitraum prüfen → Einkommen auf Einmalzahlungen prüfen → Geschwisterbonus prüfen → Monatsbetrag mit eigenem Rechner vergleichen." },
        ],
        quiz:[
          { q:"Innerhalb welcher Frist muss Widerspruch eingelegt werden?", opts:["3 Monate","2 Wochen","6 Monate","1 Monat nach Bescheidzugang"], a:3 },
          { q:"Was tun, wenn die Widerspruchsfrist fast abläuft und die Begründung fehlt?", opts:["Warten bis Begründung fertig ist","Formlos Widerspruch einlegen – Begründung kann nachgereicht werden","Klage beim Sozialgericht","Anrufen – das reicht für Fristwahrung"], a:1 },
          { q:"Welcher Bescheid-Fehler ist laut Beratungspraxis am häufigsten?", opts:["Falscher Monatsbetrag durch Rundung","Falsch angewendete Ausklammerung im Bemessungszeitraum","Vergessene Unterschrift","Falsches Bundesland"], a:1 },
        ]
      }
    ]
  },
// ── KAP 06 ──────────────────────────────────────────────────────
  {
    id:6, number:"06", title:"Beratungsalltag & Organisation", icon:"🗂️",
    fullTitle:"Kapitel 6 – Organisatorisches, Kommunikation & professioneller Beratungsalltag",
    description:"Beratungskommunikation, Datenschutz, Eskalationsmatrix, Qualitätssicherung und der 7-Schritte-Prozess für jede Kundenberatung.",
    lessons:[
      {
        id:"6-1", title:"Beratungskommunikation & Datenschutz", duration:"ca. 9 min",
        objective:"Du kommunizierst professionell und empathisch mit Kunden, vermeidest unzulässige Zusagen und hältst Datenschutz-Regeln ein.",
        videoHint:"Screencast: Roleplay – Kundengespräch mit typischen Fragen. Was sagen? Was nicht sagen? Datenschutz: Welche Kanäle sind zulässig?",
        pdfLabel:"Übungsblatt 6-1: Kommunikations-Check – Was antwortest du? (10 Praxis-Situationen)",
        checkCriteria:["Fachbegriffe in Kundensprache übersetzt","Keine exakten Betragsversprechen ohne vollständige Daten","Datenschutz: Keine Datenübermittlung per unverschlüsselter E-Mail oder WhatsApp","Grenzen der Beratung klar: Informationsservice, keine Rechtsberatung","Empathische Grundhaltung in emotionaler Lebensphase"],
        content:[
          { type:"heading", text:"Beratungskommunikation: Klar, empathisch, rechtssicher" },
          { type:"text", text:"Die Elterngeldberatung findet in einer emotional bedeutsamen Lebensphase statt. Familien sind oft unsicher, gestresst, manchmal überfordert. Deine Kommunikation muss gleichzeitig fachlich präzise und menschlich zugänglich sein. Das ist eine echte Kompetenz – nicht selbstverständlich." },
          { type:"highlight", label:"💬 Kommunikationsprinzipien", text:"Zuhören zuerst: Was beschäftigt den Kunden wirklich? Nicht sofort in Erklärungen einsteigen.\nFachsprache übersetzen: 'Bemessungszeitraum' → 'die 12 Monate vor dem Mutterschutz, aus denen dein Einkommen berechnet wird'\nUnsicherheiten benennen: 'Das prüfen wir genau im Antrag – ich sage dir nicht drauflos, was es wird'\nKeine Versprechen auf exakte Beträge ohne vollständige Unterlagen\nHinweise auf Fachstellen: Du bist Informationsservice, kein Anwalt" },
          { type:"warning", label:"🔒 Datenschutz: Was ist zulässig?", text:"NICHT zulässig:\n- Weitergabe von Kundendaten per WhatsApp\n- Unverschlüsselte E-Mail mit persönlichen Daten (Name + Steuer-ID + Kontonummer = kritisch)\n- Daten auf privaten Geräten speichern\n\nZULÄSSIG:\n- Verschlüsselte E-Mail (z.B. über sicheres Portal)\n- Persönliches Gespräch oder Telefon\n- Sichere Beratungssoftware\n\nIm Zweifel: persönliches Gespräch oder Einschreiben-Post bevorzugen" },
          { type:"text", text:"Die emotionale Dimension: Für viele Familien ist das Elterngeld existenziell. Fehler oder Missverständnisse können zu erheblichen finanziellen Schäden führen. Gleichzeitig ist die Geburt eines Kindes ein freudiges Ereignis. Diese Spannung auszuhalten – professionell sachlich und gleichzeitig menschlich zugewandt – ist das Kernstück guter Beratung." },
          { type:"highlight", label:"🚫 Formulierungen vermeiden", text:"❌ 'Sie bekommen auf jeden Fall mehr als 1.500 €' → ✅ 'Mit Ihrem Einkommen liegen Sie voraussichtlich in diesem Bereich – wir rechnen das genau durch'\n❌ 'Das mache ich kurz für Sie' → ✅ 'Ich begleite Sie durch den Antrag'\n❌ 'Das regelt die Elterngeldstelle automatisch' → ✅ 'Das müssen wir aktiv im Antrag beantragen'\n❌ 'Schicken Sie mir die Unterlagen per WhatsApp' → ✅ 'Bringen Sie die Unterlagen am besten persönlich mit'" },
        ],
        quiz:[
          { q:"Welcher Kommunikationskanal ist für die Übermittlung von Kundendaten (Name + Steuer-ID) NICHT geeignet?", opts:["Persönliches Gespräch","Einschreiben per Post","Unverschlüsselte Standard-WhatsApp-Nachricht","Verschlüsseltes E-Mail-Portal"], a:2 },
          { q:"Was antwortest du, wenn ein Kunde fragt 'Wie viel Elterngeld bekomme ich?'", opts:["Den Maximalbetrag von 1.800 € nennen","Eine Schätzung auf Basis des Bruttolohns ohne Unterlagen","'Das hängt von mehreren Faktoren ab – berechnen wir das gemeinsam mit Ihren Unterlagen'","'Das weiß nur die Elterngeldstelle'"], a:2 },
          { q:"Was ist die Hauptaufgabe einer Elterngeldberaterin bezüglich Rechtsberatung?", opts:["Rechtliche Einschätzungen geben wie ein Anwalt","Informationsservice leisten – keine Rechtsberatung","Widersprüche selbstständig für Kunden einreichen","Steuererklärungen für Kunden erstellen"], a:1 },
        ]
      },
      {
        id:"6-2", title:"Eskalationsmatrix: Was selbst lösen, was eskalieren?", duration:"ca. 8 min",
        objective:"Du weißt genau, welche Fälle du eigenständig bearbeitest und wann du an die Chefin oder externe Fachstellen übergibst.",
        videoHint:"Screencast: Fallbeispiele durchgehen – Was machst du selbst? Wo rufst du an? Die Eskalationsmatrix als Poster-Übersicht erklären.",
        pdfLabel:"Übungsblatt 6-2: Eskalationsentscheidung – 10 Fälle einordnen (selbst / eskalieren)",
        checkCriteria:["Standardfälle (Angestellte, einfache Monatsplanung) eigenständig korrekt","Grenzfälle (Selbstständige, Ausklammerung, Grenzgänger) eskaliert","Widerspruchssituation: sofort eskaliert","Rechtsfragen: eskaliert","Unsicherheitsprinzip: 'im Zweifel nachfragen' als Grundsatz"],
        content:[
          { type:"heading", text:"Eskalationsmatrix: Wann bin ich zuständig – und wann nicht?" },
          { type:"text", text:"Eine der wichtigsten Kompetenzen im Beratungsalltag ist die saubere Einschätzung der eigenen Handlungsgrenzen. Zu viel selbst zu entscheiden führt zu Fehlern. Zu wenig selbst zu machen führt zu Ineffizienz. Die folgende Matrix gibt dir Orientierung." },
          { type:"table", headers:["Situation","Eigenständig bearbeiten?","Eskalieren zu"],
            rows:[
              ["Standardfall: Angestellte Mutter, unkompliziert","✅ Ja","–"],
              ["Einfache Monatsplanung Basis/EP+","✅ Ja","–"],
              ["Geschwisterbonus prüfen & beantragen","✅ Ja","–"],
              ["Beilagen-Checkliste erstellen","✅ Ja","–"],
              ["Selbstständige mit Sonderfällen","❌ Nein","Chefin"],
              ["Ausklammerung / Verschiebung komplex","❌ Nein","Chefin"],
              ["Ausländische Staatsbürger / Grenzgänger","❌ Nein","Chefin + ggf. Fachberatung"],
              ["Frühgeburten (Extramonate-Antrag)","⚠️ Prüfen","Chefin informieren"],
              ["Widerspruch gegen Bescheid","❌ Nein","Chefin"],
              ["Rechtsfrage / Gesetzesauslegung","❌ Nein","Chefin / Anwalt"],
              ["Jede echte Unsicherheit","❌ Nein","Im Zweifel immer nachfragen"],
            ]
          },
          { type:"highlight", label:"💡 Das Unsicherheitsprinzip", text:"Wenn du dir nicht sicher bist – immer nachfragen. Eine falsche Auskunft kostet die Familie im schlimmsten Fall tausende Euro. Eine kurze Nachfrage bei der Chefin kostet 2 Minuten. Das Verhältnis ist eindeutig. Du wirst nicht als schwach oder inkompetent wahrgenommen, wenn du nachfragst – sondern als professionell." },
          { type:"text", text:"Externe Ressourcen: Elterngeldstelle des Landkreises (für konkrete Fälle), BMFSFJ-Hotline, Familienportal.de (Grundlageninfos), Sozialverband VdK oder VLH für Sonderfälle, Anwalt für Sozialrecht bei Widerspruchs-/Klagefällen. Wichtig: Keine externen Stellen direkt im Namen der Beratungsstelle kontaktieren ohne Rücksprache mit der Chefin." },
        ],
        quiz:[
          { q:"Eine Kundin ist Selbstständige mit komplizierten Mischeinkünften. Was tust du?", opts:["Eigenständig bearbeiten und Steuerbescheid auswerten","Fall selbst abschließen – das ist Standardroutine","An die Chefin eskalieren","Den Fall ablehnen"], a:2 },
          { q:"Eine Kundin hat einen Bescheid erhalten, den sie für falsch hält. Was ist der erste Schritt?", opts:["Selbstständig Widerspruch formulieren und einreichen","Die Chefin sofort informieren","Die Elterngeldstelle direkt anrufen und erklären","Abwarten, ob die Elterngeldstelle sich korrigiert"], a:1 },
          { q:"Was ist das 'Unsicherheitsprinzip'?", opts:["Bei Unsicherheit den Kunden direkt an die Elterngeldstelle verweisen","Bei Unsicherheit immer bei der Chefin nachfragen, bevor man antwortet","Bei Unsicherheit den Standardfall annehmen","Bei Unsicherheit den Kunden um Selbstauskunft bitten"], a:1 },
        ]
      },
      {
        id:"6-3", title:"Der 7-Schritte-Beratungsprozess", duration:"ca. 10 min",
        objective:"Du kannst jeden Kundenfall strukturiert durch den vollständigen Beratungsprozess führen und weißt, welche Qualitätsstandards dabei gelten.",
        videoHint:"Screencast: Einen vollständigen Kundenfall von Erstkontakt bis Einreichung live durchspielen. Checklisten und Dokumentationstools zeigen.",
        pdfLabel:"Übungsblatt 6-3: Selbst-Audit – Hast du alle 7 Schritte eingehalten? (Eigenen Fall dokumentieren)",
        checkCriteria:["Alle 7 Schritte vollständig durchgeführt","Vier-Augen-Prinzip bei jedem Antrag angewendet","Widerspruchsfrist nach Bescheid-Eingang im System notiert","Eingang der Unterlagen dokumentiert","Keine unkomplettierten Fälle im System"],
        content:[
          { type:"heading", text:"Der 7-Schritte-Beratungsprozess: Jeder Fall – dasselbe Vorgehen" },
          { type:"text", text:"Qualität entsteht durch Konsequenz – nicht durch Ausnahmen. Der folgende 7-Schritte-Prozess gilt für jeden Kundenfall, egal ob einfach oder komplex. Abkürzungen sind erlaubt, wenn sie bewusst gewählt werden – nicht aus Nachlässigkeit." },
          { type:"highlight", label:"📋 Die 7 Schritte", text:"① Erstkontakt & Datenschutz-Einwilligung einholen\n   → Kurze Situation erfassen, offene Fragen stellen\n\n② Anspruchs-Check durchführen\n   → Einkommensgrenze, Staatsangehörigkeit, Wohnsitz\n\n③ Unterlagen-Checkliste erstellen und aushändigen\n   → Individuell zusammenstellen, Termin vereinbaren\n\n④ Antrag gemeinsam ausfüllen\n   → Abschnitt für Abschnitt, alle Felder prüfen\n\n⑤ Vier-Augen-Kontrolle vor Einreichung\n   → Zweite Person prüft vollständigen Antrag\n\n⑥ Einreichung dokumentieren\n   → Einschreiben-Nummer notieren, Kopie ablegen\n\n⑦ Bescheid-Nachverfolgung\n   → Widerspruchsfrist im System notieren, Bescheid gemeinsam prüfen" },
          { type:"warning", label:"⚠️ Das Vier-Augen-Prinzip: Pflicht, keine Option", text:"Jeder Antrag, der im Namen der Beratungsstelle begleitet wird, muss vor der Einreichung von einer zweiten Person geprüft werden. Fehler in Elterngeldanträgen können erhebliche finanzielle Schäden für Kunden verursachen. Das Vier-Augen-Prinzip ist die wichtigste Qualitätssicherung. Keine Ausnahmen." },
          { type:"highlight", label:"📚 Wichtige externe Ressourcen", text:"familienportal.de – offizielle Infos des Bundesfamilienministeriums\nbmfsfj.de – Rechner und Broschüren\nelterngeld.sachsen.de – Sachsen-spezifische Infos und Online-Antrag\ngesetze-im-internet.de/beeg – vollständiger Gesetzestext\nKSV Sachsen – regionale Ansprechpartner\nElterngeldstelle des Landkreises – konkrete Fälle und Rückfragen" },
          { type:"text", text:"Dokumentation und Compliance: Alle Beratungen werden kurz dokumentiert (Datum, Kundin, was wurde besprochen, welche Unterlagen übergeben). Keine Dokumente auf privaten Geräten. Kundendaten nur in der genehmigten Software. Widerspruchsfrist nach Bescheid-Eingang: immer im System als Aufgabe anlegen mit 25-Tage-Erinnerung (um noch 5 Tage Puffer zu haben)." },
        ],
        quiz:[
          { q:"In welchem Schritt des Beratungsprozesses findet die Vier-Augen-Kontrolle statt?", opts:["Schritt 3 – beim Erstellen der Unterlagen-Checkliste","Schritt 5 – vor der Einreichung","Schritt 1 – beim Erstkontakt","Schritt 7 – nach dem Bescheid"], a:1 },
          { q:"Bis wann sollte die Erinnerung für die Widerspruchsfrist gesetzt werden (1 Monat = 30 Tage)?", opts:["Am Tag des Bescheid-Eingangs","30 Tage nach Eingang","25 Tage nach Eingang (5 Tage Puffer)","14 Tage nach Eingang"], a:2 },
          { q:"Was ist der erste Schritt im Beratungsprozess?", opts:["Antrag sofort ausfüllen","Unterlagen-Checkliste erstellen","Erstkontakt und Datenschutz-Einwilligung einholen","Anspruchs-Check durchführen"], a:2 },
        ]
      }
    ]
  },
// ── KAP 07 ──────────────────────────────────────────────────────
  {
    id:7, number:"07", title:"Die Anlagen im Detail", icon:"📎",
    fullTitle:"Kapitel 7 – Die Anlagen: Wann, warum und wie korrekt ausfüllen?",
    description:"Jede Anlage des Elterngeldantrags im Detail: Wann ist sie Pflicht? Was sind die typischen Fehler? Bundeseinheitlicher Antrag vs. Bayern. PV-Falle, Grenzgänger, Rückforderungsrisiken.",
    lessons:[
      {
        id:"7-1", title:"Überblick: Welche Anlage wann? Bundeseinheitlich vs. Bayern", duration:"ca. 10 min",
        objective:"Du weißt, welche Anlagen in welcher Situation erforderlich sind und kennst den Unterschied zwischen dem bundeseinheitlichen Antrag und länderspezifischen Formularen.",
        videoHint:"Screencast: Bundeseinheitlichen Antrag (Sachsen) aufrufen, Anlage EG+ und 12.a zeigen. Bayern: ZBFS-Formular vergleichen – Unterschiede kommentieren.",
        pdfLabel:"Übungsblatt 7-1: Anlage-Zuordnung – 8 Fallbeispiele (Welche Anlage ist erforderlich?)",
        checkCriteria:["Bundeseinheitlicher vs. länderspezifischer Antrag korrekt unterschieden","Alle Anlagen und ihre Auslöser korrekt zugeordnet","Bayern vs. Sachsen: Formularunterschiede erkannt","Anlage 12.a als häufigste Rückforderungsursache identifiziert","EG+ und EA als häufig vergessene Anlagen benannt"],
        content:[
          { type:"heading", text:"Der Überblick: Welche Anlage ist wann Pflicht?" },
          { type:"text", text:"Seit 2025 gibt es zwei Antragssysteme: Der bundeseinheitliche Antrag (genutzt in Sachsen, NRW, Niedersachsen, Thüringen, Hessen, Brandenburg, Mecklenburg-Vorpommern, Saarland, Berlin) enthält viele Felder integriert. Bayern nutzt weiterhin das ZBFS-eigene Formular mit separaten Anlagen N, G und GuN. Für Sachsen: bundeseinheitlicher Antrag." },
          { type:"table", headers:["Anlage","Wann erforderlich?","Risiko wenn vergessen"],
            rows:[
              ["Anlage EG+","Immer wenn ElterngeldPlus oder Partnerschaftsbonus beantragt","Anspruch entfällt komplett"],
              ["Anlage N","Bayern: immer bei Angestellten","Bescheid verzögert sich"],
              ["Anlage G / GuN","Bayern: Selbstständige / Mischeinkünfte","Bescheid verzögert sich"],
              ["Anlage EA (Frühgeburt)","Bei Geburt ≥6 Wochen vor errechnetem Termin","Extramonate gehen verloren"],
              ["Anlage 12.a","Immer wenn Einkünfte WÄHREND des Bezugs erzielt werden","Rückforderung möglich"],
              ["Anlage 2.g","Drittstaatenangehörige (nicht EU/EWR)","Antrag wird abgelehnt"],
              ["Anlage 2.c","Wenn ein Elternteil KEINEN deutschen Wohnsitz hat","Internationale Koordination fehlt"],
            ]
          },
          { type:"warning", label:"🚨 Anlage 12.a: Die teuerste Unterlassung", text:"Die häufigste Ursache für Rückforderungen nach dem Elterngeld-Bescheid ist nicht angemeldetes Einkommen während des Bezugszeitraums. Auch vermeintlich 'passive' Einnahmen wie Photovoltaik-Einspeisevergütung oder Dienstwagen-Sachbezug müssen gemeldet werden. Immer aktiv fragen: 'Haben oder hatten Sie während des Bezugszeitraums irgendwelche Einnahmen – auch passive?'" },
          { type:"highlight", label:"💡 Bundeseinheitlicher Antrag: Was ist integriert?", text:"Im bundeseinheitlichen Antrag sind folgende Felder bereits integriert (keine separate Anlage nötig):\n· Abschnitt 10: Einkommensangaben Angestellte (entspricht Anlage N in Bayern)\n· Abschnitt 11: Gewinnangaben Selbstständige\nWeiterhin separate Anlagen: EG+, EA, 12.a, 2.g, 2.c" },
        ],
        quiz:[
          { q:"In welchen Bundesländern wird der bundeseinheitliche Elterngeldantrag (ab 2025) verwendet?", opts:["Nur Bayern","Bayern, NRW und Sachsen","Sachsen, NRW, Niedersachsen und weitere (nicht Bayern)","Nur Sachsen und Berlin"], a:2 },
          { q:"Was ist die häufigste Ursache für Rückforderungen nach dem Elterngeld-Bescheid?", opts:["Fehlendes Geschwisterbonus-Feld","Nicht angemeldetes Einkommen während des Bezugszeitraums (Anlage 12.a)","Falsche Steuerklasse","Fehlende Unterschrift des Partners"], a:1 },
          { q:"Welche Anlage muss eingereicht werden, wenn ElterngeldPlus beantragt wird?", opts:["Anlage N","Anlage EA","Anlage EG+","Anlage 2.g"], a:2 },
        ]
      },
      {
        id:"7-2", title:"Anlage EG+: ElterngeldPlus & Partnerschaftsbonus korrekt beantragen", duration:"ca. 12 min",
        objective:"Du füllst die Anlage EG+ fehlerfrei aus, erkennst Planungsfehler bei der Monats-Tabelle und kennst das spezifische Rückforderungsrisiko beim Bonus.",
        videoHint:"Screencast: Anlage EG+ aufrufen, Lebensmonate-Tabelle live ausfüllen. Partnerschaftsbonus eintragen. Fehlerhafte Beispiele kommentieren.",
        pdfLabel:"Übungsblatt 7-2: Anlage EG+ ausfüllen – 3 Fallbeispiele inkl. Partnerschaftsbonus",
        checkCriteria:["Lebensmonate 1–32 korrekt in Tabelle eingetragen","Parallel-Bezug EG+: keine Beschränkung (nur Basis ist beschränkt)","Partnerschaftsbonus: 2–4 aufeinanderfolgende Monate, beide 24–32h","Rückforderungsrisiko Partnerschaftsbonus kommuniziert","Bundeseinheitlicher Antrag: EG+-Feld im Abschnitt 4 korrekt"],
        content:[
          { type:"heading", text:"Anlage EG+: Wenn mehr Flexibilität gefragt ist" },
          { type:"text", text:"Die Anlage EG+ (im bundeseinheitlichen Antrag: Abschnitt 4) ist immer dann einzureichen, wenn ElterngeldPlus und/oder der Partnerschaftsbonus beantragt wird. Sie enthält eine Tabelle der Lebensmonate 1–32, in der jeder Monat mit der gewünschten Bezugsart (Basis, EP+, Bonus oder keiner) markiert wird." },
          { type:"highlight", label:"📊 Die Monats-Tabelle: Korrekt planen", text:"1 Basiselterngeld-Monat = 2 EP+-Monate (aus dem 14-Monats-Kontingent)\nSimultaner EP+-Bezug beider Elternteile: UNBEGRENZT möglich (nur Basiselterngeld ist auf 1 Monat simultan begrenzt)\nPartnerschaftsbonus: 2–4 aufeinanderfolgende Monate, beide Elternteile gleichzeitig 24–32h/Woche\nBezug bis Lebensmonat 32 möglich\nDie Monate müssen im Voraus geplant und eingetragen werden" },
          { type:"warning", label:"🚨 Partnerschaftsbonus: Nulltoleranz bei Stunden", text:"Der Bonus-Bezug setzt voraus, dass BEIDE Elternteile in jedem Lebensmonat des Bonus-Zeitraums zwischen 24 und 32 Wochenstunden arbeiten. Es gibt keine Toleranz für:\n· Krankheitswochen mit abweichenden Stunden\n· Überstunden-Ausgleichswochen\n· Urlaubswochen außerhalb der Elternzeit\n\nKonsequenz: Alle Bonus-Monate werden zurückgefordert – nicht nur der fehlerhafte Monat. Kunden darüber aufklären und schriftliche Bestätigung des Arbeitgebers einfordern." },
          { type:"highlight", label:"💡 Typische Fehler beim Ausfüllen", text:"❌ Fehler 1: Anlage EG+ fehlt komplett → Antrag wird ohne EP+ bearbeitet\n❌ Fehler 2: Simultaner Basis-Bezug als EP+ geplant → Verstoß gegen 1-Monat-Regel\n❌ Fehler 3: Partnerschaftsbonus nicht aufeinanderfolgend eingetragen\n❌ Fehler 4: Mehr als 4 Bonus-Monate beantragt\n❌ Fehler 5: Lebensmonat 33 oder höher eingetragen (nicht möglich)" },
        ],
        quiz:[
          { q:"Ist der simultane Bezug von ElterngeldPlus beider Elternteile zeitlich begrenzt (analog zum 1-Monat-Limit bei Basiselterngeld)?", opts:["Ja, auch nur 1 Monat simultan","Ja, max. 4 Monate simultan","Nein, simultaner EP+-Bezug ist unbegrenzt möglich","Nur innerhalb der ersten 12 Lebensmonate"], a:2 },
          { q:"Wie viele aufeinanderfolgende Monate muss der Partnerschaftsbonus mindestens umfassen?", opts:["1 Monat","2 Monate","4 Monate","6 Monate"], a:1 },
          { q:"Was passiert beim Partnerschaftsbonus, wenn ein Elternteil in einem Monat nur 20 Stunden arbeitet?", opts:["Nur dieser Monat entfällt","Alle Bonus-Monate werden zurückgefordert","Es gibt einen Kulanzbetrag","Nichts, wenn Arbeitgeber bestätigt"], a:1 },
        ]
      },
      {
        id:"7-3", title:"Anlage N: Einkommensnachweis Angestellte (Bayern)", duration:"ca. 9 min",
        objective:"Du füllst die Anlage N (Bayern) oder die entsprechenden Abschnitte im bundeseinheitlichen Antrag korrekt aus und erkennst alle relevanten Einkommenszeilen.",
        videoHint:"Screencast: ZBFS Anlage N aufrufen (Bayern-Formular). Monat für Monat ausfüllen. Einmalzahlungen herausstreichen. Mit Sachsen-Abschnitt 10 vergleichen.",
        pdfLabel:"Übungsblatt 7-3: Anlage N ausfüllen – echte (anonymisierte) Gehaltsabrechnungen auswerten",
        checkCriteria:["Laufendes Bruttogehalt je Monat korrekt eingetragen","Einmalzahlungen (Weihnachtsgeld, Prämien) korrekt ausgelassen","Kurzarbeitergeld/Krankengeld: nur Eigenanteil eingetragen","Steuerklasse korrekt vermerkt","Ausklammerungsmonat als leer markiert (kein Einkommen eintragen)"],
        content:[
          { type:"heading", text:"Anlage N: Einkommensnachweis für Angestellte" },
          { type:"text", text:"Die Anlage N (Bayern: separates ZBFS-Formular; bundeseinheitlich: Abschnitt 10) dokumentiert das monatliche Bruttoeinkommen aus nichtselbstständiger Arbeit für alle 12 Monate des Bemessungszeitraums. Sie ist die Datenbasis für die Elterngeldberechnung – Fehler hier führen direkt zu einem falschen Bescheid." },
          { type:"highlight", label:"✅ Was gehört hinein?", text:"Laufendes monatliches Bruttogehalt\nArbeitgeberanteile zur betrieblichen Altersvorsorge (pauschal versteuert)\nSachbezüge wie Dienstwagen (ACHTUNG: Ausnahme – wird trotzdem eingetragen!)\nEigener Anteil bei Kurzarbeit (nicht das Kurzarbeitergeld der BA)" },
          { type:"warning", label:"🚨 Was gehört NICHT hinein?", text:"❌ Weihnachtsgeld, Urlaubsgeld, Jahresprämien, Gratifikationen\n❌ Kurzarbeitergeld der Bundesagentur für Arbeit\n❌ Krankengeld, Mutterschaftsgeld, Elterngeld für älteres Kind\n❌ Arbeitgeber-Zuschuss zum Mutterschaftsgeld\n❌ Steuerfreie Lohnbestandteile (z.B. Essensgutscheine > 50 €/Monat)\n\nFehler: Diese Beträge werden fälschlicherweise eingetragen → Elterngeld zu hoch → spätere Rückforderung" },
          { type:"highlight", label:"⚠️ Steuerklasse 5: Besondere Aufmerksamkeit", text:"Steuerklasse 5 führt zu einem deutlich niedrigeren elterngeldspezifischen Netto, weil die Lohnsteuer höher ausfällt. Kunden in SK 5, die den EP+-Betrag planen, müssen das berücksichtigen. Steuerklassenwechsel auf III/IV oder III: idealerweise 7+ Monate vor Mutterschutzbeginn vollziehen und beim Finanzamt anmelden." },
          { type:"text", text:"Ausklammerungsmonat: Wenn ein Monat ausgeklammert wird (wegen Mutterschaftsgeld für älteres Kind, Elternzeit o.ä.), bleibt dieser Monat in Anlage N leer (kein Einkommen eintragen). Die Elterngeldstelle ergänzt den früheren Ersatzmonat. Wenn unklar ob Ausklammerung anwendbar: Kommentar-Feld nutzen oder separate Begründung beilegen." },
        ],
        quiz:[
          { q:"Welcher Betrag gehört in Anlage N, wenn in einem Monat Kurzarbeit vorlag?", opts:["Der Kurzarbeitergeld-Betrag der BA","Das volle reguläre Bruttogehalt","Nur der eigene Gehaltsanteil (nicht das KuG der BA)","Gar kein Betrag – der Monat wird ausgeklammert"], a:2 },
          { q:"Was passiert, wenn Weihnachtsgeld fälschlicherweise in Anlage N eingetragen wird?", opts:["Es erhöht das Elterngeld, was in Ordnung ist","Es wird von der Elterngeldstelle herausgerechnet","Es führt zu einem zu hohen Bescheid und später möglicher Rückforderung","Nichts – Einmalzahlungen werden automatisch ignoriert"], a:2 },
          { q:"Ein Ausklammerungsmonat in Anlage N wird wie eingetragen?", opts:["Mit dem Betrag 0 €","Mit dem Durchschnitt der anderen Monate","Leer – kein Betrag, der Ersatzmonat wird von der Elterngeldstelle ergänzt","Gar nicht – der Monat existiert in der Anlage nicht"], a:2 },
        ]
      },
      {
        id:"7-4", title:"Anlage G & GuN: Selbstständige und Mischeinkünfte", duration:"ca. 11 min",
        objective:"Du erkennst, wann Anlage G oder GuN einzureichen ist, weißt wie Selbstständige-Einkommen korrekt nachgewiesen wird und kennst die PV-Falle.",
        videoHint:"Screencast: Bayern ZBFS Anlage G aufrufen. Gewinnermittlungs-Formular zeigen. PV-Anlage-Fall durchsprechen. Mischeinkünfte-Weiche erklären.",
        pdfLabel:"Übungsblatt 7-4: Anlage G/GuN – 3 Fallbeispiele (Freiberufler, Gewerbetreibender, PV-Anlage)",
        checkCriteria:["Anlage G: nur Gewinneinkünfte ohne Anstellungsverhältnis","Anlage GuN: Mischeinkünfte (auch wenn selbstständig < 35 €/Monat)","Photovoltaik-Einkommen: Anlage G/GuN Pflicht (auch wenn minimal!)","Vorläufiger Bescheid: wenn Steuerbescheid noch nicht vorliegt","Profit (nicht Umsatz) als relevante Größe korrekt"],
        content:[
          { type:"heading", text:"Anlage G & GuN: Wenn Selbstständigkeit ins Spiel kommt" },
          { type:"text", text:"Anlage G gilt für reine Gewinneinkünfte (§§ 13, 15, 18 EStG): Landwirtschaft, Gewerbetrieb oder selbstständige Arbeit ohne jegliches Anstellungsverhältnis. Anlage GuN (Gemischte und nichtselbstständige Einkünfte) gilt, wenn jemand sowohl angestellt als auch selbstständig war – auch wenn die selbstständigen Einkünfte minimal waren." },
          { type:"warning", label:"🚨 Die Photovoltaik-Falle", text:"Eine PV-Anlage auf dem Dach macht den Hausbesitzer steuerrechtlich zum Gewerbetreibenden – auch wenn die Einnahmen nur 20 €/Monat betragen. Das hat weitreichende Folgen:\n· Bemessungszeitraum: Nicht mehr 12 Monate vor Geburt, sondern das gesamte letzte Steuerjahr (Veranlagungsjahr)\n· Anlage GuN: Pflicht (statt Anlage N)\n· Steuerbescheid: Muss vorgelegt werden (statt nur Gehaltsabrechnungen)\n\nImmer aktiv fragen: 'Haben Sie eine PV-Anlage, vermieten Sie etwas, haben Sie Nebeneinkünfte?'" },
          { type:"highlight", label:"📊 Gewinneinkünfte: Was zählt?", text:"Relevant: steuerlicher Gewinn laut Einkommensteuerbescheid (Anlage G/S/L)\nNicht relevant: Umsatz, Betriebseinnahmen, Bruttohonorare, Vorsteuer\nNachweis: Einkommensteuerbescheid + EÜR (Einnahmen-Überschuss-Rechnung)\nVorläufige Berechnung: Wenn Steuerbescheid noch nicht vorliegt → vorläufiger Bescheid möglich, wird nach Vorlage des Bescheids angepasst" },
          { type:"highlight", label:"⚖️ Ausnahme: Geringfügige Selbstständigkeit (ab 1.4.2024)", text:"Seit 1.4.2024: Wenn die selbstständigen Einkünfte im Schnitt unter 35 €/Monat lagen, kann auf Antrag der Bemessungszeitraum für das Angestellteneinkommen (12 Monate) beibehalten werden.\nDiese Ausnahme muss aktiv beantragt werden!\nIn vielen Fällen führt das zu deutlich höherem Elterngeld.\nNachweispflicht: EÜR oder Steuerbescheid der letzten 2 Jahre vorlegen." },
        ],
        quiz:[
          { q:"Jemand ist angestellt und hat eine Photovoltaik-Anlage mit 15 €/Monat Einnahmen. Welche Anlage ist einzureichen?", opts:["Nur Anlage N – PV ist so gering, irrelevant","Anlage GuN – Mischeinkünfte, auch bei minimaler Selbstständigkeit","Anlage G – nur Gewinneinkünfte","Keine Anlage nötig"], a:1 },
          { q:"Was ist das relevante Einkommen bei Selbstständigen für das Elterngeld?", opts:["Der Jahresumsatz (Betriebseinnahmen)","Der Bruttolohn","Der steuerliche Gewinn laut Einkommensteuerbescheid","Das Nettoeinkommen nach Steuern"], a:2 },
          { q:"Ab wann kann die 'Geringfügigkeits-Ausnahme' für selbstständige Nebeneinkünfte beantragt werden?", opts:["Immer","Wenn Einkünfte unter 100 €/Monat","Wenn Einkünfte durchschnittlich unter 35 €/Monat","Wenn Einkünfte unter 1 €/Monat (de minimis)"], a:2 },
        ]
      },
      {
        id:"7-5", title:"Anlage EA: Frühgeburt – Extramonate korrekt beantragen", duration:"ca. 8 min",
        objective:"Du erkennst Frühgeburten nach dem elterngeldrechtlichen Kriterium, bestimmst die Anzahl der Extramonate und weißt, welche Belege erforderlich sind.",
        videoHint:"Screencast: Anlage EA aufrufen, errechneten Termin und tatsächliches Geburtsdatum eintragen. Extramonate aus Tabelle ablesen. Ärztliche Bescheinigung erklären.",
        pdfLabel:"Übungsblatt 7-5: Anlage EA – 4 Frühgeburts-Fälle berechnen (Extramonat-Tabelle anwenden)",
        checkCriteria:["Elterngeldrechtliches Frühchen-Kriterium: mind. 6 Wochen vor errechnetem Termin","Extramonate korrekt aus Staffel-Tabelle abgelesen","Ärztliche Bescheinigung über errechneten Termin als Pflicht-Beilage","Simultaner Bezug: bei Frühchen unbeschränkt möglich","Rahmenfrist-Verlängerung korrekt auf Lebensmonate umgerechnet"],
        content:[
          { type:"heading", text:"Anlage EA: Wenn das Kind zu früh kommt" },
          { type:"text", text:"Die Anlage EA (Frühgeburt / Erweiterte Anspruchsberechtigung) ist einzureichen, wenn das Kind mindestens 6 Wochen vor dem ärztlich errechneten Entbindungstermin geboren wurde. Sie ermöglicht zusätzliche Bezugsmonate und hebt die Beschränkung beim simultanen Basiselterngeld-Bezug auf." },
          { type:"table", headers:["Frühgeburt vor errechnetem Termin","Zusätzliche Bezugsmonate","Simultaner Bezug"],
            rows:[
              ["< 6 Wochen (kein Frühchen)","0 Extramonate","Max. 1 Monat simultan"],
              ["≥ 6 Wochen (6–7 Wochen)","1 Extramonat (bis LM 15)","Unbeschränkt simultan möglich"],
              ["≥ 8 Wochen (8–11 Wochen)","2 Extramonate (bis LM 16)","Unbeschränkt simultan möglich"],
              ["≥ 12 Wochen (12–15 Wochen)","3 Extramonate (bis LM 17)","Unbeschränkt simultan möglich"],
              ["≥ 16 Wochen","4 Extramonate (bis LM 18)","Unbeschränkt simultan möglich"],
            ]
          },
          { type:"highlight", label:"📋 Erforderliche Unterlagen", text:"1. Ärztliche Bescheinigung über den errechneten Entbindungstermin (Gynäkologin oder Krankenhaus)\n2. Geburtsurkunde des Kindes (mit tatsächlichem Geburtsdatum)\n3. Anlage EA vollständig ausgefüllt\n\nWichtig: Fehlt die ärztliche Bescheinigung, werden die Extramonate NICHT gewährt – auch wenn das Geburtsdatum offensichtlich früh ist." },
          { type:"warning", label:"⚠️ Häufiger Fehler: Zu spät beantragt", text:"Die Extramonate müssen beantragt werden – sie werden nicht automatisch gewährt. Wenn die Familie erst nach LM 14 beantragt, sind die Extramonate möglicherweise noch rückwirkend einzuholen (3-Monats-Frist). Anlage EA also immer zeitgleich mit dem Hauptantrag einreichen. Beim Beratungsgespräch immer fragen: 'Wann war der errechnete Termin, wann wurde das Kind tatsächlich geboren?'" },
        ],
        quiz:[
          { q:"Ab wann gilt ein Kind elterngeldrechtlich als Frühgeburt?", opts:["Vor der 37. Schwangerschaftswoche","Mindestens 3 Wochen vor dem errechneten Termin","Mindestens 6 Wochen vor dem errechneten Termin","Bei Aufenthalt in Intensivstation"], a:2 },
          { q:"Wie viele Extramonate erhält eine Familie, deren Kind 10 Wochen vor dem errechneten Termin geboren wurde?", opts:["1 Extramonat","3 Extramonate","4 Extramonate","2 Extramonate"], a:3 },
          { q:"Was ist zwingend erforderlich, damit die Extramonate anerkannt werden?", opts:["Nur die Geburtsurkunde mit frühem Datum","Ärztliche Bescheinigung über den errechneten Entbindungstermin","Bescheinigung des Krankenhauses über Frühgeburtlichkeit","Fotos der Frühgeburt"], a:1 },
        ]
      },
      {
        id:"7-6", title:"Anlage 12.a: Einkünfte neben dem Elterngeld – die Rückforderungsfalle", duration:"ca. 13 min",
        objective:"Du erkennst alle Einnahmen, die während des Bezugszeitraums gemeldet werden müssen, und schützt Kunden aktiv vor ungewollten Rückforderungen.",
        videoHint:"Screencast: Anlage 12.a aufrufen, PV-Fall live ausfüllen. Dienstwagen-Fall erklären. Resturlaub-Falle zeigen. Demo: Was passiert bei nicht angemeldeten Einkünften?",
        pdfLabel:"Übungsblatt 7-6: Anlage 12.a – 5 Fallbeispiele (PV, Dienstwagen, Teilzeit, Restzeit, Miete)",
        checkCriteria:["Anlage 12.a: gilt für Einkünfte WÄHREND des Bezugszeitraums (nicht Bemessungszeitraum)","Photovoltaik auch passiv: meldepflichtig","Dienstwagen-Sachbezug: meldepflichtig auch ohne Gehaltsauszahlung","Resturlaub nach Mutterschutz: meldepflichtig","Aktiv nach Nebeneinkünften fragen – immer"],
        content:[
          { type:"heading", text:"Anlage 12.a: Die am häufigsten vergessene Anlage" },
          { type:"text", text:"Die Anlage 12.a betrifft Einkünfte, die WÄHREND des Elterngeldbezugs erzielt werden – nicht im Bemessungszeitraum. Das ist ein entscheidender Unterschied, der viele Kunden verwirrt. Die Anlage muss immer dann eingereicht (und aktuell gehalten) werden, wenn während der Bezugsmonate irgendwelche Einnahmen anfallen." },
          { type:"warning", label:"🚨 Was muss gemeldet werden?", text:"✅ Teilzeiteinkommen aus dem Arbeitsverhältnis\n✅ Einkünfte aus selbstständiger Tätigkeit (auch minimal)\n✅ Photovoltaik-Einspeisevergütung (auch 'passiv', auch 10 €/Monat!)\n✅ Dienstwagen-Sachbezug (geldwerter Vorteil – auch wenn kein Gehalt fließt!)\n✅ Bezahlter Resturlaub, der in Elternzeit fällt\n✅ Mieteinnahmen (sofern als Einkünfte aus V&V steuerlich relevant)\n✅ Honorare, Beratungsleistungen, Nebenjobs" },
          { type:"highlight", label:"⚠️ Die Dienstwagen-Falle", text:"Ein häufig übersehener Fall: Die Mutter befindet sich in Elternzeit (kein Gehalt), darf aber weiterhin den Dienstwagen nutzen. Der 'geldwerte Vorteil' (pauschal: Listenpreis × 1% / Monat) gilt steuerrechtlich als Einnahme – und muss in Anlage 12.a gemeldet werden. Wird das nicht getan: spätere Rückforderung durch die Elterngeldstelle.\nLösung: Dienstwagen während der Elternzeit abgeben oder Anlage 12.a vollständig ausfüllen." },
          { type:"highlight", label:"💬 Pflichtfrage in jeder Beratung", text:"Stelle diese Frage IMMER aktiv, bevor der Antrag abgeschickt wird:\n\n'Werden Sie oder Ihr Partner während der Elterngeld-Monate Einnahmen haben – egal woher? Auch eine PV-Anlage, ein Dienstwagen, ein bezahlter Resturlaub oder eine Nebentätigkeit zählt.'\n\nErst wenn diese Frage klar mit 'Nein' beantwortet ist, kann der Antrag ohne Anlage 12.a eingereicht werden. Im Zweifel: Anlage beifügen." },
          { type:"text", text:"Was passiert bei nicht gemeldeten Einkünften? Die Elterngeldstelle erfährt es über den Steuerbescheid (automatischer Datenabgleich mit dem Finanzamt). Dann kommt ein Rückforderungsbescheid – manchmal Jahre später. Zusätzlich: Verzugszinsen möglich. Bei arglistiger Täuschung: Bußgeld. Das lässt sich vollständig vermeiden – durch aktives Fragen und vollständige Anlage 12.a." },
        ],
        quiz:[
          { q:"Wofür gilt Anlage 12.a?", opts:["Einkünfte im Bemessungszeitraum (12 Monate vor Geburt)","Einkünfte WÄHREND des Elterngeldbezugs","Alle Einkünfte des letzten Jahres","Nur Teilzeiteinkommen aus dem Hauptjob"], a:1 },
          { q:"Muss eine Photovoltaik-Einspeisevergütung von 15 €/Monat während der Elternzeit gemeldet werden?", opts:["Nein – unter 50 €/Monat nicht meldepflichtig","Nein – PV ist passives Einkommen und gilt nicht","Ja – auch passive Einkünfte müssen gemeldet werden","Nur wenn die PV mehr als 100 €/Monat einspielt"], a:2 },
          { q:"Was ist die 'Dienstwagen-Falle' bei Anlage 12.a?", opts:["Der Dienstwagen wird als Berufsausgabe abgezogen","Der geldwerte Vorteil des Dienstwagens gilt als Einnahme und muss gemeldet werden","Der Dienstwagen erhöht das Elterngeld","Dienstwagen werden automatisch bei der Elterngeldstelle gemeldet"], a:1 },
        ]
      },
      {
        id:"7-7", title:"Anlage 2.g & 2.c: Staatsangehörigkeit und Auslandswohnsitz", duration:"ca. 9 min",
        objective:"Du erkennst, wann Anlage 2.g (Staatsangehörigkeit) oder 2.c (Auslandswohnsitz) einzureichen ist, und weißt, welche Fälle sofort eskaliert werden müssen.",
        videoHint:"Screencast: Anlage 2.g mit Aufenthaltstitel-Optionen zeigen. EU-Koordinierung erklären. Grenzgänger-Fall als Eskalations-Beispiel durchsprechen.",
        pdfLabel:"Übungsblatt 7-7: 6 Fälle einordnen (EU-Bürger, Drittstaatenangehörige, Grenzgänger, Asylbewerber)",
        checkCriteria:["Anlage 2.g: nur für Nicht-EU/EWR-Staatsbürger (Drittstaatenangehörige)","Berechtigende Aufenthaltstitel korrekt aufgelistet","Anlage 2.c: wenn ein Elternteil keinen deutschen Wohnsitz hat","EU-Koordinationsverordnung: Unterschiedsbetrag erklärt","Grenzgänger: sofortige Eskalation"],
        content:[
          { type:"heading", text:"Anlage 2.g: Staatsangehörigkeit und Aufenthaltstitel" },
          { type:"text", text:"Die Anlage 2.g (im bundeseinheitlichen Antrag: Abschnitt 2g) ist einzureichen, wenn die antragstellende Person keine EU/EWR-Staatsangehörigkeit und keinen deutschen Pass hat. EU-Bürger, EWR-Bürger und Schweizer brauchen diese Anlage nicht – sie haben grundsätzlich gleichen Anspruch wie Deutsche." },
          { type:"table", headers:["Aufenthaltsstatus","Elterngeld-Anspruch?","Anlage 2.g?"],
            rows:[
              ["Niederlassungserlaubnis","Ja","Ja, einreichen"],
              ["Aufenthaltserlaubnis zur Erwerbstätigkeit","Ja","Ja, einreichen"],
              ["Blaue Karte EU","Ja","Ja, einreichen"],
              ["Aufenthaltserlaubnis zu Bildungszwecken (ohne Arbeit)","Nein","–"],
              ["Duldung","Nein","–"],
              ["Aufenthaltsgestattung (Asylbewerber)","Nein","–"],
              ["Familiennachzug (zu Berechtigtem)","Prüfen","Ja, einreichen"],
            ]
          },
          { type:"heading", text:"Anlage 2.c: Wohnsitz im Ausland" },
          { type:"text", text:"Die Anlage 2.c (Abschnitt 2c) ist einzureichen, wenn ein Elternteil seinen Wohnsitz nicht in Deutschland hat. Das betrifft vor allem Grenzgänger-Familien: ein Elternteil wohnt in Frankreich, der andere in Deutschland; oder beide wohnen in Deutschland, aber ein Elternteil arbeitet in der Schweiz." },
          { type:"highlight", label:"🌍 EU-Koordinierung: Was bedeutet 'Unterschiedsbetrag'?", text:"Nach der EU-Koordinierungsverordnung (VO 883/2004) gilt: Wenn eine Familie Anspruch auf vergleichbare Leistungen im EU-Ausland hat, zahlt Deutschland nur den 'Unterschiedsbetrag' – also den Betrag, um den das deutsche Elterngeld höher ist als die ausländische Leistung.\n\nBeispiel: Frankreich zahlt 1.200 €/Monat Elterngeld-Äquivalent, Deutschland würde 1.800 € zahlen → Deutschland zahlt 600 € Unterschiedsbetrag." },
          { type:"warning", label:"🚨 Grenzgänger-Fälle: Sofort eskalieren!", text:"Grenzgänger-Situationen sind rechtlich komplex und einzelfallabhängig. Relevante Fragen: In welchem Land besteht die Krankenversicherungspflicht? Wo wird Steuer gezahlt? Was zahlt das andere Land? Gibt es ein Sozialrechtsabkommen?\n\nDiese Fälle werden IMMER sofort an die Chefin weitergeleitet. Kein eigenes Urteil abgeben." },
        ],
        quiz:[
          { q:"Welche Personen brauchen die Anlage 2.g (Staatsangehörigkeit)?", opts:["Alle Antragsteller","Nur deutsche Staatsangehörige","Nicht-EU/EWR-Staatsbürger ohne deutschen Pass","EU-Bürger mit Wohnsitz außerhalb Deutschlands"], a:2 },
          { q:"Was ist der 'Unterschiedsbetrag' in der EU-Koordinierung?", opts:["Der Mindestbetrag von 300 €","Der Betrag, um den das deutsche Elterngeld höher ist als eine vergleichbare ausländische Leistung","Die Differenz zwischen Basiselterngeld und ElterngeldPlus","Die Summe beider ausländischen Elterngeld-Ansprüche"], a:1 },
          { q:"Was tust du, wenn ein Grenzgänger-Fall in der Beratung auftaucht?", opts:["Den Fall selbst lösen mit Anlage 2.c","Anlage 2.c ausfüllen und einreichen","Sofort die Chefin informieren – kein eigenes Urteil abgeben","Den Kunden direkt an die Elterngeldstelle verweisen"], a:2 },
        ]
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════
// EXTRA-INHALTE (Nachschlagewerk)
// ═══════════════════════════════════════════════════════════════════
const EXTRAS = [
  {
    id:"fallstricke", title:"Fallstricke im Antrag", icon:"⚠️",
    description:"Die 10 häufigsten Fehler aus echter Beratungspraxis – und wie du sie vermeidest",
    items:[
      { title:"Fristversäumnis: Der teuerste Fehler", content:"Elterngeld wird rückwirkend nur für 3 Monate vor dem Antragsmonat gezahlt. Geht der Antrag zu spät ein, gehen Monate unwiederbringlich verloren. Im Erstgespräch immer als erstes klären: Wann wurde das Kind geboren? Bis wann muss der Antrag eingegangen sein? Bei drohender Überschreitung: sofort leeren Antrag (erste Seite + Unterschriften) einreichen, Unterlagen nachreichen." },
      { title:"Fehlende Unterschrift des anderen Elternteils", content:"Jeder Antrag muss von beiden Elternteilen unterschrieben werden – auch wenn nur einer beantragt. Ausnahme nur bei echten Alleinerziehenden (dokumentiertes Alleinsorgerecht) oder nachgewiesener Abwesenheit. Ohne die zweite Unterschrift: Rücksendung des gesamten Antrags." },
      { title:"Steuer-ID vs. Steuernummer verwechselt", content:"Die Steuer-ID ist eine 11-stellige, bundeseinheitliche und lebenslange Nummer. Die Steuernummer ist bundeslandspezifisch und ändert sich bei Umzug. Im Elterngeldantrag wird ausschließlich die Steuer-ID verlangt. Quelle: Steuerbescheid, Lohnsteuerbescheinigung oder BZSt (Bundeszentralamt für Steuern)." },
      { title:"Geschwisterbonus vergessen", content:"Der 10%-Geschwisterbonus wird nicht automatisch gewährt – er muss im Antrag beantragt werden. Stichtag: Beginn des Elterngeldbezugs. Immer prüfen: Kind unter 3 Jahren oder zwei Kinder unter 6 Jahren im Haushalt? Über 14 Monate: bis zu 1.050 € mehr." },
      { title:"Photovoltaik-Anlage: Doppeltes Risiko", content:"PV-Anlage = Gewerbetreibender = Anlage GuN statt N = Bemessungszeitraum ist das gesamte Steuerjahr. UND: PV-Einnahmen während der Elternzeit müssen über Anlage 12.a gemeldet werden. Immer aktiv fragen: 'Haben Sie eine PV-Anlage?'" },
      { title:"Partnerschaftsbonus beantragt, aber nicht eingehalten", content:"Der Partnerschaftsbonus hat die strengsten Auflagen. Jede Abweichung (Krankheit, Überstunden-Ausgleich) kann zur vollständigen Rückforderung der Bonus-Monate führen. Kunden immer auf dieses Risiko hinweisen. Im Zweifel: Bonus lieber nicht beantragen." },
      { title:"Einmalzahlungen im Einkommen", content:"Weihnachtsgeld, Urlaubsgeld, Quartals- oder Jahresprämien werden bei der Elterngeldberechnung nicht berücksichtigt. Kunden rechnen oft mit Jahreseinkommen inkl. Sonderzahlungen und sind dann überrascht vom niedrigeren Bescheid." },
      { title:"Anlage 12.a vergessen", content:"Einkünfte während des Bezugszeitraums (Teilzeit, PV, Dienstwagen, Resturlaub) müssen über Anlage 12.a gemeldet werden. Vergessen = spätere Rückforderung durch Steuerbescheid-Abgleich. Immer aktiv fragen: 'Werden Sie während der Elterngeld-Monate Einnahmen haben?'" },
      { title:"Steuerklassenwechsel nicht dokumentiert", content:"Ein Steuerklassenwechsel innerhalb der letzten 12 Monate vor der Geburt ist zulässig, wird aber kritisch geprüft. Frühzeitig beim Finanzamt formal anmelden – mindestens 7 Monate vor Mutterschutzbeginn." },
      { title:"Falsches Elterngeldamt", content:"Das zuständige Elterngeldamt richtet sich nach dem Wohnort der antragstellenden Person – nicht nach Geburtsort, Arbeitgeber oder dem Wohnort des anderen Elternteils. Falsch adressierter Antrag wird weitergeleitet, verzögert aber die Bearbeitung." },
    ]
  },
  {
    id:"spezialfaelle", title:"Spezialfälle", icon:"🔍",
    description:"Sondersituationen, die besondere Sorgfalt erfordern – und wann du eskalieren musst",
    items:[
      { title:"Mehrlinge (Zwillinge, Drillinge)", content:"Für jedes Kind ist ein separater Antrag zu stellen. Pro weiteres Mehrlingsgeschwisterkind gibt es automatisch +300 € Mehrlingszuschlag (Basis) ohne separaten Antrag. Simultaner Bezug unbeschränkt. Jedes Kind braucht eine eigene Geburtsurkunde." },
      { title:"Frühgeburt (vor der 37. SSW)", content:"Elterngeldrechtlich relevant: mind. 6 Wochen vor errechnetem Termin. Extra-Monate: ≥6 Wochen = 1 Monat; ≥8 = 2; ≥12 = 3; ≥16 = 4. Diese Monate müssen im Antrag beantragt werden. Ärztliche Bescheinigung Pflicht. Simultaner Bezug unbeschränkt." },
      { title:"Alleinerziehende", content:"Bei Alleinsorgerecht oder nachgewiesener Nichtausübung durch anderen Elternteil: bis zu 14 Monate alleine. Nachweis: Gerichtsbeschluss oder eidesstattliche Erklärung. Einkommensgrenze ab 1.4.2025: einheitlich 175.000 € (frühere Besserstellung aufgehoben)." },
      { title:"Selbstständige", content:"Bemessungszeitraum: letztes abgeschlossenes Steuerjahr. Einkommensnachweis: Steuerbescheid. Umsatz ≠ Einkommen – nur der steuerliche Gewinn zählt. Verschiebetatbestände bei Elterngeldbezug im Vorjahr: Verschiebung auf das Jahr davor aktiv beantragen." },
      { title:"Mischeinkünfte (Angestellt + Selbstständig)", content:"Auch nur einen Tag selbstständig im Vorjahr → komplette Behandlung als Selbstständige (Bemessungszeitraum = Steuerjahr). Ausnahme ab 1.4.2024: < 35 €/Monat selbstständige Einkünfte → Antrag auf Beibehaltung des Angestellten-Bemessungszeitraums stellen." },
      { title:"Grenzgänger & Ausländer", content:"EU-/EWR-Bürger: Anspruch wie Deutsche. Grenzgänger: Sonderformular, EU-Koordinierungsrecht, Unterschiedsbetrag. Drittstaaten: nur bestimmte Aufenthaltstitel. Alle komplexen Auslandfälle: sofort eskalieren!" },
    ]
  },
  {
    id:"faq", title:"Häufige Kundenfragen", icon:"❓",
    description:"Die wichtigsten Fragen aus dem Beratungsalltag – mit konkreten Antworten",
    items:[
      { title:"'Bis wann muss ich den Antrag einreichen?'", content:"So früh wie möglich – idealerweise direkt nach der Geburtsurkunde. Rückwirkend max. 3 Monate. Bei Unsicherheit: unvollständigen Antrag einreichen (erste Seite + Unterschriften) und fehlende Unterlagen nachreichen." },
      { title:"'Kann ich nachträglich Monate ändern?'", content:"Ja, für noch nicht ausgezahlte Monate per einfachem Schreiben an die Elterngeldstelle. Für bereits ausgezahlte Monate: grundsätzlich nein. Änderungen können die Krankenversicherung beeinflussen – immer vorher Krankenversicherung konsultieren." },
      { title:"'Was passiert, wenn ich wieder arbeiten gehe?'", content:"Teilzeit bis max. 32 Stunden/Woche erlaubt. Das Einkommen in Teilzeit wird angerechnet: Elterngeld = 65–67% der Differenz. Beim Partnerschaftsbonus: exakt 24–32 Stunden (Nachweis erforderlich)." },
      { title:"'Bekommen wir Elterngeld ohne vorheriges Einkommen?'", content:"Ja! Der Mindestbetrag von 300 € gilt für alle, unabhängig vom Voreinkommen. Auch Studierende, Hausfrauen/-männer und Arbeitslose haben Anspruch. Bürgergeld wird durch Elterngeld bis 300 € nicht gekürzt." },
      { title:"'Was tun bei Ablehnung oder zu niedrigem Bescheid?'", content:"Innerhalb von 1 Monat schriftlich Widerspruch einlegen (Einschreiben!). Begründung kann nachgereicht werden. Das Widerspruchsverfahren ist kostenlos. Vorher: Telefonisch bei der Elterngeldstelle nachfragen. Die Berufung auf konkrete Paragraphen (§ 2b BEEG für Ausklammerung) erhöht die Erfolgsaussichten." },
      { title:"'Mein Partner will keine Monate nehmen – geht das?'", content:"Ja, ein Elternteil kann verzichten – dann stehen aber nur 12 Monate (statt 14) zur Verfügung. Der Antrag muss trotzdem von beiden unterschrieben werden." },
    ]
  },
  {
    id:"rechtslage", title:"Aktuelle Rechtslage 2025/2026", icon:"⚖️",
    description:"Aktuelle gesetzliche Grundlagen und was deine Kunden jetzt wissen müssen",
    items:[
      { title:"Einkommensgrenze 2025: 175.000 €", content:"Für Geburten ab 1. April 2025: zu versteuerndes Einkommen beider Elternteile max. 175.000 €. Maßgeblich: das zvE im Kalenderjahr VOR der Geburt (laut Steuerbescheid). Das zvE ist deutlich geringer als das Bruttoeinkommen. Zwei Gutverdiener mit je ~103.500 € Brutto liegen ca. an der Grenze." },
      { title:"Simultaner Bezug ab 1.4.2024: Neue Spielregeln", content:"Vor 1.4.2024: 2 Monate gleichzeitig Basiselterngeld. Ab 1.4.2024: nur noch 1 Monat simultan (innerhalb LM 1–12). Ausnahmen: Mehrlinge, Frühchen (≥6 Wochen), Kinder/Geschwister mit Behinderung. Simultaner EP+-Bezug: weiterhin unbeschränkt möglich." },
      { title:"Teilzeit-Grenze: 32 Stunden seit 1.4.2024", content:"Seit 1. April 2024: während des Elterngeldbezugs bis zu 32 Wochenstunden erlaubt (vorher 30). Gilt als Durchschnitt über den jeweiligen Lebensmonat. Für den Partnerschaftsbonus: exakt 24–32 Stunden (enger Korridor)." },
      { title:"Bundeseinheitlicher Antrag ab 2025", content:"Seit 2025 gilt in den meisten Bundesländern (außer Bayern) der bundeseinheitliche Antrag. Viele Anlagen sind integriert (Anlage N → Abschnitt 10; Anlage G → Abschnitt 11). Separate Anlagen: EG+, EA, 12.a, 2.g, 2.c. Online-Antragstellung über ElterngeldDigital verfügbar." },
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════
// LESSON CASES — Fallstudie + Musterlösung je Lektion (23 Einträge)
// ═══════════════════════════════════════════════════════════════════
const LESSON_CASES = {
  "1-1": {
    formLabel: "Anspruchscheck – Varianten & Einkommensgrenzen",
    formFile: "formular-1-1-anspruchscheck.pdf",
    scenario: "Familie Schneider: Sarah (33, Ärztin in Teilzeit 24h/Woche, Netto 2.800 €/Monat) erwartet ihr erstes Kind, Geburtstermin 1. September 2025. Ihr Mann Lars (36, Lehrer, Netto 2.400 €/Monat) überlegt, 2 Monate gleichzeitig mit Sarah Elterngeld zu beziehen. Gemeinsames zu versteuerndes Einkommen laut letztem Steuerbescheid: 148.000 €.",
    task: "Prüfe den Anspruch. Notiere: (1) Haben beide Anspruch? (2) Ist simultaner Bezug möglich und wie lange? (3) Welche Elterngeld-Variante empfiehlst du Sarah – und warum?",
    solution: "Anspruch: ✓ beide anspruchsberechtigt (148.000 € < 175.000 € zvE-Grenze). Simultaner Basiselterngeld-Bezug: max. 1 Monat (Regelung ab 1.4.2024 für Geburten ab 1.4.2024). Für Sarah empfiehlt sich ab Monat 7 ElterngeldPlus, da sie bereits Teilzeit arbeitet (max. 32h ✓) – verdoppelt die Bezugsdauer bei halbem Betrag. Mindestbetrag 300 €, Maximum Basis 1.800 €."
  },
  "1-2": {
    formLabel: "Anspruchsprüfung – Staatsangehörigkeit & Wohnsitz",
    formFile: "formular-1-2-anspruch-staatsangehoerigkeit.pdf",
    scenario: "Herr Karim Ouali (34, algerische Staatsbürgerschaft, Niederlassungserlaubnis seit 2020, wohnhaft in München) fragt, ob er Elterngeld beantragen kann. Er arbeitet 40 Stunden/Woche. Kind wurde am 10. April 2025 geboren. Seine Frau (deutsche Staatsbürgerin) hat bereits Antrag gestellt.",
    task: "Prüfe: (1) Hat Herr Ouali Anspruch trotz algerischer Staatsangehörigkeit? (2) Was muss bezüglich der Erwerbstätigkeit beachtet werden? (3) Kann er parallel zu seiner Frau Elterngeld beziehen?",
    solution: "Anspruch: ✓ Niederlassungserlaubnis berechtigt zum Elterngeld (Drittstaater mit §16 AufenthG). Erwerbstätigkeit: er muss auf max. 32h/Woche reduzieren während des Bezugszeitraums – aktuell 40h = kein gleichzeitiger Bezug möglich ohne Reduktion. Paralleler Bezug: möglich, aber simultanes Basiselterngeld max. 1 Monat."
  },
  "1-3": {
    formLabel: "Frist & Zuständigkeit – Soforthilfe-Antrag",
    formFile: "formular-1-3-soforthilfe-antrag.pdf",
    scenario: "Frau Berg ruft an: ihr Kind ist heute 11 Wochen alt (geboren 1. Januar 2025). Sie hat noch keinen Antrag gestellt, weil sie dachte, sie habe mehr Zeit. Sie wohnt in Köln, ihr Mann arbeitet in Frankfurt. Sie fragt panisch, ob sie Geld verloren hat.",
    task: "Erkläre Frau Berg: (1) Wie viele Monate Rückwirkung sind noch möglich? (2) Was soll sie sofort einreichen? (3) Welche Elterngeldstelle ist zuständig?",
    solution: "Rückwirkung: max. 3 Monate – Lebensmonate 1 (Jan) und 2 (Feb) sind verloren, LM 3 (März) noch rettbar wenn Antrag HEUTE eingeht. Sofortmaßnahme: unvollständigen Antrag (Seite 1 + Unterschriften) heute noch einreichen, Unterlagen nachreichen. Zuständigkeit: Wohnsitz Köln → Elterngeldstelle Köln (nicht Frankfurt/Arbeitgeber)."
  },
  "2-1": {
    formLabel: "Antrag Abschnitt 1 – Persönliche Daten",
    formFile: "formular-2-1-abschnitt1.pdf",
    scenario: "Frau Lisa Meyer-Schmidt (Geburtsname: Schmidt) möchte Antrag stellen. Ihr Ehemann heißt Thomas Meyer. Sie selbst ist unter dem Namen 'Lisa Schmidt' im Personalausweis eingetragen, hat jedoch nach der Heirat den Doppelnamen gewählt. Ihre Steuer-ID hat sie vergessen. Steuerklasse: aktuell III (seit letztem Monat geändert, vorher IV).",
    task: "Fülle Abschnitt 1 für Frau Meyer-Schmidt aus. Was trägst du bei Familienname, Geburtsname und Steuer-ID ein? Welche Steuerklasse ist relevant?",
    solution: "Familienname: Meyer-Schmidt. Geburtsname: Schmidt (Pflichtfeld). Steuer-ID: muss eingetragen werden – Hinweis an Frau Meyer-Schmidt: Steuer-ID steht auf Steuerbescheid oder beim Finanzamt anfragbar. Steuerklasse: die zum Zeitpunkt der Geburt gültige – falls Geburt nach Klassenwechsel: III. Beide Elternteile müssen unterschreiben."
  },
  "2-2": {
    formLabel: "Antrag Abschnitt 2 – Kindesdaten & Mehrlinge",
    formFile: "formular-2-2-kindesdaten.pdf",
    scenario: "Familie Richter hat am 3. März 2025 Zwillinge bekommen: Emma und Felix. Vater ist alleiniger Antragsteller (Mutter im Auslandsstudium, vorübergehend). Felix wurde 6 Wochen zu früh geboren (Frühgeburt). Das erste Kind der Familie ist 2 Jahre alt.",
    task: "Fülle Abschnitt 2 für beide Kinder aus. Welche Besonderheiten sind bei Zwillingen und bei Frühgeburt zu beachten? Welche Boni können geltend gemacht werden?",
    solution: "Beide Kinder eintragen: Name, Geburtsdatum, Geburtsort je Kind. Mehrlingszuschlag: ✓ 300 € je weiteres Mehrlingsgeschwister zusätzlich. Frühgeburt Felix (6 Wochen): Anlage EA erforderlich, ärztliche Bescheinigung Pflicht – 6 Wochen → 2 Extramonate Elterngeld. Geschwisterkind (2 Jahre): Geschwisterbonus prüfen (+10% mind. 75€). Alleiniger Antragsteller: Kindschaftsverhältnis eindeutig ankreuzen."
  },
  "3-1": {
    formLabel: "Bezugsplan – Basiselterngeld Monatstabelle",
    formFile: "formular-3-1-bezugsplan-basis.pdf",
    scenario: "Familie Braun: Kind geboren 1. Mai 2025. Mutter Julia (12 Monate Elternzeit geplant) und Vater Markus (2 Monate). Julia möchte die Monate 1–12 für sich, Markus die Monate 13–14. Beide wollen wissen, ob Markus seine 2 Monate auch gleichzeitig mit Julia nehmen kann.",
    task: "Erstelle den Bezugsplan. Klärung: (1) Kann Markus gleichzeitig mit Julia beziehen? (2) In welchen Lebensmonaten? (3) Wie verteilen sich die 14 Monate optimal?",
    solution: "14-Monats-Budget: 12 Partnermonate + 2 Vatermonate = 14. Simultaner Bezug: max. 1 Monat Basiselterngeld gleichzeitig (innerhalb LM 1–12). Empfehlung: Julia LM 1–12, Markus LM 1 simultan mit Julia + LM 13. So nutzen sie den simultanen Monat und Markus hat 2 Monate gesamt. Alternativ: Markus LM 13–14, kein simultaner Bezug → auch 14 Monate genutzt."
  },
  "3-2": {
    formLabel: "ElterngeldPlus & Partnerschaftsbonus",
    formFile: "formular-3-2-elterngeldplus.pdf",
    scenario: "Nina (31, Designerin) kehrt ab Monat 7 in Teilzeit (26h/Woche) zurück. Basiselterngeld wäre 1.100 €/Monat. Ihr Partner Sven (34) arbeitet ebenfalls auf 28h/Woche reduziert und möchte 4 Monate ElterngeldPlus beziehen. Frage: Lohnt sich ElterngeldPlus für Nina ab Monat 7, und erfüllt Sven die Bonus-Voraussetzungen?",
    task: "Berechne Ninas EP+-Betrag. Prüfe Svens Bonus-Berechtigung. Erkläre den Unterschied in der Gesamtbezugsdauer.",
    solution: "Nina EP+: 1.100 € × 50% = 550 €/Monat, aber doppelt so lange (1 Basismonat = 2 EP+-Monate). LM 7–18 = 12 Basismonate = 24 EP+-Monate. Sven: 28h/Woche ✓ (Korridor 24–32h), also Partnerschaftsbonus berechtigt, +4 Bonus-EP+-Monate wenn Sven gleichzeitig mit Nina je 24–32h. Vorsicht: Stundenzahl muss exakt eingehalten werden – Abweichung = Rückforderungsrisiko."
  },
  "3-3": {
    formLabel: "Strategischer Monatsplan – 3 Szenarien",
    formFile: "formular-3-3-monatsplan-strategie.pdf",
    scenario: "Familie Hoffmann: Kind geboren 1. Juli 2025. Mutter Karin (Netto 2.000 €) will flexibel sein. Vater Peter (Netto 3.000 €) kann maximal 3 Monate Elternzeit nehmen. Frage: Was ist finanziell am sinnvollsten – klassisch, EP+-Modell, oder Partnerschaftsbonus?",
    task: "Skizziere alle drei Szenarien mit Gesamtbezugsdauer und monatlichem Betrag. Empfehle das sinnvollste für Familie Hoffmann.",
    solution: "Szenario 1 klassisch: Karin 12 Monate Basis (~1.300 €), Peter 2 Monate (~1.950 €) = 14 Monate, ~22.500 € gesamt. Szenario 2 EP+: Karin 6 Basis + 12 EP+ = 18 Monate Bezug, Peter 2 Basis. Mehr Flexibilität, weniger/Monat. Szenario 3 Partnerbonus: beide gleichzeitig 24–32h, +4 Bonusmonate = 22 Monate gesamt. Empfehlung: Szenario 3 wenn beide Teilzeit möglich, da längste Bezugsdauer und höchste Gesamtsumme bei Peters höherem Einkommen."
  },
  "4-1": {
    formLabel: "Bemessungszeitraum & Ausklammerung",
    formFile: "formular-4-1-bemessungszeitraum.pdf",
    scenario: "Frau Dr. Weber hat am 15. Oktober 2025 ihr Kind bekommen. Bemessungszeitraum wäre Oktober 2024 – September 2025. Allerdings: Sie war von Februar bis April 2025 krank geschrieben (3 Monate Krankengeld). Im März 2025 erhielt sie Kurzarbeitergeld für 2 Wochen.",
    task: "Bestimme den korrekten Bemessungszeitraum. Welche Monate werden ausgeklammert? Was passiert mit den Kurzarbeitsgeld-Monaten?",
    solution: "Ausklammerung: Krankengeldbezug Feb–Apr 2025 (3 Monate) → diese Monate raus, Zeitraum verschiebt sich um 3 Monate zurück: neuer BZ = Juli 2024 – Juni 2025 (abzüglich Feb–Apr = effektiv 9 Monate reguläres Gehalt + 3 ausgeklammert). Kurzarbeit März: wenn KAG bezogen, dieser Monat ebenfalls Ausklammerungsmonat → nochmal 1 Monat zurück. Ergebnis: günstigere Monate werden automatisch gewählt."
  },
  "4-2": {
    formLabel: "Einkommensermittlung – Angestellte & Selbstständige",
    formFile: "formular-4-2-einkommensermittlung.pdf",
    scenario: "Tom Berger: Angestellter, Nettogehalt 2.600 €/Monat. Im Oktober 2024 erhielt er 5.400 € Jahresbonus. Außerdem hat er einen Minijob mit 520 €/Monat. Bemessungszeitraum: Januar–Dezember 2024.",
    task: "Ermittle das relevante Nettoeinkommen für die Elterngeldberechnung. Wie wird der Bonus behandelt? Wie der Minijob?",
    solution: "Reguläres Netto: 2.600 €/Monat. Jahresbonus 5.400 €: Einmalzahlung → wird NICHT ins monatliche Einkommen eingerechnet, sondern im Bonusmonat Oktober erhöht das Einkommen scheinbar. Korrekte Behandlung: Oktober aus Bemessungszeitraum ausklammerbar (Monat mit Einmalzahlung). Minijob 520 €: wird zum Nettoeinkommen addiert, aber Pauschalsteuer (21%) abgezogen → 520 × 0,79 = ~411 € netto anrechenbar. Gesamtbasis: 2.600 + 411 = 3.011 €/Monat."
  },
  "4-3": {
    formLabel: "Geschwisterbonus & Mehrlingszuschlag",
    formFile: "formular-4-3-geschwisterbonus.pdf",
    scenario: "Familie Sommer: zweites Kind geboren 20. April 2025. Erstes Kind ist 2,5 Jahre alt. Mutter war für das erste Kind in Elternzeit von Januar bis Dezember 2023 (12 Monate). Jetzt fragen sie: Gibt es Geschwisterbonus? Und: Hat die frühere Elternzeit Auswirkungen auf den Bemessungszeitraum?",
    task: "Prüfe Geschwisterbonusberechtigung. Analysiere den Einfluss der früheren Elternzeit auf den Bemessungszeitraum des zweiten Kindes.",
    solution: "Geschwisterbonus: ✓ zweites Kind, erstes Kind unter 3 Jahren → +10% auf Elterngeld, mindestens 75 € zusätzlich. Elternzeit-Falle: BZ für zweites Kind wäre April 2024 – März 2025. Aber: wenn Mutter in dieser Zeit noch in Elternzeit oder Teilzeit durch erstes Kind war, können diese Monate ausgeklammert werden → BZ verschiebt sich in einkommensstärkere Zeit vor der ersten Elternzeit. Wichtig: aktiv prüfen und günstigste Variante wählen."
  },
  "5-1": {
    formLabel: "Beilagen-Checkliste – Standard & Sonderfälle",
    formFile: "formular-5-1-beilagen-checkliste.pdf",
    scenario: "Sandra Koch (30, Apothekerin, angestellt) stellt Antrag für ihr am 5. März 2025 geborenes Kind. Sie war 6 Wochen vor der Geburt in Mutterschutz. Ihr Mann ist selbstständiger Architekt. Sandra möchte wissen, welche Unterlagen sie einreichen muss.",
    task: "Erstelle die vollständige Beilagen-Checkliste für Familie Koch. Was braucht Sandra als Angestellte? Was braucht ihr Mann als Selbstständiger?",
    solution: "Sandra (Angestellte): Geburtsurkunde Kind, Lohnsteuerbescheinigung oder Gehaltsabrechnungen (12 Monate BZ), Nachweis Mutterschutz/Mutterschaftsgeld. Mann (Selbstständig): Einkommensteuerbescheid letztes Jahr, ggf. Gewinnermittlung/BWA, Anlage G ausgefüllt. Allgemein: Personalausweis/Pass, Meldebestätigung, bei Teilzeit: Arbeitgeberbescheinigung Stunden. Mutterschutz 6 Wochen vorher: Mutterschaftsgeld wird auf Elterngeld angerechnet (Anrechnungsmonat beachten)."
  },
  "5-2": {
    formLabel: "Bescheidprüfung & Widerspruch",
    formFile: "formular-5-2-widerspruch-vorlage.pdf",
    scenario: "Bescheid Familie Klein: Bewilligt 980 €/Monat. Du erkennst beim Prüfen: Die Elterngeldstelle hat einen Jahresbonus von 3.000 € (November 2024) als laufendes Einkommen gewertet. Dadurch ist das Einkommen überhöht, das Elterngeld zu niedrig. Bescheid eingegangen vor 24 Tagen.",
    task: "Identifiziere den Fehler. Berechne die korrekte Widerspruchsfrist. Verfasse die Kernbegründung des Widerspruchs.",
    solution: "Fehler: Jahresbonus = Einmalzahlung, darf nicht als laufendes Einkommen gewertet werden → entsprechender Monat muss ausgeklammert werden. Widerspruchsfrist: 1 Monat ab Zugang → 24 Tage vergangen, ca. 6 Tage verbleiben. SOFORT handeln. Widerspruchsbegründung: 'Der Bescheid vom [Datum] enthält einen Berechnungsfehler. Der im November 2024 ausgezahlte Jahresbonus i.H.v. 3.000 € stellt eine Einmalzahlung dar und ist gemäß §2c Abs.1 S.2 BEEG nicht als laufendes Einkommen zu werten. Wir beantragen Neuberechnung unter Ausklammerung des November 2024.' Formales: Einschreiben, Aktenzeichen, Unterschrift."
  },
  "6-1": {
    formLabel: "Beratungskommunikation & Datenschutz-Check",
    formFile: "formular-6-1-kommunikation-dsgvo.pdf",
    scenario: "Neukunde Herr Yıldız fragt per E-Mail: 'Können Sie mir schnell sagen, ob meine Frau Elterngeld bekommt? Sie verdient 2.400 € netto. Kind kommt im August.' Er hat seinen Namen und die E-Mail-Adresse seiner Frau in CC gesetzt, aber keine Vollmacht für seine Frau vorliegt.",
    task: "Formuliere eine datenschutzkonforme Antwort. Was darfst du Herrn Yıldız mitteilen? Was nicht? Welche Kanäle sind für Einkommensnachweise zulässig?",
    solution: "Datenschutz: Ohne Vollmacht darf keine Auskunft über die Frau gegeben werden – Herr Yıldız ist nicht Antragsteller. Antwort: 'Vielen Dank für Ihre Anfrage. Da Sie stellvertretend für Ihre Frau schreiben, benötigen wir eine schriftliche Vollmacht Ihrer Frau, bevor wir Auskunft geben dürfen. Bitte kommen Sie gemeinsam vorbei oder lassen Sie Ihrer Frau einen Termin.' Für Einkommensnachweise: kein WhatsApp, keine unverschlüsselte E-Mail → nur persönliche Übergabe, Brief oder gesichertes Portal. Allgemeine Info (kein personenbezogener Bezug) darf gegeben werden."
  },
  "6-2": {
    formLabel: "Eskalationsmatrix – Selbst lösen oder übergeben?",
    formFile: "formular-6-2-eskalationsmatrix.pdf",
    scenario: "Drei Fälle auf deinem Schreibtisch heute: (A) Grenzgänger, wohnt in Deutschland, arbeitet in Frankreich. (B) Antragstellerin mit Steuerklassenwechsel 2 Monate vor Geburt. (C) Frühgeburt, 5 Wochen zu früh, Anlage EA noch nicht ausgefüllt. Welche Fälle löst du selbst, welche eskalierst du?",
    task: "Entscheide je Fall: Selbst lösen oder eskalieren? Begründe kurz. Nenne die nächste konkrete Aktion je Fall.",
    solution: "Fall A (Grenzgänger Frankreich): ESKALIEREN → EU-Koordinierungsregeln, Sonderformular, Zuständigkeit unklar → Teamleitung/Spezialist. Fall B (Steuerklassenwechsel): SELBST LÖSEN → Steuerklasse zum Zeitpunkt der Geburt ist maßgeblich, Wechsel < 7 Monate vor Geburt gilt als gestaltungsmissbräuchlich und wird ignoriert. Handlung: korrekte SK eintragen. Fall C (Frühgeburt 5 Wochen): SELBST LÖSEN → 5 Wochen = unter 6 Wochen → kein Extramonat nach Staffel. Anlage EA ausfüllen, ärztliche Bescheinigung anfordernd. Vier-Augen-Prinzip: alle drei Fälle Kollegen zeigen lassen."
  },
  "6-3": {
    formLabel: "7-Schritte Beratungsdokumentation",
    formFile: "formular-6-3-beratungsdokumentation.pdf",
    scenario: "Erstkontakt: Frau Ortega (29, schwanger, 32. Woche) kommt unangemeldet. Sie hat Personalausweis dabei, aber keine Einkommensnachweise. Sie weiß nicht, was zu versteuerndes Einkommen bedeutet. Sie fragt, ob sie 'viel oder wenig' bekommen wird.",
    task: "Dokumentiere die Beratung nach dem 7-Schritte-Prozess. Was klärst du heute? Was vereinbarst du für den nächsten Termin? Wie erklärst du 'zvE' verständlich?",
    solution: "Schritt 1 Begrüßung: Vorstellen, Datenschutzhinweis. Schritt 2 Bedarfsermittlung: Was verdient sie netto? Wann Geburt? Wie lange Elternzeit geplant? Schritt 3 Unterlagen: heute nur Personalausweis → Termin für Gehaltsabrechnungen (12 Monate) vereinbaren. Schritt 4 Grundinformation: zvE erklären: 'Das ist Ihr Einkommen nach Abzug von z.B. Rentenbeiträgen und Werbungskosten – steht im Steuerbescheid, immer niedriger als Bruttogehalt.' Schritt 5-7: Antrag vorbereiten, Checkliste mitgeben, Folgetermin in 2 Wochen. Vier-Augen: Notiz für Kollegen."
  },
  "7-1": {
    formLabel: "Anlage-Übersicht – Welche Anlage wann?",
    formFile: "formular-7-1-anlagen-uebersicht.pdf",
    scenario: "Familie Zhou: Vater selbstständig (Fotostudio), Mutter angestellt in Bayern. Kind am 2. Februar 2025 geboren, 8 Wochen zu früh. Mutter möchte ElterngeldPlus beantragen, beide planen Partnerschaftsbonus. Welche Anlagen brauchen sie?",
    task: "Liste alle Anlagen auf, die Familie Zhou benötigt. Begründe je Anlage kurz warum.",
    solution: "Anlage EG+: wegen ElterngeldPlus-Antrag + Partnerschaftsbonus → Pflicht. Anlage EA: Frühgeburt 8 Wochen → Pflicht, ärztliche Bescheinigung beifügen (8 Wochen = 4 Extramonate). Anlage G (Vater, Selbstständig): Pflicht für Selbstständige. Bayern-Besonderheit Mutter: in Bayern eigene Anlage N statt bundeseinheitlichem Abschnitt 10 → Anlage N Bayern. Anlage 2.c wenn Mutter nicht in Deutschland geboren (prüfen). Bundeseinheitlicher Antrag ab 2025 für Mutter (wenn Nicht-Bayern-Wohnsitz) vs. Bayern-Formular."
  },
  "7-2": {
    formLabel: "Anlage EG+ – ElterngeldPlus ausfüllen",
    formFile: "formular-7-2-anlage-egplus.pdf",
    scenario: "Frau Stein will ab Lebensmonat 7 ElterngeldPlus beziehen (zurück zur Arbeit, 25h/Woche). Basiselterngeld wäre 1.200 €. Ihr Mann Dirk will parallel für 4 Monate den Partnerschaftsbonus nutzen (er reduziert auf 28h/Woche gleichzeitig mit ihr).",
    task: "Fülle die Anlage EG+ für Frau Stein aus. Trage die richtigen Monatszahlen, Beträge und Stunden ein. Welche Falle beim Partnerschaftsbonus muss Dirk kennen?",
    solution: "Frau Stein EP+: LM 7–18 (oder gewünschte Monate), je 600 € (50% von 1.200 €). Stunden: 25h/Woche eingetragen → innerhalb 24–32h ✓. Dirk Partnerschaftsbonus: exakt 4 aufeinanderfolgende Monate, je 24–32h – Eintrag der konkreten Monate Pflicht. Falle Dirk: wenn er in einem der 4 Monate auch nur 1 Stunde über 32h oder unter 24h arbeitet → gesamter Bonus wird zurückgefordert. Hinweis dokumentieren und Arbeitgeberbescheinigung anfordern."
  },
  "7-3": {
    formLabel: "Anlage N (Bayern) – Einkommensnachweis Angestellte",
    formFile: "formular-7-3-anlage-n-bayern.pdf",
    scenario: "Maria Huber (München, angestellt als Buchhalterin, Steuerklasse 5) reicht Antrag ein. Einkommen: 2.200 € netto/Monat. Im August 2024 hatte sie wegen Krankheit nur 1.400 € (Krankengeld für 3 Wochen). Sie fragt, ob sie den August trotzdem eintragen muss.",
    task: "Fülle Anlage N für Frau Huber aus. Wie gehst du mit dem Krankheitsmonat August um? Welche Besonderheit hat Steuerklasse 5?",
    solution: "Anlage N: alle 12 Monate des Bemessungszeitraums eintragen. August 2024 (Krankengeld 3 Wochen): Monat mit Lohnersatzleistung → Ausklammerungsmonat, BZ verschiebt sich um 1 Monat zurück. Steuerklasse 5: niedrigere Nettoeinkünfte als SK 3/4 → Elterngeld niedriger. Tipp: Steuerklassenwechsel sollte mind. 7 Monate vor Geburt erfolgen (sonst gilt Gestaltungsmissbrauch). Einkommen: nur tatsächlich ausgezahltes Nettogehalt eintragen, Krankengeld nicht als Einkommen."
  },
  "7-4": {
    formLabel: "Anlage G & GuN – Selbstständige & Mischeinkünfte",
    formFile: "formular-7-4-anlage-g-gun.pdf",
    scenario: "Felix Kraft: selbstständiger Übersetzer. Betriebseinnahmen 2024: 52.000 €, Betriebsausgaben: 18.000 €, also Gewinn 34.000 €. Zusätzlich Minijob 520 €/Monat. Kind geboren März 2025. Er fragt, ob seine Photovoltaikanlage (Einnahmen: 180 €/Monat) relevant ist.",
    task: "Fülle Anlage G für Herrn Kraft aus. Welches Einkommen wird angerechnet? Wie wird der Minijob erfasst? PV-Anlage: relevant oder nicht?",
    solution: "Anlage G: Gewinn (Einnahmen minus Ausgaben) = 34.000 € / 12 = 2.833 €/Monat brutto. Abzug 21%-Pauschale: 2.833 × 0,79 = 2.238 € netto/Monat. Anlage GuN für Minijob: 520 €/Monat × 0,79 = 411 € zusätzlich. PV-Anlage 180 €/Monat: Gewinn daraus = anrechenbare Einkünfte neben dem Elterngeld → Anlage 12.a erforderlich. Prüfen ob Gewinn > 35 €/Monat (ja: 180 - Ausgaben). Hinweis: kann Elterngeld reduzieren."
  },
  "7-5": {
    formLabel: "Anlage EA – Frühgeburt & Extramonate",
    formFile: "formular-7-5-anlage-ea.pdf",
    scenario: "Baby Jonas wurde 11 Wochen zu früh geboren (Errechneter Termin: 15. Juni 2025, tatsächlich: 31. März 2025). Eltern fragen, wie viele Extramonate sie bekommen und was sie nachweisen müssen.",
    task: "Berechne die Extramonate nach der Staffeltabelle. Fülle Anlage EA aus. Was muss beigefügt werden?",
    solution: "Staffeltabelle: 11 Wochen zu früh → ≥8 Wochen (Kategorie): +4 Extramonate. Frühgeburt-Nachweis: ärztliche Bescheinigung mit errechnetem UND tatsächlichem Geburtstermin → Pflichtbeilage. Anlage EA: errechnetes Datum 15.06.2025, tatsächliches Datum 31.03.2025 → Differenz 11 Wochen eintragen. Extramonate werden am Ende des normalen Bezugszeitraums angehängt. Hinweis: Extramonate gelten nur für Basiselterngeld, nicht für EP+-Verlängerung."
  },
  "7-6": {
    formLabel: "Anlage 12.a – Einkünfte neben dem Elterngeld",
    formFile: "formular-7-6-anlage-12a.pdf",
    scenario: "Frau Lange bezieht Elterngeld und nimmt ab LM 5 eine Teilzeitstelle an (800 €/Monat). Außerdem hat sie: Resturlaub aus altem Job (6 Tage werden als Urlaubsabgeltung ausgezahlt, 480 €). Ihr Mann zahlt Unterhalt für Kind aus erster Ehe: 350 €/Monat an sie.",
    task: "Welche Einkünfte müssen in Anlage 12.a eingetragen werden? Wie wirkt sich die Teilzeit aus? Unterhalt – anrechenbar?",
    solution: "Anlage 12.a Pflichteinträge: Teilzeit 800 €/Monat → anrechenbar, reduziert Elterngeld ab LM 5. Urlaubsabgeltung 480 €: einmalige Zahlung → in dem Monat der Auszahlung anrechenbar. Unterhalt 350 €/Monat: Unterhaltszahlungen sind KEIN Erwerbseinkommen → nicht in Anlage 12.a, aber als Einkünfte im Steuerbescheid. Dienstwagen-Sachbezug (falls vorhanden): monatlich anrechenbar. Faustregel: Alles was steuerlich als Einnahme gilt und während Elterngeldbezug zufließt, gehört in 12.a."
  },
  "7-7": {
    formLabel: "Anlage 2.g & 2.c – Staatsangehörigkeit & Auslandswohnsitz",
    formFile: "formular-7-7-anlage-2g-2c.pdf",
    scenario: "Klientin Amina Diallo (32, guineische Staatsbürgerin, Niederlassungserlaubnis): Ihr Mann arbeitet als Grenzgänger (wohnt Deutschland, arbeitet Schweiz). Sie selbst ist nicht berufstätig. Kind geboren April 2025. Welche Anlagen 2.g und/oder 2.c braucht sie?",
    task: "Bestimme welche Anlagen erforderlich sind. Wie gehst du mit dem Grenzgänger-Fall des Mannes um?",
    solution: "Anlage 2.g (Staatsangehörigkeit): Pflicht bei Nicht-EU-Staatsbürgerschaft → Aufenthaltstitel Niederlassungserlaubnis eintragen, Kopie Aufenthaltstitel beifügen. Anlage 2.c (Auslandswohnsitz): nur wenn Antragsteller Wohnsitz im Ausland hat – hier nicht nötig (Wohnsitz Deutschland). Mann Grenzgänger Schweiz: ESKALIEREN – EU/Schweiz Sonderabkommen, Zuständigkeit unklar, Koordinierungsverordnung greift, Sonderformular möglicherweise erforderlich. Nie selbst entscheiden – immer Spezialist einbeziehen."
  }
};

// ═══════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════
const totalLessons = CHAPTERS.reduce((s, c) => s + c.lessons.length, 0);
const QUIZ_PASS = 75; // Mindest-Score Quiz
const isLessonComplete = (prog, lid) => {
  const p = prog?.[lid];
  if (!p) return false;
  const quizOk = p.quizScore !== undefined ? p.quizScore >= QUIZ_PASS : false;
  const hasAssessment = typeof LESSON_CASES !== "undefined" && !!LESSON_CASES[lid];
  const assessOk = hasAssessment ? !!p.assessmentPassed : true;
  return quizOk && assessOk;
};
const chapterProgress = (prog, ch) => {
  const done = ch.lessons.filter(l => isLessonComplete(prog, l.id)).length;
  return { done, total: ch.lessons.length, pct: Math.round(done / ch.lessons.length * 100) };
};
const overallProgress = (prog) => {
  const done = CHAPTERS.flatMap(c => c.lessons).filter(l => isLessonComplete(prog, l.id)).length;
  return { done, total: totalLessons, pct: Math.round(done / totalLessons * 100) };
};
const allDone = (prog) => overallProgress(prog).done === totalLessons;
const isChapterComplete = (prog, ch) => chapterProgress(prog, ch).pct === 100;
const isChapterUnlocked = (chapterId, prog) => {
  const idx = CHAPTERS.findIndex(c => c.id === chapterId);
  if (idx <= 0) return true; // Kapitel 1 immer offen
  return isChapterComplete(prog, CHAPTERS[idx - 1]);
};

const flatLessons = CHAPTERS.flatMap(c => c.lessons.map(l => ({ ...l, chapterId: c.id })));
const isLessonUnlocked = (lessonId, prog) => {
  const ch = CHAPTERS.find(c => c.lessons.some(l => l.id === lessonId));
  if (!ch) return true;
  const idx = ch.lessons.findIndex(l => l.id === lessonId);
  if (idx === 0) return true;
  return isLessonComplete(prog, ch.lessons[idx - 1].id);
};
const getNextLesson = (lessonId) => {
  const idx = flatLessons.findIndex(l => l.id === lessonId);
  if (idx < 0 || idx >= flatLessons.length - 1) return null;
  return flatLessons[idx + 1];
};

// ═══════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════
const T = {
  bg: "#F2F2F2", surface: "#FFFFFF", surfaceEl: "rgba(255,255,255,0.72)",
  rail: "#1C1C1E", railHov: "#2C2C2E", railAct: "#3A3A3C", railBorder: "rgba(255,255,255,0.06)",
  text: "#1D1D1F", text2: "#6E6E73", text3: "#AEAEB2",
  accent: "#C0703A", accentLt: "#FAF0E8", accentBdr: "rgba(192,112,58,0.25)",
  green: "#28A745", greenLt: "#EDF7F0", greenBdr: "rgba(40,167,69,0.2)",
  red: "#D93025", redLt: "#FEF0EF", redBdr: "rgba(217,48,37,0.2)",
  blue: "#0066CC", blueLt: "#EBF3FC",
  purple: "#5C3B8C", purpleLt: "#F3EDFC", purpleBdr: "rgba(92,59,140,0.2)",
  border: "rgba(0,0,0,0.08)", borderMd: "rgba(0,0,0,0.13)",
  shadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
  shadowMd: "0 2px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.10)",
  shadowLg: "0 8px 32px rgba(0,0,0,0.10), 0 32px 80px rgba(0,0,0,0.16)",
  r: "14px", rSm: "9px", rXs: "6px",
};

// ═══════════════════════════════════════════════════════════════════
// FONT + GLOBAL STYLES
// ═══════════════════════════════════════════════════════════════════
const injectFonts = () => {
  if (document.querySelector("#eg-fonts")) return;
  const l = document.createElement("link");
  l.id = "eg-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap";
  document.head.appendChild(l);
  const s = document.createElement("style");
  s.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { -webkit-font-smoothing: antialiased; }
    button { cursor: pointer; font-family: inherit; }
    ::-webkit-scrollbar { width: 3px; height: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 2px; }
    input, textarea { font-family: inherit; }
    input:focus, textarea:focus { outline: none; box-shadow: 0 0 0 3px rgba(192,112,58,0.18); }
    @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
    .fade-up { animation: fadeUp 0.35s ease forwards; }
    .fade-in { animation: fadeIn 0.25s ease forwards; }
  `;
  document.head.appendChild(s);
};

// ═══════════════════════════════════════════════════════════════════
// ATOMS
// ═══════════════════════════════════════════════════════════════════
const Tag = ({ children, variant = "default" }) => {
  const s = { default:{c:T.text2,bg:"rgba(0,0,0,0.06)"}, accent:{c:T.accent,bg:T.accentLt}, green:{c:T.green,bg:T.greenLt}, red:{c:T.red,bg:T.redLt}, blue:{c:T.blue,bg:T.blueLt}, purple:{c:T.purple,bg:T.purpleLt} }[variant] || {c:T.text2,bg:"rgba(0,0,0,0.06)"};
  return <span style={{ display:"inline-flex", alignItems:"center", fontSize:11, fontWeight:500, letterSpacing:"0.01em", color:s.c, background:s.bg, borderRadius:99, padding:"3px 9px", lineHeight:1.4, whiteSpace:"nowrap" }}>{children}</span>;
};
const ProgressRing = ({ pct, size=20, stroke=2.5, color=T.accent, trackColor="rgba(0,0,0,0.08)" }) => {
  const r=(size-stroke)/2, circ=2*Math.PI*r;
  return <svg width={size} height={size} style={{transform:"rotate(-90deg)",flexShrink:0}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.6s ease"}}/></svg>;
};
const ProgressBar = ({ pct, height=4, color=T.accent, track="rgba(0,0,0,0.07)" }) => (
  <div style={{ height, background:track, borderRadius:99, overflow:"hidden", flexShrink:0 }}>
    <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:99, transition:"width 0.6s ease" }} />
  </div>
);
const Avatar = ({ initials, size=32, bg=T.rail }) => (
  <div style={{ width:size, height:size, borderRadius:"50%", background:bg, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600, fontSize:size*0.34, letterSpacing:"0.02em", flexShrink:0 }}>{initials}</div>
);
const Divider = ({ my=0 }) => <div style={{ height:1, background:T.border, margin:`${my}px 0` }} />;
const Btn = ({ children, onClick, variant="primary", size="md", disabled=false, style:ex={} }) => {
  const v = { primary:{bg:T.rail,color:"#fff",border:"none"}, accent:{bg:T.accent,color:"#fff",border:"none"}, green:{bg:T.green,color:"#fff",border:"none"}, ghost:{bg:"transparent",color:T.text2,border:`1px solid ${T.border}`}, ghostAccent:{bg:T.accentLt,color:T.accent,border:`1px solid ${T.accentBdr}`}, purple:{bg:T.purple,color:"#fff",border:"none"} }[variant]||{bg:T.rail,color:"#fff",border:"none"};
  const sz = { sm:{padding:"7px 16px",fontSize:13}, md:{padding:"10px 20px",fontSize:14}, lg:{padding:"13px 28px",fontSize:15} }[size]||{padding:"10px 20px",fontSize:14};
  return <button onClick={disabled?undefined:onClick} disabled={disabled} style={{...sz,...v, borderRadius:T.rSm, fontWeight:500, display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all 0.15s", opacity:disabled?0.4:1, cursor:disabled?"default":"pointer", lineHeight:1, ...ex}} onMouseEnter={e=>{if(!disabled)e.currentTarget.style.filter="brightness(0.92)";}} onMouseLeave={e=>e.currentTarget.style.filter="none"}>{children}</button>;
};

// ═══════════════════════════════════════════════════════════════════
// CONTENT BLOCKS
// ═══════════════════════════════════════════════════════════════════
function ContentBlocks({ blocks }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
      {blocks.map((b, i) => {
        if (b.type==="heading") return <div key={i} style={{paddingBottom:14,borderBottom:`1px solid ${T.border}`,marginBottom:2}}><h2 style={{fontFamily:"'Cormorant',serif",fontSize:26,fontWeight:500,color:T.text,letterSpacing:"-0.01em",lineHeight:1.2}}>{b.text}</h2></div>;
        if (b.type==="text") return <p key={i} style={{color:T.text2,fontSize:14,lineHeight:1.85}}>{b.text}</p>;
        if (b.type==="highlight") return <div key={i} style={{background:T.accentLt,border:`1px solid ${T.accentBdr}`,borderLeft:`3px solid ${T.accent}`,borderRadius:`0 ${T.rSm} ${T.rSm} 0`,padding:"16px 20px"}}><div style={{fontSize:12,fontWeight:600,color:T.accent,marginBottom:8}}>{b.label}</div><p style={{color:T.text,fontSize:13.5,lineHeight:1.85,whiteSpace:"pre-line"}}>{b.text}</p></div>;
        if (b.type==="warning") return <div key={i} style={{background:T.redLt,border:`1px solid ${T.redBdr}`,borderLeft:`3px solid ${T.red}`,borderRadius:`0 ${T.rSm} ${T.rSm} 0`,padding:"16px 20px"}}><div style={{fontSize:12,fontWeight:600,color:T.red,marginBottom:8}}>{b.label}</div><p style={{color:T.text,fontSize:13.5,lineHeight:1.85,whiteSpace:"pre-line"}}>{b.text}</p></div>;
        if (b.type==="table") return (
          <div key={i} style={{overflowX:"auto",borderRadius:T.rSm,border:`1px solid ${T.border}`}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:T.rail}}>{b.headers.map((h,j)=><th key={j} style={{padding:"11px 16px",color:"rgba(255,255,255,0.85)",fontWeight:500,textAlign:"left",whiteSpace:"nowrap",fontSize:12,letterSpacing:"0.03em"}}>{h}</th>)}</tr></thead>
              <tbody>{b.rows.map((row,j)=><tr key={j} style={{background:j%2===0?T.surface:"rgba(0,0,0,0.018)",borderTop:`1px solid ${T.border}`}}>{row.map((cell,k)=><td key={k} style={{padding:"10px 16px",color:k===0?T.text:T.text2,lineHeight:1.55,fontSize:13}}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
        return null;
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !pw.trim()) { setErr("Bitte E-Mail und Passwort eingeben."); return; }
    setLoading(true); setErr("");
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw });
    if (error) { setErr("E-Mail oder Passwort nicht korrekt."); setLoading(false); return; }
    // Profile is loaded by App via onAuthStateChange
    onLogin(data.user);
  };

  const handleReset = async () => {
    if (!email.trim()) { setErr("Bitte zuerst E-Mail eingeben."); return; }
    setLoading(true); setErr("");
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.href
    });
    setLoading(false);
    if (error) { setErr("Fehler beim Senden. Bitte erneut versuchen."); return; }
    setResetSent(true);
  };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif", backgroundImage:"radial-gradient(ellipse at 60% 0%, rgba(192,112,58,0.06) 0%, transparent 60%)" }}>
      <div className="fade-up" style={{ width:400 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:56, height:56, borderRadius:16, background:T.rail, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 16px", boxShadow:"0 4px 20px rgba(0,0,0,0.2)" }}>📎</div>
          <div style={{ fontFamily:"'Cormorant',serif", fontSize:24, fontWeight:500, color:T.text, letterSpacing:"-0.02em" }}>Elterngeld-Training</div>
          <div style={{ fontSize:13, color:T.text3, marginTop:4 }}>Professionelle Beratungskompetenz</div>
        </div>
        <div style={{ background:T.surface, borderRadius:20, boxShadow:T.shadowLg, padding:"32px 36px", border:`1px solid ${T.border}` }}>
          {resetSent ? (
            <div>
              <div style={{ background:T.greenLt, border:`1px solid ${T.greenBdr}`, borderRadius:T.rSm, padding:"14px 16px", fontSize:13.5, color:T.green, marginBottom:20, lineHeight:1.65 }}>
                ✓ Passwort-Reset-Link wurde an <strong>{email}</strong> gesendet. Bitte E-Mail prüfen.
              </div>
              <Btn variant="ghost" style={{ width:"100%" }} onClick={()=>{ setResetSent(false); setResetMode(false); }}>Zurück zum Login</Btn>
            </div>
          ) : (
            <>
              <div style={{ marginBottom:18 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:500, color:T.text2, marginBottom:7 }}>E-Mail</label>
                <input type="email" value={email} onChange={e=>{ setEmail(e.target.value); setErr(""); }}
                  onKeyDown={e=>e.key==="Enter"&&(resetMode?handleReset():handleLogin())}
                  placeholder="dein.name@beratung.de"
                  style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${err?T.red:T.border}`, borderRadius:T.rSm, fontSize:14, color:T.text, background:T.surface, transition:"border-color 0.15s" }} />
              </div>
              {!resetMode && (
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:"block", fontSize:12, fontWeight:500, color:T.text2, marginBottom:7 }}>Passwort</label>
                  <input type="password" value={pw} onChange={e=>{ setPw(e.target.value); setErr(""); }}
                    onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                    style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${err?T.red:T.border}`, borderRadius:T.rSm, fontSize:14, color:T.text, background:T.surface }} />
                </div>
              )}
              {err && <div style={{ background:T.redLt, border:`1px solid ${T.redBdr}`, borderRadius:T.rXs, padding:"10px 14px", fontSize:13, color:T.red, marginBottom:16 }}>{err}</div>}
              <button onClick={resetMode?handleReset:handleLogin}
                style={{ width:"100%", background:T.rail, color:"#fff", border:"none", borderRadius:T.rSm, padding:"12px", fontWeight:500, fontSize:15, fontFamily:"inherit", opacity:loading?0.7:1, cursor:"pointer" }}
                onMouseEnter={e=>e.currentTarget.style.background="#2C2C2E"}
                onMouseLeave={e=>e.currentTarget.style.background=T.rail}>
                {loading ? "Bitte warten…" : resetMode ? "Reset-Link senden" : "Anmelden"}
              </button>
              <div style={{ textAlign:"center", marginTop:16 }}>
                <button onClick={()=>{ setResetMode(!resetMode); setErr(""); }}
                  style={{ background:"none", border:"none", fontSize:12.5, color:T.text3, cursor:"pointer", textDecoration:"underline" }}>
                  {resetMode ? "Zurück zum Login" : "Passwort vergessen?"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════════
function Sidebar({ user, prog, view, onNavigate, onLogout, certUnlocked }) {
  const overall = overallProgress(prog);
  const navItems = [
    { id:"dashboard", icon:"⊞", label:"Dashboard" },
    ...CHAPTERS.map(c => ({
      id:`chapter-${c.id}`, icon:c.icon,
      label:`${c.number} · ${c.title}`,
      cp:chapterProgress(prog,c),
      locked: user.role==="admin" ? false : !isChapterUnlocked(c.id, prog)
    })),
    { id:"extras", icon:"◫", label:"Nachschlagewerk" },
    ...(certUnlocked ? [{ id:"certified-chat", icon:"✦", label:"Elterngeld-KI", special:true }] : []),
    ...(user.role==="admin" ? [{ id:"admin", icon:"◈", label:"Team-Übersicht" }] : [])
  ];
  return (
    <div style={{ width:240, background:T.rail, display:"flex", flexDirection:"column", flexShrink:0, minHeight:"100vh", userSelect:"none" }}>
      <div style={{ padding:"24px 16px 16px", borderBottom:`1px solid ${T.railBorder}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>📎</div>
          <div>
            <div style={{ fontFamily:"'Cormorant',serif", fontSize:15, color:"#fff", fontWeight:500, letterSpacing:"-0.01em", lineHeight:1.2 }}>Elterngeld-Training</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", marginTop:1 }}>7 Kapitel · {totalLessons} Lektionen</div>
          </div>
        </div>
        {overall.pct > 0 && <>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>Gesamtfortschritt</span>
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{overall.pct}%</span>
          </div>
          <ProgressBar pct={overall.pct} height={2} color={T.accent} track="rgba(255,255,255,0.1)" />
        </>}
      </div>
      <nav style={{ flex:1, overflowY:"auto", padding:"8px 8px" }}>
        {navItems.map((item, idx) => {
          const showSep = idx > 0 && (item.id==="extras" || item.id==="certified-chat" || item.id==="admin");
          return (
            <div key={item.id}>
              {showSep && <div style={{ height:1, background:T.railBorder, margin:"6px 4px" }} />}
              <div onClick={()=>!item.locked&&onNavigate(item.id)}
                style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 10px", borderRadius:T.rXs, cursor:item.locked?"default":"pointer", background:"transparent", transition:"background 0.12s", marginBottom:1, opacity:item.locked?0.38:1 }}
                onMouseEnter={e=>{ if(!item.locked) e.currentTarget.style.background=T.railHov; }}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span style={{ fontSize:12, width:16, textAlign:"center", flexShrink:0, opacity:0.7, color:item.special?"#C4A3FF":"inherit" }}>{item.locked?"🔒":item.icon}</span>
                <span style={{ fontSize:12, color:item.special?"#C4A3FF":"rgba(255,255,255,0.7)", flex:1, lineHeight:1.3, fontWeight:item.special?500:400 }}>{item.label}</span>
                {!item.locked&&item.cp&&item.cp.pct===100&&<span style={{ fontSize:10, color:T.green, opacity:0.9 }}>✓</span>}
                {!item.locked&&item.cp&&item.cp.pct>0&&item.cp.pct<100&&<ProgressRing pct={item.cp.pct} size={16} stroke={2} color={T.accent} trackColor="rgba(255,255,255,0.12)" />}
              </div>
            </div>
          );
        })}
      </nav>
      <div style={{ padding:"10px 12px", borderTop:`1px solid ${T.railBorder}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 6px" }}>
          <Avatar initials={user.avatar} size={26} bg={T.accent} />
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name}</div>
            {user.role==="admin" && <div style={{ fontSize:10, color:T.accent }}>Admin</div>}
          </div>
          <button onClick={onLogout} style={{ background:"transparent", border:"none", color:"rgba(255,255,255,0.3)", fontSize:14, padding:"2px 4px", borderRadius:4, lineHeight:1, transition:"color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.7)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}>↩</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════
function Dashboard({ user, prog, onSelectChapter, onExtras, onCertificate, onCertifiedChat }) {
  const overall = overallProgress(prog);
  const done = allDone(prog);
  const isAdmin = user.role === "admin";
  const hour = new Date().getHours();
  const greeting = hour<12?"Guten Morgen":hour<17?"Guten Tag":"Guten Abend";
  return (
    <div style={{ padding:"40px 44px", maxWidth:1040, fontFamily:"'DM Sans',sans-serif" }} className="fade-up">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:36, flexWrap:"wrap", gap:20 }}>
        <div>
          <div style={{ fontFamily:"'Cormorant',serif", fontSize:34, fontWeight:400, color:T.text, letterSpacing:"-0.02em", lineHeight:1.1 }}>{greeting}, {user.name.split(" ")[0]}.</div>
          <div style={{ color:T.text3, fontSize:14, marginTop:6 }}>Elterngeld-Zertifizierung · 7 Kapitel · {totalLessons} Lektionen</div>
        </div>
        <div style={{ background:T.surface, borderRadius:T.r, boxShadow:T.shadow, border:`1px solid ${T.border}`, padding:"20px 24px", minWidth:240 }}>
          <div style={{ fontSize:11, color:T.text3, marginBottom:10, fontWeight:500, letterSpacing:"0.04em", textTransform:"uppercase" }}>Gesamtfortschritt</div>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
            <ProgressRing pct={overall.pct} size={52} stroke={4} color={T.accent} />
            <div>
              <div style={{ fontFamily:"'Cormorant',serif", fontSize:32, fontWeight:500, color:T.text, lineHeight:1 }}>{overall.pct}<span style={{ fontSize:18, color:T.text3 }}>%</span></div>
              <div style={{ fontSize:12, color:T.text3, marginTop:3 }}>{overall.done}/{overall.total} Lektionen</div>
            </div>
          </div>
          <ProgressBar pct={overall.pct} height={3} />
          {done && <button onClick={onCertificate} style={{ marginTop:14, width:"100%", background:T.accent, color:"#fff", border:"none", borderRadius:T.rSm, padding:"9px", fontSize:13, fontWeight:500, fontFamily:"inherit" }}>🏆 Zertifikat abrufen</button>}
        </div>
      </div>

      {done && (
        <div className="fade-up" style={{ background:"linear-gradient(135deg, #1C1C1E 0%, #2C1F40 100%)", borderRadius:T.r, padding:"24px 28px", marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div>
            <div style={{ fontSize:11, color:"rgba(196,163,255,0.7)", fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:6 }}>Neu freigeschaltet</div>
            <div style={{ fontFamily:"'Cormorant',serif", fontSize:22, fontWeight:500, color:"#fff" }}>✦ Elterngeld-KI Assistent</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.55)", marginTop:4 }}>Vollwertige KI, trainiert auf allen Kursinhalten. Für Beratungsfragen im Alltag.</div>
          </div>
          <Btn variant="purple" onClick={onCertifiedChat}>KI öffnen →</Btn>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:14, marginBottom:32 }}>
        {CHAPTERS.map((ch, idx) => {
          const cp = chapterProgress(prog, ch);
          const unlocked = isAdmin || isChapterUnlocked(ch.id, prog);
          return (
            <div key={ch.id}
              onClick={() => unlocked && onSelectChapter(ch)}
              style={{ background: unlocked ? T.surface : "rgba(0,0,0,0.03)", border:`1px solid ${cp.pct===100 ? T.greenBdr : T.border}`, borderRadius:T.r, padding:"22px 24px", cursor: unlocked ? "pointer" : "default", transition:"box-shadow 0.2s, transform 0.2s", boxShadow: unlocked ? T.shadow : "none", opacity: unlocked ? 1 : 0.55 }} className="fade-up"
              onMouseEnter={e=>{ if(unlocked){e.currentTarget.style.boxShadow=T.shadowMd;e.currentTarget.style.transform="translateY(-1px)";}}}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow=unlocked?T.shadow:"none";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, color:T.text3, fontWeight:500, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:4 }}>Kapitel {ch.number}</div>
                  <div style={{ fontFamily:"'Cormorant',serif", fontSize:19, fontWeight:500, color: unlocked ? T.text : T.text2, letterSpacing:"-0.01em", lineHeight:1.2 }}>{ch.title}</div>
                </div>
                <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, marginLeft:12, background: cp.pct===100 ? T.greenLt : unlocked ? T.accentLt : "rgba(0,0,0,0.05)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>
                  {cp.pct===100 ? "✓" : unlocked ? ch.icon : "🔒"}
                </div>
              </div>
              <p style={{ fontSize:12.5, color:T.text3, lineHeight:1.65, marginBottom:14 }}>{ch.description.length>90?ch.description.slice(0,90)+"…":ch.description}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                {unlocked
                  ? <span style={{ fontSize:12, color:T.text3 }}>{cp.done}/{cp.total} Lektionen</span>
                  : <span style={{ fontSize:12, color:T.text3 }}>🔒 Kapitel {CHAPTERS[idx-1]?.number} abschließen</span>
                }
                {cp.pct===100 && <Tag variant="green">✓ Abgeschlossen</Tag>}
                {cp.pct>0 && cp.pct<100 && unlocked && <Tag variant="accent">In Bearbeitung</Tag>}
              </div>
              <ProgressBar pct={cp.pct} height={3} color={unlocked ? T.accent : "rgba(0,0,0,0.12)"} />
            </div>
          );
        })}
      </div>

      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        <Btn variant="ghost" onClick={onExtras}>📚 Nachschlagewerk</Btn>
        {done && <Btn variant="accent" onClick={onCertificate}>🏆 Zertifikat abrufen</Btn>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CHAPTER VIEW — mit Fallstudie-Einstieg
// ═══════════════════════════════════════════════════════════════════
function ChapterView({ chapter, prog, isAdmin, onSelectLesson, onBack }) {
  const cp = chapterProgress(prog, chapter);

  return (
    <div style={{ padding:"40px 44px", maxWidth:860, fontFamily:"'DM Sans',sans-serif" }} className="fade-up">
      <button onClick={onBack} style={{ background:"none", border:"none", color:T.text3, fontSize:13, marginBottom:24, display:"flex", alignItems:"center", gap:6, padding:0, transition:"color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.text3}>← Zur Übersicht</button>
      <div style={{ marginBottom:32 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <span style={{ fontSize:28 }}>{chapter.icon}</span>
          <Tag>Kapitel {chapter.number}</Tag>
          {cp.pct===100 && <Tag variant="green">✓ Abgeschlossen</Tag>}
        </div>
        <h1 style={{ fontFamily:"'Cormorant',serif", fontSize:30, fontWeight:400, color:T.text, letterSpacing:"-0.02em", marginBottom:10, lineHeight:1.2 }}>{chapter.fullTitle}</h1>
        <p style={{ color:T.text2, fontSize:14, lineHeight:1.75, marginBottom:18, maxWidth:620 }}>{chapter.description}</p>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ flex:1, maxWidth:320 }}><ProgressBar pct={cp.pct} height={4} /></div>
          <span style={{ fontSize:12, color:T.text3 }}>{cp.done}/{cp.total} Lektionen abgeschlossen</span>
        </div>
      </div>

      {/* Lessons */}
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {chapter.lessons.map((lesson, idx) => {
          const done = isLessonComplete(prog, lesson.id);
          const unlocked = isAdmin || isLessonUnlocked(lesson.id, prog);
          return (
            <div key={lesson.id} onClick={()=>unlocked&&onSelectLesson(lesson,chapter)}
              style={{ background:T.surface, border:`1px solid ${done?T.greenBdr:T.border}`, borderRadius:T.r, padding:"18px 22px", cursor:unlocked?"pointer":"default", display:"flex", alignItems:"center", gap:16, opacity:unlocked?1:0.55, transition:"box-shadow 0.2s, transform 0.18s", boxShadow:T.shadow }}
              onMouseEnter={e=>{ if(unlocked){e.currentTarget.style.boxShadow=T.shadowMd;e.currentTarget.style.transform="translateX(2px)";} }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow=T.shadow;e.currentTarget.style.transform="translateX(0)"; }}>
              <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background:done?T.greenLt:unlocked?T.accentLt:"rgba(0,0,0,0.04)", border:`1px solid ${done?T.greenBdr:unlocked?T.accentBdr:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:done?T.green:unlocked?T.accent:T.text3, fontWeight:600 }}>
                {done?"✓":unlocked?idx+1:"🔒"}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:500, fontSize:14, color:T.text, marginBottom:3 }}>{lesson.title}</div>
                <div style={{ fontSize:12, color:T.text3 }}>
                  {!unlocked && `Schließe zuerst Lektion ${idx} ab`}
                  {unlocked && !done && (() => {
                    const lp = prog?.[lesson.id] || {};
                    const qDone = lp.quizScore !== undefined && lp.quizScore >= QUIZ_PASS;
                    const aDone = !!lp.assessmentPassed;
                    const hasA = !!LESSON_CASES[lesson.id];
                    if (!qDone) return `${lesson.duration} · Quiz ausstehend`;
                    if (hasA && !aDone) return `Quiz ✓ · Praxisüberprüfung ausstehend`;
                    return `${lesson.duration} · ${lesson.quiz.length} Quizfragen`;
                  })()}
                  {unlocked && done && `${lesson.duration} · Abgeschlossen`}
                </div>
              </div>
              {done && <Tag variant="green">✓</Tag>}
              {unlocked && !done && <span style={{ color:T.text3, fontSize:16 }}>›</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LESSON VIEW — Quiz integriert, Checkliste interaktiv, Auto-Completion
// ═══════════════════════════════════════════════════════════════════
function LessonView({ lesson, chapter, prog, isAdmin, onComplete, onBack, onNextLesson, nextLessonTitle }) {
  const lp = prog?.[lesson.id] || {};
  const quizAlreadyPassed = isAdmin || (lp.quizScore !== undefined && lp.quizScore >= QUIZ_PASS);
  const assessAlreadyPassed = isAdmin || !!lp.assessmentPassed;
  const lessonDone = isLessonComplete(prog, lesson.id);
  const hasAssessment = !!LESSON_CASES[lesson.id];

  // Interactive checklist state (local, resets on navigation — intentional)
  const [checked, setChecked] = useState({});

  // Quiz state
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(quizAlreadyPassed);
  const [quizScore, setQuizScore] = useState(lp.quizScore ?? null);
  const [quizPassed, setQuizPassed] = useState(quizAlreadyPassed);

  useEffect(() => {
    setChecked({});
    const lp2 = prog?.[lesson.id] || {};
    const qp = lp2.quizScore !== undefined && lp2.quizScore >= QUIZ_PASS;
    setQuizSubmitted(qp); setQuizPassed(qp);
    setQuizScore(lp2.quizScore ?? null); setAnswers({});
  }, [lesson.id]);

  // Find lesson index within chapter for position indicator
  const lessonIdx = chapter.lessons.findIndex(l => l.id === lesson.id);
  const lessonNum = lessonIdx + 1;

  const handleQuizSubmit = () => {
    const score = lesson.quiz.filter((q, i) => answers[i] === q.a).length;
    const pct = Math.round(score / lesson.quiz.length * 100);
    const passed = pct >= QUIZ_PASS;
    setQuizScore(pct); setQuizSubmitted(true); setQuizPassed(passed);
    onComplete(lesson.id, { quizScore: pct });
  };

  const handleQuizRetry = () => {
    setAnswers({}); setQuizSubmitted(false); setQuizScore(null); setQuizPassed(false);
  };

  return (
    <div style={{ padding:"40px 44px", maxWidth:860, fontFamily:"'DM Sans',sans-serif" }} className="fade-up">
      {/* Back + position */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:T.text3, fontSize:13, display:"flex", alignItems:"center", gap:6, padding:0, cursor:"pointer", transition:"color 0.15s" }}
          onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.text3}>
          ← {chapter.title}
        </button>
        <span style={{ fontSize:12, color:T.text3, fontWeight:500 }}>
          Lektion {lessonNum} von {chapter.lessons.length} · Kapitel {chapter.number}
        </span>
      </div>

      {/* Lesson header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap", alignItems:"center" }}>
          <Tag>Kap. {chapter.number}</Tag>
          <Tag>{lesson.duration}</Tag>
          {lessonDone && <Tag variant="green">✓ Abgeschlossen</Tag>}
        </div>
        <h1 style={{ fontFamily:"'Cormorant',serif", fontSize:28, fontWeight:400, color:T.text, letterSpacing:"-0.02em", marginBottom:12, lineHeight:1.2 }}>
          {lesson.title}
        </h1>
        <div style={{ background:T.blueLt, border:`1px solid rgba(0,102,204,0.15)`, borderRadius:T.rSm, padding:"12px 16px", fontSize:13.5, color:T.blue, lineHeight:1.65 }}>
          <strong style={{ fontWeight:600 }}>Lernziel:</strong> {lesson.objective}
        </div>
      </div>

      {/* Video */}
      {lesson.videoUrl ? (
        <div style={{ borderRadius:T.r, overflow:"hidden", marginBottom:28, background:"#000", aspectRatio:"16/9", boxShadow:T.shadowMd }}>
          {lesson.videoUrl.includes("vimeo")
            ? <iframe src={`https://player.vimeo.com/video/${lesson.videoUrl.split("/").pop()}?title=0&byline=0&portrait=0`} style={{width:"100%",height:"100%",border:"none"}} allowFullScreen/>
            : <iframe src={`https://www.youtube.com/embed/${lesson.videoUrl.includes("youtu.be")?lesson.videoUrl.split("/").pop():new URLSearchParams(lesson.videoUrl.split("?")[1]).get("v")}`} style={{width:"100%",height:"100%",border:"none"}} allowFullScreen/>
          }
        </div>
      ) : (
        <div style={{ background:T.rail, borderRadius:T.r, aspectRatio:"16/6", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginBottom:28, gap:10, border:`1px solid rgba(255,255,255,0.07)`, boxShadow:T.shadowMd }}>
          <div style={{ fontSize:24, opacity:0.3 }}>▶</div>
          <div style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.6)" }}>Video folgt: {lesson.title}</div>
          <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.3)", maxWidth:460, textAlign:"center", lineHeight:1.6, padding:"0 20px" }}>{lesson.videoHint}</div>
        </div>
      )}

      {/* Content */}
      <div style={{ background:T.surface, borderRadius:T.r, padding:"28px 32px", border:`1px solid ${T.border}`, marginBottom:20, boxShadow:T.shadow }}>
        <ContentBlocks blocks={lesson.content} />
      </div>

      {/* Interactive Checkliste */}
      <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.r, padding:"22px 24px", marginBottom:28, boxShadow:T.shadow }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <div style={{ fontWeight:500, fontSize:14, color:T.text }}>🎯 Lernziel-Checkliste</div>
          <span style={{ fontSize:12, color:T.text3 }}>
            {Object.values(checked).filter(Boolean).length}/{lesson.checkCriteria.length} abgehakt
          </span>
        </div>
        {lesson.checkCriteria.map((c, i) => {
          const isChecked = !!checked[i];
          return (
            <div key={i} onClick={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
              style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom: i < lesson.checkCriteria.length-1 ? 10 : 0, cursor:"pointer", userSelect:"none" }}>
              <div style={{
                width:18, height:18, borderRadius:5, border:`1.5px solid ${isChecked ? T.green : T.border}`,
                flexShrink:0, marginTop:2, background: isChecked ? T.green : T.surface,
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all 0.15s", fontSize:11, color:"#fff", fontWeight:700
              }}>
                {isChecked && "✓"}
              </div>
              <span style={{ fontSize:13.5, color: isChecked ? T.text : T.text2, lineHeight:1.55, transition:"color 0.15s", textDecoration: isChecked ? "none" : "none" }}>
                {c}
              </span>
            </div>
          );
        })}
      </div>

      {/* ─── STEP 1: QUIZ ─────────────────────────────────────────── */}
      <div style={{ borderRadius:T.r, border:`1px solid ${quizPassed ? T.greenBdr : T.border}`, overflow:"hidden", marginBottom:20, boxShadow:T.shadow }}>
        <div style={{ background: quizPassed ? T.green : T.rail, padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:13, opacity:0.7 }}>🧩</span>
            <span style={{ fontSize:12, fontWeight:500, color:"rgba(255,255,255,0.85)", letterSpacing:"0.04em", textTransform:"uppercase" }}>
              Schritt 1 · Wissenstest
            </span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>· {lesson.quiz.length} Fragen · Mindest-Score {QUIZ_PASS}%</span>
          </div>
          {quizPassed && <Tag variant="green">✓ Bestanden {quizScore}%</Tag>}
        </div>
        <div style={{ background:T.surface, padding:"24px 28px" }}>
          {!quizPassed ? (
            <>
              {lesson.quiz.map((q, qi) => (
                <div key={qi} style={{ marginBottom:22 }}>
                  <div style={{ fontWeight:500, fontSize:14, color:T.text, marginBottom:10, lineHeight:1.5 }}>
                    <span style={{ color:T.text3, marginRight:8 }}>{qi+1}.</span>{q.q}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                    {q.opts.map((opt, oi) => {
                      let bg=T.bg, border=T.border, color=T.text2, fw=400;
                      if (quizSubmitted) {
                        if (oi===q.a) { bg=T.greenLt; border=T.green; color=T.green; fw=500; }
                        else if (answers[qi]===oi) { bg=T.redLt; border=T.red; color=T.red; }
                      } else if (answers[qi]===oi) { bg=T.accentLt; border=T.accent; color=T.accent; fw=500; }
                      return (
                        <div key={oi} onClick={() => !quizSubmitted && setAnswers(a => ({...a,[qi]:oi}))}
                          style={{ padding:"10px 15px", borderRadius:T.rSm, border:`1.5px solid ${border}`, background:bg, cursor:quizSubmitted?"default":"pointer", fontSize:13.5, color, fontWeight:fw, transition:"all 0.12s", display:"flex", alignItems:"center", gap:10 }}
                          onMouseEnter={e => { if(!quizSubmitted && answers[qi]!==oi) e.currentTarget.style.borderColor=T.text3; }}
                          onMouseLeave={e => { if(!quizSubmitted && answers[qi]!==oi) e.currentTarget.style.borderColor=T.border; }}>
                          <span style={{ fontWeight:600, fontSize:12, width:18, color:color===T.text2?T.text3:color }}>{["A","B","C","D"][oi]}</span>
                          <span style={{ flex:1 }}>{opt}</span>
                          {quizSubmitted && oi===q.a && <span>✓</span>}
                          {quizSubmitted && answers[qi]===oi && oi!==q.a && <span>✗</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {!quizSubmitted ? (
                <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                  <Btn variant="primary" size="md"
                    disabled={Object.keys(answers).length < lesson.quiz.length}
                    onClick={handleQuizSubmit}>
                    Auswertung abrufen →
                  </Btn>
                  {Object.keys(answers).length < lesson.quiz.length && (
                    <span style={{ fontSize:12.5, color:T.text3 }}>
                      {Object.keys(answers).length}/{lesson.quiz.length} Fragen beantwortet
                    </span>
                  )}
                </div>
              ) : (
                <div style={{ background:T.redLt, border:`1px solid ${T.redBdr}`, borderRadius:T.rSm, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14, color:T.red, marginBottom:3 }}>
                      {quizScore}% — Mindest-Score {QUIZ_PASS}% nicht erreicht
                    </div>
                    <div style={{ fontSize:13, color:T.text2 }}>
                      {lesson.quiz.filter((q,i) => answers[i]===q.a).length}/{lesson.quiz.length} Fragen richtig · Lies den Inhalt nochmals durch
                    </div>
                  </div>
                  <Btn variant="ghostAccent" size="sm" onClick={handleQuizRetry}>↺ Nochmals versuchen</Btn>
                </div>
              )}
            </>
          ) : (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"4px 0", marginBottom:16 }}>
                <span style={{ fontSize:18 }}>✅</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:500, fontSize:14, color:T.green }}>Wissenstest bestanden mit {quizScore}%</div>
                  <div style={{ fontSize:12.5, color:T.text3, marginTop:2 }}>
                    {hasAssessment ? "Weiter zur Praxisüberprüfung (Schritt 2)." : "Lektion abgeschlossen."}
                  </div>
                </div>
              </div>
              {hasAssessment && (
                <Btn variant="accent" size="md" onClick={() => {
                  const el = document.getElementById("step2-assessment");
                  if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
                }}>
                  Weiter zu Schritt 2 ↓
                </Btn>
              )}
              {!hasAssessment && nextLessonTitle && (
                <Btn variant="green" size="md" onClick={onNextLesson}>
                  Weiter → {nextLessonTitle.slice(0,30)}{nextLessonTitle.length>30?"…":""}
                </Btn>
              )}
              {!hasAssessment && !nextLessonTitle && (
                <Btn variant="green" size="md" onClick={onBack}>Zur Kapitelübersicht</Btn>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── STEP 2: WISSENSÜBERPRÜFUNG (nur wenn Quiz bestanden) ─── */}
      {hasAssessment && (
        <div id="step2-assessment" style={{ borderRadius:T.r, border:`1px solid ${assessAlreadyPassed ? T.greenBdr : quizPassed ? T.border : T.border}`, overflow:"hidden", marginBottom:28, boxShadow: quizPassed ? T.shadow : "none", opacity: quizPassed ? 1 : 0.45 }}>
          <div style={{ background: assessAlreadyPassed ? T.green : quizPassed ? T.rail : "#2C2C2E", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:13, opacity:0.7 }}>🔍</span>
              <span style={{ fontSize:12, fontWeight:500, color:"rgba(255,255,255,0.85)", letterSpacing:"0.04em", textTransform:"uppercase" }}>
                Schritt 2 · Praxisüberprüfung
              </span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>· Fallstudie · Formular · KI-Bewertung</span>
            </div>
            {assessAlreadyPassed && <Tag variant="green">✓ Bestanden</Tag>}
            {!quizPassed && <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>🔒 erst nach Schritt 1</span>}
          </div>
          <div style={{ background:T.surface, padding:"24px 28px" }}>
            {quizPassed
              ? <LessonAssessment lesson={lesson} prog={prog} isAdmin={isAdmin} onComplete={onComplete} onNextLesson={onNextLesson} nextLessonTitle={nextLessonTitle} />
              : <p style={{ fontSize:13.5, color:T.text3, padding:"4px 0" }}>Schließe zuerst den Wissenstest (Schritt 1) ab.</p>
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LESSON ASSESSMENT — Fallstudie · Download · Upload · KI-Bewertung
// ═══════════════════════════════════════════════════════════════════
function LessonAssessment({ lesson, prog, isAdmin, onComplete, onNextLesson, nextLessonTitle }) {
  const lc = LESSON_CASES[lesson.id];
  const alreadyPassed = isAdmin || !!prog?.[lesson.id]?.assessmentPassed;
  const [freeText, setFreeText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedText, setUploadedText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [passed, setPassed] = useState(alreadyPassed);
  const fileRef = useRef(null);

  useEffect(() => {
    setFreeText(""); setUploadedFile(null); setUploadedText("");
    setFeedback(""); setLoading(false);
    setPassed(isAdmin || !!prog?.[lesson.id]?.assessmentPassed);
  }, [lesson.id]);

  const hasInput = freeText.trim().length > 0 || uploadedText.trim().length > 0;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file);
    setPassed(false); setFeedback("");
    if (file.type !== "application/pdf") {
      const reader = new FileReader();
      reader.onload = ev => setUploadedText(ev.target.result);
      reader.readAsText(file);
    } else {
      setUploadedText(`[PDF hochgeladen: ${file.name}]`);
    }
  };

  const handleSubmit = async () => {
    const content = uploadedText.trim() || freeText.trim();
    if (!content || loading) return;
    setLoading(true); setFeedback(""); setPassed(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`Du bist ein Elterngeld-Trainer und bewertest die Praxisantwort eines Lernenden.

Lektion: "${lesson.title}"
Szenario: ${lc.scenario}
Aufgabe: ${lc.task}

MUSTERLÖSUNG (nur für dich sichtbar):
${lc.solution}

Bewertung – streng nach diesem Schema, keine Einleitung, kein Fülltext:
ERGEBNIS: Bestanden oder Nicht bestanden (mind. 80% der Musterlösungspunkte korrekt)
PUNKTE: X von ${lesson.checkCriteria.length} Kriterien erfüllt
STÄRKEN: 1–2 konkrete Stärken der Antwort
LÜCKEN: Fehlende oder falsche Punkte mit kurzem Korrekturhinweis
PRAXIS-TIPP: 1 konkreter Hinweis für den Beratungsalltag

Deutsch. Konstruktiv und präzise. Max. 220 Wörter.`,
          messages:[{ role:"user", content:`Meine Lösung:\n\n${content}` }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "Keine Antwort erhalten.";
      setFeedback(text);
      const ok = /bestanden/i.test(text) && !/nicht bestanden/i.test(text);
      setPassed(ok);
      if (ok) onComplete(lesson.id, { assessmentPassed: true });
    } catch {
      setFeedback("Verbindungsfehler. Bitte erneut versuchen.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setFreeText(""); setUploadedFile(null); setUploadedText("");
    setFeedback(""); setPassed(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  // Already passed — compact success view
  if (passed && !feedback) return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"4px 0", marginBottom: nextLessonTitle ? 16 : 0 }}>
        <span style={{ fontSize:18 }}>✅</span>
        <div>
          <div style={{ fontWeight:500, fontSize:14, color:T.green }}>Praxisüberprüfung bestanden</div>
          <div style={{ fontSize:12.5, color:T.text3, marginTop:2 }}>Lektion vollständig abgeschlossen. Ergebnis ist gespeichert.</div>
        </div>
      </div>
      {nextLessonTitle && (
        <Btn variant="green" size="md" onClick={onNextLesson}>
          Weiter → {nextLessonTitle.slice(0,30)}{nextLessonTitle.length>30?"…":""}
        </Btn>
      )}
      {!nextLessonTitle && (
        <Btn variant="ghost" size="sm" onClick={() => setPassed(false)}>Nochmals ansehen</Btn>
      )}
    </div>
  );

  return (
    <div>
      {/* Szenario */}
      <div style={{ background:T.bg, borderRadius:T.rSm, padding:"14px 18px", marginBottom:12, border:`1px solid ${T.border}` }}>
        <div style={{ fontSize:10.5, fontWeight:600, color:T.text3, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Fallbeschreibung</div>
        <p style={{ fontSize:13.5, color:T.text, lineHeight:1.8 }}>{lc.scenario}</p>
      </div>

      {/* Aufgabe */}
      <div style={{ background:T.accentLt, border:`1px solid ${T.accentBdr}`, borderLeft:`3px solid ${T.accent}`, borderRadius:`0 ${T.rSm} ${T.rSm} 0`, padding:"12px 16px", marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:600, color:T.accent, marginBottom:6, letterSpacing:"0.03em" }}>DEINE AUFGABE</div>
        <p style={{ fontSize:13.5, color:T.text, lineHeight:1.75 }}>{lc.task}</p>
      </div>

      {/* Download */}
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:T.surface, borderRadius:T.rSm, border:`1px solid ${T.border}`, marginBottom:18 }}>
        <span style={{ fontSize:20, flexShrink:0 }}>📄</span>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:500, color:T.text, marginBottom:1 }}>{lc.formLabel}</div>
          <div style={{ fontSize:11, color:T.text3 }}>Herunterladen → ausfüllen → hochladen oder direkt eingeben</div>
        </div>
        <Btn variant="accent" size="sm" style={{ flexShrink:0 }} onClick={() => {
          const a = document.createElement("a"); a.href = `/forms/${lc.formFile}`; a.download = lc.formFile; a.click();
        }}>⬇ Download</Btn>
      </div>

      {/* Input — only when not yet passed */}
      {!passed && (
        <div>
          {/* Upload zone */}
          <div onClick={() => fileRef.current?.click()}
            style={{ border:`2px dashed ${uploadedFile ? T.green : T.border}`, borderRadius:T.rSm, padding:"14px 18px", cursor:"pointer", marginBottom:12, background:uploadedFile ? T.greenLt : "transparent", transition:"border-color 0.15s, background 0.15s", display:"flex", alignItems:"center", gap:12 }}
            onMouseEnter={e => e.currentTarget.style.borderColor = uploadedFile ? T.green : T.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = uploadedFile ? T.green : T.border}>
            <input ref={fileRef} type="file" accept=".pdf,.txt,.doc,.docx" style={{ display:"none" }} onChange={handleFile} />
            <span style={{ fontSize:18, flexShrink:0, opacity:uploadedFile?1:0.4 }}>📎</span>
            {uploadedFile ? (
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:500, color:T.green }}>{uploadedFile.name}</div>
                <div style={{ fontSize:11, color:T.text3, marginTop:2 }}>Klicken zum Ersetzen</div>
              </div>
            ) : (
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, color:T.text2 }}>Ausgefülltes Formular hochladen</div>
                <div style={{ fontSize:11, color:T.text3, marginTop:2 }}>PDF, TXT, DOC, DOCX</div>
              </div>
            )}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <div style={{ flex:1, height:1, background:T.border }} />
            <span style={{ fontSize:11, color:T.text3, whiteSpace:"nowrap" }}>oder direkt eingeben</span>
            <div style={{ flex:1, height:1, background:T.border }} />
          </div>

          <textarea value={freeText}
            onChange={e => { setFreeText(e.target.value); if (feedback) { setFeedback(""); } }}
            placeholder={`Deine Lösung zum Fall…\n\nGehe auf alle Aufgabenpunkte ein.`}
            style={{ width:"100%", minHeight:140, padding:"14px 16px", border:`1.5px solid ${T.border}`, borderRadius:T.rSm, fontSize:13.5, fontFamily:"'DM Sans',sans-serif", lineHeight:1.8, resize:"vertical", color:T.text, background:T.bg, marginBottom:14, transition:"border-color 0.15s" }}
            onFocus={e => e.target.style.borderColor = T.accent}
            onBlur={e => e.target.style.borderColor = T.border}
          />

          <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            <Btn variant="accent" size="md" disabled={loading || !hasInput} onClick={handleSubmit}>
              {loading ? "KI bewertet…" : "Zur Bewertung einreichen →"}
            </Btn>
            {(uploadedFile || freeText) && !loading && (
              <Btn variant="ghost" size="sm" onClick={handleReset}>Zurücksetzen</Btn>
            )}
            {loading && <span style={{ fontSize:12, color:T.text3, fontStyle:"italic", animation:"pulse 1.5s ease infinite" }}>Wird mit Musterlösung verglichen…</span>}
          </div>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div style={{ marginTop:16, borderRadius:T.rSm, border:`1px solid ${passed ? T.greenBdr : T.redBdr}`, background:passed ? T.greenLt : T.redLt, overflow:"hidden" }}>
          <div style={{ padding:"12px 18px", borderBottom:`1px solid ${passed ? T.greenBdr : T.redBdr}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:16 }}>{passed ? "✅" : "📝"}</span>
              <span style={{ fontWeight:600, fontSize:14, color:passed ? T.green : T.red }}>
                {passed ? "Bestanden – Lektion vollständig abgeschlossen!" : "Noch nicht bestanden"}
              </span>
            </div>
            {passed && nextLessonTitle && (
              <Btn variant="green" size="sm" onClick={onNextLesson}>
                Weiter → {nextLessonTitle.slice(0,28)}{nextLessonTitle.length>28?"…":""}
              </Btn>
            )}
          </div>
          <div style={{ padding:"16px 18px", fontSize:13.5, color:T.text, lineHeight:1.85, whiteSpace:"pre-wrap" }}>{feedback}</div>
          {!passed && (
            <div style={{ padding:"12px 18px", borderTop:`1px solid ${T.redBdr}` }}>
              <Btn variant="ghostAccent" size="sm" onClick={handleReset}>↺ Nochmals versuchen</Btn>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// CERTIFIED CHAT — KI-Assistent nach Zertifikat
// ═══════════════════════════════════════════════════════════════════
function CertifiedChat({ user, knowledgeBase }) {
  const [messages, setMessages] = useState([
    { role:"assistant", content:`Hallo ${user.name.split(" ")[0]}! 👋\n\nIch bin dein persönlicher Elterngeld-KI-Assistent – freigeschaltet nach deinem erfolgreichen Zertifikatsabschluss. Ich bin auf alle Inhalte deines Kurses trainiert: Anspruch, Varianten, Einkommensberechnung, Anlagen, Bescheidprüfung und Beratungsprozesse.\n\nStell mir deine Fragen aus dem Beratungsalltag – ich helfe dir weiter.` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const systemPrompt = `Du bist ein hochspezialisierter KI-Assistent für Elterngeld-Beratung. Du wurdest von einer Beratungsstelle eingesetzt und stehst zertifizierten Mitarbeitenden zur Verfügung.

DEIN WISSEN basiert auf folgenden Kursinhalten:
- Kapitel 1: Grundlagen, Varianten (Basis, EP+, Partnerschaftsbonus), Einkommensgrenzen 2025 (175.000 € zvE), simultaner Bezug max. 1 Monat ab 1.4.2024
- Kapitel 2: Antragsausfüllung – Abschnitt 1 (persönliche Daten, Steuer-ID, Steuerklasse) und Abschnitt 2 (Kindesdaten, Mehrlinge)
- Kapitel 3: Bezugszeitraum, 14-Monats-Logik, EP+-Kalkulation, Partnerschaftsbonus (24–32h), Monatsplanung
- Kapitel 4: Bemessungszeitraum, Ausklammerung (Elternzeit, Krankheit), Selbstständige (21%-Pauschale), Sonderzahlungen, Geschwisterbonus
- Kapitel 5: Beilagen-Checkliste, Bescheidprüfung, Widerspruch (1-Monat-Frist)
- Kapitel 6: Beratungsprozess (7 Schritte), Datenschutz, Eskalationsmatrix, Vier-Augen-Prinzip
- Kapitel 7: Alle Anlagen (EG+, N, G, GuN, EA, 12.a, 2.g, 2.c), PV-Falle, Frühgeburt-Staffel, Grenzgänger
${knowledgeBase.length > 0 ? `\nZUSÄTZLICHES WISSEN (Admin-Updates):\n${knowledgeBase.map(k=>`- ${k.title}: ${k.content}`).join("\n")}` : ""}

VERHALTENSREGELN:
- Antworte immer auf Deutsch, klar und praxisnah
- Nenne konkrete Paragraphen oder Regelungen wenn relevant (BEEG, §§)
- Bei Unsicherheit: sage es offen und empfehle Eskalation
- Grenzgänger, komplexe Auslandssachverhalte: immer zur Eskalation raten
- Keine Rechtsberatung, aber fundierte Fachinformation
- Halte Antworten kompakt: max. 300 Wörter außer bei komplexen Fällen`;

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role:"user", content:input.trim() };
    setMessages(m=>[...m, userMsg]); setInput(""); setLoading(true);
    try {
      const history = [...messages, userMsg].map(m=>({ role:m.role, content:m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1500, system:systemPrompt, messages:history }) });
      const data = await res.json();
      setMessages(m=>[...m, { role:"assistant", content:data.content?.[0]?.text||"Keine Antwort erhalten." }]);
    } catch { setMessages(m=>[...m, { role:"assistant", content:"Verbindungsfehler. Bitte erneut versuchen." }]); }
    setLoading(false);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", fontFamily:"'DM Sans',sans-serif" }}>
      {/* Header */}
      <div style={{ padding:"20px 44px", borderBottom:`1px solid ${T.border}`, background:T.surface, display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
        <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg, #5C3B8C, #7B52B5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>✦</div>
        <div>
          <div style={{ fontFamily:"'Cormorant',serif", fontSize:20, fontWeight:500, color:T.text }}>Elterngeld-KI Assistent</div>
          <div style={{ fontSize:12, color:T.text3 }}>Freigeschaltet nach Zertifikatsabschluss · Trainiert auf Kursinhalten</div>
        </div>
        <div style={{ marginLeft:"auto" }}><Tag variant="purple">✦ Zertifiziert</Tag></div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"28px 44px", display:"flex", flexDirection:"column", gap:16 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display:"flex", gap:12, justifyContent: msg.role==="user"?"flex-end":"flex-start" }}>
            {msg.role==="assistant" && <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg, #5C3B8C, #7B52B5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0, marginTop:2 }}>✦</div>}
            <div style={{ maxWidth:680, padding:"14px 18px", borderRadius: msg.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px", background: msg.role==="user"?T.rail:T.surface, color: msg.role==="user"?"#fff":T.text, fontSize:14, lineHeight:1.75, whiteSpace:"pre-wrap", border: msg.role==="user"?"none":`1px solid ${T.border}`, boxShadow: msg.role==="assistant"?T.shadow:"none" }}>
              {msg.content}
            </div>
            {msg.role==="user" && <Avatar initials={user.avatar} size={32} bg={T.accent} />}
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", gap:12 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg, #5C3B8C, #7B52B5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>✦</div>
            <div style={{ padding:"14px 18px", borderRadius:"16px 16px 16px 4px", background:T.surface, border:`1px solid ${T.border}` }}>
              <div style={{ display:"flex", gap:5 }}>{[0,1,2].map(i=><div key={i} style={{ width:6, height:6, borderRadius:"50%", background:T.purple, animation:"pulse 1.2s ease infinite", animationDelay:`${i*0.2}s` }}/>)}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding:"16px 44px 24px", borderTop:`1px solid ${T.border}`, background:T.surface, flexShrink:0 }}>
        <div style={{ display:"flex", gap:10, maxWidth:760 }}>
          <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSend();} }} placeholder="Frage zur Elterngeld-Beratung… (Enter zum Senden, Shift+Enter für Zeilenumbruch)" style={{ flex:1, padding:"12px 16px", border:`1.5px solid ${T.border}`, borderRadius:T.rSm, fontSize:14, fontFamily:"'DM Sans',sans-serif", resize:"none", lineHeight:1.5, color:T.text, background:T.bg, minHeight:48, maxHeight:120 }} onFocus={e=>e.target.style.borderColor=T.purple} onBlur={e=>e.target.style.borderColor=T.border} />
          <Btn variant="purple" onClick={handleSend} disabled={loading||!input.trim()} style={{ alignSelf:"flex-end", height:48 }}>↑</Btn>
        </div>
        <div style={{ fontSize:11, color:T.text3, marginTop:8 }}>KI-Assistent auf Basis der Kursinhalte. Keine Rechtsberatung. Bei Unsicherheit: eskalieren.</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EXTRAS VIEW
// ═══════════════════════════════════════════════════════════════════
function ExtrasView({ onBack }) {
  const [active, setActive] = useState(EXTRAS[0].id);
  const [openIdx, setOpenIdx] = useState(null);
  const section = EXTRAS.find(e=>e.id===active);
  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ width:210, background:T.bg, borderRight:`1px solid ${T.border}`, padding:"28px 12px", flexShrink:0 }}>
        <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:6, color:T.text3, background:"none", border:"none", fontSize:13, marginBottom:22, padding:0, transition:"color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.text3}>← Zurück</button>
        <div style={{ fontSize:11, color:T.text3, fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10, paddingLeft:6 }}>Nachschlagewerk</div>
        {EXTRAS.map(e=>(
          <div key={e.id} onClick={()=>{ setActive(e.id); setOpenIdx(null); }} style={{ padding:"9px 12px", borderRadius:T.rXs, cursor:"pointer", marginBottom:2, background:active===e.id?T.surface:"transparent", boxShadow:active===e.id?T.shadow:"none", display:"flex", alignItems:"center", gap:9, transition:"all 0.15s" }} onMouseEnter={e2=>{if(active!==e.id)e2.currentTarget.style.background="rgba(0,0,0,0.04)";}} onMouseLeave={e2=>{if(active!==e.id)e2.currentTarget.style.background="transparent";}}>
            <span style={{ fontSize:14 }}>{e.icon}</span>
            <span style={{ fontSize:12.5, color:active===e.id?T.text:T.text2, fontWeight:active===e.id?500:400 }}>{e.title}</span>
          </div>
        ))}
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"40px 44px" }} className="fade-up">
        <h1 style={{ fontFamily:"'Cormorant',serif", fontSize:28, fontWeight:400, color:T.text, marginBottom:6, letterSpacing:"-0.02em" }}>{section.title}</h1>
        <p style={{ color:T.text3, fontSize:13.5, marginBottom:28, lineHeight:1.65 }}>{section.description}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {section.items.map((item,i)=>(
            <div key={i} style={{ background:T.surface, border:`1px solid ${openIdx===i?T.borderMd:T.border}`, borderRadius:T.rSm, overflow:"hidden", boxShadow:openIdx===i?T.shadow:"none", transition:"box-shadow 0.2s" }}>
              <div onClick={()=>setOpenIdx(openIdx===i?null:i)} style={{ padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
                <span style={{ fontWeight:500, fontSize:13.5, color:T.text }}>{item.title}</span>
                <span style={{ color:T.text3, fontSize:14, transition:"transform 0.2s", transform:openIdx===i?"rotate(90deg)":"none" }}>›</span>
              </div>
              {openIdx===i && <div style={{ padding:"0 18px 16px", borderTop:`1px solid ${T.border}`, fontSize:13.5, color:T.text2, lineHeight:1.8 }}>{item.content}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ADMIN PANEL — mit Wissensdatenbank
// ═══════════════════════════════════════════════════════════════════
function AdminPanel({ allProgress, allProfiles, knowledgeBase, onKbAdd, onKbUpdate, onKbDelete, onCreateUser, onResetPassword, onBack }) {
  const employees = allProfiles.filter(u => u.role === "employee");
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("team");
  const [newTitle, setNewTitle] = useState(""); const [newContent, setNewContent] = useState(""); const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState(""); const [newEmail, setNewEmail] = useState(""); const [newPw, setNewPw] = useState(""); const [newRole, setNewRole] = useState("employee");
  const [createLoading, setCreateLoading] = useState(false); const [createMsg, setCreateMsg] = useState(null);
  const [resetMsg, setResetMsg] = useState({});

  const fmt = (iso) => { if(!iso)return"–"; return new Date(iso).toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"}); };
  const avgScore = (prog) => { const s=Object.values(prog||{}).filter(v=>v.quizScore!==undefined).map(v=>v.quizScore); if(!s.length)return null; return Math.round(s.reduce((a,b)=>a+b,0)/s.length); };

  // Detailansicht eines Mitarbeiters
  if (selected) {
    const prog = allProgress[selected.id] || {};
    const avg = avgScore(prog);
    return (
      <div style={{ padding:"40px 44px", maxWidth:900, fontFamily:"'DM Sans',sans-serif" }} className="fade-up">
        <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", color:T.text3, fontSize:13, marginBottom:24, display:"flex", alignItems:"center", gap:6, padding:0, cursor:"pointer", transition:"color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.text3}>← Teamübersicht</button>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
          <Avatar initials={selected.avatar} size={50} bg={T.accent} />
          <div>
            <h1 style={{ fontFamily:"'Cormorant',serif", fontSize:26, fontWeight:400, color:T.text, marginBottom:4 }}>{selected.name}</h1>
            <div style={{ fontSize:13, color:T.text3 }}>{overallProgress(prog).done}/{overallProgress(prog).total} Lektionen · {overallProgress(prog).pct}%{avg!==null&&<span style={{ marginLeft:10 }}>· Ø Quiz: <strong style={{ color:avg>=75?T.green:T.accent }}>{avg}%</strong></span>}</div>
          </div>
        </div>
        {CHAPTERS.map(ch=>{
          const cp=chapterProgress(prog,ch);
          return (
            <div key={ch.id} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.r, overflow:"hidden", marginBottom:14, boxShadow:T.shadow }}>
              <div style={{ padding:"13px 18px", background:cp.pct===100?T.greenLt:T.bg, display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                  <span>{ch.icon}</span>
                  <span style={{ fontWeight:500, fontSize:13.5, color:T.text }}>Kap. {ch.number} · {ch.title}</span>
                  {cp.pct===100&&<Tag variant="green">✓ Abgeschlossen</Tag>}
                </div>
                <span style={{ fontSize:12, color:T.text3 }}>{cp.done}/{cp.total}</span>
              </div>
              {ch.lessons.map(l=>{ const lp=prog[l.id]; const ld=!!lp?.completed; return (
                <div key={l.id} style={{ padding:"10px 18px", display:"flex", alignItems:"center", gap:12, borderBottom:`1px solid ${T.bg}` }}>
                  <div style={{ width:20, height:20, borderRadius:5, background:ld?T.greenLt:"rgba(0,0,0,0.04)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:ld?T.green:T.text3, flexShrink:0, border:`1px solid ${ld?T.greenBdr:T.border}` }}>{ld?"✓":"–"}</div>
                  <span style={{ flex:1, fontSize:13, color:ld?T.text:T.text3 }}>{l.title}</span>
                  {lp?.quizScore!==undefined&&<span style={{ fontSize:12, fontWeight:500, color:lp.quizScore>=75?T.green:T.red, background:lp.quizScore>=75?T.greenLt:T.redLt, borderRadius:5, padding:"2px 8px" }}>{lp.quizScore}%</span>}
                  <span style={{ fontSize:11, color:T.text3, whiteSpace:"nowrap", minWidth:120, textAlign:"right" }}>{fmt(lp?.completedAt)}</span>
                </div>
              );})}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ padding:"40px 44px", maxWidth:960, fontFamily:"'DM Sans',sans-serif" }} className="fade-up">
      <button onClick={onBack} style={{ background:"none", border:"none", color:T.text3, fontSize:13, marginBottom:24, padding:0, cursor:"pointer", transition:"color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.text3}>← Zurück</button>
      <h1 style={{ fontFamily:"'Cormorant',serif", fontSize:28, fontWeight:400, color:T.text, marginBottom:20, letterSpacing:"-0.02em" }}>Admin-Panel</h1>

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, marginBottom:28, background:"rgba(0,0,0,0.05)", borderRadius:T.rSm, padding:4, width:"fit-content" }}>
        {[["team","👥 Fortschritt"],["users","👤 Mitarbeiter"],["knowledge","🧠 Wissensdatenbank"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{ padding:"8px 18px", borderRadius:7, border:"none", fontSize:13, fontWeight:500, background:tab===id?T.surface:"transparent", color:tab===id?T.text:T.text2, boxShadow:tab===id?T.shadow:"none", transition:"all 0.15s", cursor:"pointer" }}>{label}</button>
        ))}
      </div>

      {/* TAB: Team-Fortschritt */}
      {tab==="team" && (
        <>
          <p style={{ fontSize:13.5, color:T.text3, marginBottom:20 }}>{employees.length} Mitarbeiter · Klick für Detailansicht</p>
          {employees.length === 0 && <p style={{ fontSize:13.5, color:T.text3 }}>Noch keine Mitarbeiter angelegt. Wechsle zum Tab „Mitarbeiter".</p>}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:14 }}>
            {employees.map(emp=>{
              const prog=allProgress[emp.id]||{};
              const overall=overallProgress(prog); const avg=avgScore(prog);
              return (
                <div key={emp.id} onClick={()=>setSelected(emp)} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.r, padding:"22px", cursor:"pointer", boxShadow:T.shadow, transition:"box-shadow 0.2s, transform 0.18s" }} onMouseEnter={e=>{e.currentTarget.style.boxShadow=T.shadowMd;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.boxShadow=T.shadow;e.currentTarget.style.transform="translateY(0)";}}>
                  <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:14 }}>
                    <Avatar initials={emp.avatar} size={40} bg={T.accent} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:500, fontSize:14, color:T.text, marginBottom:2 }}>{emp.name}</div>
                      <div style={{ fontSize:12, color:T.text3 }}>{overall.done}/{overall.total} · {overall.pct}%</div>
                    </div>
                    {overall.pct===100&&<Tag variant="green">✓</Tag>}
                  </div>
                  <ProgressBar pct={overall.pct} height={3} />
                  <div style={{ marginTop:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      {CHAPTERS.map(ch=>{ const cp=chapterProgress(prog,ch); return <div key={ch.id} style={{ display:"flex", alignItems:"center", gap:6 }}><span style={{ fontSize:10, width:14 }}>{ch.icon}</span><div style={{ width:88 }}><ProgressBar pct={cp.pct} height={2.5} /></div><span style={{ fontSize:10, color:T.text3 }}>{cp.pct}%</span></div>;})}
                    </div>
                    {avg!==null?<div style={{ textAlign:"center" }}><div style={{ fontFamily:"'Cormorant',serif", fontSize:24, fontWeight:500, color:avg>=75?T.green:T.accent, lineHeight:1 }}>{avg}%</div><div style={{ fontSize:10, color:T.text3, marginTop:2 }}>Ø Quiz</div></div>:null}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* TAB: Mitarbeiter verwalten */}
      {tab==="users" && (
        <div style={{ maxWidth:720 }}>
          {/* Nutzerliste */}
          {allProfiles.length > 0 && (
            <div style={{ marginBottom:32 }}>
              <div style={{ fontSize:12, fontWeight:500, color:T.text3, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:14 }}>Alle Nutzer ({allProfiles.length})</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {allProfiles.map(p => (
                  <div key={p.id} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.r, padding:"16px 20px", display:"flex", alignItems:"center", gap:14, boxShadow:T.shadow }}>
                    <Avatar initials={p.avatar} size={38} bg={p.role==="admin"?T.rail:T.accent} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:500, fontSize:14, color:T.text }}>{p.name}</div>
                      <div style={{ fontSize:12, color:T.text3, marginTop:2 }}>{p.email || "—"} · <Tag variant={p.role==="admin"?"default":"accent"}>{p.role==="admin"?"Admin":"Mitarbeiter"}</Tag></div>
                    </div>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      {resetMsg[p.id] && <span style={{ fontSize:12, color:T.green }}>{resetMsg[p.id]}</span>}
                      <button onClick={async()=>{
                        const r = await onResetPassword(p.id);
                        setResetMsg(prev => ({ ...prev, [p.id]: r.error ? "Fehler" : "Link gesendet ✓" }));
                        setTimeout(() => setResetMsg(prev => ({ ...prev, [p.id]: null })), 4000);
                      }} style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:T.rXs, padding:"5px 12px", fontSize:12, color:T.text2, cursor:"pointer" }}>
                        Reset-Link senden
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Neuen Mitarbeiter anlegen */}
          <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.r, padding:"24px 28px", boxShadow:T.shadow }}>
            <div style={{ fontWeight:500, fontSize:14, color:T.text, marginBottom:4 }}>Neuen Mitarbeiter anlegen</div>
            <p style={{ fontSize:12.5, color:T.text3, marginBottom:20, lineHeight:1.65 }}>
              Der Mitarbeiter erhält eine E-Mail-Einladung und kann sich direkt einloggen.
            </p>
            {[["Vollständiger Name","text",newName,setNewName,"Maria Müller"],["E-Mail-Adresse","email",newEmail,setNewEmail,"m.mueller@beratung.de"],["Temporäres Passwort","password",newPw,setNewPw,"Sicher2025!"]].map(([label,type,val,setter,ph])=>(
              <div key={label} style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:500, color:T.text2, marginBottom:6 }}>{label}</label>
                <input type={type} value={val} onChange={e=>setter(e.target.value)} placeholder={ph} style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${T.border}`, borderRadius:T.rSm, fontSize:14, color:T.text, background:T.bg, fontFamily:"inherit" }} onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border} />
              </div>
            ))}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:500, color:T.text2, marginBottom:8 }}>Rolle</label>
              <div style={{ display:"flex", gap:10 }}>
                {[["employee","Mitarbeiter"],["admin","Admin"]].map(([val,label])=>(
                  <div key={val} onClick={()=>setNewRole(val)} style={{ flex:1, padding:"10px 14px", border:`1.5px solid ${newRole===val?T.accent:T.border}`, borderRadius:T.rSm, cursor:"pointer", background:newRole===val?T.accentLt:"transparent", textAlign:"center", fontSize:13.5, color:newRole===val?T.accent:T.text2, fontWeight:newRole===val?500:400, transition:"all 0.15s" }}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
            {createMsg && (
              <div style={{ background:createMsg.error?T.redLt:T.greenLt, border:`1px solid ${createMsg.error?T.redBdr:T.greenBdr}`, borderRadius:T.rXs, padding:"10px 14px", fontSize:13, color:createMsg.error?T.red:T.green, marginBottom:16 }}>
                {createMsg.error || createMsg.success}
              </div>
            )}
            <Btn variant="primary" disabled={createLoading||!newName.trim()||!newEmail.trim()||!newPw.trim()} onClick={async()=>{
              setCreateLoading(true); setCreateMsg(null);
              const r = await onCreateUser(newName.trim(), newEmail.trim(), newPw, newRole);
              setCreateLoading(false);
              if (r.error) { setCreateMsg({ error: r.error }); }
              else { setCreateMsg({ success: `✓ ${newName} wurde erfolgreich angelegt.` }); setNewName(""); setNewEmail(""); setNewPw(""); setNewRole("employee"); }
            }}>
              {createLoading ? "Wird angelegt…" : "Mitarbeiter anlegen"}
            </Btn>
          </div>
        </div>
      )}

      {/* TAB: Wissensdatenbank */}
      {tab==="knowledge" && (
        <div style={{ maxWidth:720 }}>
          <p style={{ fontSize:13.5, color:T.text2, lineHeight:1.7, marginBottom:24 }}>
            Wissen das direkt in die Elterngeld-KI einfließt. Neue Rechtsänderungen, Bundesland-spezifische Regelungen oder interne Hinweise.
          </p>
          {knowledgeBase.length > 0 && (
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:12, fontWeight:500, color:T.text3, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:14 }}>Aktuelle Einträge ({knowledgeBase.length})</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {knowledgeBase.map((entry)=>(
                  <div key={entry.id} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.r, padding:"18px 22px", boxShadow:T.shadow }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <div style={{ fontWeight:500, fontSize:14, color:T.text }}>{entry.title}</div>
                      <div style={{ display:"flex", gap:8, flexShrink:0, marginLeft:12 }}>
                        <button onClick={()=>{ setNewTitle(entry.title); setNewContent(entry.content); setEditId(entry.id); }} style={{ background:"none", border:"none", fontSize:12, color:T.text3, cursor:"pointer", padding:"2px 6px" }}>Bearbeiten</button>
                        <button onClick={()=>onKbDelete(entry.id)} style={{ background:"none", border:"none", fontSize:12, color:T.red, cursor:"pointer", padding:"2px 6px" }}>Löschen</button>
                      </div>
                    </div>
                    <p style={{ fontSize:13, color:T.text2, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{entry.content}</p>
                    {entry.createdAt && <div style={{ fontSize:11, color:T.text3, marginTop:8 }}>Erstellt: {fmt(entry.createdAt)}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:T.r, padding:"24px 28px", boxShadow:T.shadow }}>
            <div style={{ fontWeight:500, fontSize:14, color:T.text, marginBottom:16 }}>{editId?"Eintrag bearbeiten":"Neues Wissen hinzufügen"}</div>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:500, color:T.text2, marginBottom:6 }}>Titel / Thema</label>
              <input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="z.B. Neue Regelung Bayern 2025…" style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${T.border}`, borderRadius:T.rSm, fontSize:14, color:T.text, background:T.bg, fontFamily:"inherit" }} onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border} />
            </div>
            <div style={{ marginBottom:18 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:500, color:T.text2, marginBottom:6 }}>Inhalt</label>
              <textarea value={newContent} onChange={e=>setNewContent(e.target.value)} placeholder="Beschreibe die Regelung oder Information…" style={{ width:"100%", minHeight:120, padding:"12px 14px", border:`1.5px solid ${T.border}`, borderRadius:T.rSm, fontSize:13.5, fontFamily:"'DM Sans',sans-serif", lineHeight:1.75, resize:"vertical", color:T.text, background:T.bg }} onFocus={e=>e.target.style.borderColor=T.accent} onBlur={e=>e.target.style.borderColor=T.border} />
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn variant="primary" disabled={!newTitle.trim()||!newContent.trim()} onClick={async()=>{
                const entry = { title:newTitle.trim(), content:newContent.trim() };
                if (editId) { await onKbUpdate(editId, entry); setEditId(null); }
                else { await onKbAdd(entry); }
                setNewTitle(""); setNewContent("");
              }}>{editId?"Aktualisieren":"Eintrag speichern"}</Btn>
              {editId && <Btn variant="ghost" onClick={()=>{ setEditId(null); setNewTitle(""); setNewContent(""); }}>Abbrechen</Btn>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// CERTIFICATE
// ═══════════════════════════════════════════════════════════════════
function CertificateView({ user, onClose }) {
  const dateStr = new Date().toLocaleDateString("de-DE",{day:"2-digit",month:"long",year:"numeric"});
  const handlePrint = () => {
    const win = window.open("","_blank");
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap"><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'DM Sans',sans-serif;background:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:48px;-webkit-font-smoothing:antialiased;}.cert-frame{max-width:680px;width:100%;border:1.5px solid rgba(192,112,58,0.3);border-radius:20px;padding:56px 64px;text-align:center;position:relative;}.cert-frame::before{content:'';position:absolute;inset:8px;border:1px solid rgba(192,112,58,0.12);border-radius:14px;pointer-events:none;}.t1{font-family:'Cormorant',serif;font-size:38px;font-weight:400;color:#1D1D1F;letter-spacing:-0.02em;margin-bottom:4px;}.t2{font-size:13px;color:#6E6E73;margin-bottom:40px;}.name{font-family:'Cormorant',serif;font-size:32px;font-weight:500;color:#1D1D1F;margin-bottom:6px;}.desc{font-size:13.5px;color:#6E6E73;margin-bottom:32px;}.hr{border:none;border-top:1px solid rgba(0,0,0,0.08);margin:28px 0;}.stats{display:flex;justify-content:center;gap:52px;margin-bottom:36px;}.stat-v{font-family:'Cormorant',serif;font-size:28px;font-weight:500;color:#C0703A;}.stat-k{font-size:11px;color:#AEAEB2;letter-spacing:0.05em;text-transform:uppercase;margin-top:3px;}.date{font-size:12px;color:#AEAEB2;}@media print{body{padding:0;}}</style></head><body><div class="cert-frame"><div style="font-size:40px;margin-bottom:20px">🏆</div><div style="font-size:11px;color:#AEAEB2;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">Zertifikat der Weiterbildung</div><div class="t1">Elterngeld-Beratung</div><div class="t2">Professionelle Grundausbildung · Bundeseinheitlicher Antrag 2025</div><hr class="hr"><div style="font-size:12px;color:#AEAEB2;margin-bottom:8px">Hiermit wird bestätigt, dass</div><div class="name">${user.name}</div><div class="desc">das Elterngeld-Training vollständig absolviert<br>und alle Lernziele erfolgreich erreicht hat.</div><div class="stats"><div><div class="stat-v">7</div><div class="stat-k">Kapitel</div></div><div><div class="stat-v">${totalLessons}</div><div class="stat-k">Lektionen</div></div><div><div class="stat-v">69</div><div class="stat-k">Quizfragen</div></div></div><hr class="hr"><div class="date">Abgeschlossen am ${dateStr}</div></div><script>window.onload=()=>window.print();<\/script></body></html>`);
    win.document.close();
  };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }} className="fade-in">
      <div style={{ background:T.surface, borderRadius:20, padding:"48px 52px", maxWidth:560, width:"90%", textAlign:"center", boxShadow:T.shadowLg, border:`1px solid ${T.border}`, fontFamily:"'DM Sans',sans-serif" }} className="fade-up">
        <div style={{ fontSize:44, marginBottom:16 }}>🏆</div>
        <h2 style={{ fontFamily:"'Cormorant',serif", fontSize:30, fontWeight:400, color:T.text, marginBottom:4, letterSpacing:"-0.02em" }}>Zertifikat</h2>
        <p style={{ fontSize:13, color:T.text3, marginBottom:28 }}>Elterngeld-Beratungskompetenz · 7 Kapitel · {totalLessons} Lektionen</p>
        <div style={{ background:T.accentLt, border:`1.5px solid ${T.accentBdr}`, borderRadius:14, padding:"28px 32px", marginBottom:28 }}>
          <div style={{ fontSize:11, color:T.accent, fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Hiermit bestätigt</div>
          <div style={{ fontFamily:"'Cormorant',serif", fontSize:26, fontWeight:500, color:T.text, marginBottom:4 }}>{user.name}</div>
          <div style={{ fontSize:13, color:T.text2, marginBottom:20, lineHeight:1.6 }}>hat das Elterngeld-Training erfolgreich abgeschlossen</div>
          <div style={{ display:"flex", justifyContent:"center", gap:36, paddingTop:16, borderTop:`1px solid ${T.accentBdr}` }}>
            {[["7","Kapitel"],[String(totalLessons),"Lektionen"],["69","Quizfragen"]].map(([val,label])=>(
              <div key={label}><div style={{ fontFamily:"'Cormorant',serif", fontSize:26, fontWeight:500, color:T.accent, lineHeight:1 }}>{val}</div><div style={{ fontSize:11, color:T.text3, textTransform:"uppercase", letterSpacing:"0.04em", marginTop:3 }}>{label}</div></div>
            ))}
          </div>
          <div style={{ fontSize:12, color:T.text3, marginTop:16 }}>{dateStr}</div>
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
          <Btn variant="accent" onClick={handlePrint}>🖨 Drucken / PDF</Btn>
          <Btn variant="ghost" onClick={onClose}>Schließen</Btn>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// APP ROOT — Supabase Auth + Data Layer
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  injectFonts();
  const [user, setUser] = useState(null);         // profile from DB
  const [appLoading, setAppLoading] = useState(true);
  const [view, setView] = useState("dashboard");
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeLessonChapter, setActiveLessonChapter] = useState(null);
  const [showCert, setShowCert] = useState(false);
  const [allProgress, setAllProgress] = useState({});
  const [allProfiles, setAllProfiles] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);

  // ─── Auth listener ──────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadUserData(session.user.id);
      else setAppLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null); setAllProgress({}); setAllProfiles([]); setKnowledgeBase([]);
        setView("dashboard"); setAppLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // ─── Load current user data ─────────────────────────────────────
  const loadUserData = async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles').select('*').eq('id', userId).single();
      if (error) throw error;
      setUser(profile);

      // Progress
      const { data: progressRows } = await supabase
        .from('progress').select('*').eq('user_id', userId);
      const progMap = {};
      (progressRows || []).forEach(r => {
        progMap[r.lesson_id] = {
          quizScore: r.quiz_score,
          assessmentPassed: r.assessment_passed,
          completed: r.completed,
          completedAt: r.completed_at,
        };
      });
      setAllProgress(prev => ({ ...prev, [userId]: progMap }));

      // Knowledge base
      const { data: kbRows } = await supabase
        .from('knowledge_base').select('*').order('created_at', { ascending: false });
      setKnowledgeBase((kbRows || []).map(k => ({
        id: k.id, title: k.title, content: k.content, createdAt: k.created_at
      })));

      // Admin: load all users + all progress
      if (profile.role === 'admin') await loadAdminData();
    } catch (err) {
      console.error('loadUserData error:', err);
    }
    setAppLoading(false);
  };

  // ─── Load all data for admin view ───────────────────────────────
  const loadAdminData = async () => {
    const [{ data: profiles }, { data: allProg }] = await Promise.all([
      supabase.from('profiles').select('*').order('name'),
      supabase.from('progress').select('*')
    ]);
    setAllProfiles(profiles || []);
    const progressMap = {};
    (allProg || []).forEach(r => {
      if (!progressMap[r.user_id]) progressMap[r.user_id] = {};
      progressMap[r.user_id][r.lesson_id] = {
        quizScore: r.quiz_score,
        assessmentPassed: r.assessment_passed,
        completed: r.completed,
        completedAt: r.completed_at,
      };
    });
    setAllProgress(prev => ({ ...prev, ...progressMap }));
  };

  // ─── Progress setzen + in Supabase speichern ────────────────────
  const setProgress = (lessonId, data) => {
    if (!user) return;
    const userId = user.id;
    const userProg = allProgress[userId] || {};
    const existing = userProg[lessonId] || {};
    const merged = { ...existing, ...data };
    const quizOk = merged.quizScore !== undefined && merged.quizScore >= QUIZ_PASS;
    const hasAssessment = !!LESSON_CASES[lessonId];
    const assessOk = hasAssessment ? !!merged.assessmentPassed : true;
    if (quizOk && assessOk && !merged.completedAt) merged.completedAt = new Date().toISOString();
    merged.completed = quizOk && assessOk;

    // Optimistic update
    setAllProgress(prev => ({ ...prev, [userId]: { ...userProg, [lessonId]: merged } }));

    // Supabase upsert (fire and forget)
    supabase.from('progress').upsert({
      user_id: userId,
      lesson_id: lessonId,
      quiz_score: merged.quizScore ?? null,
      assessment_passed: !!merged.assessmentPassed,
      completed: merged.completed,
      completed_at: merged.completedAt || null,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,lesson_id' }).then(({ error }) => {
      if (error) console.error('Progress save error:', error);
    });
  };

  // ─── Knowledge base CRUD ────────────────────────────────────────
  const onKbAdd = async (entry) => {
    const { data, error } = await supabase.from('knowledge_base')
      .insert({ title: entry.title, content: entry.content }).select().single();
    if (!error && data) setKnowledgeBase(prev => [{ id:data.id, title:data.title, content:data.content, createdAt:data.created_at }, ...prev]);
  };

  const onKbUpdate = async (id, entry) => {
    const { error } = await supabase.from('knowledge_base')
      .update({ title: entry.title, content: entry.content, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) setKnowledgeBase(prev => prev.map(k => k.id === id ? { ...k, ...entry } : k));
  };

  const onKbDelete = async (id) => {
    const { error } = await supabase.from('knowledge_base').delete().eq('id', id);
    if (!error) setKnowledgeBase(prev => prev.filter(k => k.id !== id));
  };

  // ─── User management (Admin) ────────────────────────────────────
  const onCreateUser = async (name, email, password, role) => {
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { name, avatar: name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2), role } }
    });
    if (error) return { error: error.message };
    // Ensure profile exists (trigger usually handles this)
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id, name,
        avatar: name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2),
        role
      });
      await loadAdminData();
    }
    return { success: true };
  };

  const onResetPassword = async (userId) => {
    const profile = allProfiles.find(p => p.id === userId);
    if (!profile) return { error: 'Nutzer nicht gefunden' };
    if (!profile.email) return { error: 'Keine E-Mail-Adresse hinterlegt' };
    const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
      redirectTo: window.location.href
    });
    if (error) return { error: error.message };
    return { success: true };
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setAllProgress({}); setAllProfiles([]); setKnowledgeBase([]);
    setView("dashboard");
  };

  // ─── Navigation ─────────────────────────────────────────────────
  const getProgress = () => user ? (allProgress[user.id] || {}) : {};

  const handleNextLesson = (currentLessonId) => {
    const next = getNextLesson(currentLessonId);
    if (!next) { setView("dashboard"); return; }
    const nextChapter = CHAPTERS.find(c=>c.id===next.chapterId);
    const nextLesson = nextChapter?.lessons.find(l=>l.id===next.id);
    if (nextChapter && nextLesson) {
      setActiveChapter(nextChapter); setActiveLesson(nextLesson);
      setActiveLessonChapter(nextChapter); setView("lesson");
      window.scrollTo({top:0,behavior:"smooth"});
    }
  };

  const handleNavigate = (id) => {
    if (id==="dashboard") { setView("dashboard"); setActiveChapter(null); setActiveLesson(null); }
    else if (id==="extras") setView("extras");
    else if (id==="admin") setView("admin");
    else if (id==="certified-chat") setView("certified-chat");
    else if (id.startsWith("chapter-")) {
      const ch=CHAPTERS.find(c=>c.id===parseInt(id.replace("chapter-","")));
      if (ch && (user.role==="admin" || isChapterUnlocked(ch.id, getProgress()))) {
        setActiveChapter(ch); setActiveLesson(null); setView("chapter");
      }
    }
  };

  // ─── Loading screen ─────────────────────────────────────────────
  if (appLoading) return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:48, height:48, borderRadius:14, background:T.rail, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 16px" }}>📎</div>
        <div style={{ fontFamily:"'Cormorant',serif", fontSize:20, color:T.text, marginBottom:8 }}>Elterngeld-Training</div>
        <div style={{ fontSize:13, color:T.text3 }}>Wird geladen…</div>
      </div>
    </div>
  );

  if (!user) return <LoginScreen onLogin={(authUser) => loadUserData(authUser.id)} />;

  const prog = getProgress();
  const certUnlocked = allDone(prog);
  const nextLessonInfo = activeLesson ? getNextLesson(activeLesson.id) : null;
  const nextLessonTitle = nextLessonInfo ? CHAPTERS.flatMap(c=>c.lessons).find(l=>l.id===nextLessonInfo.id)?.title : null;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:T.bg, display:"flex", minHeight:"100vh", color:T.text }}>
      <Sidebar user={user} prog={prog} view={view} onNavigate={handleNavigate} certUnlocked={certUnlocked}
        onLogout={handleLogout} />
      <main style={{ flex:1, overflowY:"auto", minHeight:"100vh" }}>
        {view==="dashboard" && <Dashboard user={user} prog={prog} onSelectChapter={ch=>{setActiveChapter(ch);setView("chapter");}} onExtras={()=>setView("extras")} onCertificate={()=>setShowCert(true)} onCertifiedChat={()=>setView("certified-chat")} />}

        {view==="chapter" && activeChapter && <ChapterView chapter={activeChapter} prog={prog} isAdmin={user.role==="admin"}
          onSelectLesson={(l,ch)=>{ setActiveLesson(l); setActiveLessonChapter(ch); setView("lesson"); }}
          onBack={()=>setView("dashboard")} />}

        {view==="lesson" && activeLesson && activeLessonChapter && (
          <LessonView
            lesson={activeLesson} chapter={activeLessonChapter} prog={prog} isAdmin={user.role==="admin"}
            onComplete={(lid,data)=>setProgress(lid,data)} onBack={()=>setView("chapter")}
            onNextLesson={()=>handleNextLesson(activeLesson.id)} nextLessonTitle={nextLessonTitle} />
        )}

        {view==="extras" && <ExtrasView onBack={()=>setView("dashboard")} />}
        {view==="certified-chat" && certUnlocked && <CertifiedChat user={user} knowledgeBase={knowledgeBase} />}
        {view==="admin" && user.role==="admin" && (
          <AdminPanel
            allProgress={allProgress} allProfiles={allProfiles}
            knowledgeBase={knowledgeBase}
            onKbAdd={onKbAdd} onKbUpdate={onKbUpdate} onKbDelete={onKbDelete}
            onCreateUser={onCreateUser} onResetPassword={onResetPassword}
            onBack={()=>setView("dashboard")} />
        )}
      </main>
      {showCert && <CertificateView user={user} onClose={()=>setShowCert(false)} />}
    </div>
  );
}

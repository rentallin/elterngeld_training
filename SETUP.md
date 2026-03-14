# Elterngeld-Training — Supabase Setup

## Einmalige Einrichtung (ca. 10 Minuten)

### Schritt 1 — Schema einrichten

1. Supabase Dashboard öffnen → **SQL Editor** → **New query**
2. Inhalt der Datei `schema.sql` vollständig kopieren und einfügen
3. **Run** klicken → alle Tabellen, Policies und Trigger werden angelegt

---

### Schritt 2 — Ersten Admin anlegen

1. Supabase Dashboard → **Authentication** → **Users** → **Add user**
2. E-Mail und Passwort eingeben → **Create User**
3. Die UUID des neuen Nutzers kopieren (erscheint in der Tabelle)
4. Im SQL Editor ausführen:

```sql
UPDATE public.profiles
SET name = 'DEIN NAME', avatar = 'AD', role = 'admin'
WHERE id = 'HIER-UUID-EINFÜGEN';
```

---

### Schritt 3 — E-Mail-Bestätigung deaktivieren (empfohlen für interne Tools)

Damit Mitarbeiter sich direkt einloggen können ohne E-Mail-Bestätigung:

1. Supabase Dashboard → **Authentication** → **Settings** → **Auth providers**
2. Unter **Email** → **Confirm email** → deaktivieren
3. Speichern

---

### Schritt 4 — Mitarbeiter anlegen

**Option A (empfohlen): Über die App**
- Als Admin einloggen → Admin-Panel → Tab „Mitarbeiter" → Formular ausfüllen

**Option B: Direkt in Supabase**
- Authentication → Users → Add user → E-Mail + Passwort
- SQL ausführen: `UPDATE profiles SET name='...', avatar='XX', role='employee' WHERE id='...'`

---

### Schritt 5 — Deployen

```bash
# ZIP entpacken, dann:
npm install
npm run build
# Build-Ordner dist/ deployen (GitHub Pages, Hetzner, etc.)
```

---

## Supabase-Projekt-Daten

- **URL:** https://foqffsqwewgieacynslr.supabase.co
- **Anon Key:** sb_publishable_vFn4cIe3MrEIsRqAFqSkjg_2RIdZFJb

---

## Datenbankstruktur

| Tabelle | Beschreibung |
|---------|-------------|
| `profiles` | Nutzerprofile (Name, Avatar, Rolle) |
| `progress` | Lernfortschritt je Nutzer und Lektion |
| `knowledge_base` | KI-Wissenseinträge (nur Admin) |

---

## Häufige Fragen

**Mitarbeiter kann sich nicht einloggen?**
→ E-Mail-Bestätigung deaktivieren (Schritt 3) oder Bestätigungs-E-Mail prüfen

**Admin sieht keine Mitarbeiter im Dashboard?**
→ Prüfen ob die RLS-Policy korrekt gesetzt ist (schema.sql nochmals ausführen)

**Fortschritt wird nicht gespeichert?**
→ Browser-Konsole öffnen (F12) und auf Fehlermeldungen prüfen

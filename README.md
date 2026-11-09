# WorKnow website

Website of **WorKnow – Working Knowledge: The Emergence of Practitioners in Late Medieval and Early Modern Europe**, a FIS Starting Grant project (FIS 2023-01508) at the Sant’Anna School of Advanced Studies, Pisa.

- **Built with [Jekyll](https://jekyllrb.com)**, the site generator built into GitHub Pages. Content lives in plain text files (YAML and Markdown). There is no database, no framework and nothing to install.
- **Published free on GitHub Pages.** Every change you save on GitHub rebuilds and republishes the site in about two minutes.
- **Private by design.** No cookies, no analytics, no external fonts or scripts. Visitors’ browsers contact only this site.
- **Portable.** The finished site is a folder of ordinary HTML files that any web server can host (see `MIGRATION.md`).

Other documents in this folder:
- `DESIGN.md`: the visual identity and the building blocks of each page.
- `MIGRATION.md`: how to move the site to a Sant’Anna server.

---

## 1. Get a “worknow” web address

A GitHub Pages address always starts with the name of the GitHub account that owns the repository. A repository under your personal account would appear as `alessandrobrioschi.github.io`. To show **worknow** instead, the site belongs to the free GitHub **organisation** `worknow-fis`, which you own.

1. Signed in to GitHub, open **github.com/organizations/plan** and choose **Free**.
2. **Organization name:** `worknow-fis` (already done). The web address follows this name.
3. Contact email: the project or your own address. **This organization belongs to:** *My personal account*.
4. Skip the invitation step for now. You can add Raffaele and the team as members later (**People → Invite member**), which is also how the project outlives any one person’s involvement.

The site will be at **`https://worknow-fis.github.io`**, with no `alessandrobrioschi` anywhere in it.

**Optional, recommended: your own domain.** With a domain such as `worknow.eu`, the address bar shows only `worknow.eu`, with no mention of GitHub. This address also survives a later move to a Sant’Anna server: only the domain’s settings change, not the address people use. See step 5.

## 2. Create the repository

1. In the `worknow-fis` organisation, click **New repository**.
2. **Repository name:** exactly `worknow-fis.github.io`. With this name, the site appears at the root address and not in a sub-folder.
3. **Public** (GitHub Pages is free for public repositories). Leave **Add a README** unticked.
4. Click **Create repository**.

## 3. Upload the files

The easiest route is the GitHub website:

1. On the empty repository page, click **uploading an existing file**.
2. Drag in **everything inside this folder** (not the folder itself), including the hidden `.github` folder and the `.pages.yml` file.
   - **On a Mac**, Finder hides files whose names start with a dot. Press **⌘ Cmd + Shift + .** in Finder to show them before dragging.
   - **On Windows**, tick **View → Show → Hidden items** in File Explorer.
3. Write a short message, such as “First version of the website”, and click **Commit changes**.

Check that the repository now lists `.github`, `_data`, `_includes`, `_layouts`, `_posts`, `assets` and the page files.

*Alternative:* use **GitHub Desktop** (desktop.github.com) to clone the empty repository, copy the files into it and press **Push**. GitHub Desktop handles hidden files automatically.

## 4. Turn on GitHub Pages

1. In the repository: **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**. Do not choose “Deploy from a branch”, which uses an older Jekyll.
3. Open the **Actions** tab and click **Publish website → Run workflow** (the first time only). Later changes publish automatically.
4. After about two minutes, a green tick appears and the site is live at `https://worknow-fis.github.io`.

If the run shows a red cross, click it to see which step failed. Usually the cause is a typing mistake in a `.yml` file (see “Avoiding mistakes” below).

## 5. Connect a custom domain (optional)

1. **Register the domain** with any registrar (for example Aruba, Register.it, OVH or Gandi). `.eu` and `.it` are open to people and organisations in the EU/EEA. Prices are usually about €10–20 a year.
2. **Verify the domain for your organisation first.** This stops anyone else on GitHub from using it. Go to the **worknow-fis** organisation’s **Settings → Pages → Add a domain**, then add the TXT record GitHub shows you at your registrar.
3. **Add these DNS records** at your registrar :

   | Type | Name | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | worknow-fis.github.io |

4. In the repository: **Settings → Pages → Custom domain**, type `worknow.eu` and click **Save**. When the check passes, tick **Enforce HTTPS**.
5. In `_config.yml`, change the address line to `url: "https://worknow.eu"`.

DNS changes can take a few hours to take effect.

---

## 6. Updating the content

There are two ways to edit, and you can mix them freely.

### A. Web forms with Pages CMS (easiest)

[Pages CMS](https://pagescms.org) is a free editor that presents the site’s content as forms: a list of team members, a calendar for event dates, a text editor for the project description. Saving a form saves the file on GitHub, and the site republishes itself.

1. Open **app.pagescms.org** and sign in with GitHub.
2. When asked, install the Pages CMS app on the **worknow-fis** organisation and give it access to the `worknow-fis.github.io` repository.
3. Open the repository. The left menu shows Dissemination, Team, Collaborators, Publications and Project description.

The forms are defined in `.pages.yml`. Pages CMS is an independent open-source service, not part of GitHub. If it ever disappears, method B always works.

### B. Editing files on GitHub

Open a file on github.com, click the pencil icon, make the change and click **Commit changes**.

| To change… | Edit |
|---|---|
| **Dissemination** (workshops, events, presentations) | `_data/dissemination.yml`: the timeline sorts them and marks upcoming ones by itself |
| **Team** | `_data/team.yml` (name, role, specialisation, photo, email, personal page) |
| **Collaborators / advisory board** | `_data/collaborators.yml`: the section appears once it has an entry |
| **Publications** | `_data/publications.yml` |
| **Project text** | `project.md` (Markdown) |
| **Home page text** | `index.html` |
| **Contact email, project dates, grant facts** | `_config.yml` |
| **Menu** | `_data/navigation.yml` |
| **Colours, fonts, spacing** | `assets/css/main.css` (tokens at the top) |

**Adding a team photo.** Upload a portrait (JPG; square or 4:5 works best) to `assets/img/team/`. Then set that person’s `photo:` to `/assets/img/team/file-name.jpg`. Pages CMS does both steps from the form.

### Avoiding mistakes in `.yml` files

- Keep the indentation exactly as in the examples: two spaces, never tabs.
- Each entry starts with `- ` (dash and space).
- Put text containing a colon `:` in quotes: `title: "Practitioners: a new view"`.
- An empty list is written `[]`. When you add the first entry, delete the `[]` line.
- Dates are written `2026-11-19`. Publication years are plain numbers (`2026`).

If a change breaks the build, the live site keeps showing the previous version until the mistake is fixed. Nothing is lost.

## 7. Previewing on your own computer (optional)

Only needed for design changes. Install Ruby (rubyinstaller.org on Windows; on a Mac, `brew install ruby`), then in this folder run:

```
bundle install
bundle exec jekyll serve
```

and open http://localhost:4000.

## 8. Folder map

```
_config.yml             site settings and project facts
_data/                  content lists: team, dissemination, publications, collaborators, menu
_includes/              building blocks: header, footer, member card, timeline, logo…
_layouts/               page frames: default, project page
index.html              Home
project.md              Project description (Markdown)
team.html, publications.html, dissemination.html, funding.html
assets/css, js, fonts, img
.github/workflows/      automatic publishing, and packaging for another server
.pages.yml              Pages CMS form definitions
```

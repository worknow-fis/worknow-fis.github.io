# Moving the website to another server

The WorKnow site is **static**: Jekyll turns the content into a folder of plain HTML, CSS, JavaScript, font and image files. Any ordinary web server can host that folder. The server needs no database, PHP, Ruby or special configuration.

These features of the site make the move straightforward:
- **Every internal link uses the `baseurl` setting.** The same site works at the root of a domain (`https://worknow.eu/`) or in a sub-folder (`https://www.santannapisa.it/worknow/`) after a rebuild.
- **Nothing is loaded from elsewhere.** Fonts, images and scripts are all inside the folder, so the site works behind a university firewall, and the institution’s privacy notice needs no section for it.
- **No cookies or tracking**, so no cookie banner is required.

---

## What to tell the Sant’Anna IT office

> The WorKnow project website is a static site: a folder of HTML, CSS, JS, fonts and images, about 1 MB in total. It needs a virtual host or a sub-folder on a standard web server (Apache or Nginx), with HTTPS. No database, PHP or server-side code. Please serve `404.html` as the error page. We can supply the folder as a zip, or you can build it from the public GitHub repository with Jekyll (`bundle install && bundle exec jekyll build`, output in `_site/`).

Then agree on **one of these three set-ups**.

### Option 1: Sant’Anna serves the site at the project’s own domain (best)

The address stays the same (`https://worknow.eu`), so no links, printed materials or citations break.

1. Ask IT for the server’s IP address, or the host name to point a CNAME at.
2. Build the package (see “Making the package” below) with **address** `https://worknow.eu` and **sub-folder** left empty.
3. Give IT the zip.
4. When IT confirms the site is up on their server, change the domain’s DNS records at your registrar to point to their server instead of GitHub (replace the A/AAAA records from README step 5).
5. A day later, switch GitHub Pages off: **Settings → Pages → Unpublish site**.

### Option 2: a Sant’Anna sub-domain, e.g. `worknow.santannapisa.it`

The same as Option 1, with **address** `https://worknow.santannapisa.it` and the sub-folder left empty. IT sets up the sub-domain.

### Option 3: a sub-folder of the Sant’Anna website, e.g. `https://www.santannapisa.it/worknow`

1. Build the package with **address** `https://www.santannapisa.it` and **sub-folder** `/worknow`.
2. IT uploads the contents of the zip into that folder.
3. For the error page on Apache, IT adds `ErrorDocument 404 /worknow/404.html`.

---

## Making the package

### On GitHub (no installation)

1. Open the repository on GitHub → **Actions** tab.
2. In the left list, click **Package site for another server → Run workflow**.
3. Fill in:
   - **Web address:** for example `https://worknow.eu` or `https://www.santannapisa.it`, with no slash at the end.
   - **Sub-folder:** for example `/worknow`, or leave it empty.
4. Click **Run workflow** and wait about two minutes for the green tick.
5. Open the finished run. Under **Artifacts**, download **worknow-website**. It is a zip of the complete site, ready to upload.

The download stays available for 30 days. Run the workflow again whenever you need a fresh copy.

### On your own computer

```
bundle install
bundle exec jekyll build
```

First set `url` and `baseurl` in `_config.yml` to the new address. The site is written to the `_site` folder.

---

## Keeping the content up to date after the move

The GitHub repository stays the place where content is edited, by hand or with Pages CMS. After a move there are two ways to get changes onto the Sant’Anna server:

- **By hand:** after editing, run *Package site for another server* and send IT the new zip. This suits occasional updates.
- **Automatically:** IT can let a GitHub workflow upload each new build to their server (by SFTP or rsync, using credentials stored as repository secrets). This is a short addition to `.github/workflows/deploy.yml` once IT says which method they accept.

## If the address changes

If the site moves away from `worknow-fis.github.io` without a custom domain, old links to `worknow-fis.github.io` will stop working, because GitHub Pages cannot send visitors on to another server. Using a project domain from the start (README step 5) avoids this. Otherwise, before unpublishing, replace the repository’s `index.html` with a short page saying where the site has moved.

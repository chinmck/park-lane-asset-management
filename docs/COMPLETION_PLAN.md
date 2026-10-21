# Completing the Park Lane website

Written for Chin. This is a plan only. The website itself has not been changed, nothing has been published, and no enquiry has been sent.

The site already looks like a private, carefully made brochure. It is not an empty shell. What it still needs is the practical layer a real firm has to have before it can be called finished: a confirmed legal identity, pages for privacy and terms, wording a compliance adviser has approved, and proof that an introduction request actually arrives with the right person.

Recent meeting notes and Slack do not record a decision about this website, so the open questions below are for Chin to answer.

---

## 1. What the site has today

The site is a set of ordinary web pages. There is no database, no log-in, and no private client area. A visitor can read the pages and ask for an introduction. That is the whole site.

The name on every page is written as one word: **Parklane**. The business is also referred to as Park Lane. That spelling needs one decision, noted at the end.

### Pages

Five pages exist.

| Page | Address | What a visitor sees |
| --- | --- | --- |
| Home | `index.html` | Opening statement, an interactive model of four asset types, a five-step process (Assess, Strategise, Execute, Manage, Review), a section on long-term thinking, three insight teasers, and a closing invitation. |
| Approach | `approach.html` | How the firm looks at a whole position before acting. Includes the same five steps in more detail, and six purposes an asset can have: income, growth, protection, use, legacy, realisation. |
| Capabilities | `capabilities.html` | Four services: Property, Art and Collectibles, Equities and Investments, and Business Interests. Each has a short list of what the firm says it does. |
| About | `about.html` | Principles, a line about coordinating lawyers and other advisers, and a statement that work is by introduction only. No people, no history, no address. |
| Insights | `insights.html` | A journal layout: one featured note and six titles. There are no articles behind them. |

The menu a visitor actually sees on the Home, Approach, Capabilities and About pages is: **Approach, Capabilities, About**, plus a **Private Access** button. Insights was left out of that menu on purpose, until real articles exist. The Insights page is still in the project, and anyone who knows the address `insights.html` can open it.

Every page ends with the same footer and the same invitation to request an introduction. There is no public email address and no phone number. That is a deliberate choice: contact is by introduction or referral only.

### The enquiry form

Every page has the same form, titled **Request an Introduction**. It opens as a panel over the page. The fields are:

- Full name (required)
- Company or organisation (required, even for a private individual)
- Email address (required)
- Telephone, with country code (required)
- Nature of enquiry: Investment Opportunity, Property Acquisition, Partnership / Joint Venture, Professional Introduction, Private Client Enquiry, or Other (required)
- Who made the introduction (required)
- A short description (required)

The page checks those fields before it sends them. Simple automated spam is discouraged by a hidden extra field that a real person never fills in.

**Where a submission goes**

1. The browser sends the answers to the website’s own home-page address.
2. The form is named `introduction`. The service that hosts the site, Netlify, is set up to catch a form of that name and store it. Netlify is the company that publishes these files onto the internet. It is not the Property Intelligence Dashboard.
3. The email address that should be told about a new enquiry is **not written anywhere in the website**. It can only be set inside the Netlify account, under form notifications. This review cannot see that address, and cannot confirm that mail is arriving.
4. The visitor then sees: “Your introduction request has been received and will be considered privately.”
5. Nothing in the form sends a copy to the dashboard, to a database, or to GoHighLevel.

There is one inbox in theory, because all five pages use the same form name. The form does not record which page the person was on.

A thank-you message is shown whenever the server answers that the send succeeded. That is the right result when Netlify has stored the enquiry. It can also appear if the site is being viewed somewhere that simply accepts the send and does nothing with it. A real test, on the live site, is the only way to know the enquiry reached Chin.

The form does not mention privacy, and it does not link to a privacy page.

### Search engines and sharing

Each page has its own title and a short description. The language is set to British English. The browser tab uses the firm’s mark as its icon.

There is no file telling search engines which pages to list, no map of the pages, and no preferred public address for each page. A link shared on WhatsApp, iMessage or LinkedIn will not show a prepared title, description and picture, because those sharing tags are absent. There is no custom “page not found” page.

The Insights page can still be found by a search engine that discovers the address, even though it is not in the menu.

### Accessibility

The site has been built with more care here than most brochure sites:

- A “Skip to content” link for keyboard users.
- Visible focus when someone tabs through the page.
- The mobile menu can be opened, closed, and dismissed with the Escape key.
- The enquiry panel is a proper dialog: it traps focus, and focus returns to the button that opened it.
- Form fields have labels, and errors are announced.
- The asset model is marked as decorative. The words beside it update for screen-reader users.
- People who have asked their device to reduce motion get a still page instead of the fades.
- The main photographs that carry meaning (the sculpture, the staircase) have written descriptions. Decorative pictures are correctly left blank.
- Phone form fields use a text size that avoids the page zooming in on iPhones.

Remaining gaps are small and are listed in section 2. None of them block launch on their own. The missing privacy wording does.

### Phones and tablets

The layout has three sizes: phone (up to 640 pixels wide), tablet (641 to 1024), and desktop (1025 and up).

- On a phone, the menu becomes a full-screen list. The hero uses a portrait crop. The five process steps stack. The asset model switches to a simple two-by-two set of buttons. The enquiry panel becomes a full-screen sheet. The footer stacks into one column.
- On a tablet, the same full-screen menu is used (the desktop links appear only on a wide screen). The five process steps sit in a row the visitor can swipe.
- Text and spacing shrink in steps so headings stay readable.

This review read those layout rules in full. It did not click through a live phone, because the site was not changed or republished for this plan. A short check on a real phone is listed later, after the wording is in.

### Legal pages and regulatory wording

The footer on every page lists three links: **Privacy Policy**, **Terms of Use**, and **Disclosures**. Each link jumps to the footer itself. The pages do not exist. The code says this is a placeholder until the real pages are written.

There is no cookie page and no cookie banner. The site does not set its own tracking cookies. It does load two typefaces from Google. That sends the visitor’s internet address to Google. A cookie banner is not required for that on its own. A privacy page still needs to say it happens, or the typefaces should be stored with the site so Google is no longer involved.

There is no company number, no registered office, no named legal entity, and no Financial Conduct Authority wording anywhere.

The words on the site go further than a property brochure. The home page offers “strategic advice”. The capabilities page talks about equities, allocation, exposure, liquidity and risk. In the UK, advising on or promoting investments is regulated. Whether Park Lane is allowed to say those things is a question for a compliance adviser, not something this website can decide. Section 4 puts that first.

Two other businesses already use a very similar name in public. They are described under the decisions list, because the wrong company number must not be printed on this site.

### Hosting and publishing

The site is ready for Netlify. The instruction file says: publish the whole project folder, and do not run a build. Image files inside the images folder are set to be cached for a year, which is right for pictures that do not change.

There is no custom web address written in the project, and the GitHub record for this project has no public site address filled in. This review cannot see the Netlify account, so it cannot confirm the live address, who can log in, or whether form emails are switched on.

A second Netlify settings file is stored in the project by mistake. It points at a temporary folder on a developer’s computer. The short file in the project root is the one that should be used. The stray file should be removed so it cannot confuse a future publish.

Three large picture files sit in the project root and are not used by any page:

- `hero.png`, about 4 MB
- `logo.png`, about 800 KB
- `logo-transparent.png`, about 630 KB

Because Netlify publishes the whole folder, those files are available to anyone who can guess the address. They do not slow the pages down, because the pages never ask for them. They should still come off the published site.

The pictures the pages do use are a sensible size. The widest hero is about 530 KB. Phones load a smaller version, about 155–280 KB. That is reasonable for a photographic opening.

### Analytics

There is no visitor counting of any kind: no Google Analytics, no Meta pixel, and no other tracker. The only outside service the pages call is Google Fonts.

---

## 2. What is missing or broken

These are the gaps a visitor, or a reviewer, would actually hit.

**Links that do not go anywhere**

- Privacy Policy, Terms of Use and Disclosures, on every page, jump back to the footer.
- On the home page, “View all insights” and the three story titles jump to the insights section the visitor is already on. They do not open an article, and they do not open the Insights page.
- On the Insights page, “Read the perspective” and all six titles jump to themselves. There is no article to read.
- On the Insights page only, the About link goes to the long-term-thinking section of the home page, not to the About page. The other pages link About correctly.

**Placeholders the pages already admit**

- The large photograph near the bottom of About is marked as temporary. It reuses the staircase from the home page.
- The photograph on Approach, beside “No decision exists in isolation”, is marked as a stand-in. It reuses an insights photograph.
- Every picture on the Insights page is reused from somewhere else. The page says they will be replaced, and that the titles are waiting for real articles.
- The home-page insight teasers use the same three photographs and the same “link to myself” pattern.

The illustrated asset model (property, art, equities, business) is not a placeholder. It is a finished piece of the design. Replacing it with photographs is optional.

**The form**

- Delivery of the email cannot be confirmed from the website files.
- There is no privacy sentence and no link to a privacy page next to the button.
- Company is required, so a private client with no company cannot submit honestly.
- The stored enquiry does not say which page it came from.
- The thank-you line can appear even when nothing was stored, if the site is not actually receiving forms.

**Legal and trust**

- No privacy, cookie, terms or disclosures pages.
- No company name in its legal form, no company number, no registered office.
- No statement of whether the firm is authorised by the Financial Conduct Authority, appointed by an authorised firm, or outside that regime.
- The footer copyright says 2026, which is correct this year, and it is typed in by hand. It will not roll forward on its own.

**Search, sharing and housekeeping**

- No sharing title and picture for WhatsApp and LinkedIn.
- No search-engine map, no “do not list this yet” instruction for the unfinished Insights page, and no friendly page for a bad address.
- Unused multi-megabyte originals are published with the site.
- A stray Netlify settings file points at a temporary folder.
- The small project description still says the GitHub address is `chinyeremckenzie/park-lane`. The real project is `chinmck/park-lane-asset-management`. Visitors never see this. It is worth correcting so the next person does not look in the wrong place.

**Performance**

The pages themselves are in good shape. The issues are the unused 4 MB file sitting on the published site, and the wait while Google’s typefaces load. Neither makes the site feel broken. Both are easy to tidy.

---

## 3. The dashboard and Vanguard

This website and the Property Intelligence Dashboard are separate, and this website does not leak Vanguard.

What was checked:

- Every page, style file and script in this project.
- Every web address the pages call. The only outside addresses are Google’s font service and, in a project note, the GitHub address of this website.
- The words “Vanguard”, “dashboard”, “database”, and “GoHighLevel”. None of them appear.
- The GitHub account that holds this website. The dashboard repository named in the brief (`chinmck/property-intel`) is not visible there. This plan therefore cannot re-check the dashboard’s database. It can say, with confidence, what this website does.

What this website connects to:

| Connection | What it is | Shared with Vanguard? |
| --- | --- | --- |
| Netlify hosting | Publishes these pages. | No. It is this website’s host. |
| Netlify Forms | Stores introduction requests, if it is switched on. | No. The form is named for this site only. It is not the dashboard database. |
| Google Fonts | Supplies two typefaces. | No. It is a public font service. It does not receive client or property data. |
| The dashboard | No link, no log-in, no shared data. | No connection exists from this site. |
| GoHighLevel | Not used. | Nothing is written there. |

The earlier dashboard review found one shared database, one shared log-in list and one shared backup between Park Lane and Vanguard. That problem lives in the dashboard. It does not appear in this website, and this website must not be plugged into that shared database to “finish” it.

The public site should keep its own enquiry store (Netlify, or a Park Lane inbox). It should not read or write dashboard data, and it should not name Vanguard. Visitors to a Park Lane brochure do not need to be told that another business exists.

---

## 4. Ranked plan

Sizes mean the work to put it on the site, once Chin has supplied the words or the decision. “Small” is a contained edit. “Medium” is a real piece of work across the pages. “Large” is mostly writing and sign-off, not a rebuild of the design.

Do them in this order. Items 1 to 3 are what stand between this site and a professional finish. The design does not need to be started again.

### 1. Confirm the legal identity, and what the site is allowed to say

**Size: large**, because it needs Chin and a compliance adviser. Putting the agreed sentences on the site is medium.

The site currently speaks as “Parklane Asset Management” and offers strategic advice across property, art, equities and business interests. Before any more pages are written, Chin needs to settle:

- The exact legal name, and whether the public name is “Park Lane” or “Parklane”.
- The company number and registered office, only after the checks below.
- Whether the firm gives regulated financial advice, is an appointed representative of an authorised firm, or stays outside that regime and must not describe itself as advising on investments.

A public search, which is not a formal register certificate, did not show this name on the Financial Conduct Authority register. The lines to show an adviser are “strategic advice” on the home page, and the equities section (allocation, exposure, liquidity, risk). The site needs one clear status, in ordinary language, plus the standard line that a submission is not an engagement and the pages are not a personal recommendation. The adviser should write that. It should not be invented to fill the Disclosures link.

**Name clash, to be settled before a company number is printed.**

- Companies House lists an active company called PARKLANE ASSET MANAGEMENT LTD, number 14215744, incorporated on 5 July 2022. Its registered office is 128 City Road, London EC1V 2NX. Its recorded activities are buying and selling its own property, and managing property for a fee. The director listed on the public record is Jacob Wolf Rothenberg. Do not put this number or this address on the website unless Chin confirms this is the right company. If it is the right company, the website’s talk of equities and advice is wider than those recorded activities, which is part of the compliance question above.
- A German real-estate firm, Park Lane Asset Management GmbH, already trades under a near-identical name. This website has no connection with it. The Park Lane site should be distinct enough, in name and in the legal line in the footer, that a reader cannot mix the two up.

### 2. Publish the legal pages the footer already promises

**Size: large** for the words (a solicitor, using Chin’s answers from item 1). **Medium** to add the pages and point the footer at them.

Four pages:

- **Privacy.** Who Park Lane is, what the introduction form collects, that Netlify stores it, who reads it, how long it is kept, and the person’s rights to ask for a copy or deletion. Mention Google Fonts, or stop using Google Fonts (see item 7) and then the privacy page can say the site does not send visitors to Google.
- **Cookies.** Today the honest statement is short: the site does not use advertising or analytics cookies. If analytics are added later, this page and a short notice have to be updated first.
- **Terms of use.** The pages are general information, a submission is not an instruction and not an acceptance of work, and the content is owned by the firm.
- **Disclosures.** The regulatory status from item 1. Keep Vanguard’s name off this page.

A one-line privacy note, with a link, belongs on the form itself, above the button. Chin should decide whether a tick-box is required. For a person who is asking to be contacted, a clear notice is the essential part.

### 3. Make sure an introduction request actually arrives

**Size: medium.** Needs a test on the live Netlify site, plus a small change to the form.

- In the Netlify account, confirm Forms is on for this site, and that notifications go to a Park Lane inbox Chin controls. That inbox must not be a Vanguard or dashboard mailbox.
- Send one test enquiry on the live site and confirm it arrives. Then delete the test. Do not use a real client’s details.
- Make “Company” optional, unless Chin wants every enquiry to come from an organisation.
- Record the page the person was on, so the inbox shows it.
- Keep the on-screen thank-you. Adjust it only if a failed send could still show success.
- Leave the form where it is. Do not pipe it into the dashboard, and do not add GoHighLevel.

### 4. Repair the dead links, and decide the fate of Insights

**Size: small**, plus one decision.

- Point Privacy, Terms and Disclosures at the new pages from item 2.
- On the Insights page, point About at the About page.
- Decide whether Insights stays unpublished until real articles exist. The current choice, leaving it out of the menu, is a sound one. If it stays unpublished, tell search engines not to list `insights.html` yet, and change the home-page “View all insights” control so it does not pretend to open a journal. A quiet line, or a link that simply opens the introduction form, is enough.
- When Chin has real articles, add Insights to the menu on every page, in the same place, and give each title its own page.

### 5. Put the confirmed company details in the footer

**Size: small.** Blocked until item 1 is answered.

The footer should carry the legal name, company number and registered office, once they are confirmed, and the one-line regulatory status. Keep the “by introduction only” line. A public email is not required. The copyright year can stay as 2026 for now, and be made to update itself when the footer is next edited.

### 6. Choose the public address, then finish search and sharing

**Size: small** once the domain is chosen. **Medium** if the domain and the Netlify account still have to be set up and confirmed as Park Lane’s alone.

- The live address (for example a `.co.uk` or `.com` that Chin owns). It should not be a Vanguard domain.
- A preferred address on each page, a simple page map for search engines, a proper favicon, and a title, description and image for links shared in messages.
- A short, on-brand page for addresses that do not exist.
- Confirm who can log in to Netlify and to the domain registrar, and that those log-ins are not the shared dashboard log-in list.

### 7. Tidy hosting, typefaces and the unused files

**Size: small**, except the typefaces, which are medium.

- Stop publishing `hero.png`, `logo.png` and `logo-transparent.png`. Keep them somewhere private if the originals are still wanted.
- Remove the stray Netlify settings file that points at a temporary folder.
- Add a few ordinary protections in the hosting file: always use the secure address, do not allow other sites to frame this one, and do not send the full page address to other sites as a referral.
- Store the two typefaces with the website, so pages do not call Google. That also simplifies the privacy page. The typefaces are Cormorant Garamond and Inter.

### 8. Replace the temporary photographs

**Size: medium.** Depends entirely on pictures Chin supplies or commissions.

- A dedicated photograph for the bottom of About (the note asks for a monumental architectural image).
- A dedicated photograph for the Approach section that currently reuses the stairway.
- Six editorial pictures, and real words, before Insights is treated as a live journal.
- The asset-model illustrations can stay. They are part of the finished design.

The site does not need a team page, office photography, or case studies to feel complete. Its tone is private and unnamed. Adding faces is a separate decision, and it is not required for this plan.

### 9. A short check on a phone, and a pass over accessibility

**Size: small.** Do this after the new pages and the form change, not before.

- Open Home, Approach, Capabilities, About and the form on a phone and on a tablet-width window.
- Tab through the form and the menu with a keyboard.
- Give the insight pictures a written description once they illustrate a real article. Until then, blank descriptions are acceptable because the titles carry the meaning.
- The small brass labels are readable against the dark background for normal text. They are small (about 11 pixels). Leave them unless the phone check shows they are hard to read.

### 10. Visitor numbers, only if Chin wants them

**Size: small.** Do this last, and only after the privacy and cookie pages exist.

The site works without analytics, and a private referral firm often prefers it that way. If Chin wants a simple count of visits, use a privacy-light tool, mention it on the privacy and cookie pages, and show a short notice before it runs. Do not add an advertising pixel.

---

## Decisions needed from Chin

These unblock the work above. The site can be finished without new design, once these are answered.

1. Is the legal name “Park Lane Asset Management” or “Parklane Asset Management”, and which company number is ours? Confirm or reject company 14215744 before it is printed.
2. What may the site say about advice and investments? Authorised firm, appointed representative, or not regulated and therefore careful about the equities and “strategic advice” lines? The compliance adviser should supply the sentence.
3. Who should receive introduction requests, at which email address, in a Park Lane-only inbox?
4. Should “Company” stay required?
5. Is a privacy tick-box wanted, or is a clear notice and link enough?
6. Should Insights stay hidden until real articles exist?
7. What is the public web address, and who owns the Netlify login and the domain?
8. Which photographs should replace the two marked stand-ins, and are the journal articles wanted at all?
9. Are visitor numbers wanted?

Copy and material only Chin can supply: the legal sentences, the company details, the notification email, the domain, and any new photographs or articles. Everything else is assembly of pages that already have a design.

## What should stay as it is

- The visual design, the five-step story, and the private, introduction-only tone.
- The enquiry form’s general shape. It is the right contact method for this firm.
- Separation from the dashboard and from Vanguard. This site has no shared database, no shared log-in, and no shared backup with that system. Keep it that way.
- No public email, unless Chin later decides otherwise.
- No mention of Vanguard on the public site.
- No connection to GoHighLevel unless Chin asks for one later, and then only inside an account that is Park Lane’s alone.

# Aasani Systems - Real Estate Landing Page

## Quick Reference for Making Updates

| Command | What it does | Why you need it |
|---------|--------------|-----------------|
| `cd ~/ws/aasani-systems-app` | Go to your project folder | Like opening a folder on your computer - you need to be "inside" your project first |
| `claude` | Start Claude Code | This is how you talk to me and ask for code changes |
| `bun run dev` | Start local preview | Lets you see changes on localhost before they go live - like a draft mode |
| `git status` | Check what's changed | Shows you what files were modified - like "track changes" in Word |
| `/help` | See available commands | Shows you what you can ask Claude Code to do |

---

## Your Typical Workflow

1. Open Terminal
2. `cd ~/ws/aasani-systems-app` (go to project)
3. `claude` (start Claude Code)
4. Tell Claude what you want changed
5. Claude makes changes → creates PR → merges → Vercel auto-deploys

---

## Starting New Sessions vs New Projects

### Same Project, New Chat Session
If you want to continue working on THIS project but start a fresh conversation:

1. Open Terminal
2. `cd ~/ws/aasani-systems-app`
3. `claude`

That's it. Claude Code reads your codebase and picks up where you left off. Your code is saved in git - the chat history doesn't matter.

### Brand New Project
If you want to build something completely NEW (different website, different app):

1. Create a new folder: `mkdir ~/ws/my-new-project`
2. Go into it: `cd ~/ws/my-new-project`
3. Start Claude: `claude`
4. Tell Claude what you want to build from scratch

Each folder = one project. Claude Code figures out what project you're working on based on which folder you're in.

---

## Project Structure

```
aasani-systems-app/
├── src/
│   ├── components/     # UI pieces (slides, buttons, etc.)
│   ├── pages/          # Full pages (Index, Automations)
│   ├── data/           # Content and text
│   ├── hooks/          # Reusable logic
│   ├── styles/         # CSS files
│   └── types/          # TypeScript definitions
├── public/             # Static files (videos, images)
└── index.html          # Main HTML file with SEO tags
```

---

## Deployments

- **Vercel** auto-deploys whenever code is merged to `main`
- Live site: https://aasani.ai
- Check deployment status: Look at GitHub PR or Vercel dashboard

---

## Key Files to Know

| File | What it controls |
|------|------------------|
| `src/data/indexContent.ts` | All text/content for Page 1 |
| `src/data/automationsContent.ts` | All text/content for Page 2 |
| `index.html` | SEO meta tags, page title, favicon |
| `public/` | Videos, images, logo |

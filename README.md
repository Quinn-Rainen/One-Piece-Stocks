# One Piece Stocks 

This project is built upon the idea of trading virtual money('Berries') that represents the values of One Piece characters based on Eichiro Oda's Manga series.
These artificial values are based on the general reception of a characters strength, wits, and perceived value to the story. The user will be able to track
a fluctuating stock price for an individual character and be able to react to it as each chapter officially releases. 

**URL:** https://one-piece-stocks-plum.vercel.app

---

## Tech Used
Next.js --> Framework 
Supabase --> PostgreSQL  
Tailwind CSS --> Styling 
Vercel --> Cloud Deployment 
GitHub --> Source Control 

---

## User Requirements

One Piece Stocks is designed for those who want to 
engage with the story through a stock market simulation. Users 
can browse the full character market and view each character's 
crew affiliation and current stock price in 'Berries'. For those 
who are not caught up on the latest chapters, a spoiler mode can 
be enabled to hide recent price movements tied to story events. 
Each character has a price history chart so users can track how 
a stock has performed over time. For the admin, they are able to change the 
market by adding new characters as they become relevant to the story, 
updating prices to reflect what happens in each chapter release, 
and removing characters from the market when necessary.

---

## Future Goals
- User authentication and personal accounts
- Call and put options trading with fake Berry currency
- Portfolio tracker showing each user's holdings
- Character stock comparison view
- Admin panel password protection via Supabase RLS
- Automatic price fluctuation algorithm between chapter releases

---

## Local Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env.local` with your Supabase credentials 
4. Run `npm run dev`
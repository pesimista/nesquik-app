## Nesquik

This is a project based of the web app [QUIK](www.quikpago.com). The main goal is to try to mimic it all using [Next.js](https://nextjs.org/) as the main framework for the frontend and firebase as the database provider.

this serves the purpose of being a practice environment, and portfolios project for future reference

## Running it locally

As this project relies on firebase, it requires some key properties to properly set up the firebase library. In development you can set up the `.env.local` with all these keys and the project will pick them up automatically. Feel free to use your own but it might run into errors if it doesn't find the collections or some documents (or it might not)

To get it running this should be enough:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File structure

It follows (kind of) the standard structure for any Next.js project

```
project/
│   .env.local (you have to add this one)
│   .eslintrc
│   .gitignore
│   next-env.d.ts
│   next.config.js
│   package.json
│   README.md
│
└───components/
│   │   Shell.tsx
│   │   Navbar.tsx
│   └───...
│
└───lib/
│   │   auth.ts
│   │   firebase.ts
│   │   ...
│   └───hooks
│   │   │   useBanners.ts
│   │   │   ...
│   │
│   └───services
│   │   │   someservice.ts
│   │   │   ...
│   │
│   └───types/
│       └───types folder/
│       │   ...
│
└───pages/
│   │   _app.tsx
│   │   index.tsx
│   │   ...
│
└───public/
│   │   favicon.ico
│   │   ...
│   └─── images/ (must be cleaned)
│       │   logo.svg
│       └───...
│
└───styles/ (considering moving to lib)
    │   global.css
    │   home.module.css


```

## Roadmap

- [x] Add the firebase authentication (must redirect from `/` to `/home` if logged in)
- [ ] Add the home screen
  - [x] Complete draft
  - [ ] Complete all redirects
- [ ] Add the store showcase page
- [ ] Add the product showcase page (this time as a separated component, I'm looking at you GOOku)
- [ ] Rethink ~~my career choice~~ how to show sub products
- [ ] Add the cart and it's functionality across screens
- [ ] Add the recharge/reload page
- [ ] Add the order history
- [ ] Add the transaction history

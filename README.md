# Food Hash — React Native Food Ordering UI

A mobile food-browsing and ordering prototype built with **React Native + Expo**. The repository name is generic, but the actual project is a two-screen food application with category browsing, animated UI, product details, ingredient previews, pricing and delivery information.

## What the app contains

- Home screen with food categories
- Burger, pizza and soft-drink catalog data
- Animated category selection and product reveals
- “Top of the week” item treatment
- Product cards with rating, weight and imagery
- Detail screen with price in AED, size, crust/type, delivery time and ingredients
- Native stack navigation between home and product details
- Custom fonts and icon sets
- Expo assets for Android, iOS and web

## App flow

```text
Home
 ├─ category selector
 ├─ popular items
 └─ product card
        ↓
     Details
       ├─ price
       ├─ size / crust
       ├─ delivery time
       ├─ ingredients
       └─ order CTA
```

## Implementation

The app uses a small local catalog rather than a backend. `src/database/items.js` defines the categories and products, while the UI renders that data through the home and detail screens.

### Navigation

`App.js` creates a native stack with two routes:

```text
home → details
```

Selected product data is passed through route parameters when a user opens an item.

### UI and animation

The home screen uses React Native's `Animated` API for category and content transitions. It also loads a custom font and combines several native icon packs for navigation and product UI.

## Structure

```text
MultiPage/
├── App.js
├── app.json
├── assets/
└── src/
    ├── components/
    │   ├── Home.js
    │   └── Details.js
    └── database/
        ├── items.js
        ├── images/
        └── Script.ttf
```

## Stack

- React Native 0.68
- Expo 45
- React 17
- React Navigation / Native Stack
- React Native Animated
- Vector icons
- Local JavaScript data model

## Run locally

```bash
npm install
npm start
```

Then open the project using Expo on Android, iOS or web.

## Scope

This is a **frontend/mobile UI prototype**. Product data is local and the order button does not connect to a payment or order-processing backend. Its value is in the mobile interaction design, navigation, animation, reusable catalog data and product-detail flow.

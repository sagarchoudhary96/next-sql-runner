# Next SQL Runner

### [Live Version](https://next-sql-runner.vercel.app/)

A Web App For SQL Query Runner to demonstrate where users can query easily on a table using SQL and have ui components for the functionalities that can be added.

## Requirements

- yarn

## Libraries Used

- [Next.JS](https://nextjs.org/)
- [Shadcn](https://ui.shadcn.com/)
- [Tailwindcss V4](https://tailwindcss.com/)
- [React-Ace](https://github.com/securingsincity/react-ace)
- [Recharts](https://recharts.org/en-US)

## How to run:

1. [Download](https://github.com/sagarchoudhary96/next-sql-runner/archive/refs/heads/master.zip) or [Clone](https://github.com/sagarchoudhary96/next-sql-runner.git) the Repository.
2. Run `yarn install` to install the project dependencies.

3. Run `yarn start` to run the app in development mode.

4. App can be seen at: `http://localhost:3000/`

## Page Load Time

Page Load TIme has been calculated by using the [Lighthouse Tool](https://developers.google.com/web/tools/lighthouse).

![img](https://github.com/user-attachments/assets/cbd1da33-39b6-4298-8451-65857c86f8a1)

### Steps taken to Optimize

1. Following the best practices recommended by Next.js to ensure highest performace when rendering images or using google fonts.

2. Import for `react-ace` editor was long tasks running during page load, Converted it to Lasy loaded component using `React.lazy()` for code-splitting and delaying it's loading.

3. Only importing used Module in a component from library rather than importing whole library.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

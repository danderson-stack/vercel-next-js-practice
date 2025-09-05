# Next.js App Router Course - Completed Project

This is the **completed version** of the Next.js App Router Course dashboard application. It contains all the finished code and features from the course.

## 🚀 Live Demo

Visit the live demo: [Next.js Dashboard App](https://nextjs-dashboard-vercel.vercel.app/)

## 📚 Course Information

This project is based on the [Next.js App Router Course](https://nextjs.org/learn) from the Next.js website. The course teaches you how to build a full-stack dashboard application using:

- **Next.js 15** with App Router
- **React Server Components**
- **PostgreSQL** database
- **NextAuth.js** authentication
- **Tailwind CSS** styling
- **TypeScript**

## 🛠️ Features Implemented

- ✅ **Authentication** with NextAuth.js
- ✅ **Dashboard** with revenue charts and metrics
- ✅ **Invoice management** (create, edit, delete)
- ✅ **Customer management**
- ✅ **Search and pagination**
- ✅ **Responsive design**
- ✅ **Database integration** with PostgreSQL
- ✅ **Form validation** with Zod
- ✅ **Error handling** and loading states

## 🚨 Important Note

**This is the completed project.** If you want to follow along with the course and build this from scratch, please visit:

👉 **[Next.js App Router Course Starter](https://nextjs.org/learn/dashboard-app/getting-started)**

The starter template will give you the initial codebase to follow the step-by-step tutorials.

## 🏃‍♂️ Running This Completed Project

If you want to run this completed version locally:

1. **Clone this repository**
2. **Set up environment variables** (ask a developer for the `.env` file)
3. **Install dependencies**: `pnpm install`
4. **Seed the database**: Visit `/seed` endpoint
5. **Start development server**: `pnpm run dev`
6. **Visit**: `http://localhost:3000`

## 📖 Course Curriculum

The course covers:
- Setting up your database
- Fetching data with Server Components
- Creating layouts and pages
- Implementing authentication
- Adding search and pagination
- Handling forms and mutations
- Optimizing performance
- Deploying to Vercel

## 🤝 Contributing

This is a completed educational project. For questions about the course content, please refer to the [Next.js documentation](https://nextjs.org/docs) or the [course discussion](https://github.com/vercel/next.js/discussions).

---

Built with ❤️ using Next.js

## Giphy Infinite Scroll Examples

The `/giphy` route showcases three side-by-side implementations of an infinite Giphy search:

1. **React Query** – uses `useInfiniteQuery` for declarative data fetching.
2. **Manual Fetch** – employs native `fetch` and an `IntersectionObserver` for pagination.
3. **Scroll Event** – listens to the window `scroll` event for a library-free approach.

Add your `NEXT_PUBLIC_GIPHY_API_KEY` to the environment to experiment with these examples.

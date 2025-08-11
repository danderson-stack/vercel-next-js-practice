
 * Requirements:
1. On the initial page load, it should display the current trending gifs (limit 20).
2. You should implement infinite scrolling so as the user scrolls down the page more gifs are dynamically loaded automatically.
3. User can type a search keyword in a search field at the top of the page, which then displays the searched gifs dynamically as the user searches.
4. Clearing the search field should show the trending gifs again.
5. Styling and layout are less important but it should be mobile and desktop friendly.
6. Share your screen and try to only interact with the screen you are sharing.
7. Try to explain the steps you are taking and why, why did you decide to create a specific function? Why do A instead of B? etc
8. Feel free to take shortcuts in order to complete the assignment quickly, and point out the areas you would improve on, given more time, at the end.
9. You can use any third party libraries that you would like except please refrain from using the Giphy SDKs
10. At the end of the interview, please email us a zip or link with the final code.
 

## Interview (lindy.ai)

This page (`/dashboard/interview`) requires a Giphy API key.

1. Create `.env.local` with:
   NEXT_PUBLIC_GIPHY_API_KEY=your_giphy_api_key

2. Restart the dev server.

Note: This page is specifically for a lindy.ai interview exercise.

- Updated `app/dashboard/interview/GifPanel.tsx` to use `process.env.NEXT_PUBLIC_GIPHY_API_KEY` and throw if missing.

# .env.example
NEXT_PUBLIC_GIPHY_API_KEY=__REPLACE_ME__
 


# Showing Becky's live Instagram feed

The "On Instagram" carousel (just above the footer) currently shows 10 portfolio photos, each linking to [@wellspringwrites](https://www.instagram.com/wellspringwrites/).

Instagram only shares a feed with an app the account owner approves, so a static site can't pull her latest posts on its own. [Behold](https://behold.so) does that part for free and keeps the feed up to date automatically.

## One-time setup (about 5 minutes, done by Becky or someone with her Instagram login)

1. Go to **behold.so** and sign up (the free plan covers this).
2. Click **Connect Instagram** and log in as **@wellspringwrites**.
3. Create a **feed** and choose a layout. A carousel or slider showing about 10 posts matches the site best.
4. Copy the **Feed ID**.
5. In `site/index.html`, find:

   ```html
   <section id="instagram" class="instagram" data-behold-feed="">
   ```

   and paste the ID between the quotes: `data-behold-feed="YOUR_FEED_ID"`.
6. Commit and push. The live feed then replaces the placeholder photos automatically.

To go back to the placeholder photos, empty the quotes again.

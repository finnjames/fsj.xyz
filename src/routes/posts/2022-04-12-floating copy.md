---
title: Optimization
date: 2022-04-12 00:00:00 -0400
categories: blog
---

# {title}

I am really enjoying using SvelteKit for this site. I usually use Vue for everything so it's fun to try new things sometimes.

The latest update to this site includes a number of qualitative optimizations. What does that mean? In my view, "real" optimizations are the ones that improve direct, measurable performance (i.e. and give you a better lighthouse score!). I am already getting pretty solid performance numbers for this site, but there were a number of idiosyncrasies that I wanted to iron out.

For example, there are a number of styles that create shifts of various elements during page load, such as the email widget on the main page. Now, even when the fonts haven't loaded, the email widget is already in its permanent location, so no shift. I don't know why lighthouse didn't care about this, but now it's fixed!

Another issue is that the background used to shift on page load when the javascript that controls the floating effect loads. Now the background will not shift until the user moves their mouse, which triggers a smooth animation instead.

Lastly, I mucked around with the "preload" tags to only try to preload the most essential assets (like the light/dark mode switch icon).

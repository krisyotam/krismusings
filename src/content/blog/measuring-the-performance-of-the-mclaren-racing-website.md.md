---
title: Measuring the performance of the McLaren Racing website
pubDate: 2022-03-19
description: We look at the McLaren Racing website and highlight improvements that will speed up their web performance. We will use tools like PageSpeed Insights and WebPageTest to share techniques on improving page speed.
tags:
  - css
  - webdev
  - javascript
  - performance
devto: https://dev.to/krisyotam/measuring-the-performance-of-the-mclaren-racing-website-97k
---

With [McLaren Racing](https://www.mclaren.com/racing/) recently [announced a partnership](https://twitter.com/McLarenF1/status/1504133329855164420) with Google Chrome, this is a great opportunity for McLaren to measure the performance of their website and look into how it can be improved. Today, we will look at their performance scores and talk about some possible improvements that McLaren can do to their website performance.

## How the McLaren Racing website will be measured

We will use a couple tools to measure:

- [F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/) - an online tool that aggregate the scores and compares the websites of the teams involved in Formula 1.
- [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about) is an online tool that reports on site performance and it includes both [lab data](https://developers.google.com/web/fundamentals/performance/speed-tools/#lab_data) and [real-world field data](https://developers.google.com/web/fundamentals/performance/speed-tools/#field_data).
- [WebPageTest](https://www.webpagetest.org/) can test websites from different locations around the world using different browsers and can provide in-depth analysis in a site’s performance.

An earlier post was written on the page speed performance of Formula 1 websites which explains in details how web performance scores are measured. Read “[Page Speed Performance of Formula 1 Websites](https://krisyotam.com/page-speed-performance-of-formula-1-websites/)”.

## The performance score of the McLaren Racing website

Using [F1 Page Speed Insights](https://f1-page-speed-insights.netlify.app/) we can see how McLaren Racing is doing against the other teams. Lots of room for improvement if McLaren wants podium wins this year.

![](/images/uploads/mclaren-0.png)

The detailed breakdown on McLaren Racing’s website shows that it did not pass the [Core Web Vitals](https://web.dev/vitals/) assessment. We will look at some possible improvements that can bump the score up.

![](/images/uploads/mclaren-1.png)

## The current state of the McLaren Racing website

The filmstrip generated by [WebPageTest](https://www.webpagetest.org/) is a good tool to see the rough timing of elements as they start to appear on the page. Here we can see the main background starts to load around the 6 second mark.

![](/images/uploads/mclaren-1.gif)

WebPageTest also provides a waterfall of the network requests made by the page. We can use this to understand the sequence of the requests and their timings:

![](/images/uploads/mclaren-2.png)

## Possible Improvements to the McLaren Racing website

### **Avoid blocking resources on other domains**

Row 5 of the waterfall [shows a render-blocking CSS](https://web.dev/render-blocking-resources/) that is loaded in the head of the page. The thin line at the start of the request is the connection setup because it is located on a different domain. We can prepare this connection set up earlier by using `<link rel="preload"/>` to initiate the download sooner.

![](/images/uploads/mclaren-3.png)

Learn more about how to [preload critical assets to improve loading speed](https://web.dev/preload-critical-assets/).

### Avoid loading unused CSS

A deeper look into the CSS from above and we can see that 94.7% of it is unused on the landing page - it is render-blocking and mostly unused on this page. We can cut a lot of the 500ms if we only load the CSS required on this page (we can also just remove this CSS file entirely and inline the small amount of CSS that was used).

![](/images/uploads/mclaren-4.png)

Learn more about [removing unused CSS](https://web.dev/unused-css-rules).

### Preconnect for early connection setup

The McLaren Racing website loads the assets from different domains which has a connection cost (indicated by the thin line that appears before the requests in the waterfall chart). We can `preconnect` to those domains to let the browser know we intend to make a request to those domains and so the browser will prepare the connection early and avoid having to do it later when we make the requests:

```html
<link rel="preconnect" href="https://static-cdn.mclaren.com" />
<link rel="preconnect" href="https://media-cdn.mclaren.com" />
```

Learn more about [establishing network connections early to improve perceived page speed](https://web.dev/preconnect-and-dns-prefetch/).

### Avoid blocking parsing with JavaScript

The JavaScript file on Row 6 is parser-blocking. It is located in the body in the document and the browser has decided to parse and execute this JavaScript file before it attempts to download the other assets on the page. This can be seen on this waterfall. Row 35 is the main hero background image which has a “wait” time because the browser was waiting for Row 6 to finish executing. This was also seen in the filmstrip video above. By using the `defer` or `async` attribute on the JavaScript file on Row 6, 7 and 8, we can remove the render-blocking and the rest of the images on the page can be parsed earlier. And in return, the main background image may possibly load earlier which will bring up the Core Web Vital score. A good illustration on how these attributes work can be found on [async vs defer attributes](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html).

![](/images/uploads/mclaren-5.png)

Learn more about [eliminating render-blocking resources](https://web.dev/render-blocking-resources/).

### Optimise images for the web

The biggest opportunity to improve the McLaren Racing website could be in optimising the large images that they are serving. Here is a screenshot from Google Lighthouse pointing out the possible savings if we are to optimise the images:

![](/images/uploads/mclaren-6.png)

The images on the McLaren Racing website aren’t optimised for the web and there is over 13MB worth of these large high-quality images. We can use [Squoosh](https://squoosh.app/) to reduce the file size of these images while maintaining quality.

Doing a quick Squoosh run on the top 3 sized images, there is a cost savings of:

- Samsung-Galaxy-S9-v3.png: 805.4 KB -> 88.4 KB **(-89.0%)**
- mclarenplus.jpg: 240.1 KB -> 36.3 KB **(-84.9%)**
- 2022-drive-to-survive-4.jpg: 161.1 KB -> 104.5 KB **(-35.1%)**

Using AVIF format we can even reduce the size even further. AVIF is not supported on all browsers but we can progressively support those that do:

```html
<picture>
  <source type="image/avif" srcset="img.avif" />
  <img src="img.jpg" />
</picture>
```

Learn more about [serving images in modern formats](https://web.dev/uses-webp-images/) and [efficiently encoding images](https://web.dev/uses-optimized-images/).

### Lazy load images that are below-the-fold

Below-the-fold is a term that describes the area of the website that the user cannot see unless they scroll down. Most of the images on the McLaren Racing website are below-the-fold and they are being downloaded even though they are not in view. We can avoid the requests being made by lazy loading those images using `<img loading="lazy" />` so they are only requested as the user scrolls closer to those images. This will improve performance and save bandwidth.

Learn more about [lazy-loading images](https://web.dev/lazy-loading-images/) and [browser-level image lazy-loading for the web](https://web.dev/browser-level-image-lazy-loading/).

## Summary of opportunities

Recapping the key focus areas that McLaren Racing can take advantage of to improve their web performance:

- Avoid blocking resources on other domains.
- Avoid loading unused CSS.
- Preconnect for early connection setup.
- Avoid blocking parsing with JavaScript.
- Optimise images for the web.
- Lazy load images that are below-the-fold.

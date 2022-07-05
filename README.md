# Better WPM
This project came out of a discussion with my housemates about who is, in fact, the faster typer. When I tried to demonstrate that I was, without question, the slowest, I actually ended up with a far lower score than I expected. What I found, using a few different online measurement tools, is that one-step errors had the ability to throw off all the typing that followed. My MacBook Pro is one of the lucky many laptops to suffer from the "double tap" issue with a few of the keys ("h" and "i" especially). This means that when I get two "h"s instead of one, my words-per-minute (WPM) score will tank. This didn't feel fair. To address this perceived shortcoming of other online WPM measurement tools, I built my own! It factors errors into the score with greater nuance and prevents an error from propagating between words (unless the user forgets to hit the spacebar, which unfortuantely still has too much power). 

Check out the link in this repo for the hosted application, and feel free to clone the repo to check out the code in action!

## Setup

```angular2html
yarn install
yarn start
```

This should spin up a local React dev server for testing.

## Project Structure
The primary implementation class is `App.js`, which handles all the stateful logic of the React app.
This class is supported by helper classes in `src/util`, which encapsulate the metrics and the typed words.

Styling is done with a combination of vanilla CSS and CSS-is-JS (via `react-jss`). Any global CSS rules are
located in `styles.css`, while element-specific rules are located in `styles.js`.

## Notes
This project was developed on Safari on MacOS, and I do not guarantee support on other browsers/platforms.

Similarly, this app is not designed to be used on a mobile device.

## Contributions
If you inclined to add any features and/or fix any bugs, please create a PR!

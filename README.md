# Better WPM

This project came out of a discussion with my housemates about who was, in fact, the faster typer. When I tried to demonstrate that I was, without question, the slowest, I actually ended up with a far lower score than I expected. What I found, using a few different online measurement tools, is that one-step errors had the ability to throw off all the typing that followed. My MacBook Pro is one of the lucky many laptops to suffer from the "double tap" issue with a few of the keys ("h" and "i" especially). This means that when I get two "h"s instead of one, my words-per-minute (WPM) score will tank. This didn't feel fair.

To address this perceived shortcoming of other online WPM measurement tools, I built my own! It factors errors into the score with greater nuance and prevents an error from propagating between words (unless the user forgets to hit the spacebar, which unfortuantely still has too much power).

Check out the link in this repo for the hosted application, and feel free to pull, "yarn install" and "yarn start" (or "npm install" and "npm start" if that's what strikes your fancy), to check out the code in action!

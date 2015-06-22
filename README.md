# Reddit Plus

Reddit Plus is a userscript for Reddit that adds additional features to simplify your Reddit life.

It's a work in progress, adding features as I go. Feel free to join in and add useful features, making Reddit Plus the ultimate userscript for Reddit.

You can safely use it in addition to the [Reddit Enhancement Suite (RES)](https://www.reddit.com/r/Enhancement) if you have that installed too.

![Reddit Plus Logo][reddit-plus-logo]

- Version: 1.1
- Short-Link for sharing: [j.mp/reddit-plus](https://j.mp/reddit-plus)
- Disclaimer: Reddit Plus userscript is in no way affiliated with Reddit Inc.

---

I encourage you to read about the [features](#features) first, to know what awesomeness you're about to experience!

If you feel sure about what you're doing and just can't hold it anymore, skip ahead to the [installation](#installation) right away and get started with Reddit Plus :-)

---

##Features

Here's a list of currently available features:
- [Comments toggle](#comments-toggle): Load comments with 1 click

---

###Comments toggle
If you are an active Redittor you will know what it's like, having to open a post only to read a handful of comments. *What a drag...*

With the comments toggle it's now possible to open comments in the list view with just 1 click, loading them right beneath the post. In the same way that you can easily expand the description text of a post you can now load the comments.
In this added view, you can vote, write a new comment and reply to any existing comments, just like that. If you want to stay up to date with the new comments being added, simply **reload comments** with a single click

*Next to each* **`comment(s)`** *link of each post in a list view, you can now find a little* **`[+]`** *button, give it a go!*

![Toggle to open / close comments][comments-toggle]

*Comments get loaded nicely beneath the post for quick access.*

![Loaded comments displayed below the post][comments-opened]

*Easily write a new comment by clicking the* **`add new comment`** *button.*

![Writing a new comment][comment-new]

*Directly reply to an existing comment, just like you would when viewing a single post.*

![Writing a reply to a comment][comment-reply]

-

***There is still 1 known issue with this feature at the moment:***
- When voting on a post with the comments opened, it looks as if all comments have been voted on too (vote button turned orange), but that is NOT the case, it's just a visual change, not an actual vote. This is due to the way that Reddit handles voting and I can't do anything about it just yet.

---

##Installation

Reddit Plus can be installed on a **PC with Windows**, or a **Mac with OSX**.
Simply choose the plugin that corresponds to your web browser below and download the script, as easy as that!

###With Plugin
1. Which browser?
  - **Firefox**: Install the [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) extension.
  - **Chrome**: Install the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) extension.
  - **Opera**: Install the [ViolentMonkey](https://addons.opera.com/en/extensions/details/violent-monkey/) extension.
  - **Safari** & **Internet Explorer**: *NOT SUPPORTED!*

2. Reddit Plus userscript can be found here (just choose any one)
  - [Get it on OpenUserJS.org](https://openuserjs.org/install/noplanman/Reddit_Plus.user.js)
  - [Get it on GreasyFork](https://greasyfork.org/scripts/10190-reddit-plus/code/Reddit%20Plus.user.js)
  - [Get it on GitHub](https://raw.githubusercontent.com/noplanman/Reddit-Plus/master/Reddit_Plus.user.js)

##Any ideas / Feature requests / Comments?
If you have any ideas for me or things you would like to see in this script, go ahead and create a [New Issue](https://github.com/noplanman/Reddit-Plus/issues/new) and let me know!

Any comment is highly appreciated, thanks!

##Donations

Well, if you really insist, go ahead =)

- Bitcoin: 1HEJZmLdayFoHrXdWe7LDnFjxZznUDaz9R
- [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=armando%40noplanman%2ech&item_name=Reddit%20Plus%20Donation)

##Changelog

###Version 1.1

- Add functionality to reload comments without having to reload the page.
- Don't show comments expand button on the single post page.
- Various little code alterations and text corrections.

###Version 1.0

- Initial version, adding only a button to expand the comments of a each post in a list view.


[reddit-plus-logo]: https://raw.githubusercontent.com/noplanman/Reddit-Plus/master/assets/logo/256-full.png   "Reddit Plus Logo"
[comments-toggle]:  https://raw.githubusercontent.com/noplanman/Reddit-Plus/master/assets/comments-toggle.png "Toggle to open / close comments"
[comments-opened]:  https://raw.githubusercontent.com/noplanman/Reddit-Plus/master/assets/comments-opened.png "Loaded comments displayed below the post"
[comment-new]:      https://raw.githubusercontent.com/noplanman/Reddit-Plus/master/assets/comment-new.png     "Writing a new comment"
[comment-reply]:    https://raw.githubusercontent.com/noplanman/Reddit-Plus/master/assets/comment-reply.png   "Writing a reply to a comment"
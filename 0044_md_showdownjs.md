<head>
<title>The 3D Web Coder</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="3dwc.css"/>
<script src="run_prettify.js" type="text/javascript"></script>
<!--
<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js" type="text/javascript"></script>
-->
</head>

<!---

Live Web Site Editing Rendering #Markdown via #Showdown #atx #setext #3dwebcoder #python #adskdevnetwrk #adsk #jacascript #html #github

Theo Armour uses Showdown to convert Markdown to HTML in all his JavaScript apps.
Each page generates its own HTML from the embedded MD and there is no need more for any external intermediate conversion steps.
Theo later demonstrated a method to implement an entire web site written in markdown and updated live through GitHub pages.

-->


### Live Web Site Render Markdown via Showdown

[Theo Armour](https://github.com/theo-armour) raised a very valid point in a
[comment](http://the3dwebcoder.typepad.com/blog/2015/08/hackergarten-chromium-and-markdown.html#comment-2221472800) on my last post on
[Hackergarten, Chromium and Markdown](http://the3dwebcoder.typepad.com/blog/2015/08/hackergarten-chromium-and-markdown.html):

> Welcome to the world of Markdown &ndash; as used by GitHub, StackOverflow, Reddit and in many more sites.
> BTW, I use [Showdown](https://github.com/showdownjs/showdown) to convert Markdown to HTML in all my JavaScript apps.


Happily, that fits exactly what I was thinking of looking into next.

If each page generates its own HTML from the embedded MD, there is no need more for any external intermediate conversion steps.

Looking at the Showdown documentation also led me to discover some important precursors, e.g.,
[atx](http://www.aaronsw.com/2002/atx/intro), *the true structured text format*, and
[Setext](https://en.wikipedia.org/wiki/Setext).
Interesting to know where this all comes from.

Theo later came back with another even more interesting
[update](http://the3dwebcoder.typepad.com/blog/2015/08/hackergarten-chromium-and-markdown.html#comment-2226802960),
demonstrating a method to implement an entire web site written in markdown and updated live through GitHub pages:

> Here's a demo showing how I use Showdown on GitHub to do several fun things:
> [Showdown demo for Jeremy](https://github.com/theo-armour/explayrimental/tree/gh-pages/tammik/showdown)

Adding the
[Showdown](https://github.com/showdownjs/showdown) JavaScript functionality to convert the markdown to HTML in real time and hosting the entire site on
[GitHub pages](https://pages.github.com) enables anybody to easily edit, push, and have the generated site reflect the changes live.

[Theo's demo](https://github.com/theo-armour/explayrimental/tree/gh-pages/tammik/showdown) can be driven to render either the default HTML index.html, or the other two pages defined in markdown, by passing their filenames as hash hypertext navigation arguments appended to the URL:

- Default HTML index.html <br/>&rarr; [index.html](http://theo-armour.github.io/explayrimental/tammik/showdown)
- First markdown file rendered to HTML <br/>&rarr; [index.html#another-markdown-file-1.md](http://theo-armour.github.io/explayrimental/tammik/showdown/index.html#another-markdown-file-1.md)
- Second markdown file rendered to HTML <br/>&rarr; [index.html#another-markdown-file-2.md](http://theo-armour.github.io/explayrimental/tammik/showdown/index.html#another-markdown-file-2.md)

Pretty cool!

Thank you for the very clear and minimal example, Theo!


#### <a name="2"></a>Beautiful Sad Funny Short Film on Robots

For something completely different, let a sad-looking robot melt your heart and ponder friendship, cooperation and greed in
[Jack Anderson](https://vimeo.com/jackanders)'s
nine-minute short film
[Wire Cutters](https://vimeo.com/137531269):

<center>
<iframe src="https://player.vimeo.com/video/137531269?title=0&byline=0&portrait=0" width="480" height="270" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<br/>
<p style="font-style:italic;font-size:80%">A chance encounter proves fateful for two robots mining on a desolate planet</p>
</center>

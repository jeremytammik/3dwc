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

#adskdevnetwrk
#expressjs
#RestSharp #restapi
#Autodesk #IoT #SeeControl #cloud
#python #markdown #asciidoc
#gcal #caldav #googleapi
#milanojs
#3dwebaccel #prague #webgl #3dweb #a360
#au2015 #autocad #inventor #ah8 #cubeathens #developers
#aws #jquery #handlebars
#ViewAndDataAPI
#JsFiddle #Reactjs
#autodesku #rtceur
akn_include

CompHound #Heroku Deployment, Urban Farming #MongoDB #3dwebcoder #revitapi #javascript #nodejs #adsk #bim #aec #mongolab #mongoosejs

Yesterday, I discussed the CompHound datatable implementation.
Today, let's deploy to Heroku for you to try it out right away
&ndash; Cloud9
&ndash; Easy github.io domain rerouting
&ndash; CompHound deployment to Heroku
&ndash; Heroku requires HTTPS
&ndash; Recent CompHound commits
&ndash; Try it out live
&ndash; CompHound road map
&ndash; Self-sufficient urban farming on 1/10 of an acre...

-->


### CompHound Heroku Deployment, Urban Farming

Yesterday, I discussed the
[CompHound datatable implementation](http://the3dwebcoder.typepad.com/blog/2015/09/the-comphound-mongoose-datatable.html) and
thought I would be able to deploy to Heroku for you to try it out right away.

That took a moment longer than expected due to one little hiccup.

Here are my steps towards discovering and resolving it, and a few other topics that also arose in the meantime:

- [Cloud9](#2)
- [Online slide deck and easy github.io domain rerouting](#3)
- [CompHound deployment to Heroku](#4)
- [Heroku requires HTTPS](#5)
- [Recent CompHound commits](#6)
- [Try it out live](#7)
- [CompHound road map](#8)
- [Self-sufficient urban farming on 1/10 of an acre](#9)

<center>
<img src="img/urbanhomestead.png" alt="Urban gardening"/>
</center>


#### <a name="2"></a>Cloud9

Are you aware of [Cloud9](https://c9.io)?

[Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html) created a boilerplate sample for using the
[View and Data API](https://developer.autodesk.com).

Based on that, you can have your viewer-based web application up and running within minutes.

Philippe guides us through the required steps in full detail in his
[first try at Cloud9, View & Data API boilerplate](http://adndevblog.typepad.com/cloud_and_mobile/2015/09/first-try-at-cloud9-viewdata-api-boilerplate.html).

If you are interested in more general information, the tutorial on
[Github, Cloud9, NodeJS &amp; Heroku: develop & deploy a web(socket) application](http://charless.org/?p=283) and
the Cloud9 document on
[deploying via the command line](https://docs.c9.io/docs/deploying-via-cli) might
fit the bill.

So cool.

Let alone the fact that Cloud9 sports one of the shortest URLs I know, [c9.io](https://c9.io).


#### <a name="3"></a>Online Slide Deck and Easy GitHub.io Domain Rerouting

Last week, I explored how to
[set up a Google domain and reroute it to display a github.io web page](http://the3dwebcoder.typepad.com/blog/2015/09/c-doordata-and-nodejs-doorservice-classes.html#2).

This week,
[Shiya Luo](http://www.shiyaluo.com) gave a presentation on the
[View and Data API](https://developer.autodesk.com) to
the
[Monday night Atlanta JS meetup group](http://www.meetup.com/AtlantaJavaScript/events/225042453).

She created a really nice online slide deck for that, very much to the point, accessible from
[shiyaluo.com/atl-js](http://www.shiyaluo.com/atl-js), using
[reveal.js](http://lab.hakim.se/reveal-js).

I congratulated her on the super slides, cool hosting on her own domain, and enthusiastic feedback from participants on the
[meetup site](http://www.meetup.com/AtlantaJavaScript/events/225042453).

Here is her explanation how this rerouting was achieved:

> Thanks, what I did is I routed `shiya.github.io`’s `CNAME` to my own domain `shiyaluo.com`.
Every page (a repo with a branch called `gh-pages` and an `index.html`) I create on Github automatically becomes `shiyaluo.com/reponame`.
The original repo to my slides is [github.com/shiya/atl-js](https://github.com/shiya/atl-js).

That sounds easier than Kean's and my approach fiddling around with the Google domain settings.

**Addendum by Cyrille:**<a name="3b"></a>
I you would like to know what Shiya did for the cname redirection, read the GitHub documentation
on [Setting up a custom domain with GitHub Pages](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages).

If you are interested in
using [reveal.js](https://github.com/hakimel/reveal.js) for presentations,
there is an editor [here](http://lab.hakim.se/reveal-js), or you
can [deploy on heroku](http://www.sitepoint.com/creating-slick-html-presentations-using-reveal-js).
You obviously need to make sure you have a reliable Internet connection when presenting, or configure your system for offline viewing.

**[Q]** Many conferences require you to submit PDF or PPTX slide decks beforehand.
Is it easy to transform a HTML slide deck to pptx and pdf?

**[A]** Yes and no:

- Easy if you export to images
- Hard to extract as markup definition

**Addendum by Jeremy:**
I implemented
the [PowerPoint slide deck text extractor](https://github.com/jeremytammik/Ppt2txt) command
line tool for the inverse operation, to extract markup, or at least the pure text content, from a PPTX.


#### <a name="4"></a>CompHound Deployment to Heroku

I am really getting the hang of this [Heroku](https://dashboard.heroku.com) deployment thing.

While I was writing yesterday's post, I thought it might be nice to show you what I am up to, live.

In other words, I wanted to deploy the CompHoundWeb server in the wide wild web and not just locally for only me to enjoy.

Since it already lives in its own cosy little
[CompHoundWeb GitHub repository](https://github.com/CompHound/CompHoundWeb),
nothing is easier than that.

I created a new Heroku app for it, connected it to the GitHub repo, deployed, and had it up and running within minutes.

But...

There is a reason why I did not add this note right away to yesterday's post:



#### <a name="5"></a>Heroku Requires HTTPS

I hit one little snag that took me a while to sort out:

The datatable view only displayed the table header and footer. All the content was missing.

Some exploration revealed the problem: the datatable CSS and JavaScript files were failing to load.

On my local machine, running locally, using `localhost`, the app is accessed via HTTP.

On Heroku, all access is HTTPS.

On Heroku, it therefore refused to access the unsafe datatable CSS and JavaScript files.

They were being pulled in like this by `views/index.jade`:

<pre class="prettyprint">
link(rel='stylesheet', href='http://cdn.datatables.net/1.10.5/css/jquery.dataTables.min.css')
script(type='text/javascript', src='http://cdn.datatables.net/1.10.5/js/jquery.dataTables.min.js')
</pre>

Once I discovered that and added the missing `s`, all was fine:

<pre class="prettyprint">
link(rel='stylesheet', href='https://cdn.datatables.net/1.10.5/css/jquery.dataTables.min.css')
script(type='text/javascript', src='https://cdn.datatables.net/1.10.5/js/jquery.dataTables.min.js')
</pre>

The web server is up and running now; see [below](#7) for some links to test it.


#### <a name="6"></a>Recent CompHound Commits

Just for my own reference, here is the list of commits I made during the exploration described above:

- [0.0.7](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.7) implemented config.json server configuration
- [0.0.8](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.8) improved config.json server configuration
- [0.0.9](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.9) check db connection before launching web server
- [0.0.10](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.10) mongoose datatable is up and running
- [0.0.11](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.11) cleanup and smaller datatable font size


#### <a name="7"></a>Try it out Live

Now that the CompHound web server is happily deployed on Heroku, you can explore it up and running live.

Here is the mongolab-hosted database that we are using:
[mongolab.com/databases/comphound](https://mongolab.com/databases/comphound).

It contains the collection of
[component instances](https://mongolab.com/databases/comphound/collections/instances).
The only occurrences that I exported so far are from the standard Revit sample file `rst_advanced_sample_project.rvt`.
You can add more yourself by running the
[CompHoundRvt](https://github.com/CompHound/CompHoundRvt) add-in in any other Revit BIM of your choice.

The node.js web server driving the database via mongoose is hosted on
[Heroku](https://dashboard.heroku.com), and its URL is
[https://comphound.herokuapp.com](https://comphound.herokuapp.com).

Its REST API is accessible via the route [/api/v1](https://comphound.herokuapp.com/api/v1).

[/api/v1/instances](https://comphound.herokuapp.com/api/v1/instances) should in theory returning all database entries, but it will fail with an application error due to too large data.

However, you can use [/api/v1/instances/:id](https://comphound.herokuapp.com/api/v1/instances/48891eaa-9041-405b-a10f-f06585de3cbb-0001de6d) to retrieve the JSON document for a single specific entry.

Finally, it sports the beginnings of a user interface that currently provides the following access points:

- [/](https://comphound.herokuapp.com) &ndash; say hello.
- [/hello/:message](https://comphound.herokuapp.com/hello/jeremy) &ndash; reply with the message passed in.
- [/html/count](https://comphound.herokuapp.com/html/count) &ndash; return the number of database entries.
- [/www/instances1](https://comphound.herokuapp.com/www/instances1) &ndash;  list all the database entries in a table &ndash; this can take a long time.
- [/www/datatable](https://comphound.herokuapp.com/www/datatable) &ndash; display a datatable navigation interface through the instance records.

In the long run, most of these access points can be shut down again.

Instead, one single main `index` entry point will display the datatable listing the component occurrences as well as provide access to the still missing reporting, viewing and model navigation functionality.


#### <a name="8"></a>CompHound Road Map

Here are some of the things to work on next:

- Add a [View and Data API](https://developer.autodesk.com) viewing component.
- Implement the model translation for the viewer.
- Add a database column for the viewer URN.
- Add the rest of the database columns to the datatable view.
- Implement isolated viewing of an individual selected instance.
- Reroute the [comphound.net](http://comphound.net) domain to it.

The versions discussed above are
the [CompHoundWeb 0.0.15](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.15) node.js
mongodb web server,
the [CompHoundRvt 2016.0.0.2](https://github.com/CompHound/CompHoundRvt/releases/tag/2016.0.0.2) C#
REST API client populating it, and the (placeholder) landing
page [CompHound.github.io 0.0.1](https://github.com/CompHound/CompHound.github.io/releases/tag/0.0.1).



#### <a name="9"></a>Self-sufficient Urban Farming on 1/10 of an Acre

Would you like to change the world?

Do you think you can make anyone else change anything at all?

Do you think you can change anything just for yourself, all on your own?

A one-woman or one-man revolution?

Well, here is a pretty uplifting [15-minute documentary](https://youtu.be/7IbODJiEM5A) about someone who has done just that successfully for over a decade:

<center>
<iframe width="480" height="270" src="https://www.youtube.com/embed/7IbODJiEM5A" frameborder="0" allowfullscreen></iframe>
</center>

*Surrounded by urban sprawl and just a short distance from a freeway, the [Urban Homestead](http://urbanhomestead.org) project is a family operated and highly productive city farm. It is also a successful, real-life working model for sustainable agriculture and eco living in urban areas...
harvesting 3 tons of organic food annually from our 1/10 acre garden while incorporating many back-to-basics practices, solar energy and biodiesel in order to reduce our footprint on the earth’s resources...*

<!---

<center>
<img src="img/.png" alt="" width="600"/>
</center>

<pre class="prettyprint">
</pre>

run mongod

run /a/src/web/mongo/mongoose-datatable/test/app.js

http://localhost:8042/

/a/src/web/mongo/mongoose-datatable-demo/
-->

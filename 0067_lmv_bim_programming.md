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

- publish madrid bim programming preparation posts on 3dwc
  - blog /p/2016/2016-01-22_leaving_munich/832.jpg
  - messaging and notification for team collaboration: https://slack.com
  - iot: cyrilles webcam (problem on chrome)
    machines in pier 9
  https://a360.autodesk.com/viewer -- A360 to drag and drop a file and view immediately
  https://a360.autodesk.com -- upload model to A360, view and share to get iframe to embed the viewer -- /a/doc/3dwc/git/files/embed_desks.html
  http://trial.dotdotty.com/share?shareId=431c-bac8-eedb-e43d-fc79 -- animated 3D assembly instructions
  https://plougonvelin.herokuapp.com -- Cyrille's House
  http://ic8879.myfoscam.org:88 -- Cyrille's webcam user adn password is Socket5
  http://calm-inlet-4387.herokuapp.com/?_sm_au_=iVVvSjRVVjbtJSQ7 -- LMV NavTest with Urban House
  http://pier9.herokuapp.com/?model=reduced -- Pier 9 IoT Viewer talk with cyrille!
  http://www.spbstu.ru/structure/inzhenerno_stroitelnyy_institut -- embedded in Russian University web site
  https://bldng360.com/gebouwen -- embedded in Dutch architectural gallery as a service for other architects
  https://www.simulationhub.com/knowledge-base/simulation-gallery -- hydrulic and air stream simulation, e.g., taps, valves, airing, air conditioning, fire, etc.
  https://developer.autodesk.com/api/view-and-data-api -- super Application Examples
  http://examples.developer.autodesk.com/lmv-navigation -- direct link
  http://developer-autodesk.github.io -- more View and Data programming samples

- notes from jim and jaime
  jim quanci
    cyrille's instrumented house
    the dutch architectural company
    indian simulation software
    descending pc sales: they never forecast decreasing PC sales; the last drop was the biggest
    get information up onto the cloud, onto a web server
    make information available to anyone anywhere
    there is an opportunity her
    design make and use with one set of data
    time spent per day on the web: more time on mobile devices than pc
    that happened two years ago in the US
    the future of making code
    the reality of making code
    desktop shift to development stack
    agile development
    the future of the business: subscription
    in aec, autodesk is number one
    in manufacturing, we are not among the top two or three
    cloud-based offerings provide a new chance to grow here
    its's about being easy (to use)
  jaime rosales
    bim360 family: products we have
    project alexandria, now bim360 docs: project, coming in the next months
    building ops: maybe
    bim360 family: glue, plan, layout, field, building ops
    alexandria bim 360 docs
    manage documents, collaborate

#adskdevnetwrk
#expressjs
#RestSharp
#Autodesk #IoT #SeeControl #cloud
#python #markdown #asciidoc
#gcal #caldav #googleapi
#milanojs
#prague
#au2015 #autocad #inventor #ah8 #cubeathens #developers
#aws #handlebars
#JsFiddle #Reactjs
#autodesku #rtceur
#Reactjs
#MongoDB
#mongolab
#Heroku
#restapi #nodejs #adsk
#javascript
#au2015 #autodesku #rtceur #SVG #javascript

akn_include

View and Data API Intro for BIM Programming #3dwebcoder #revitapi #3dweb #a360 #3dwebaccel #webgl @adskForge

&ndash; DevDay in Munich
&ndash; Accelerator Workshop
&ndash; BIM Workshop in Madrid
&ndash;
...

-->


### View and Data API Intro for BIM Programming

We successfully completed the
European [Munich DevDay conference](http://thebuildingcoder.typepad.com/blog/2016/01/devday-conference-in-munich-and-wpf-doevents.html#2)
and the subsequent four-day abbreviated [Autodesk Cloud Accelerator](http://autodeskcloudaccelerator.com).

Here is the last snapshot of the frosted trees and blue sky from the train station platform in Harras, before leaving Munich to embark on the voyage back home through a mostly foggy winter landscape:

<center>
<img src="/p/2016/2016-01-22_leaving_munich/832_600x450.jpg" alt="Leaving Munich" width="300">
</center>

The most exciting project there for me personally was the implementation of
the [Revit BIM database and element modification tracker](http://thebuildingcoder.typepad.com/blog/2016/01/tracking-element-modification.html).

Next on my rather
busy [January agenda](http://thebuildingcoder.typepad.com/blog/2016/01/loading-an-ies-photometric-web-and-exciting-times.html#3) is
the [BIM Programming Workshop](http://www.bimprogramming.com) in Madrid.

As its name implies, it is focused on architectural programming and dives into both desktop and web based aspects, including hands-on workshops exploring
the [Revit](http://www.autodesk.com/developrevit)
and [View and Data](https://developer.autodesk.com) APIs.

The detailed agenda and registration page is provided
at [bimprogramming.com](http://www.bimprogramming.com).

Here are some of the web oriented things I am looking forward to discussing there, mostly related to WebGL and
the [View and Data API web site](https://developer.autodesk.com):

- [Jaime's presentations and samples](#2)
- [View and Data API demo sites](#3)
- [Slack team collaborations](#4)


#### <a name="2"></a>Jaime's View and Data API Presentations and Samples

I will run through an introduction to the use of WebGL for widely sharing and collaborating on BIM projects, e.g. based on these two English and Spanish language versions of my
colleague [Jaime Rosales Duque](http://adndevblog.typepad.com/aec/jaime-rosales.html)'s
recent View and Data API presentations, both using [reveal.js](https://github.com/hakimel/reveal.js) and
hosted on GitHub:

<!---
- Responsive web
meetup [repo](https://github.com/jaimerosales/responsive-web-meetup)
and [slide show](http://jaimerosales.github.io/responsive-web-meetup)
-->

- London AEC Hackathon
meetup [repo](https://github.com/jaimerosales/london-prehack)
and [slide show](http://jaimerosales.github.io/london-prehack)
- Spanish Colombia JsConf
meetup [repo](https://github.com/jaimerosales/colombia-jsconf-workshop)
and [slide show](http://jaimerosales.github.io/colombia-jsconf-workshop)

In addition, here are links to a couple of particularly impressive pure WebGL samples:

- [Water simulation](http://madebyevan.com/webgl-water)
- [Pearl boy rows and dives](http://labs.gooengine.com/pearl-boy/index.html)
- [How does BB-8 work](http://www.howbb8works.com)

Many thanks to Jaime for sharing these!


#### <a name="3"></a>View and Data API Demo Sites

Here are some other [View and Data API](https://developer.autodesk.com) samples that may be of interest:

- The [A360 viewer](https://a360.autodesk.com/viewer) enables you to drag and drop a file and view it immediately with no installation or even login whatsoever.
- Logging in and uploading a model to your own [A360](https://a360.autodesk.com) account enables viewing, sharing and retrieving an `iframe` to embed the viewer, so you can embed it into your own web site with just one line of code ([click to try](files/embed_a360_viewer_desks.html)): <br/><pre>&lt;iframe src="https://myhub.autodesk360.com/ue29d734b/shares/public/SHabee1QT1a327cf2b7a0d36d79335a1cae5?mode=embed" width="400" height="300" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"&gt;&lt;/iframe&gt;</pre>
- [Animated 3D assembly instructions](http://trial.dotdotty.com/share?shareId=431c-bac8-eedb-e43d-fc79) &ndash; imagine replacing all the confusing DIY paper manuals &ndash; how my head-scratching and ripped-out hair could be saved!
- [LMV NavTest with Urban House](http://calm-inlet-4387.herokuapp.com/?_sm_au_=iVVvSjRVVjbtJSQ7) &ndash; an architectural sample integrating 3D and plan views with reporting.
- Embedded in a [Russian University web site](http://www.spbstu.ru/structure/inzhenerno_stroitelnyy_institut)
- A Dutch [architectural gallery](https://bldng360.com/gebouwen) provided as a service for other architects.
- [Hydraulic and air stream simulation](https://www.simulationhub.com/knowledge-base/simulation-gallery), e.g., taps, valves, airing, air conditioning, fire, etc.
- [Pier 9 IoT Viewer](http://pier9.herokuapp.com/?model=reduced) &ndash; Internet of Things sample
- [Official application examples](https://developer.autodesk.com/api/view-and-data-api) on the [View and Data API web site](https://developer.autodesk.com)
- Direct link to the [AEC application example](http://examples.developer.autodesk.com/lmv-navigation) &ndash;
- [View and Data programming sample repos](http://developer-autodesk.github.io) on GitHub.


#### <a name="4"></a>Slack for Hackathon and Other Team Collaborations

Lots of recent hackathons focused on 3D on the web, so I'll also mention one cool team collaboration tool that may come in handy for you there: [Slack](https://slack.com) provides a powerful messaging, file sharing and notification platform for team collaboration.

It is cloud based with fully native apps for iOS and Android, hence ubiquitously accessible; whatever you do on one device is reflected everywhere, always in sync; your place is kept, so you can always pick up wherever you left off.

It includes indexing and searching within PDF, Word documents, Google docs, and more.

It can notify team members when documents change.

It supports channels for organising team conversations, both open and private, and direct messaging for one-on-one contact.

Thanks to Jaime for pointing out that as well.

Now I'm off to board the plane to Madrid and the [BIM programming conference](http://www.bimprogramming.com)...

Hope you can make it there as well &nbsp; :-)

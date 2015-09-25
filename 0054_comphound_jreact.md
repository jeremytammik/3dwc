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
#javascript
#JsFiddle #Reactjs
#autodesku #rtceur
akn_include

Tutorials, Hackergarten, CompHound #Reactjs #Heroku #MongoDB #3dwebcoder #revitapi #nodejs #adsk #mongolab


-->


### Tutorials, Hackergarten, CompHound React.js

Yesterday I participated in
the [Hackergarten Basel September 2015](http://www.meetup.com/Hackergarten-Basel/events/225033736) meeting and worked with
Lukas [@syzer](https://github.com/syzer) Gintowt on integrating
a [Reactjs](http://facebook.github.io/react) component into
the [CompHound](https://github.com/CompHound/CompHound.github.io) node.js mongodb web
server [CompHoundWeb](https://github.com/CompHound/CompHoundWeb).

<center>
<img src="img/hackergarten_basel_2015-09-24_3.jpeg" alt="Hackergarten Basel"/>
</center>

Besides that, let me mention [tutorialspoint](http://www.tutorialspoint.com):

- [Tutorialspoint](#2)
- [CompHound React.js widget](#3)
- [CompHound road map](#4)


#### <a name="2"></a>Tutorialspoint

If you are interested in learning any new technology, my colleague Cyrille suggests taking a look
at [tutorialspoint](http://www.tutorialspoint.com).

It enables you to learn the theory and practice in a real-time hands-on lab at the same time, right there, online.

It boasts of having the largest tutorials library on the web, covering hundreds of topics, with a wide list of subjects ranging across all the following:

- Academic
- Big Data
- Databases
- Digital Marketing
- Java Technologies
- Multi Language Tutorials
- Mainframe
- Management
- Microsoft Technologies
- Questions and Answers
- Miscellaneous
- Mobile Development
- Programming
- Scripts
- Software Quality
- Telecom
- Web Development
- XML Technologies

I'm sure some of those are of interest to you too!



#### <a name="3"></a>CompHound React.js Widget

Until yesterday,
the [CompHoundWeb mongoose datatable](http://the3dwebcoder.typepad.com/blog/2015/09/the-comphound-mongoose-datatable.html) was
driven by a [Jade](http://jade-lang.com) template file `views/index.jade`.

Since it is hard to combine that with a [Reactjs](http://facebook.github.io/react) component, Lukas replaced
it by a pure HTML file `public/index.html`.

We created version [0.0.16](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.16),
which I later cleaned up into [0.0.17](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.17).

I moved `index.html` to [datatable2.html](https://github.com/CompHound/CompHoundWeb/blob/master/public/datatable2.html) and
implemented a new route [/datatable2](https://comphound.herokuapp.com/datatable2) to it.

It is all up and running on Heroku, so you
can [see the results live](https://comphound.herokuapp.com/datatable2) and the source in
the [CompHoundWeb GitHub repo](https://github.com/CompHound/CompHoundWeb).
The readme there provides more info and testing links.

Many thanks to Lukas for his work and many other interesting suggestions!



#### <a name="4"></a>CompHound Road Map

At this stage, the list of the things to work on next is still growing instead of shrinking:

- Add the rest of the database columns to the datatable view.
- Implement the react component to view and edit a component occurrence.
- Add a [View and Data API](https://developer.autodesk.com) viewing component.
- Implement the model translation for the viewer.
- Add a database column for the viewer URN.
- Implement isolated viewing of an individual selected instance.
- Reroute the [comphound.net](http://comphound.net) domain to it.

Wish me luck on finishing this before my conference presentations
at [RTC Europe](http://www.rtcevents.com/rtc2015eu) in Budapest
and [Autodesk University](http://au.autodesk.com) in
Las Vegas are due, end of October and beginning of December, respectively.

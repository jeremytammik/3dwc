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
#RestSharp
#Autodesk #IoT #SeeControl #cloud
#python #markdown #asciidoc
#gcal #caldav #googleapi
#milanojs
#3dwebaccel #prague #webgl #3dweb #a360
#au2015 #autocad #inventor #ah8 #cubeathens #developers
#aws #handlebars
#JsFiddle #Reactjs
#autodesku #rtceur
#Reactjs
#MongoDB
#mongolab
#restapi
akn_include

Single Column CompHound Viewer on iPad #Heroku #3dwebcoder #revitapi #nodejs #adsk #ViewAndDataAPI #jquery #javascript

&ndash; Wrap-up and next steps...

-->


### Single Column CompHound Viewer on iPad

I am leaving for two weeks vacation in Andalusia tomorrow.

I continued working on the [CompHound](https://github.com/CompHound) component tracker in the past hours to leave it in a moderately cleaned-up state for Cyrille to add some enhancements, if he feels like it:

- [Single column layout](#2)
- [Enable pick on iPad](#3)
- [CompHound CSS](#4)
- [To do](#5)
- [Vacation](#6)


#### <a name="2"></a>Single Column Layout

As I mentioned in
the [last wrap-up](http://the3dwebcoder.typepad.com/blog/2015/10/comphound-viewer-and-authorisation-service.html#6),
the CompHound user interface looked a bit messy.

I cleaned that up by placing all three components one above the other in one single column:

- Datatable
- Selected instance data
- Viewer

<center>
<img src="img/comphound_single_column.png" alt="Single column layout" width="804"/>
</center>

When an instance is picked, the instance data is populated and the viewer initialised:

<center>
<img src="img/comphound_single_column_populated.png" alt="Selected instance data" width="804"/>
</center>

Try it out yourself
at [comphound.herokuapp.com/datatable2](https://comphound.herokuapp.com/datatable2).

The solution requires sensible positioning of the `div` populated by the viewer.

In the end, I
found [this JsFiddle to position a box](http://jsfiddle.net/simevidas/PFPDU) the most helpful.



#### <a name="3"></a>Enable Pick on iPad

Saturday evening, at Ben's 15th birthday party, I checked out the CompHound datatable on his iPad.

With no touch support, I was unable to select a component instance.

I fixed that simply adding the CSS style `cursor: pointer` to the `td` element does the job.

Suggested in the Mitch solution
for [iPad jQuery live click events not working](http://www.mitch-solutions.com/blog/17-ipad-jquery-live-click-events-not-working) and
discussed in more depth in numerous Stack Overflow threads, e.g.
on [jQuery click not working with iPad](http://stackoverflow.com/questions/7892863/jquery-click-not-working-with-ipad).


#### <a name="4"></a>CompHound CSS

The current CompHound CSS file supporting the desired viewer `div` positioning and instance selection on a touch device looks like this:

<pre class="prettyprint lang-css">
th { text-align: left }
th, td { border: 1px solid black; white-space: nowrap; overflow: hidden; cursor: pointer; }
table { border-collapse: collapse; font-size: smaller }
thead th, tbody th, tfoot th,
table.dataTable thead td, table.dataTable tbody td, table.dataTable tfoot td,
table.dataTable thead th, table.dataTable tbody th, table.dataTable tfoot th { padding: 1pt }
p.placeholder { font-style: italic; color: darkgray; text-align: center; vertical-align: middle; line-height: 90px; /* the same as your div height */ }

.box {
  background-color: gray;
  position: relative;
  width: 90%;
  margin: auto;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.box::before {
  content: "";
  display: block;
  padding-top: 30% /* read comments in JS box) */
}

#viewer {
  width: 100%;
  /* height: 0.66 * vv; */
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0
  overflow: hidden;
  background-color: #cccccc;
  border: 1px solid #cccccc;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
</pre>



#### <a name="5"></a>To Do

All the source code is available from the [CompHound](https://github.com/CompHound) organisation GitHub repositories.
The current versions discussed above are the web
server [CompHoundWeb 0.0.33](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.33) and
the C# REST API
client [CompHoundRvt 2016.0.0.5](https://github.com/CompHound/CompHoundRvt/releases/tag/2016.0.0.5).

It is freshly redeployed to Heroku and, as always, the links
to [Try it out Live](https://github.com/CompHound/CompHound.github.io#try-it-out-live) are
up and running, so feel free to play around with it.

Here is the updated to-do list that Cyrille, my Autodesk University co-presenter, may or may not be able to take a look at during my absence:

- Error handling clean-up.
- Load error: 4 on loading model into viewer on iPad.
- Implement isolated viewing of an individual selected instance.
- Implement automated and/or batch LMV model translation.
- Set up and reroute the [comphound.net](http://comphound.net) domain.
- Enable editing some component occurrence properties.
- Implement database population REST clients for other CAD systems, e.g.,
[AutoCAD](http://www.autodesk.com/products/autocad),
[Inventor](http://www.autodesk.com/products/inventor),
[FreeCAD](http://freecadweb.org), etc.


#### <a name="6"></a>Vacation Time

As said, I'm leaving on vacation for two weeks tomorrow, and heading off to a native
Indian-style [sweat lodge](https://en.wikipedia.org/wiki/Sweat_lodge) this
afternoon, so this is my last update on this topic for a while &ndash; or any topic at all, for that matter &nbsp; :-)

<center>
<img src="/j/photo/jeremy/2008/2008-10-28_la_garnatilla/jeremy_in_wave_2.jpg" alt="Jeremy in a wave" width="300"/>
</center>

Take care!
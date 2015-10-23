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

 #Heroku #3dwebcoder #revitapi #nodejs #adsk #ViewAndDataAPI #jquery #javascript

&ndash; Vacation...

-->


### CompHound LMV User Interface and Inventor Parts

I completed another little enhancement to
the [CompHound](https://github.com/CompHound) component tracker project, and Adam Nagy added something as well:

- [Use GuiViewer3D to display LMV user interface](#2)
- [CompHound Inventor add-in](#3)
- [To do](#4)


#### <a name="2"></a>Use GuiViewer3D to Display LMV User Interface

Until yesterday, CompHound displayed the naked LMV viewer with no additional controls:

<center>
<img src="img/lmv_no_ui.png" alt="View and Data API viewer with no user interface" width="400"/>
</center>

All you could do was navigate through the model with the mouse.

I switched on the user interface now by initialising the viewer using a `GuiViewer3D` instead of the simple `Viewer3D` class
in [lmviewer.js](https://github.com/CompHound/CompHoundWeb/blob/master/public/js/lmviewer.js):

<pre class="prettyprint">
  if( display_user_interface ) {
    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(
      viewerElement, {});
  }
  else {
    var viewer = new Autodesk.Viewing.Viewer3D(
      viewerElement, {});
  }
</pre>

Note that it lives in the `Private` namespace.

The view displayed by
the [CompHound datatable2 entry point](https://comphound.herokuapp.com/datatable2) therefore looks like this
from [release 0.0.37](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.37) onward:

<center>
<img src="img/lmv_with_ui.png" alt="View and Data API viewer with default user interface" width="400"/>
</center>

As you can see in the code snippet above, I also added a global Boolean module variable `display_user_interface` to easily switch the UI on and off.


#### <a name="3"></a>CompHound Inventor Add-in

[Adam Nagy](https://github.com/adamenagy) very kindly
implemented [CompHoundInv](https://github.com/CompHound/CompHoundInv),
an Inventor add-in to populate the CompHound database from a mechanical design, to show that it can be used to manage generic recurring component occurrences regardless of the type of CAD system used.

So if you are interested in a super simple REST API C# client for an Inventor add-in, this should definitely be your first port of call.


#### <a name="4"></a>To Do

All the source code is available from the [CompHound](https://github.com/CompHound) organisation GitHub repositories.
The current versions discussed above are the web
server [CompHoundWeb 0.0.33](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.33) and
the C# REST API
clients [CompHoundRvt 2016.0.0.5](https://github.com/CompHound/CompHoundRvt/releases/tag/2016.0.0.5) for Revit
and [CompHoundInv 2016.0.0.0](https://github.com/CompHound/CompHoundInv/releases/tag/2016.0.0.0) for Inventor.

It is freshly redeployed to Heroku and, as always, the links
to [try it out Live](https://github.com/CompHound/CompHound.github.io#try-it-out-live) are
up and running, so feel free to play around with it.

Here is the updated to-do list:

- Populate the model URN database column for all instances.
- Implement isolated viewing of an individual selected instance.
- Implement automated and/or batch LMV model translation.
- Enable editing some component occurrence properties.

I hope I can get some of them completed before presenting that at
the Revit Technology Conference [RTC Europe](http://www.rtcevents.com/rtc2015eu) in
Budapest next week.

High time to get going with the next tasks, then, instead of just this endless documenting...

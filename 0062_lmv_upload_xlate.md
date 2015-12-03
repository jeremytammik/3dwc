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
#Heroku
akn_include

RTC Report LMV Model Upload and Translation #3dwebcoder #revitapi #restapi #nodejs #adsk #ViewAndDataAPI #javascript #rtceur #au2015

I presented the CompHound component tracker project as work in progress at the Revit Technology Conference RTC Europe in Budapest last week
&ndash; RTC Conference and Connecting Desktop and Cloud
&ndash; Driving the View and Data API Upload and Translation from a C# Add-In
&ndash; Current CompHound Versions and To Do
&ndash; Meanwhile, autumn is well advanced here in Switzerland...

-->


### RTC Report LMV Model Upload and Translation

I presented
the [CompHound](https://github.com/CompHound) component tracker project as work in progress at
the Revit Technology Conference [RTC Europe](http://www.rtcevents.com/rtc2015eu) in
Budapest last week.

- [RTC Conference and Connecting Desktop and Cloud](#2)
- [Driving the View and Data API Upload and Translation from a C# Add-In](#3)
- [Current CompHound Versions and To Do](#4)

Meanwhile, autumn is well advanced here in Switzerland:

<center>
<img src="/p/2015/2015-11-09_st_ursen_guggisberg/761_sunset_over_jura_cropped.jpg" alt="Sunset over Jura from Guggisberg" width="400"/>
</center>



#### <a name="2"></a>RTC Conference and Connecting Desktop and Cloud

Here is an overview of the RTC conference, the three sessions I gave, and a bunch of photo albums I published during my stay:

- [RTC Classes and Getting Started with Revit Macros](http://thebuildingcoder.typepad.com/blog/2015/10/rtc-classes-and-getting-started-with-revit-macros.html)
- [RTC, Budapest and the Revit API Panel](http://thebuildingcoder.typepad.com/blog/2015/11/rtc-budapest-and-the-revit-api-panel.html)
- [Connecting Desktop and Cloud, Room Editor Update](http://thebuildingcoder.typepad.com/blog/2015/11/connecting-desktop-and-cloud-room-editor-update.html)

The really interesting one for us here is the last, on connecting the desktop with the cloud.



#### <a name="3"></a>Driving the LMV Upload and Translation from a C# Add-In

In the meantime, my
colleague [Adam Nagy](http://adndevblog.typepad.com/autocad/adam-nagy.html) implemented
automatic LMV model upload and translation functionality for
the [CompHoundInv](https://github.com/CompHound/CompHoundInv) Inventor
C# add-in to populate the CompHound web database.

I integrated Adam's uploaded into the Revit
add-in [CompHoundRvt](https://github.com/CompHound/CompHoundRvt) as well,
in [release 2016.0.0.6](https://github.com/CompHound/CompHoundRvt/releases/tag/2016.0.0.6).

Now, whenever the component occurrence data of a Revit or Inventor model is uploaded to the web database, the model itself is automatically uploaded and translated for viewing in
the [View and Data API](https://developer.autodesk.com) viewer at the same time.

We are talking about improving the upload and translation source code, since it is currently asynchronous.

[Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html) implemented
an asynchronous uploader in
his [Rest API wrapper library for .NET applications](https://github.com/Developer-Autodesk/library-dotnet-view.and.data.api),
but that does not yet handle complex models with different component files referencing each other, as is common in Revit and Inventor.

We plan to merge these two streams in future.

Meanwhile, the uploading works and the translated model URN is added to each component instance data:

<center>
<img src="img/lmv_urn.png" alt="LMV URN" width="400"/>
</center>

The next step I want to look at is to isolate each component occurrence in the LMV model view when it is selected in the web database.


#### <a name="4"></a>Current CompHound Versions and To Do

All the project source code is available from
the [CompHound](https://github.com/CompHound) organisation GitHub repositories.
The current versions discussed above are the web
server [CompHoundWeb 0.0.39](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.39) and
the C# REST API
clients [CompHoundRvt 2016.0.0.6](https://github.com/CompHound/CompHoundRvt/releases/tag/2016.0.0.6) for Revit
and [CompHoundInv 2016.0.0.1](https://github.com/CompHound/CompHoundInv/releases/tag/2016.0.0.1) for Inventor.

The web server is freshly redeployed to Heroku, driving the mongo database hosted on mongolab.
As always, the links
to [try it out live](https://github.com/CompHound/CompHound.github.io#try-it-out-live) are
up and running, so feel free to play around with it to your heart's content.

Here is the updated to-do list:

- Use the asynchronous C# upload and translation library.
- Implement isolated viewing of an individual selected instance.
- Enable editing of some component occurrence properties.

I plan to complete these before submitting my Autodesk University handout material due this Friday and presenting the project at AU in Las Vegas in December.

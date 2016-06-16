<head>
<title>The 3D Web Coder</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="3dwc.css"/>
<!--
<script src="run_prettify.js" type="text/javascript"></script>
-->
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?autoload=true" defer="defer"></script>
</head>

<!---

Roomedit3d Thee-legged OAuth Access to Forge #3dwebcoder #revitapi @AutodeskForge #nodejs #ForgeDevCon

The Forge DevCon launches today. I am putting the final touches to my presentation. One of them was the migration of the roomedit3d viewer extension and web app to the new Forge structure
&ndash; Forge platform components
&ndash; Setting up a specific Roomedit3d model
&ndash; Roomedit3dV2 using OAuth2 to edit any model
&ndash; Download and installation...

-->

### Forge Platform and Roomedit3d with Thee-legged OAuth

The [Forge DevCon](http://forge.autodesk.com/conference) launches today.

I am putting the final touches to my presentation.

One of them was the migration of
the [roomedit3d viewer extension and web app](https://github.com/jeremytammik/roomedit3d) to the new Forge structure:

- [Forge platform components](#2)
- [Setting up a specific Roomedit3d model](#3)
- [Roomedit3dV2 using OAuth2 to edit any model](#4)
- [Download and installation](#5)

First, here are some snapshots from my walk through San Francisco to and from the One Market Autodesk office yesterday:

<center>
<a data-flickr-embed="true"  href="https://www.flickr.com/photos/jeremytammik/albums/72157669686966406" title="Telegraph Hill, Haight, Steiner"><img src="https://c4.staticflickr.com/8/7661/27071269003_04abbd4bff_n.jpg" width="320" height="240" alt="Telegraph Hill, Haight, Steiner"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
</center>


#### <a name="2"></a>Forge platform components

As you may know by now, the View and Data API no longer exists.

It morphed into several separate more specific, general, well-defined Forge APIs.

Currently, these are the main Forge components:

- Launched
    - Authentication
    - Data Management API
    - Model Derivative API
    - Viewer
    - Design Automation API
- Review Queue
    - 3D Print API
    - BIM 360 API
    - Issues API
    - Reality Capture API
    - Fusion Connect API
    - A360 API

The authentication can be both two- and three-legged.

What does that mean?

- Two-legged &ndash; my web app knows my credentials and uses them to access my Forge data.
- Three-legged &ndash; my web app prompts a third party end user to log in to the system in order to access her Forge data.


#### <a name="3"></a>Setting up a Specific Roomedit3d Model

In a [comment](http://thebuildingcoder.typepad.com/blog/2016/05/roomedit3d-live-real-time-bim-update-recording.html#comment-2714887080)
on The Building Coder discussion of
the [roomedit3d live real-time socket.io BIM update](http://thebuildingcoder.typepad.com/blog/2016/05/roomedit3d-live-real-time-bim-update-recording.html),
Danny Bentley asked:

> This is very cool.
> I got everything downloaded and started going through the SocketTest and it worked great.
> I want to try the Roomedit3dApp, but in my zip file I don't seem to have the .rvt file of the room.
> Where could I find this file?

Answer: You can use any Revit BIM RVT project file you like.

It does not have to have anything to do with rooms at all, really, since any element will be accepted, moved, and the translation communicated back via the socket to the Revit add-in running in the same model.

Translate your RVT for the Forge viewer using your own credentials.

Adapt the roomedit3d viewer server to load it by specifying your own credentials and your translated model URN.

With that done, you should be ready to go.

That is an example of using the two-legged authorisation.

Since I provided that answer, however, things have got easier still with the three-legged OAuth:


#### <a name="4"></a>Roomedit3dV2 Using OAuth2 to Edit any Model

The Forge platform has now been redesigned and the View and Data API renamed.

To be more precise, what we so far considered the View and Data API has been restructured more cleanly into separate REST API endpoint collections:

- [Authentication](https://developer.autodesk.com/en/docs/oauth/v2/overview)
- [Data Management API](https://developer.autodesk.com/en/docs/data/v2/overview)
- [Model Derivative API](https://developer.autodesk.com/en/docs/model-derivative/v2/overview)
- [Viewer](https://developer.autodesk.com/en/docs/viewer/v2/overview)

I implemented a new version of Roomedit3d adapted to fit into that structure:
[Roomedit3dV2](https://github.com/jeremytammik/model.derivative.api-nodejs-sample-roomedit3d).

You can test it live
at [roomedit3dv2.herokuapp.com](http://roomedit3dv2.herokuapp.com).

In that version, you can log into
your [own A360 account](https://myhub.autodesk360.com), obviously exercising
the [Authentication API](https://developer.autodesk.com/en/docs/oauth/v2/overview).

The sample uses
the [Data Management API](https://developer.autodesk.com/en/docs/data/v2/overview) to
list all hubs you have access to and the hierarchy of projects, folders, items and versions within them.

When you select a specific version,
the [Model Derivative API](https://developer.autodesk.com/en/docs/model-derivative/v2/overview) provides
access to the internal CAD seed file structure, translates it for the viewer, and enables geometry export of selected elements.

Within the viewer, the `Roomedit3dTranslationTool` can be turned on and behaves just as before:

- Select an element
- Transform its location
- Report the data back from the viewer to the web server via a REST API call
- Broadcast the data from the web server to the C# .NET clients to update the BIM

If you have installed and launched
the [Roomedit3dApp Revit add-in](https://github.com/jeremytammik/Roomedit3dApp) in
the same model and run its external command to subscribe to the broadcast events, you will see your own BIM being updated live by the element translations defined in the Forge viewer.

You don't even have to touch the roomedit3dv2 web server.


#### <a name="5"></a>Download and Installation

As long as my free Heroku account is not overloaded by excessive usage, you can access, share and use my instance
at [roomedit3dv2.herokuapp.com](http://roomedit3dv2.herokuapp.com).

Alternatively, you can fork it and launch your own instance on Heroku, your own server, locally or on the web, or anywhere else you please.

The current versions
of [roomedit3dv2](https://github.com/jeremytammik/model.derivative.api-nodejs-sample-roomedit3d)
and [Roomedit3dApp](https://github.com/jeremytammik/Roomedit3dApp) discussed above
are [release 0.0.2](https://github.com/jeremytammik/model.derivative.api-nodejs-sample-roomedit3d/releases/tag/0.0.2)
and [2017.0.0.5](https://github.com/jeremytammik/Roomedit3dApp/releases/tag/2017.0.0.5),
respectively.

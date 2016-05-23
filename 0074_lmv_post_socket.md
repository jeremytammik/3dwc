<head>
<title>The 3D Web Coder</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="3dwc.css"/>
<!--
<script src="run_prettify.js" type="text/javascript"></script>
-->
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?autoload=true&amp;skin=sunburst&amp;lang=css" defer="defer"></script>
</head>

<!---

Roomedit3d Viewer Extension, POST and Socket #3dwebcoder #revitapi #3dweb @AutodeskForge #nodejs #socketio

I returned from the Barcelona Forge Accelerator, where I started an exciting new project connecting BIM and the cloud demonstrating two cool possibilities to enhance interaction with the View and Data API, a viewer extension enabling interactive model modification, i.e., translation of selected elements, and a real-time communication of the modification back to the source CAD system
&ndash; It's Read-Only! How can it be Read-Write?
&ndash; Genealogy or Where to Start?
&ndash; Capturing the TransformTool Selection
&ndash; Determining the TransformTool Translation Vector
&ndash; POST From Viewer to Server
&ndash; Broadcast via Socket.io
&ndash; Desktop Notification Connection and Subscription
&ndash; Demo Recording
&ndash; Download and Diff
&ndash; To Do...

-->


### Roomedit3d Viewer Extension, POST and Socket

I returned from the Barcelona [Forge](http://forge.autodesk.com) [Accelerator](http://autodeskcloudaccelerator.com),
where I started an exciting new project connecting BIM and the cloud demonstrating two cool possibilities to enhance interaction with
the [View and Data API](https://developer.autodesk.com/api/view-and-data-api):

- A viewer extension enabling interactive model modification, i.e., translation of selected elements
- Real-time communication of the modification back to the source CAD system using:
    - A REST API POST call from the viewer extension to the node.js web server
    - A direct [socket.io](http://socket.io) connections to broadcast from the web server to any number of desktop clients

Let's look at these topics in more detail:

- [Barcelona Forge Accelerator](#2)
- [Roomedit3d](#3)
- [It's Read-Only! How can it be Read-Write?](#4)
- [Genealogy or Where to Start?](#5)
- [Capturing the TransformTool Selection](#6)
- [Determining the TransformTool Translation Vector](#7)
- [POST From Viewer to Server](#8)
- [Broadcast via Socket.io](#9)
- [Desktop Notification Connection and Subscription](#10)
- [Demo Recording](#11)
- [Download and Diff](#12)
- [To Do](#13)

#### <a name="2"></a>Barcelona Forge Accelerator

Here are some pictures from the accelerator.

Arrival in Barcelona and the Autodesk office in Poble Nou:

<center>
<a data-flickr-embed="true"  href="https://www.flickr.com/photos/jeremytammik/albums/72157666044807243" title="Forge Accelerator"><img src="https://farm8.staticflickr.com/7099/26462287804_38d1bbb582_n.jpg" width="320" height="240" alt="Forge Accelerator"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
</center>

Relaxing from intensive cloud programming on a two-hour sailboat cruise:

<center>
<a data-flickr-embed="true"  href="https://www.flickr.com/photos/jeremytammik/albums/72157668599840235" title="Forge Accelerator Ahoy"><img src="https://farm8.staticflickr.com/7594/27014775142_d30eb90c39_n.jpg" width="320" height="240" alt="Forge Accelerator Ahoy"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
</center>

On Thursday night I found a very nice and friendly restaurant in Poble Nou, [Aguaribay](http://www.aguaribay-bcn.com).
I asked what the word 'aguaribay' means and discovered it is an indigenous South American word for the 'pepper tree' growing aromatic red pepper corn berries.
Very tasty.

The accelerator itself went very well.

Here are some notes from the demos on the last day:

- [Autoplot](http://autoplot.es) Barcelona implemented an AutoCAD I/O REST API app to extract and modify DWG block attributes.
After the demo, Philippe suggested making use of the [JSONview Chrome extension](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc) to pretty-print an intermediate JSON result.
- [PTAC EDGE^Revit](http://www.edgeforrevit.com) delivers concrete construction functionality for Revit, information for the job site and production floor.
Currently, they ship drawings. Can we deliver this content via an iPAD or tablet and skip the paper? A prototype is up and running now listing content in the cloud.
- [Mensch und Maschine](http://www.mum-europe.com) worked on two projects: for several FM tasks and for Vault linking with MongoDB. They implemented apps using the [View and Data API](https://developer.autodesk.com/api/view-and-data-api) and AutoCAD I/O. <!--- Among other things, they upload documents, list buckets, create a new bucket... -->
- [Opendesk](https://www.opendesk.cc) offers a different approach to designing furniture and making it locally, sustainably and on demand. Currently using Inventor, they explored moving to Fusion and driving CNC machines directly from there.
- Finally, I presented my new roomedit3d sample described below, demonstrating a [socket.io](http://socket.io) broadcast from a web server to any number of connected clients, on the desktop or elsewhere.

All very exciting and promising stuff!



#### <a name="3"></a>Roomedit3d

Roomedit3d is yet another addition to my collection of samples demonstrating connecting the desktop and the cloud using a Revit BIM model communicating round-trip and real-time with a web-hosted data collection.

This one is based on the same idea as my venerable old [RoomEditorApp](https://github.com/jeremytammik/RoomEditorApp), with two significant and interesting enhancements:

- Use the View and Data API to present and interact with a full 3D view of the BIM instead of a limited 2D one.
- Use a [socket.io](http://socket.io) connection to communicate changes back to the BIM instead of inefficient REST-based polling.

The RoomEditorApp creates a vastly simplified 2D [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) model
of selected rooms, displays it any browser, including on any mobile device, enables you to interactively move and rotate furniture family instances, and updates the BIM model accordingly in real time.

The other important sample connecting the desktop and the cloud
is [FireRatingCloud](https://github.com/jeremytammik/FireRatingCloud).

Just like RoomEditorApp and FireRatingCloud, Roomedit3d consists of two parts:

- [roomedit3d](https://github.com/jeremytammik/roomedit3d), implementing the web server, MongoDB cloud-hosted database and [View and Data API](https://developer.autodesk.com/api/view-and-data-api) interactive 3D model viewer.
- [Roomedit3dApp](https://github.com/jeremytammik/Roomedit3dApp), the C# .NET Revit API add-in client.

Here are the main steps required to implement the [roomedit3d](https://github.com/jeremytammik/roomedit3d) node.js web server handling the viewer side of things:

- Set up the View and Data API viewer and display a model, including the REST API to handle the authorisation token.
- Implement an extension to drag a selected element to a new location in the viewer.
- REST API `POST` call to send the element selection and translation data back from the JavaScript viewer browser client to the node.js web server.
- Implement a [socket.io](http://socket.io) broadcast to make the modification data available to other subscribing clients.
- Deploy in Heroku.

The C# .NET Revit add-in [Roomedit3dApp](https://github.com/jeremytammik/Roomedit3dApp) is still in its early stages, and includes the following:

- A [socket.io](http://socket.io) connection subscribing to the broadcast messages.
- An external event to modify the BIM when updates become available.
- An external app to handle the external event.
- An external command to toggle on and off the broadcast subscription.


#### <a name="4"></a>It's Read-Only! How can it be Read-Write?

Arif Hanif asked a very valid question in
a [comment](http://thebuildingcoder.typepad.com/blog/2016/05/idea-station-and-textnote-bounding-box.html#comment-2687266921) on
my [initial description of this project](http://thebuildingcoder.typepad.com/blog/2016/05/idea-station-and-textnote-bounding-box.html):

**Question:** The roomeditor with View and Data API seems interesting.

I did not know you could make edits in the View and Data API?

**Answer:** Thank you for your pertinent question.

The View and Data API consists of two parts:

1. Translation service from CAD model or other sources to the viewer JSON stream.
2. The viewer.

The viewer displays the translated JSON data stream using [three.js](https://en.wikipedia.org/wiki/Three.js).

That is completely open source and JavaScript based.

Three.js can also be used to edit the scene.

The system is read-only in the sense that you cannot save back any changes directly back to the original CAD source model.

You can however modify the scene, retrieve and store those modifications in your own format, and implement your own functionality to update the original CAD model accordingly, if you so please.

That is what all my samples connecting BIM and the cloud demonstrate.

I hope this clarifies.


#### <a name="5"></a>Genealogy or Where to Start?

The first step listed above, setting up the View and Data API viewer and displaying a model, including the REST API to handle the authorisation token, is completely based on Philippe Leefsma's [View and Data API boilerplate](https://github.com/leefsmp/view.and.data-boilerplate).

It implements the complete node.js web server, viewer, authorisation token handling and a REST API for the browser client to query the web server for it.

Once that was up and running with the sample model of my choice, I added
the [TransformTool extension](http://viewer.autodesk.io/node/gallery/embed?id=546bf4493a5629a0158bc3a4&extIds=Autodesk.ADN.Viewing.Extension.TransformTool) from
Philippe's [collection of View and Data API JavaScript extensions](https://github.com/Developer-Autodesk/library-javascript-viewer-extensions) for
the viewer, showing what is doable with the client-side JavaScript API.

Those two steps were really quick and easy.

Many thanks to Philippe for his help with them!


#### <a name="6"></a>Capturing the TransformTool Selection

The TransformTool enables a user to interactively select an element in the viewer and manipulate its location.

We need to communicate the selected element external id and the resulting translation vector back to the desktop CAD model.

I renamed the extension module to `Roomedit3dTranslationTool.js` and implemented two variables to capture this data, `_externalId` and `_initialHitPoint`.

Thee external id is determined from the viewer `dbId` in the selection changed event handler like this:

<pre class="prettyprint">
  function onSelectionChanged(event) {
    var dbId = event.dbIdArray[0];

    if(dbId) {
      viewer.getProperties(dbId, function(result){
        //console.log(result);
        _externalId = result.externalId;
      });
    }
    handleSelectionChanged(event.fragIdsArray);
  }
</pre>


#### <a name="7"></a>Determining the TransformTool Translation Vector

The interesting stuff happens in the `handleButtonUp` event handler.

It:

- Queries the current tool location
- Calculates the translation vector `offset`
- Logs the data to the console
- Packages the data
- Sends it from the JavaScript viewer client in the browser to the node.js web server

<pre class="prettyprint">
this.handleButtonUp = function(event, button) {

  if( _isDirty && _externalId && _initialHitPoint ) {
    var offset = subtract_point(
      _transformControlTx.position,
      _initialHitPoint );

    _initialHitPoint = new THREE.Vector3(
      _transformControlTx.position.x,
      _transformControlTx.position.y,
      _transformControlTx.position.z );

    console.log( 'button up: external id '
      + _externalId + ' offset by '
      + pointString( offset ) );

    var data = {
      externalId : _externalId,
      offset : offset
    }

    options.roomedit3dApi.postTransform(data);

    _isDirty = false;
  }

  _isDragging = false;

  if (_transformControlTx.onPointerUp(event))
    return true;

  return false;
};
</pre>



#### <a name="8"></a>POST From Viewer to Server

The `postTransform` function invoked above to POST the translation from the viewer to the web server is implemented by the `Roomedit3dApiClient` using
the [JavaScript `fetch` method(https://fetch.spec.whatwg.org/#dom-global-fetch) defined by]
the [Fetch standard](https://fetch.spec.whatwg.org) and provided by
the [whatwg-fetch npm package](https://www.npmjs.com/package/whatwg-fetch) like this:

<pre class="prettyprint">
var Roomedit3dApiClient = function(args) {

  var _apiUrl = args.baseUrl;

  this.postTransform = function(data) {
    return fetch(_apiUrl + '/transform', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}
</pre>


#### <a name="9"></a>Broadcast via Socket.io

Now we come to the exciting part.

Once the node.js web server has received the translation information from the viewer client in the browser, it broadcasts it to any number of clients using [socket.io](http://socket.io).

In case you are interested, here is a nice [socket.io getting started](http://socket.io/get-started/chat) sample implementing a bidirectional chat.

The node.js server mainline sets up the socket like this:

<pre class="prettyprint">
var io = require('socket.io');
var roomedit3d = require('./routes/api/roomedit3d');

// . . .

app.set('port', process.env.PORT || 3000);

var server = app.listen(
  app.get( 'port' ),
  function() {
    var a = server.address().port;

    console.log(
      'Roomedit3d server ' + pkg.version
      + ' listening at port ' + a + '.'
    );

    var io2 = io(server);

    io2.on('connection', function(client){
      console.log('a client connected to the roomedit3d socket');
    });

    app.use('/api/roomedit3d', roomedit3d(io2));
  }
);
</pre>

The socket is passed in to the `roomedit3d` module, which implements the `api/roomedit3d/transform` POST route and immediately passes the data on to the socket to broadcast like this:

<pre class="prettyprint">
var express = require('express');

module.exports = function(io) {

  var router = express.Router();

  router.post('/transform', function (req, res) {
    console.log(req.body);

    //req.body.externalId; // external id == Revit UniqueId
    //req.body.offset; // THREE.Vector3 offset x y z

    io.sockets.emit('transform', req.body);

    return res.send();
  });

  return router;
}
</pre>

Pretty easy, isn't it?

Subscribing to the broadcast from the desktop in C# is easier still!


#### <a name="10"></a>Desktop Notification Connection and Subscription

I started implementing the [Roomedit3dApp](https://github.com/jeremytammik/Roomedit3dApp) C# .NET Revit API add-in client.

To test the connection and receive the socket broadcast notifications, however, we have no need for all the Revit API overhead.

I implemented the simple stand-alone console test
executable [Roomedit3dSocketTest](https://github.com/jeremytammik/Roomedit3dApp/tree/master/Roomedit3dSocketTest) to do so.

It makes use of the [SocketIoClientDotNet](https://github.com/Quobject/SocketIoClientDotNet) Socket.IO client library for .NET, which is also available as a NuGet package.

Here is the resulting packages.config:

<pre class="code">
<span style="color:blue;">&lt;?</span><span style="color:#a31515;">xml</span><span style="color:blue;">&nbsp;</span><span style="color:red;">version</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">1.0</span>&quot;<span style="color:blue;">&nbsp;</span><span style="color:red;">encoding</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">utf-8</span>&quot;<span style="color:blue;">?&gt;</span>
<span style="color:blue;">&lt;</span><span style="color:#a31515;">packages</span><span style="color:blue;">&gt;</span>
<span style="color:blue;">&nbsp;&nbsp;&lt;</span><span style="color:#a31515;">package</span><span style="color:blue;">&nbsp;</span><span style="color:red;">id</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">EngineIoClientDotNet</span>&quot;<span style="color:blue;">&nbsp;</span><span style="color:red;">version</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">0.9.22</span>&quot;<span style="color:blue;">&nbsp;</span><span style="color:red;">targetFramework</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">net452</span>&quot;<span style="color:blue;">&nbsp;/&gt;</span>
<span style="color:blue;">&nbsp;&nbsp;&lt;</span><span style="color:#a31515;">package</span><span style="color:blue;">&nbsp;</span><span style="color:red;">id</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">Newtonsoft.Json</span>&quot;<span style="color:blue;">&nbsp;</span><span style="color:red;">version</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">8.0.1</span>&quot;<span style="color:blue;">&nbsp;</span><span style="color:red;">targetFramework</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">net452</span>&quot;<span style="color:blue;">&nbsp;/&gt;</span>
<span style="color:blue;">&nbsp;&nbsp;&lt;</span><span style="color:#a31515;">package</span><span style="color:blue;">&nbsp;</span><span style="color:red;">id</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">SocketIoClientDotNet</span>&quot;<span style="color:blue;">&nbsp;</span><span style="color:red;">version</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">0.9.13</span>&quot;<span style="color:blue;">&nbsp;</span><span style="color:red;">targetFramework</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">net452</span>&quot;<span style="color:blue;">&nbsp;/&gt;</span>
<span style="color:blue;">&nbsp;&nbsp;&lt;</span><span style="color:#a31515;">package</span><span style="color:blue;">&nbsp;</span><span style="color:red;">id</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">WebSocket4Net</span>&quot;<span style="color:blue;">&nbsp;</span><span style="color:red;">version</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">0.14.1</span>&quot;<span style="color:blue;">&nbsp;</span><span style="color:red;">targetFramework</span><span style="color:blue;">=</span>&quot;<span style="color:blue;">net452</span>&quot;<span style="color:blue;">&nbsp;/&gt;</span>
<span style="color:blue;">&lt;/</span><span style="color:#a31515;">packages</span><span style="color:blue;">&gt;</span>
</pre>

With the help of that, the console application mainline implements the following steps:

- Set up the socket.io connection
- Post a message when connected
- On receiving a `transform` message, format and log the info
- Loop forever, waiting for messages

That is achieved with the following few lines of code:

<pre class="code">
<span style="color:blue;">using</span>&nbsp;System.Threading;
<span style="color:blue;">using</span>&nbsp;Newtonsoft.Json.Linq;
<span style="color:blue;">using</span>&nbsp;Quobject.SocketIoClientDotNet.Client;
<span style="color:blue;">using</span>&nbsp;System;

<span style="color:blue;">namespace</span>&nbsp;Roomedit3dSocketTest
{
&nbsp;&nbsp;<span style="color:blue;">class</span>&nbsp;<span style="color:#2b91af;">Program</span>
&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue;">const</span>&nbsp;<span style="color:blue;">string</span>&nbsp;_url&nbsp;=&nbsp;<span style="color:#a31515;">&quot;https://roomedit3d.herokuapp.com:443&quot;</span>;

&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue;">static</span>&nbsp;<span style="color:blue;">void</span>&nbsp;Main(&nbsp;<span style="color:blue;">string</span>[]&nbsp;args&nbsp;)
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue;">var</span>&nbsp;options&nbsp;=&nbsp;<span style="color:blue;">new</span>&nbsp;<span style="color:#2b91af;">IO</span>.<span style="color:#2b91af;">Options</span>()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IgnoreServerCertificateValidation&nbsp;=&nbsp;<span style="color:blue;">true</span>,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AutoConnect&nbsp;=&nbsp;<span style="color:blue;">true</span>,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ForceNew&nbsp;=&nbsp;<span style="color:blue;">true</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#2b91af;">Socket</span>&nbsp;socket&nbsp;=&nbsp;<span style="color:#2b91af;">IO</span>.Socket(&nbsp;_url,&nbsp;options&nbsp;);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;socket.On(&nbsp;<span style="color:#2b91af;">Socket</span>.EVENT_CONNECT,&nbsp;()&nbsp;=&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#2b91af;">Console</span>.WriteLine(&nbsp;<span style="color:#a31515;">&quot;Connected&quot;</span>&nbsp;);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;socket.On(&nbsp;<span style="color:#a31515;">&quot;transform&quot;</span>,&nbsp;(data)&nbsp;=&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#2b91af;">JObject</span>&nbsp;data2&nbsp;=&nbsp;<span style="color:#2b91af;">JObject</span>.FromObject(&nbsp;data&nbsp;);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#2b91af;">Console</span>.WriteLine(&nbsp;<span style="color:blue;">string</span>.Format(
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a31515;">&quot;transform:&nbsp;externalId={0}&nbsp;({1:0.00},{2:0.00},{3:0.00})&quot;</span>,&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data2[<span style="color:#a31515;">&quot;externalId&quot;</span>],&nbsp;data2[<span style="color:#a31515;">&quot;offset&quot;</span>][<span style="color:#a31515;">&quot;x&quot;</span>],&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data2[<span style="color:#a31515;">&quot;offset&quot;</span>][<span style="color:#a31515;">&quot;y&quot;</span>],&nbsp;data2[<span style="color:#a31515;">&quot;offset&quot;</span>][<span style="color:#a31515;">&quot;z&quot;</span>]&nbsp;)&nbsp;);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue;">while</span>&nbsp;(&nbsp;<span style="color:blue;">true</span>&nbsp;)&nbsp;{&nbsp;<span style="color:#2b91af;">Thread</span>.Sleep(&nbsp;100&nbsp;);&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;}
}
</pre>


#### <a name="11"></a>Demo Recording

Here is a [six-minute demo recording](https://youtu.be/5IBd-L3cD3Y) showing:

- View and Data API viewer running locally
- The viewer extension
- The viewer echoing the translation data in the JavaScript debugger console
- The node server logging the POST data received from the viewer when running locally, and forwarding it to the socket.io broadcast
- The same steps running Heroku-hosted in the cloud
- The console app connecting to the cloud and logging the translation messages as they are sent and received

<center>
<iframe width="480" height="270" src="https://www.youtube.com/embed/5IBd-L3cD3Y" frameborder="0" allowfullscreen></iframe>
</center>


#### <a name="12"></a>Download and Diff

The current versions
of [roomedit3d](https://github.com/jeremytammik/roomedit3d)
and [Roomedit3dApp](https://github.com/jeremytammik/Roomedit3dApp) discussed above
are [release 0.0.4](https://github.com/jeremytammik/roomedit3d/releases/tag/0.0.4)
and [release 2017.0.0.2](https://github.com/jeremytammik/Roomedit3dApp/releases/tag/2017.0.0.2),
respectively.


#### <a name="13"></a>To Do

The Roomedit3dSocketTest console application is just a proof of concept.

Obviously, I now want to implement the real thing:

- Complete the [Roomedit3dApp](https://github.com/jeremytammik/Roomedit3dApp) C# .NET Revit API add-in client with its external event, transform message handling, BIM update, etc.
- Besides translation, I would also like the View and Data extension to handle rotation in the XY plane.
- Since this runs so well here, I would like to update
the [FireRatingCloud](https://github.com/jeremytammik/FireRatingCloud) sample
to use the same technology and implement a socket.io connection between the FireRatingCloud C# .NET Revit add-in and
its [fireratingdb](https://github.com/jeremytammik/firerating) node.js web and MongoDB server.

Not to mention much more urgent other things, such as preparing for the upcoming [Forge DevCon](http://forge.autodesk.com/conference)!

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

CompHound on iPad Chrome and Node Env #Heroku #3dwebcoder #revitapi #nodejs #adsk #ViewAndDataAPI #jquery #javascript

I returned from my vacation in Andalusia.
So far, I spent much too much time this week working on Revit API issues and getting ready for the Revit Technology Conference.
I managed to squeeze in a few enhancements to the CompHound component tracker project as well
&ndash; Cyrille's error handling and handlebars fixes
&ndash; Report the NODE_ENV setting
&ndash; Heroku NODE_ENV defaults to production
&ndash; Updating the LMV viewer version
&ndash; Obsolete iPad hardware
&ndash; CompHound running on iPad in Chrome
&ndash; Regular ordinary Swedish meal time...

-->


### CompHound on iPad Chrome and Node Env

I returned from
my [vacation in Andalusia](https://www.flickr.com/gp/jeremytammik/6D2J6x):

<center>
<a data-flickr-embed="true"  href="https://www.flickr.com/photos/jeremytammik/albums/72157660051613645" title="Andalusia"><img src="https://farm6.staticflickr.com/5680/22315119061_3ca41c23d8_n.jpg" width="320" height="240" alt="Andalusia"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
</center>

So far, I spent much too much time this week working on Revit API issues and getting ready for
the Revit Technology Conference [RTC Europe](http://www.rtcevents.com/rtc2015eu) in
Budapest next week.

I managed to squeeze in a few enhancements to
the [CompHound](https://github.com/CompHound) component tracker project as well, though, including some of
the [to-do items](http://the3dwebcoder.typepad.com/blog/2015/10/single-column-comphound-viewer-on-ipad.html#5) I listed before leaving:

- [Cyrille's error handling and handlebars fixes](#2)
- [Report the NODE_ENV setting](#3)
- [Heroku NODE_ENV defaults to production](#4)
- [Updating the LMV viewer version](#5)
- [Obsolete iPad hardware](#6)
- [CompHound running on iPad in Chrome](#7)
- [Regular ordinary Swedish meal time](#8)


#### <a name="2"></a>Cyrille's Error Handling and Handlebars Fixes

Cyrille very kindly improved the node web server error handling and handlebars fixes.

More of the views are now handled by `handlebars` and defined in the [view](https://github.com/CompHound/CompHoundWeb/tree/master/view) subfolder:

- `count.handlebars`
- `error.handlebars`
- `instances1.handlebars`

The error handling enhancements mainly
affect the lines around 152-185 in [server.js](https://github.com/CompHound/CompHoundWeb/blob/master/server.js#L152-L185) and are captured
in [CompHoundWeb release 0.0.34](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.34):

<pre class="prettyprint">
  // Catch 404 and forward to error handler.

  app.use (function (req, res, next) {
    var err =new Error ('Error 404 - Resource Not Found') ;
    err.status =404 ;
    next (err) ;
  }) ;

  // Error handlers

  var node_env = app.get ('env');

  // Development error handler, prints stack trace.

  if ( node_env === 'development') {
    app.use (function (err, req, res, next) {
      res.status (err.status || 500) ;
      res.render ('error', {
        message: err.message,
        error: err
      }) ;
    }) ;
  }

  // Production error handler;
  // no stack traces leaked to user.

  app.use (function (err, req, res, next) {
    res.status (err.status || 500) ;
    res.render ('error', {
      message: err.message,
      error: {}
    }) ;
  }) ;
</pre>

Many thanks to Cyrille for taking a look at this!


#### <a name="3"></a>Check and Report the NODE_ENV Setting

Before leaving for vacation, I wondered about the code

<pre class="prettyprint">
  if ( app.get ('env') === 'development') {
</pre>

The node `env` setting is controlled by the environment variable NODE_ENV.

You can set it to `production` to run the node server in production mode.

Then, no debugging is possible.

As you can see above, I now store that setting in the variable `node_env` and report the setting after completing the server startup like this:

<pre class="prettyprint">
  var server = app.listen(
    app.get( 'port' ),
    function() {
      var h = db.host;
      if( -1 < h.indexOf('localhost') ) { h = 'locally '; }
      else if( -1 < h.indexOf('mongolab') ) { h = 'mongolab-'; }

      console.log( 'CompHound ' + node_env
        + ' server ' + pkg.version
        + ' listening at port ' + server.address().port
        + ' with ' + h + 'hosted mongo db.');
    }
  );
</pre>

This enhancement is captured
in [CompHoundWeb release 0.0.36](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.36).

If nothing is specified in the OS system environment, the node env setting defaults to `development`:

<pre>
$ node server.js
Connection to comphound database at ds051543.mongolab.com established.
CompHound development server 0.0.38 listening at port 8042 with mongolab-hosted mongo db.
</pre>


#### <a name="4"></a>Heroku NODE_ENV Defaults to Production

One of the many nice aspect about the semi-automatic [Heroku](http://www.herokuapp.com) deployment
is that the node environment there automatically defaults to `production` instead:

<center>
<img src="img/heroku_node_env.png" alt="Default Heroku NODE_ENV set to production" width="498"/>
</center>


#### <a name="5"></a>Updating the LMV Viewer Version

Before my vacation,
I enabled [picking a datatable record on iPad](http://the3dwebcoder.typepad.com/blog/2015/10/single-column-comphound-viewer-on-ipad.html#3).

However, the LMV viewer failed to load, producing the infamous `load error: 4` error message.

Cyrille debugged on a iPad simulator and suggested using a newer version of
the [View and Data API](https://developer.autodesk.com/) viewer, so I raised the LMV version number from 1.2.16 to 1.2.21
in [datatable2.html](https://github.com/CompHound/CompHoundWeb/blob/master/public/datatable2.html):

<pre class="prettyprint">
&lt;link rel="stylesheet" href="https://developer.api.autodesk.com/viewingservice/v1/viewers/style.css?v=v1.2.21" type="text/css"/&gt;
. . .
&lt;script src="https://developer.api.autodesk.com/viewingservice/v1/viewers/viewer3D.min.js?v=v1.2.21"&gt;&lt;/script&gt;
</pre>


#### <a name="6"></a>Obsolete iPad Hardware

Unfortunately, that did not help me get the viewer running on my iPad hardware.

It still worked for Cyrille on the simulator and not for me on the real device.

[Shiya Luo](http://www.shiyaluo.com) asked for the exact iPad version details, listed under Settings &gt; General &gt; About:

- Version: 9.0.1 (13A404)
- Model: MD368FD/A

This model number seems to be a 3rd generation iPad  marketed in 2012, as you will see by searching
for [iPad model number MD368FD/A](https://duckduckgo.com/?q=iPad+model+number+MD368FD%2FA).

Apple did not guarantee support for WebGL until iOS 8, which came out in 2014 with iPhone 6.

In 2014 iPad Air 2 and iPad mini with Retina display were released as well.

From then on, WebGL is fully supported.

All previous devices have only limited support, even after updating to the latest iOS.

It is a safe bet that this is a device issue.

Time to get the latest shiniest gadget &ndash; :P

If we see Apple devices after 2015 not showing the viewer, that should be reported to the viewer team.



#### <a name="7"></a>CompHound running on iPad in Chrome

Luckily, I found a fix for my old piece of hardware as well.

Even though I cannot use the LMV on the iPad in Safari, it comes up fine in Google Chrome.

Problem solved.

More coming soon.

To wrap up, let me share one last item, something completely different, on modern traditional cookery.



#### <a name="8"></a>Regular Ordinary Swedish Meal Time

I grew up in Sweden and am strongly influenced by that culture.

My German friend Michaela has also grown to appreciate it very much, enjoy the beautiful nature on frequent holiday trips, and even learned the language fluently.

She pointed out a nice series of YouTube video clips highlighting many traditional Swedish dishes, cooked with a lot of enthusiasm, energy and free-flowing emotions:
[Regular Ordinary Swedish Meal Time](https://www.youtube.com/user/SwedishMealTime).

She particularly pointed out the following dishes to me:

- [Toxic cheesecake](https://www.youtube.com/watch?v=fYMiQ04ISss)
- [Killer kalops](https://www.youtube.com/watch?v=c4uTMHQtYrw)
- [Power pea soup and patriotic pankakes](https://www.youtube.com/watch?v=17dmabeA79U)

<center>
<iframe width="480" height="270" src="https://www.youtube.com/embed/fYMiQ04ISss?rel=0" frameborder="0" allowfullscreen></iframe>
</center>

Enjoy!

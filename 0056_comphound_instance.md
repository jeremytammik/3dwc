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
#aws #handlebars
#ViewAndDataAPI
#javascript
#JsFiddle #Reactjs
#autodesku #rtceur
akn_include

CompHound Instance View #Reactjs #Heroku #MongoDB #3dwebcoder #revitapi #nodejs #adsk #mongolab #jquery

I worked through parts of the nice comprehensive beginner’s guide to ReactJS. When I tried to implement selecting a database row to populate the react component from outside, I discovered that "You're never supposed to set a component's state outside of the component." That turned me off any further investigation and I took resort to jQuery instead, where I made much faster progress...

-->


### CompHound Instance View

I continued looking at react.js, working through parts of the
nice [comprehensive beginner’s guide to ReactJS](http://antjanus.com/blog/web-development-tutorials/front-end-development/comprehensive-beginners-guide-to-reactjs).

When I tried to implement selecting a database row to populate the react component from outside, I discovered a statement in the discussion
on [generating events outside of reactjs app](http://stackoverflow.com/questions/31354881/reactjs-generating-events-outside-of-reactjs-app) saying,
"You're never supposed to set a component's state outside of the component."

That turned me off any further investigation.

In about a tenth of the time I'd already spent investigating react, I implemented what I want in pure jquery and am happy with that.

The HTML file defines a `div` to populate with the selected component occurrence properties:

<pre class="prettyprint">
  &lt;div class="selected-instance"&gt;
    &lt;!-- Selected component occurrence: --&gt;
    &lt;p id="instance"&gt;Please select a component occurrence below:&lt;/p&gt;
    &lt;table id="instance"&gt;
    &lt;/table&gt;
  &lt;/div&gt;
</pre>

The population is achieved with the jquery function below, which performs the following tasks:

- Define and register the database row click event handler
- Read the row data from the `tr`
- Set the `p` text
- Add the table entries to the DOM

<pre class="prettyprint">
$(document).ready(function() {

  $("div#datatable_wrapper &gt; table#datatable &gt; tbody &gt; tr &gt; td")
    .live('click', function() {

      var tr = $(this).parent("tr");

      $("p#instance").text('Selected component occurrence:');
      var table = $("table#instance");
      table.empty();
      var i = 0;
      tr.find("td").each(function() {
        table.append('&lt;tr&gt;&lt;td&gt;' + capitalize(columnNames[i++])
          + '&lt;/td&gt;&lt;td&gt;' + $(this).text() + '&lt;/td&gt;&lt;/tr&gt;' );
      });
    });
});
</pre>

You can try it out live by following
this [link to the `/datatable2` route](https://comphound.herokuapp.com/datatable2) and
clicking on any row in the table.

All the source code is available from the [CompHound](https://github.com/CompHound) organisation repositories.
The current versions discussed above are the web
server [CompHoundWeb 0.0.19](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.19) and
the C# REST API
client [CompHoundRvt 2016.0.0.4](https://github.com/CompHound/CompHoundRvt/releases/tag/2016.0.0.4).

The other links to [Try it out Live](https://github.com/CompHound/CompHound.github.io#try-it-out-live) are also up and running, of course.

Now I am gradually approaching the exciting part, setting up
the [View and Data API](https://developer.autodesk.com/) viewer.

Here is the current state of the to-do list:

- Add a View and Data API viewing component.
- Implement the authorisation administration for it.
- Implement model translation for the viewer.
- Implement isolated viewing of an individual selected instance.
- Set up and reroute the [comphound.net](http://comphound.net) domain.
- Implement a possibility to edit some component occurrence properties.

The deadline for handing in my material for the conference presentations at [RTC Europe](http://www.rtcevents.com/rtc2015eu) in Budapest at the end of October is looming, so I will probably have to present this as work in progress there.

Hopefully I can get it more completely wrapped up by the time of [Autodesk University](http://au.autodesk.com/) in Las Vegas in the beginning of December.

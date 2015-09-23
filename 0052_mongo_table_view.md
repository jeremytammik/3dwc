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

#mongolab #heroku #mongoosejs #expressjs
#Autodesk #IoT #SeeControl #cloud #adsk
#3dwebcoder #python #adskdevnetwrk #adsk #markdown #asciidoc
#gcal #caldav #cloud #googleapi #restapi
#milanojs
#3dwebaccel #prague #webgl #3dweb #a360
#au2015 #autocad #inventor #ah8 #cubeathens #developers
#aws #revitapi #jquery #handlebars #heroku
#ViewAndDataAPI
#JsFiddle #Reactjs #3dwebcoder #autodesku #rtceur
akn_include
#RestSharp

The CompHound #Mongoose DataTable #MongoDB #3dwebcoder #revitapi #jquery #javascript #nodejs #adsk #bim #aec

I continued working on the CompHound component tracker project. To-do:
&ndash; Implement a datatable view
&ndash; Post the server live to Heroku
&ndash; Add a View and Data API viewing component
&ndash; Reroute the comphound.net domain...
The solution was easy
&ndash; Hooking up the mongoose-datatable
&ndash; Implementing a row clicked event handler...

-->


### The CompHound Mongoose DataTable

I continued working on the
[CompHound component tracker project](https://github.com/comphound).
My previous to-do list included the following steps:

- Implement a datatable view
- Post the server live to Heroku
- Add a [View and Data API](https://developer.autodesk.com/) viewing component
- Reroute the [comphound.net](http://comphound.net) domain to it

I worked on the first of them in the past few days.

The solution was actually very easy:

- [Hooking up the mongoose-datatable](#2)
- [Implementing a row clicked event handler](#3)


#### <a name="2"></a>Hooking up the mongoose-datatable

Viewing a database obviously requires a datatable.

The datatable retrieves a subset of database records required for the current view, known as
[pagination](https://en.wikipedia.org/wiki/Pagination).

Happily, [DataTables](http://www.datatables.net) provides a suitable plug-in for jQuery.

Before realising that, I struggled a bit to
[display the database in a table](http://the3dwebcoder.typepad.com/blog/2015/09/towards-a-comphound-mongo-database-table-view.html#2).

Once I had that up and running, the need for a real scalable
[server side mongo database table view](http://the3dwebcoder.typepad.com/blog/2015/09/towards-a-comphound-mongo-database-table-view.html#4) became apparent.

That was quite easily achieved by plugging in the
[mongoose-datatable](https://github.com/eherve/mongoose-datatable).

Integrating that, looking at and learning from various samples of using it prompted several important improvements:

- [0.0.7](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.7) implemented config.json server configuration
- [0.0.8](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.8) improved config.json server configuration
- [0.0.9](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.9) check db connection before launching web server
- [0.0.10](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.10) mongoose datatable is up and running
- [0.0.11](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.11) cleanup and smaller datatable font size

The resulting datatable looks like this:

<center>
<img src="img/comphound_datatable.png" alt="CompHound datatable"/>
</center>



#### <a name="4"></a>Implementing a row clicked event handler

Once I can view and navigate the database records, each of them displaying a component instance, I wish to select a specific occurrence to explore it further and display it graphically.

Ergo, a row selection handler is required.

This turned out to be really simple as well, and happily completely disconnected from the datatable implementation.

Based on the StackOverflow answers to
[jQuery &ndash; click event on <tr> elements with in a table and getting <td> element values](http://stackoverflow.com/questions/3458571/jquery-click-event-on-tr-elements-with-in-a-table-and-getting-td-element-v),
I simply added the following snippet to `index.js`:

<pre class="prettyprint">
$(document).ready(function() {
  $("div#datatable_wrapper > table#datatable > tbody > tr > td")
    .live('click', function() {
      alert("You clicked my <td>: " + $(this).html()
       + "... My TR is: " + $(this).parent("tr").html());
    }
  );
});
</pre>

This specifies a very strict path to the `td` element, including its entire list of parent elements, leaving none out, and not allowing any intermediate levels.

A more lenient and equally valid way would be to just use the path `div#datatable_wrapper tbody td`.

Here is the result of clicking a row now:

<center>
<img src="img/comphound_datatable_row_alert.png" alt="CompHound datatable row selection alert"/>
</center>



#### <a name="5"></a>CompHound Road Map

The next steps on the
[CompHound project](https://github.com/comphound) will
include:

- Deploying the server live to Heroku
- Adding the [View and Data API](https://developer.autodesk.com/) viewing component
- Rerouting the nice new [comphound.net](http://comphound.net) domain to it

The current versions discussed above are the
[CompHoundWeb 0.0.12](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.12) node.js mongodb web server,
[CompHoundRvt 2016.0.0.2](https://github.com/CompHound/CompHoundRvt/releases/tag/2016.0.0.2) C# REST API client populating it, and
the (placeholder) landing page
[CompHound.github.io 0.0.1](https://github.com/CompHound/CompHound.github.io/releases/tag/0.0.1).

<!---

<center>
<img src="img/.png" alt="" width="600"/>
</center>

-->

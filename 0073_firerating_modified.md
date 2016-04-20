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

FireRatingCloud Query Retrieving Updated Docs #3dwebcoder #revitapi #3dweb @AutodeskForge #nodejs @expressjs

Yesterday, I added a timestamp to my FireRatingCloud mongodb documents with the intention of retrieving only documents modified after a specific moment. Today, let's look at filtering for and retrieving just those. Here are the steps to achieve that
&ndash; A MongoDB query and express route using <code>$gt</code>
&ndash; C# REST API client accessing the new route
&ndash; Download and diff...

-->


### FireRatingCloud Query Retrieving Updated Docs

Yesterday, I [added a timestamp](http://the3dwebcoder.typepad.com/blog/2016/04/fireratingcloud-document-modification-timestamp.html) to
my FireRatingCloud mongodb documents with the intention of retrieving only documents modified after a specific moment.

Today, let's look at filtering for and retrieving just those.

Here are the steps to achieve that:

- [A MongoDB query and express route using `$gt`](#2)
- [C# REST API client accessing the new route](#3)
- [Download and diff](#4)


#### <a name="1"></a>Modern JavaScript Bundling Tools

Before getting to that, here is a quick pointer to a thorough and interesting article on consolidating modern JavaScript tooling from [Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html), who says:

> Here is a worthy read to
help [understanding JavaScript modules, bundling and  transpiling](http://www.sitepoint.com/javascript-modules-bundling-transpiling).

The gist of the article is providing an overview of and a solution for the current complex situation:

> Personally, I don’t care for building asset pipelines any longer, what I’m looking for is minimal config tools that allow me to use modern tooling as needed: Things like Sass, Autoprefixer, Babel and Coffeescript, a proper module system and loader without having to worry about the implementation, configuration and ongoing maintenance. In essence, every developer has been investing time into creating asset pipelines over the last few years, that’s a lot of wheel re-invention going on and a lot of wasted hours.

It wraps up saying:

> If you just want to use modules, then Browserify, jspm or Webpack with the default options will do the job.

> Keep the tooling simple and the configuration light. Happy Bundling.




#### <a name="2"></a>A MongoDB Query and Express Route Using $gt

I can very easily retrieve all documents from a mongo db for a specific BIM project with a `modified` timestamp greater than the one specified in the REST API query like this:

<pre class="prettyprint">
  findAllForProjectModifiedAfter : function(req, res){
    var pid = req.params.pid;
    var mod = req.params.mod;
    Door.find({'project_id':pid, modified:{$gt:mod}},
      function(err, results) {
        return res.send(results);
      }
    );
  }
</pre>

I added that new method to `controller/doors_v1.js`.

Here is the new REST API route definition to populate the `mod` parameter and access this method in `routes.js`:

<pre class="prettyprint">
  app.get( '/api/v1/doors/project/:pid/newer/:mod',
    DoorService.findAllForProjectModifiedAfter );
</pre>


#### <a name="3"></a>C&#35; REST API client accessing the new route

The interesting part will be to implement the C# client to use the new access point in an intelligent manner.

Just making the individual call is no problem, but implementing a continuous real-time BIM update will require more than that, e.g., an external event.

That in turn will require some rethinking and re-architecturing of the Revit external application to manage the external event subscription and handling.

Just for testing purposes, however, I can simply add the timestamp and the new REST API route to the existing retrieval of all records for the current project like this, using the static Boolean variable `_test_newer` to turn on the test code when needed:

<pre class="code">
&nbsp; <span class="green">// Determine custom project identifier.</span>
&nbsp;
&nbsp; <span class="blue">string</span> project_id = <span class="teal">Util</span>.GetProjectIdentifier( doc );
&nbsp;
&nbsp; <span class="green">// Get all doors referencing this project.</span>
&nbsp;
&nbsp; <span class="blue">string</span> query = <span class="maroon">&quot;doors/project/&quot;</span> + project_id;
&nbsp;
&nbsp; <span class="blue">if</span>( _test_newer )
&nbsp; {
&nbsp; &nbsp; <span class="green">// Add timestamp to query.</span>
&nbsp;
&nbsp; &nbsp; <span class="blue">int</span> timestamp = <span class="teal">Util</span>.UnixTimestamp();
&nbsp;
&nbsp; &nbsp; timestamp -= 30; <span class="green">// go back half a minute</span>
&nbsp;
&nbsp; &nbsp; <span class="teal">Debug</span>.Print(
&nbsp; &nbsp; &nbsp; <span class="maroon">&quot;Retrieving door documents modified after {0}&quot;</span>,
&nbsp; &nbsp; &nbsp; timestamp );
&nbsp;
&nbsp; &nbsp; query += <span class="maroon">&quot;/newer/&quot;</span> + timestamp.ToString();
&nbsp; }
&nbsp;
&nbsp; <span class="teal">List</span>&lt;FireRating.<span class="teal">DoorData</span>&gt; doors = <span class="teal">Util</span>.Get( query );
&nbsp;
&nbsp; <span class="blue">if</span>( <span class="blue">null</span> != doors &amp;&amp; 0 &lt; doors.Count )
&nbsp; {
&nbsp; &nbsp; <span class="green">// Process the door documents and update the BIM...</span>
</pre>

I leave `_test_newer` turned off by default;
I can turn it on at will in the debugger:

<pre class="code">
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;summary&gt;</span>
&nbsp; <span class="gray">///</span><span class="green"> Test retrieving only recently modified records.</span>
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;/summary&gt;</span>
&nbsp; <span class="blue">static</span> <span class="blue">bool</span> _test_newer = <span class="blue">false</span>;
</pre>


#### <a name="6"></a>Download and Diff

The current versions
of [FireRatingCloud](https://github.com/jeremytammik/FireRatingCloud)
and [fireratingdb](https://github.com/jeremytammik/firerating) discussed above
are [release 2016.0.0.25](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.25)
and [release 0.0.21](https://github.com/jeremytammik/firerating/releases/tag/0.0.21),
respectively.

You can examine the changes required to implement the `findAllForProjectModifiedAfter` and the REST API route `project/:pid/newer/:mod`
by [comparing the last two fireratingdb releases](https://github.com/jeremytammik/firerating/compare/0.0.20...0.0.21),
and [analogously for the C# test code](https://github.com/jeremytammik/FireRatingCloud/compare/2016.0.0.24...2016.0.0.25).

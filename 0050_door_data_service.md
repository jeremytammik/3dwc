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

C# DoorData and Node.js DoorService Classes #Mongodb #Mongoose #3dwebcoder #revitapi #restapi #javascript #nodejs #adskdevnetwrk #adsk #bim #aec

I continued improving my REST API node.js web server, mongo database and C# REST API client, and also set up a Google domain rerouting
&ndash; CompHound domain, organisation web site and rerouting
&ndash; Implement a DoorData container class
&ndash; Updated Get to return a list of deserialised DoorData instances
&ndash; Pass a DoorData instance to the Put method
&ndash; Implementing a REST API router DoorService class...

-->


### C# DoorData and Node.js DoorService Classes

I continued implementing the numerous improvements suggested by
[Philippe Leefsma](http://adndevblog.typepad.com/autocad/philippe-leefsma.html) to
my REST API node.js web server, mongo database and C# REST API client:

- [CompHound domain, organisation web site and rerouting](#2)
- [Implementing a DoorData container class](#3)
- [Updating Get to return a list of deserialised DoorData instances](#4)
- [Passing a DoorData instance to the Put method](#5)
- [Implementing a REST API router DoorService class](#6)

This finally completes the list improvements to the
[FireRating in the cloud](https://github.com/jeremytammik/firerating) sample:

- Implement a door data container object
- Convert GET and PUT to use arrays of door objects
- Use the RestSharp templated object transfer and deserialiser
- Set up the web server to use the `{upsert:true}` option

After I finish writing this, I can switch back and continue work on the new
[CompHound component tracker](http://the3dwebcoder.typepad.com/blog/2015/09/comphound-restsharp-mongoose-put-and-post.html#2) in
preparation for my upcoming conference presentations at
[RTC Europe](http://www.rtcevents.com/rtc2015eu) in Budapest end of October and
[Autodesk University](http://au.autodesk.com) in Las Vegas in December.


#### <a name="2"></a>CompHound Domain, Organisation Web Site and Rerouting

By the way, I already reserved the
[comphound.net](http://comphound.net) domain and set up a skeleton web site for the
[CompHound organisation](https://github.com/comphound), with a lot of help from my colleague
[Kean Walmsley](http://through-the-interface.typepad.com/through_the_interface/about-the-author.html).

By the way, I am happy to say that Kean is here with us this week at the
[Prague Autodesk Cloud Accelerator](http://autodeskcloudaccelerator.com/prague),
mainly providing support for the
[AutoCAD I/O web service](http://autocad.io), e.g., demonstrating his
[Jigsawify app](http://through-the-interface.typepad.com/through_the_interface/2015/08/lets-get-physical-laser-cutting-the-output-from-jigsawifycom.html).

Anyway, following Kean's lead, I implemented a normal GitHub Pages web site for the CompHound organisation, accessible through
[comphound.github.io](https://comphound.github.io).

I paid $12 to buy the top-level domain name `comphound.net` from
[Google domains](http://domains.google.com) and set up the domain properties to route the `comphound.net` domain to the GitHub Pages web site:

<center>
<img src="img/comphound_net_google_domain.png" alt="Comphound Google domain properties" width="600"/>
</center>


#### <a name="3"></a>Implementing a DoorData Container Class

Back to the firerating sample, I continued the seemingly never-ending process of perfectioning the
[firerating mongo database node.js web server](https://github.com/jeremytammik/firerating) and its
[FireRatingCloud C# REST client](https://github.com/jeremytammik/FireRatingCloud).

I'm getting there, though!

The steps today define an explicit helper class for RestSharp to serialise and deserialise the door data between the C# client and the REST API calls:

<pre class="code">
<span class="blue">class</span> <span class="teal">DoorData</span>
{
&nbsp; <span class="blue">public</span> <span class="blue">string</span> _id { <span class="blue">get</span>; <span class="blue">set</span>; }
&nbsp; <span class="blue">public</span> <span class="blue">string</span> project_id { <span class="blue">get</span>; <span class="blue">set</span>; }
&nbsp; <span class="blue">public</span> <span class="blue">string</span> level { <span class="blue">get</span>; <span class="blue">set</span>; }
&nbsp; <span class="blue">public</span> <span class="blue">string</span> tag { <span class="blue">get</span>; <span class="blue">set</span>; }
&nbsp; <span class="blue">public</span> <span class="blue">double</span> firerating { <span class="blue">get</span>; <span class="blue">set</span>; }
&nbsp;
&nbsp;
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;summary&gt;</span>
&nbsp; <span class="gray">///</span><span class="green"> Constructor to populate instance by </span>
&nbsp; <span class="gray">///</span><span class="green"> deserialising the REST GET response.</span>
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;/summary&gt;</span>
&nbsp; <span class="blue">public</span> DoorData()
&nbsp; {
&nbsp; }
&nbsp;
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;summary&gt;</span>
&nbsp; <span class="gray">///</span><span class="green"> Constructor from BIM to serialise for</span>
&nbsp; <span class="gray">///</span><span class="green"> the REST POST or PUT request.</span>
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;/summary&gt;</span>
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;param name=&quot;door&quot;&gt;&lt;/param&gt;</span>
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;param name=&quot;project_id&quot;&gt;&lt;/param&gt;</span>
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;param name=&quot;paramGuid&quot;&gt;&lt;/param&gt;</span>
&nbsp; <span class="blue">public</span> DoorData(
&nbsp; &nbsp; <span class="teal">Element</span> door,
&nbsp; &nbsp; <span class="blue">string</span> project_id_arg,
&nbsp; &nbsp; <span class="teal">Guid</span> paramGuid )
&nbsp; {
&nbsp; &nbsp; <span class="teal">Document</span> doc = door.Document;
&nbsp;
&nbsp; &nbsp; _id = door.UniqueId;
&nbsp;
&nbsp; &nbsp; project_id = project_id_arg;
&nbsp;
&nbsp; &nbsp; level = doc.GetElement( door.LevelId ).Name;
&nbsp;
&nbsp; &nbsp; tag = door.get_Parameter(
&nbsp; &nbsp; &nbsp; <span class="teal">BuiltInParameter</span>.ALL_MODEL_MARK ).AsString();
&nbsp;
&nbsp; &nbsp; firerating = door.get_Parameter( paramGuid )
&nbsp; &nbsp; &nbsp; .AsDouble();
&nbsp; }
}
</pre>


#### <a name="4"></a>Updating Get to Return a List of Deserialised DoorData Instances

With the DoorData class in place, I updated the RestSharp REST API GET method to return a list of deserialised DoorData instances like this:

<pre class="code">
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;summary&gt;</span>
&nbsp; <span class="gray">///</span><span class="green"> GET JSON document data from </span>
&nbsp; <span class="gray">///</span><span class="green"> the specified mongoDB collection.</span>
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;/summary&gt;</span>
&nbsp; <span class="blue">public</span> <span class="blue">static</span> <span class="teal">List</span>&lt;<span class="teal">DoorData</span>&gt; Get(
&nbsp; &nbsp; <span class="blue">string</span> collection_name_and_id )
&nbsp; {
&nbsp; &nbsp; <span class="blue">var</span> client = <span class="blue">new</span> <span class="teal">RestClient</span>( RestApiBaseUrl );
&nbsp;
&nbsp; &nbsp; <span class="blue">var</span> request = <span class="blue">new</span> <span class="teal">RestRequest</span>( _api_version + <span class="maroon">&quot;/&quot;</span>
&nbsp; &nbsp; &nbsp; + collection_name_and_id, <span class="teal">Method</span>.GET );
&nbsp;
&nbsp; &nbsp; <span class="teal">IRestResponse</span>&lt;<span class="teal">List</span>&lt;<span class="teal">DoorData</span>&gt;&gt; response
&nbsp; &nbsp; &nbsp; = client.Execute&lt;<span class="teal">List</span>&lt;<span class="teal">DoorData</span>&gt;&gt;( request );
&nbsp;
&nbsp; &nbsp; <span class="blue">return</span> response.Data;
&nbsp; }
</pre>

It's getting shorter and simpler all the time, isn't it?

The mainline call to make use of this is shorter, simpler and more maintainable too:

<pre class="code">
&nbsp; <span class="green">// Determine custom project identifier.</span>
&nbsp;
&nbsp; <span class="blue">string</span> project_id = <span class="teal">Util</span>.GetProjectIdentifier( doc );
&nbsp;
&nbsp; <span class="green">// Get all doors referencing this project.</span>
&nbsp;
&nbsp; <span class="blue">string</span> query = <span class="maroon">&quot;doors/project/&quot;</span> + project_id;
&nbsp;
&nbsp; <span class="teal">List</span>&lt;<span class="teal">DoorData</span>&gt; doors = <span class="teal">Util</span>.Get( query );
&nbsp;
&nbsp; <span class="blue">if</span>( <span class="blue">null</span> != doors &amp;&amp; 0 &lt; doors.Count )
&nbsp; {
&nbsp; &nbsp; <span class="blue">using</span>( <span class="teal">Transaction</span> t = <span class="blue">new</span> <span class="teal">Transaction</span>( doc ) )
&nbsp; &nbsp; {
&nbsp; &nbsp; &nbsp; t.Start( <span class="maroon">&quot;Import Fire Rating Values&quot;</span> );
&nbsp;
&nbsp; &nbsp; &nbsp; <span class="green">// Retrieve element unique id and </span>
&nbsp; &nbsp; &nbsp; <span class="green">// FireRating parameter values.</span>
&nbsp;
&nbsp; &nbsp; &nbsp; <span class="blue">foreach</span>( <span class="teal">DoorData</span> d <span class="blue">in</span> doors )
&nbsp; &nbsp; &nbsp; {
&nbsp; &nbsp; &nbsp; &nbsp; <span class="blue">string</span> uid = d._id;
&nbsp; &nbsp; &nbsp; &nbsp; <span class="teal">Element</span> e = doc.GetElement( uid );
&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; <span class="blue">if</span>( <span class="blue">null</span> == e )
&nbsp; &nbsp; &nbsp; &nbsp; {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message = <span class="blue">string</span>.Format(
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="maroon">&quot;Error retrieving element for &quot;</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; + <span class="maroon">&quot;unique id {0}.&quot;</span>, uid );
&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="blue">return</span> <span class="teal">Result</span>.Failed;
&nbsp; &nbsp; &nbsp; &nbsp; }
&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; <span class="teal">Parameter</span> p = e.get_Parameter( paramGuid );
&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; <span class="blue">if</span>( <span class="blue">null</span> == p )
&nbsp; &nbsp; &nbsp; &nbsp; {
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message = <span class="blue">string</span>.Format(
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="maroon">&quot;Error retrieving shared parameter on &quot;</span>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; + <span class="maroon">&quot; element with unique id {0}.&quot;</span>, uid );
&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="blue">return</span> <span class="teal">Result</span>.Failed;
&nbsp; &nbsp; &nbsp; &nbsp; }
&nbsp; &nbsp; &nbsp; &nbsp; <span class="blue">object</span> fire_rating = d.firerating;
&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; p.Set( (<span class="blue">double</span>) fire_rating );
&nbsp; &nbsp; &nbsp; }
&nbsp; &nbsp; &nbsp; t.Commit();
&nbsp; &nbsp; }
&nbsp; }
</pre>

These enhancements are captured in
[FireRatingCloud release 2016.0.0.11](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.11).

Now that the RestSharp JSON deserialiser is generating the C# DoorData instances, I can remove the JsonParser.cs module that was previously needed to achieve this.


#### <a name="5"></a>Passing a DoorData Instance to the Put Method

With that in place, let's clean up the PUT call and pass in a DoorData instance to that as well, instead of a generic object:

<pre class="code">
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;summary&gt;</span>
&nbsp; <span class="gray">///</span><span class="green"> PUT JSON document data into </span>
&nbsp; <span class="gray">///</span><span class="green"> the specified mongoDB collection.</span>
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;/summary&gt;</span>
&nbsp; <span class="blue">public</span> <span class="blue">static</span> <span class="blue">string</span> Put(
&nbsp; &nbsp; <span class="blue">string</span> collection_name_and_id,
&nbsp; &nbsp; <span class="teal">DoorData</span> doorData )
&nbsp; {
&nbsp; &nbsp; <span class="blue">var</span> client = <span class="blue">new</span> <span class="teal">RestClient</span>( RestApiBaseUrl );
&nbsp;
&nbsp; &nbsp; <span class="blue">var</span> request = <span class="blue">new</span> <span class="teal">RestRequest</span>( _api_version + <span class="maroon">&quot;/&quot;</span>
&nbsp; &nbsp; &nbsp; + collection_name_and_id, <span class="teal">Method</span>.PUT );
&nbsp;
&nbsp; &nbsp; request.RequestFormat = <span class="teal">DataFormat</span>.Json;
&nbsp;
&nbsp; &nbsp; request.AddBody( doorData ); <span class="green">// uses JsonSerializer</span>
&nbsp;
&nbsp; &nbsp; <span class="teal">IRestResponse</span> response = client.Execute( request );
&nbsp;
&nbsp; &nbsp; <span class="blue">var</span> content = response.Content; <span class="green">// raw content as string</span>
&nbsp;
&nbsp; &nbsp; <span class="blue">return</span> content;
&nbsp; }
</pre>

Again, it is now shorter and simpler than before, and the same applies to the mainline call:

<pre class="code">
&nbsp; <span class="green">// Loop through all elements of the given target</span>
&nbsp; <span class="green">// category and export the shared parameter value </span>
&nbsp; <span class="green">// specified by paramGuid for each.</span>
&nbsp;
&nbsp; <span class="teal">FilteredElementCollector</span> collector
&nbsp; &nbsp; = <span class="teal">Util</span>.GetTargetInstances( doc,
&nbsp; &nbsp; &nbsp; <span class="teal">Cmd_1_CreateAndBindSharedParameter</span>.Target );
&nbsp;
&nbsp; <span class="blue">int</span> n = collector.Count&lt;<span class="teal">Element</span>&gt;();
&nbsp;
&nbsp; <span class="teal">DoorData</span> doorData;
&nbsp; <span class="blue">string</span> jsonResponse;
&nbsp;
&nbsp; <span class="blue">foreach</span>( <span class="teal">Element</span> e <span class="blue">in</span> collector )
&nbsp; {
&nbsp; &nbsp; <span class="teal">Debug</span>.Print( e.Id.IntegerValue.ToString() );
&nbsp;
&nbsp; &nbsp; doorData = <span class="blue">new</span> <span class="teal">DoorData</span>( e,
&nbsp; &nbsp; &nbsp; project_id, paramGuid );
&nbsp;
&nbsp; &nbsp; jsonResponse = <span class="teal">Util</span>.Put(
&nbsp; &nbsp; &nbsp; <span class="maroon">&quot;doors/&quot;</span> + e.UniqueId, doorData );
&nbsp;
&nbsp; &nbsp; <span class="teal">Debug</span>.Print( jsonResponse );
&nbsp; }
</pre>

This update was captured in [FireRatingCloud release 2016.0.0.12](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.12)
&ndash; commented out JsonParser code and pass DoorData instance to Put method.

With that, we are finally all done cleaning up the C# REST API client, as far as I know.


#### <a name="6"></a>Implementing a REST API Router DoorService Class

...Instead of individual separate `module.exports` functions.

With the C# REST API client utterly perfected, there are one little hiccup to iron out in the node.js web server.

Philippe suggests:

> About the web project: I would rename instances.js into `instanceService` for example; that's how such a component is generally called. I would also write it as an object with methods and export the whole object rather than `export.eachMethod = ...` as you do know.

The REST API functionality that he is referring to is implemented in the two JavaScript modules
[routes.js](https://github.com/jeremytammik/firerating/blob/master/routes.js) and
[doors_v1.js](https://github.com/jeremytammik/firerating/blob/master/controller/doors_v1.js).

As suggested by Philippe, I modified the latter to define an explicit JavaScript object encapsulating all the function definitions and export that:

<pre class="prettyprint">
DoorService = {

  findAll : function(req, res){
    Door.find({},function(err, results) {
      return res.send(results);
    });
  },

. . .

};

module.exports = DoorService;
</pre>

On my first attempt, this did not work.
Probably I forgot to add the `module.` prefix in front of `exports`.

I fixed that after reading the illuminating little discussion on
[node.js, require and exports](http://openmymind.net/2012/2/3/Node-Require-and-Exports) by Karl Seguin.

Now the router can simply import the DoorService object and route to its methods one by one like this:

<pre class="prettyprint">
module.exports = function(app) {
  var DoorService = require('./controller/doors_v1');
  app.get('/api/v1/doors', DoorService.findAll);
  app.get('/api/v1/doors/:id', DoorService.findById);
  app.post('/api/v1/doors', DoorService.add);
  app.put('/api/v1/doors/:id', DoorService.update3); // added {upsert:true} option
  app.delete('/api/v1/doors/:id', DoorService.delete);
  app.get('/api/v1/doors/project/:pid', DoorService.findAllForProject);
}
</pre>

The updated implementation is captured in
[fireratingdb 0.0.14](https://github.com/jeremytammik/firerating/releases/tag/0.0.14)
&ndash; implemented DoorService class to replace individual separate module.exports functions.

To wrap it up, I also added a version number to the various 'hello' messages and published
[fireratingdb 0.0.15](https://github.com/jeremytammik/firerating/releases/tag/0.0.15).

As always, I redeployed the web server to
[heroku](https://www.heroku.com) for global access, where it continues running at
[fireratingdb.herokuapp.com](http://fireratingdb.herokuapp.com).

Thanks again to Philippe for his helpful and illuminating suggestions!

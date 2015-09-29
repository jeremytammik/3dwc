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
#aws #jquery #handlebars
#ViewAndDataAPI
#javascript
#JsFiddle #Reactjs
#autodesku #rtceur
akn_include

Lunar Eclipse, CORS Workaround, CompHound Update #Reactjs #Heroku #MongoDB #3dwebcoder #revitapi #nodejs #adsk #mongolab

This weekend, I wanted to add an additional field to the component occurrences in the CompHoundWeb database, which led me to discover and fix a trivial yet serious error in my C# client. Also, let me mention a CORS workaround pointed out by my colleague Cyrille Fauvel and my night out to watch the lunar eclipse:
&ndash; Lunar eclipse
&ndash; Fed up with CORS?
&ndash; CompHound Updates...

-->


### Lunar Eclipse, CORS Workaround, CompHound

This weekend, I wanted to add an additional field to the component occurrences in
the [CompHoundWeb database](https://github.com/CompHound/CompHoundWeb),
which led me to discover and fix a trivial yet serious error in my C# client.

Also, let me mention a CORS workaround pointed out by my colleague
[Cyrille Fauvel](http://around-the-corner.typepad.com) and my night out to watch the lunar eclipse:

- [Lunar eclipse](#2)
- [Fed up with CORS?](#3)
- [CompHound Updates](#4)


#### <a name="2"></a>Lunar Eclipse

Did you notice that we had
a [total lunar eclipse](https://en.wikipedia.org/wiki/September_2015_lunar_eclipse) early
Monday morning?

I spent Sunday night on a hill with some friends celebrating a full moon fire, and then slept out beside the embers to catch it beginning around 4:50 in the morning:

<center>
<img src="/j/photo/jeremy/2015/2015-09-28_tuellinger/026_lunar_eclipse_begin_cropped.jpg" alt="Lunar eclipse beginning" width="300"/>
</center>

Nice experience, this 'red moon', well worth while braving the cold.


#### <a name="3"></a>Fed up with CORS?

Here is a way to quickly and easily temporarily work around a CORS issue.

[CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is
a browser security measure that prevents you from running AJAX JavaScript code coming from different places and letting it interact together.

If such a situation arises and your server does not specifically authorize other domains via `* = all` or some other domain description method, you'll get a CORS issue.

Note that CORS, or cross-origin resource sharing, has to be enabled on the server side, whereas the security check happens on the client side. The Autodesk Apigee server is using ‘Allow-Control-Allow-Origin: *', so you should not get a problem, but it may happen still depending of the other domains or technology you're using.

Now and again a CORS issue might come up that requires time and research to fix, just when you are in a real hurry to get something else done and finished, e.g. for a Hackathon presentation.

In that case,
the [Allow-Control-Allow-Origin: * Chrome plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?utm_source=chrome-app-launcher-info-dialog) may
come in handy.

It is not a universal answer to this problem, but might enable a good quick workaround if you‘re in a rush.

Instead of spending hours (or days) to find out what is causing a CORS issue, you can install this little extension which intercepts the server response and adds the ‘Allow-Control-Allow-Origin: *' to the response header, telling your browser that all is fine.
Then you can work on fixing the real underlying CORS cause later.

It is also useful if you have a piece of software that causes problems on a local server, but would work fine when you're online, e.g., swagger-ui from swagger.io.

Thank you, Cyrille, for pointing it out.



#### <a name="4"></a>CompHound Updates

I added a field to
the [CompHound](https://github.com/CompHound) database
to equip each component instance with a URN to identify the
translated [View and Data API](https://developer.autodesk.com/) model hosting it.

I thought that would be really quick and easy.

So it would have been, if
the [CompHound C# .NET Revit add-in](https://github.com/CompHound/CompHoundRvt) had
not been harbouring a pernicious little bug of my making.

Luckily, I deleted the mongolab database and started to rebuild it from scratch, which uncovered the flaw in
the [InstanceData](https://github.com/CompHound/CompHoundRvt/blob/master/CompHoundRvt/InstanceData.cs) implementation class.

I added the new urn field to the C# client and the node.js server, deleted the mongolab database, redeployed the server to heroku and reran CompHoundRvt in `rst_advanced_sample_project.rvt`.

When the Revit add-in was run, all data appeared to be transferred properly, yet nothing appeared in the database.

I suspected an error in the `upsert` function, since I had already had issues with that in the past.

I reimplemented a new version of it after looking more deeply at the
[mongo update documentation](http://docs.mongodb.org/manual/reference/method/db.collection.update)
followed by
[how to update/upsert a document in Mongoose?](http://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose)

The new `update4` method uses the mongoose `findOneAndUpdate` function:

<pre class="prettyprint">
  update4 : function(req, res) {
    var id = req.params.id;
    console.log('Updating ' + id);
    //console.log(req.body);
    Instance.findOneAndUpdate({"_id":id}, req.body,
      {upsert:true/*,new:true*/},
      function (err, doc) {
        if (err) return console.log(err);
        //console.log(doc);
        return res.sendStatus(202);
    });
  },
</pre>

Still no data was being passed in, and the component instance documents only listed their `_id` and `__v` fields.

I read about Matt Schrager's [RestSharp POST body problems](http://matthewschrager.com/2013/02/19/restsharp-post-body) and temporarily replaced `request.AddBody` by `request.AddObject`, but that did not help either.

Finally I logged the output of serialising the InstanceData to JSON and discovered that the result was empty right there at the beginning, in the C# client uploading it to the database via REST.

My InstanceData class was not exposing any public properties to serialise, so it never worked.

The [FireRatingCloud](https://github.com/jeremytammik/FireRatingCloud) sample that I based it on did it properly, though, so that works fine.

When I tested it last time, the database was already completely populated beforehand, so I never noticed that no new data was being passed in.

Every time I tested it in the past, it was just updating existing records with no changes.

Well, it is all fixed in the
current [CompHound](https://github.com/CompHound) implementation,
in [CompHoundWeb 0.0.19](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.19)
and [CompHoundRvt 2016.0.0.4](https://github.com/CompHound/CompHoundRvt/releases/tag/2016.0.0.4).

All the links to [Try it out Live](https://github.com/CompHound/CompHoundWeb#try-it-out-live) have been appropriately updated to the new web server and mongolab database instances.

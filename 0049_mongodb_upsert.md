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

#RestSharp #Mongoose #3dwebcoder #revitapi #restapi #javascript #mongodb #nodejs

-->


### Mongodb Upsert

Last week, I searched for and struggled to implement an
[upsert call](http://the3dwebcoder.typepad.com/blog/2015/09/comphound-restsharp-mongoose-put-and-post.html) for
my CompHound and FireRating samples, i.e. a REST PUT call that does both PUT to update the data of an existing record as well as POST to create a new record, if none exists.

I ended up implementing the
[update2 function](http://the3dwebcoder.typepad.com/blog/2015/09/comphound-restsharp-mongoose-put-and-post.html#4) calling
the mongoose `findOne` function and then selecting either `update` or `create` based on whether an existing record is found.

Luckily, I asked my colleague
[Philippe Leefsma](http://adndevblog.typepad.com/autocad/philippe-leefsma.html) to
review this, and he found a StackOverflow discussion on
[mongodb: insert if not exists](http://stackoverflow.com/questions/2801008/mongodb-insert-if-not-exists) that
mentions a much easier solution, adding an argument specifying the options `{upsert:true}` to the `update` call.

That is exactly what I had searched for, fruitlessly, high and low.

After learning about the existence of this, I finally also found the official
[mongodb upsert Option documentation](http://docs.mongodb.org/manual/tutorial/modify-documents/#upsert-option).

I implemented a new, simpler, `update3` function making use of it, and it works flawlessly:

<pre class="prettyprint">
exports.update3 = function(req, res) {
  var id = req.params.id;
  console.log('Updating ' + id);
  Door.update({"_id":id}, req.body, {upsert:true},
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %s instances', numberAffected.toString());
      return res.sendStatus(202);
  });
};
</pre>

I added this to the
[fireratingdb repo](https://github.com/jeremytammik/firerating) and updated it to
[release 0.0.13](https://github.com/jeremytammik/firerating/releases/tag/0.0.13).

I obviously also redeployed it to heroku, where it is running at
[fireratingdb.herokuapp.com](http://fireratingdb.herokuapp.com).

Many thanks to Philippe for noticing and pointing this out!

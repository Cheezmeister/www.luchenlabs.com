---
title: Noise
longtitle: Noise
shorttitle: noise
description: Dynamic .WAV Generation in JavaScript 
genre: Tool
technologies: JavaScript
scriptimport: http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
---


<script src="noise.js"></script>

## $description$


Original generator from [sk89q](http://www.sk89q.com/playground/jswav/)


This plays a sine wave by generating a .wav file on-the-fly and playing it 
through an \<audio\> tag linked by a <a href="http://en.wikipedia.org/wiki/Data_URI_scheme">
data URI</a>. **No external files are used to play the sine wave.**

Be aware of the following caveats:

* This has been tested to work on Firefox only.
* The generated .wav files cannot become too large or otherwise browsers will 
not process them. The default settings are known to work.
* The tracks on a normal CD (<a href="http://en.wikipedia.org/wiki/Red_Book_(audio_CD_standard)">
Red Book standard</a>), for comparison, are sampled at 44,100 Hz and has 16 bits per sample.

<form id="leform" action="#" method="get">
 <legend>Parameters</legend>
 
 <table border="0" cellspacing="0" cellpadding="0" class="form">
  <tr>
   <th><label for="length">Length</label></th>
   <td><input type="text" name="length" id="length" size="2" value="1" /> seconds</td>
  </tr>
  <tr>
   <th><label for="volume">"Volume"</label></th>
   <td><input type="text" name="volume" id="volume" size="6" value="8000" /></td>
  </tr>
  <tr>
   <th><label for="frequency">Base Frequency</label></th>
   <td><input type="text" name="frequency" id="frequency" size="6" value="440" /> Hz (for optimal results: frequency &le; sampleRate / 2)</td>
  </tr>
 </table>
</form>








<div id="html5-container">
 <audio id="output0" preload="none">
 </audio>
 <audio id="output1" preload="none">
 </audio>
 <audio id="output2" preload="none">
 </audio>
 <audio id="output3" preload="none">
 </audio>

 <div id="keyboard">
  <canvas id="canvas" width="800" height="200" />
 </div>
</div>

<div id="result" style="display: none">

## Result

**Size of .wav file:** <span id="wav-length"></span>

**Length of data URI:** <span id="uri-length"></span>

</div>


<div id="author">

Written by <a href="http://sk89q.therisenrealm.com">sk89q</a>.

Adapted by [Cheezmeister](/)

</div>

</body>

</html>

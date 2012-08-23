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
through an EMBED tag linked by a <a href="http://en.wikipedia.org/wiki/Data_URI_scheme">
data URI</a>. **No external files are used to play the sine wave.**

Be aware of the following caveats:

* This has been tested to work on Firefox, Opera, Safari, and Chrome.
* You need to have a plugin to play the .wav files, and it should support "auto-play."
* The generated .wav files cannot become too large or otherwise browsers will 
not process them. The default settings are known to work.
* The tracks on a normal CD (<a href="http://en.wikipedia.org/wiki/Red_Book_(audio_CD_standard)">
Red Book standard</a>), for comparison, are sampled at 44,100 Hz and has 16 bits per sample.

<form action="#" method="get">
 <legend>Parameters</legend>
 
 <table border="0" cellspacing="0" cellpadding="0" class="form">
  <tr>
   <th><label for="channels">Channels</label></th>
   <td><input type="text" name="channels" id="channels" size="2" value="1" /></td>
  </tr>
  <tr>
   <th><label for="sampleRate">Sample rate</label></th>
   <td><input type="text" name="sampleRate" id="sampleRate" size="4" value="2024" /> Hz</td>
  </tr>
  <tr>
   <th><label for="bitDepth">Bit depth</label></th>
   <td><input type="text" name="bitDepth" id="bitDepth" size="2" value="16" /> bits/sample</td>
  </tr>
  <tr>
   <th><label for="length">Length</label></th>
   <td><input type="text" name="length" id="length" size="2" value="2" /> seconds</td>
  </tr>
  <tr>
   <th><label for="volume">"Volume"</label></th>
   <td><input type="text" name="volume" id="volume" size="6" value="32767" /></td>
  </tr>
  <tr>
   <th><label for="frequency">Frequency</label></th>
   <td><input type="text" name="frequency" id="frequency" size="6" value="440" /> Hz (for optimal results: frequency &le; sampleRate / 2)</td>
  </tr>
 </table>
 <p>
  <input type="checkbox" name="showDump" id="showDump" checked="checked" />
  <label for="showDump"> Show hex dump of resulting .wav file</label>
 </p>
 <p>
  <input type="button" value="Generate and play" onclick="generate(this.form)" />
 </p>
</form>








<div id="html5-container">
 <audio id="output" preload="none">
  <source id="data" controls="true" ></source>
 </audio>

 <div id="keyboard">
  <canvas id="canvas" width="800" height="200" />
 </div>
 <div id="oscilloscope">
  <canvas id="oscilloscope" width="800" height="200" />
 </div>
</div>

<div id="result" style="display: none">

## Result

**Size of .wav file:** <span id="wav-length"></span>

**Length of data URI:** <span id="uri-length"></span>

## Player plugin

<div id="player-container"></div>
 <div id="dump" style="display: none">

### Hex Dump of .wav

   <pre id="dump-contents"></pre>
        
 </div>
</div>


<div id="author">

Written by <a href="http://sk89q.therisenrealm.com">sk89q</a>.

Adapted by [Cheezmeister](/)

</div>

</body>

</html>

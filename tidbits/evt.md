---
title:EV Training Quick Calc Beta
scriptimport:evt.js
---

<noscript>
  <p>Oops! You'll need JavaScript enabled</p>
</noscript>

<form id="main" action="" method="get" name="mainform"> 
  <input type="button" id="btnTrain" value="   Train   " class="buttons" /> 
  <div id="subform">
    <div id="stuffyouhave">
      <h3>Boost Items Available</h3>
      <p><label for="macho"><input type="checkbox" title="Macho Brace" id="macho" name="macho" />Macho Brace</label></p>
      <p><label for="pkrs"><input type="checkbox" title="Pok&eacute;rus" id="pkrs" name="pkrs" />Pokerus</label></p>
      <script type="text/javascript">
        for (stat in stats) {
          var tmpcb = 
  	  '<label for="p' + stat + '">' +
  	    '<input type="checkbox" id="p' + stat + '" name="pitems" value="' + stats[stat] + '" />' + 
  	    'Power ' + pitems[stats[stat]] + 
  	  '</label>';
          document.write(tmpcb + '<br />');
        }
      </script>
    </div>
    <div id="statchoice">
      <h3>Stat to Train</h3>
      <label for="txtGoal">
        Goal: <input onchange="generateInstructions()" label="Goal" type="text" id="txtGoal" value="252" size="3" maxlength="3" />
      </label>
      <select id="stattotrain">
        <script type="text/javascript">
          for (stat in stats) {
            document.write('<option value="' + stats[stat] + 
                '" selected="false">' + stats[stat] + '</option>');
          }
	  k
          document.mainform.stattotrain[0].selected = true;
        </script>
      </select>
      <br />
      <!-- input type="button" id="btnMore" value="Train Another Stat" class="buttons" /-->
    </div>
    <h3>Game Version</h3>
    <p><label for="dp">
      <input type="radio" id="dp" name="version" selected="true" /> Diamond/Pearl
    </label></p>
    <p><label for="hg">
      <input type="radio" id="hg" name="version" /> HeartGold/SoulSilver
    </label></p>
  </div>
</form>

<div id="instructions">
    <p> Check <em>all</em> items you have available. Instructions will appear here.</p>
</div>

# 

##### Thanks
[the_1337_toad](http://www.gamefaqs.com/boards/925602-pokemon-pearl-version/40072098) for inspiring this guide.
<br />Intro1827 for *lots* of testing and suggestions

##### Notes
This guide is intended to be a beginner\'s lookup for the all-around quickest 
way to EV train your Pokemon. Because it is automated, though, it does have its 
limitations. An full understanding of EV training and a handy list of good
locations is still the best way to find the best method for your
specific training needs. 

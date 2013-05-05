// function addEvent( obj, type, fn ) {
//     if (obj.addEventListener)
//         obj.addEventListener( type, fn, false );
//     else if (obj.attachEvent) {
//         obj["e"+type+fn] = fn;
//         obj.attachEvent( "on"+type, function() { obj["e"+type+fn](); } );
//     }
// }
// function $() {
//     var elements = new Array();
//     for (var i = 0; i < arguments.length; i++) {
//         var element = arguments[i];
//         if (typeof element == 'string')
//             element = document.getElementById(element);
//         if (arguments.length == 1)
//             return element;
//         elements.push(element);
//     }
//     return elements;
// }
// function show_status(str) {
//     $('status').innerHTML = str;
// }
// function _(radiolist) {
//     for (i = 0; i < radiolist.length; ++i ) {
//         if (radiolist[i].selected)
//             return radiolist[i].value;
//     }
//     return null;
// }
// function init() {
//     addEvent($('btnTrain'),"click", generateInstructions);
//     //addEvent($('btnMore'),"click", addStat);
//     handleDayOfWeek();
// }
// function print(str) {
//     str += "<br />";
//     $('instructions').innerHTML += str;
// }

(function($) {
  $(function() {
    console.log('bleh');
    $('newform').dform({
      'html' : [ {
        'type' : 'checkbox',
        'caption' : 'Macho Brace',
        'id' : 'ckMacho',
        'name' : 'macho'
      }, {
        'type' : 'checkbox',
        'caption' : 'Pok&eacute;rus',
        'id' : 'ckPkrs',
        'name' : 'pkrs'
      }, {
        'type' : 'checkbox',
        'options' : {
          'bracer' : 'Power Bracer',
          'anklet' : 'Power Anklet',
          'weight' : 'Power Weight',
          'lens' : 'Power Lens',
          'belt' : 'Power Belt',
          'band' : 'Power Band'
        }
      }]
    });
  });
})(jQuery);

var stats = ["HP",    "Attack","Defense","SpecialAttack","SpecialDefense","Speed"];

/* Which game to calc for */
var game = 'DP';

var haveMachoBrace = false;
var havePKRS       = false;
var havePItem      = false;

var machoEquipped  = false;
var pItemEquipped  = false;

/* Power Items */
var pitems = new Array();
pitems['HP'] = "Weight";
pitems['Attack'] = "Bracer";
pitems['Defense'] = "Belt";
pitems['SpecialAttack'] = "Lens";
pitems['SpecialDefense'] = "Band";
pitems['Speed'] = "Anklet";


/* EV enhancing drugs */
var drugnames = new Array();
drugnames['HP'] = "HP Up";
drugnames['Attack'] = "Protein";
drugnames['Defense'] = "Iron";
drugnames['SpecialAttack'] = "Calcium";
drugnames['SpecialDefense'] = "Zinc";
drugnames['Speed'] = "Carbos";

/* EVs per battle */
var minepb = new Array();
minepb['DP'] = new Array();
minepb['HG'] = new Array();
minepb['DP']['HP'] = [1, 5];
minepb['DP']['Attack'] = [1, 4];
minepb['DP']['Defense'] = [1, 3];
minepb['DP']['SpecialAttack'] = [2, 3];
minepb['DP']['SpecialDefense'] = [3, 1];
minepb['DP']['Speed'] = [1, 6];
minepb['HG']['HP'] = [1, 1];
minepb['HG']['Attack'] = [1, 1];
minepb['HG']['Defense'] = [1, 1];
minepb['HG']['SpecialAttack'] = [1, 1];
minepb['HG']['SpecialDefense'] = [1, 1];
minepb['HG']['Speed'] = [1, 1];

/* Battle locations */
var preptext = new Array();
preptext['DP'] = new Array();
preptext['HG'] = new Array();
preptext['DP']['HP'] = "Head to Solaceon town and go south. Battle the girl closest to the mud ramp. "; 
preptext['DP']['Attack'] = "Head to Sandgem Town and surf south. Battle the first swimmer past the sandbar. ";
preptext['DP']['Defense'] = "Head to Solaceon and go north from there. Fight the Ninja Boy hiding in the grass north of the Cafe Cabin. ";
preptext['DP']['SpecialAttack'] = "Head to Veilstone City, go south past the Spring Path. Battle the southernmost trainer, Collector Douglas. ";
preptext['DP']['SpecialDefense'] = "Head to Celestic Town and go east. Use your bike to cross the thin path. Fight the Ninja Boy hidden in the ground. ";
preptext['DP']['Speed'] = "Head to Eterna City and go west onto the docks. Fight the middle fisherman. ";

preptext['HG']['HP'] = "Head to the Slowpoke Well with a Pokemon that knows Surf.";
preptext['HG']['Attack'] = "Head to Mahogany Town with a Pokemon that knows Surf. Head west and surf on Route 42. ";
preptext['HG']['Defense'] = "Head to Ecruteak and enter the Burned Tower.";
preptext['HG']['SpecialAttack'] = "Head to Azalea Town and go west to Ilex Forest. Find a place to surf.";
preptext['HG']['SpecialDefense'] = "Head to Goldenrod. Go south and begin to surf.";
preptext['HG']['Speed'] = "Go to route 28 and whip out your old rod (get your mind out of the gutter).";

preptext['HG']['HP']['Patient'] = "";
preptext['HG']['Attack']['Patient'] = "Wait until Thursday morning 4-10. Head to Rt. 44 and battle Fisherman Wilton. He has 4 Goldeen.";
preptext['HG']['Defense']['Patient'] = "";
preptext['HG']['SpecialAttack']['Patient'] = "Thursday Night, Lass Dana for Golduck & Ampharos";
preptext['HG']['SpecialDefense']['Patient'] = "Monday Morning, Biker Aiden, 2 Tentacruel 1 Golduck.";
preptext['HG']['Speed']['Patient'] = "Wait until Thursday Afternoon. Head to Kanto Rt. 12 and battle Fisherman Kyler";


/* Battle details */
var battletext = new Array();
battletext['DP'] = new Array();
battletext['HG'] = new Array();
battletext['DP']['HP'] = "Defeat her 5 Bidoof ___ times.";
battletext['DP']['Attack'] = "Defeat her 4 Goldeen ___ times.";
battletext['DP']['Defense'] = "Defeat his 3 Geodude ___ times.";
battletext['DP']['SpecialAttack'] = "Defeat his 3 Roselia ___ times.";
battletext['DP']['SpecialDefense'] = "Defeat his Dustox ___ times.";
battletext['DP']['Speed'] = "Defeat his 6 Magikarp ___ times.";
battletext['HG']['HP'] = "Defeat ___ wild Slowpoke.";
battletext['HG']['Attack'] = "Defeat ___ wild Goldeen. ";
battletext['HG']['Defense'] = "Defeat ___ wild Koffing.";
battletext['HG']['SpecialAttack'] = "Defeat ___ wild Psyduck. ";
battletext['HG']['SpecialDefense'] = "Defeat ___ wild Tentacruel.";
battletext['HG']['Speed'] = "Defeat ___ wild Magikarp.";

/* Helper Pokemon and the EVs they yield */
var helpers = new Array();
helpers['DP'] = new Array();
helpers['HG'] = new Array();
helpers['DP']['HP'] = ["more Bidoof", 1];
helpers['DP']['Attack'] = ['Gyarados', 2];
helpers['DP']['Defense'] = ['more Geodude', 1];
helpers['DP']['SpecialAttack'] = ['Golduck', 2];
helpers['DP']['SpecialDefense'] = ['Tentacool', 1];
helpers['DP']['Speed'] = ['more Magikarp', 1];
helpers['HG']['HP'] = ['more Slowpoke', 1];
helpers['HG']['Attack'] = ['more Goldeen', 1];
helpers['HG']['Defense'] = ['more Koffing', 1]; 
helpers['HG']['SpecialAttack'] = ['more Psyduck', 1];
helpers['HG']['SpecialDefense'] = ['more Tentacruel', 1];
helpers['HG']['Speed'] = ['more Magikarp', 1];

function handleDayOfWeek() {

}

function addStat() {
    var oldfield = $('stattotrain');
    var count = oldfield.parentNode.length;
    var newfield = oldfield.cloneNode(true);

    newfield.id = '';
    var children = newfield.childNodes;
    for (i in children) {
        if (children[i].name)
            children[i].name += count;
    }

    var par = oldfield.parentNode;
    par.insertBefore(oldfield, newfield);
}

function doDrugs(stat, val) {
    if (val < 10) return val;
    var drug = drugnames[stat];
    var dv = Math.floor(Math.min(10, val / 10));
    val -= dv * 10;
    print("Feed your Pokemon " + dv + " " + drug + ".\n");
    return val;
}
function doEquips(stat, val) {
    var haveMacho = document.mainform.macho.checked;
    var havePKRS = document.mainform.pkrs.checked;
    var havePItem = false;
    var bonus = 0;
    var mult = 1;

    var powerItems = new Array();
    for (i = 0; i < document.mainform.pitems.length; ++i) {
        if (document.mainform.pitems[i].checked)
        powerItems[i] = true;
    }
    havePItem = powerItems[stats.indexOf(stat)];

    if (haveMacho) {
        machoEquipped = true;
    }

    if (havePItem) {
        bonus = 4;
        
	/* can't equip both, sadly... */
	machoEquipped = false;
	pItemEquipped = true;
        print("Equip your Power " + pitems[stat]);
    }

    if (machoEquipped) {
        mult *= 2;
        print("Equip your macho brace\n");
    }
    if (havePKRS) {
        mult *= 2;
    }

    epb = (minepb[game][stat][0] + bonus);
    epb *= mult * minepb[game][stat][1];    

    times = Math.floor(val / epb);

    if (times <= 0) return val;

    print(preptext[game][stat]);
    var out = battletext[game][stat].replace("___", times);
    print (out + " You'll receive " + epb + " EVs per battle.\n");
    
    val -= times * epb;

    return val;
}
function doCleanup(stat, val) {
    var haveMacho = document.mainform.macho.checked;
    var havePKRS = document.mainform.pkrs.checked;
    var havePItem = false;
    var bonus = 0;
    var mult = 1;
    var powerItems = new Array();
    for (i = 0; i < document.mainform.pitems.length; ++i) {
        if (document.mainform.pitems[i].checked)
        powerItems[i] = true;
    }
    havePItem = powerItems[stats.indexOf(stat)];
    if (havePItem) {
        bonus = 4;
    }
    if (haveMacho && !havePItem) { mult *= 2; }
    if (havePKRS) { mult *= 2; }

    var evg = (helpers[game][stat][1] + bonus) * mult;
    if (evg <= val) {
        var times = Math.floor(val / evg);
    val -= evg * times;
    print("Defeat " + times + " " + helpers[game][stat][0] + 
        ", it doesn't matter where.\n");
    }
    
    if (val == 0) return;

    /* if we fall through to here, something needs to be unequipped */
    if (havePItem) {
        bonus = 0;
        print("De-equip your Power " + pitems[stat] + ".");
        if (haveMacho) {
            mult *= 2;
            evg = (helpers[game][stat][1] + bonus) * mult;
            if (evg <= val) {
                print("Equip your Macho Brace instead.");
                var times = Math.floor(val / evg);
                val -= evg * times;
                print("Defeat " + times + " " + helpers[game][stat][0] + 
                    ", it doesn't matter where.\n");
            }
            else mult /= 2;
        }
    }
    
    if (val == 0) return;

    if (!havePKRS && mult == 2) {
      mult /= 2;
      print("De-equip your Macho Brace");
    }
    evg = (helpers[game][stat][1] + bonus) * mult;
    if (evg <= val) {
      var times = Math.floor(val / evg);
      val -= evg * times;
      print("Defeat " + times + " " + helpers[game][stat][0] + 
          ", it doesn't matter where.\n");
    }
    
    if (val == 0) return;


    print ("To get the remaining " + val + " points, do the truffle shuffle!\n");

}

function generateInstructions() {

    var stattotrain = _(document.mainform.stattotrain);
    var desiredVal = document.mainform.txtGoal.value;
    game = document.mainform.dp.checked ? 'DP' : 'HG';

    /* Prevent useless values */
    var tmp = desiredVal % 4;
    if (tmp != 0) {
        desiredVal -= tmp;
        document.mainform.txtGoal.value = desiredVal;
        print("Rounding down to " + desiredVal + " total EVs.");
    }

    /* clear current instros */
    $('instructions').innerHTML = "";

    var remaining = desiredVal;

    /* use a do-while so we can break out at any point if the goal is reached */
    do {
        print("To train your pokemon in " + stattotrain + ":");
        remaining = doDrugs(stattotrain, remaining);
	if (remaining == 0) break;

        remaining = doEquips(stattotrain, remaining);
	if (remaining == 0) break;

        print("You should now have " + (desiredVal - remaining) + " EV points.");
        print("To get the remaining " + remaining + " EVs, do the following:");
        doCleanup(stattotrain, remaining);

    } while (false);
    
    print("You should now have " + desiredVal + "EV points!");
    
    
}
addEvent(window,"load", init);


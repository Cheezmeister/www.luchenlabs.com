// Based off the tone generator found at http://www.sk89q.com/playground/jswav/
var player; // store embed tag

var KEY_WIDTH = 40;
var BLACK_HEIGHT = 0.8;
var CUBE_ROOT_OF_TWO = 18904 / 17843.0;

var A4_FREQUENCY = 440;

// This is where the magic happens
function generate(form) {
    var channels = parseInt(form.channels.value);
    var sampleRate = parseInt(form.sampleRate.value);
    var bitsPerSample = parseInt(form.bitDepth.value);
    var seconds = parseFloat(form.length.value);
    var volume = parseInt(form.volume.value);
    var frequency = parseInt(form.frequency.value);
    var showDump = form.showDump.checked;

    playTone(channels, sampleRate, bitsPerSample, seconds, volume, frequency, showDump);

}

var hookKey = function() {
    var ret = function(i, rect) {
        var key = keys.white[i];
    }

    return ret;
}();

var handleKey = function() {
    
    var keys = {
            white: "asdfghjkl;", 
            black: "qwertyuiop",
            twelve: "awsedftgyhujkolp;",
    };

    var keymap = {
            'a':  0,
            'w':  1,
            's':  2,
            'e':  3,
            'd':  4,
            'f':  5,
            't':  6,
            'g':  7,
            'y':  8,
            'h':  9,
            'u': 10,
            'j': 11,
    };
    
    var pianoKey = function(index, color) {
        if (color == 'twelve') {
            var tonic = A4_FREQUENCY;
            var frequency = tonic * Math.pow(CUBE_ROOT_OF_TWO, index);
            playTone(1, 22050, 16, 0.5, 8000, frequency, false);
        }
    }

    return function(code) {
        var letter = String.fromCharCode(code)[0];

        var index = keys.twelve.indexOf(letter);
        if (index >= 0) {
            pianoKey(index, 'twelve');
        } 
    };
}();

var draw = function(canvas) {

    canvas.clear = function() {
        canvas.getContext("2d").fillRect(0, 0, canvas.width, canvas.height);
    };

    var context = canvas.getContext("2d");
    context.fillStyle = "rgba(0, 0, 255, .5)";

    canvas.clear();

    var i = 0;
    for (var x = i; x < canvas.width; ++i) {
        x = i * KEY_WIDTH;
        var rect = { x:x, y:0, w:KEY_WIDTH, h:canvas.height };
        context.fillStyle = "rgba(255, 255, 255, .5)";
        context.fillRect(rect.x + 1, rect.y + 1, rect.w - 2, rect.h - 2);

        // hookKey(i, rect);
    }

    // Black keys
    i = 0;
    for (var x = i; x < canvas.width; ++i) {
        x = i * KEY_WIDTH;

        switch (i % 7) {
            case 0: case 1: 
            case 3: case 4: case 5:
            rect = { x: x + KEY_WIDTH  * 3 / 4, y: 0, w:KEY_WIDTH / 2, h:canvas.height * BLACK_HEIGHT};
            context.fillStyle = "rgba(0, 0, 0, .9)";
            context.fillRect(rect.x + 1, rect.y + 1, rect.w - 2, rect.h - 2);

            // hookKey(i, rect);
        }
    }

};

var init = function() {
    canvas = $("#canvas")[0];


    $("#keyboard")
        .attr("tabindex", "0")
        .keypress(function(e) {
            var code = e.keyCode ? e.keyCode : e.which;
            handleKey(code);
        })
        .focus();

    draw(canvas);
};

var playWithHTML5 = function(dataURI) {
    var output = document.getElementById('output');

    if (output) {
        output.parentNode.removeChild(output);
    }

    output = document.createElement("audio");

    console.log(output);

    var data = document.createElement('source');
    
    data.setAttribute('src', dataURI);
    output.setAttribute('autostart', true);
    output.setAttribute('id', 'output');

    output.appendChild(data);
    document.getElementById('html5-container').appendChild(output);
};








////////////////////////////////////////////////////////////////////////////////
// Start stolen code ;)
////////////////////////////////////////////////////////////////////////////////
var playTone = function(channels, sampleRate, bitsPerSample, seconds, volume, frequency, showDump) {
    var data = [];
    var samples = 0;
    
    // Generate the sine waveform
    for (var i = 0; i < sampleRate * seconds; i++) {
        for (var c = 0; c < channels; c++) {
            var v = volume * Math.sin((2 * Math.PI) * (i / sampleRate) * frequency);
            data.push(pack("v", v));
            samples++;
        }
    }
    
    data = data.join('');
    
    // Format sub-chunk
    var chunk1 = [
        "fmt ", // Sub-chunk identifier
        pack("V", 16), // Chunk length
        pack("v", 1), // Audio format (1 is linear quantization)
        pack("v", channels),
        pack("V", sampleRate),
        pack("V", sampleRate * channels * bitsPerSample / 8), // Byte rate
        pack("v", channels * bitsPerSample / 8),
        pack("v", bitsPerSample)
    ].join('');

    // Data sub-chunk (contains the sound)
    var chunk2 = [
        "data", // Sub-chunk identifier
        pack("V", samples * channels * bitsPerSample / 8), // Chunk length
        data
    ].join('');
    
    // Header
    var header = [
        "RIFF",
        pack("V", 4 + (8 + chunk1.length) + (8 + chunk2.length)), // Length
        "WAVE"
    ].join('');

    var out = [header, chunk1, chunk2].join('');
    var dataURI = "data:audio/wav;base64," + escape(btoa(out));
    
    document.getElementById('result').style.display = 'block';
    document.getElementById('wav-length').innerHTML = out.length + ' bytes';
    document.getElementById('uri-length').innerHTML = dataURI.length + ' bytes';
    
    // Generate the hex dump
    if (showDump) {
        document.getElementById('dump').style.display = 'block';
        document.getElementById('dump-contents').innerHTML = hexDump(out);
    } else {
        document.getElementById('dump').style.display = 'none';
        document.getElementById('dump-contents').innerHTML = '';
    }

    playWithPlugin(dataURI);
};

var playWithPlugin = function(dataURI) {
    // Append embed player
    if (player) {
        player.parentNode.removeChild(player);
    }
    player = document.createElement("embed");
    player.setAttribute("src", dataURI);
    player.setAttribute("width", 400);
    player.setAttribute("height", 100);
    player.setAttribute("autostart", true);
    document.getElementById('player-container').appendChild(player);
    
};

// Base 64 encoding function, for browsers that do not support btoa()
// by Tyler Akins (http://rumkin.com), available in the public domain
if (!window.btoa) {
    function btoa(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
                     keyStr.charAt(enc3) + keyStr.charAt(enc4);
        } while (i < input.length);

        return output;
    }
}

// pack() emulation (from the PHP version), for binary crunching
function pack(fmt) {
    var output = '';
    
    var argi = 1;
    for (var i = 0; i < fmt.length; i++) {
        var c = fmt.charAt(i);
        var arg = arguments[argi];
        argi++;
        
        switch (c) {
            case "a":
                output += arg[0] + "\0";
                break;
            case "A":
                output += arg[0] + " ";
                break;
            case "C":
            case "c":
                output += String.fromCharCode(arg);
                break;
            case "n":
                output += String.fromCharCode((arg >> 8) & 255, arg & 255);
                break;
            case "v":
                output += String.fromCharCode(arg & 255, (arg >> 8) & 255);
                break;
            case "N":
                output += String.fromCharCode((arg >> 24) & 255, (arg >> 16) & 255, (arg >> 8) & 255, arg & 255);
                break;
            case "V":
                output += String.fromCharCode(arg & 255, (arg >> 8) & 255, (arg >> 16) & 255, (arg >> 24) & 255);
                break;
            case "x":
                argi--;
                output += "\0";
                break;
            default:
                throw new Error("Unknown pack format character '"+c+"'");
        }
    }
    
    return output;
}

// Generates a hex dump
function hexDump(out) {
    var lines = [];
    
    for (var i = 0; i < out.length; i += 16) {
        var hex = [];
        var ascii = [];           
        
        for (var x = 0; x < 16; x++) {
            var b = out.charCodeAt(i + x).toString(16).toUpperCase();
            b = b.length == 1 ? '0' + b : b;
            hex.push(b + " ");
            
            if (out.charCodeAt(i + x) > 126 || out.charCodeAt(i + x) < 32) {
                ascii.push('.');
            } else {
                ascii.push(out.charAt(i + x));
            }
            
            if ((x + 1) % 8 == 0) {
                hex.push(" ");
            }
        }
        
        lines.push([hex.join(''), ascii.join('')].join(''));
    }
    
    return lines.join('\n');
}



// Entry point
$(document).ready(init);


// Based off the tone generator found at http://www.sk89q.com/playground/jswav/
var player; // store embed tag

var KEY_WIDTH = 40;
var BLACK_HEIGHT = 0.8;
var TWELFTH_ROOT_OF_TWO = 1.0594630943592952645618252949463417007792043174941856;
var A4_FREQUENCY = 440;

var MIN_VOLUME = 1000;
var MAX_VOLUME = 20000;
var MIN_TONIC = A4_FREQUENCY / 2;
var MAX_TONIC = A4_FREQUENCY * 2;
var MAX_LENGTH = 5;



var linearInterp = function(a, b, x) {
    return b * x + a * (x - 1);
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
    
    var params = {
           channels: 1, 
           sampleRate: 22050, 
           bitsPerSample: 16, 
           seconds: 1.2,
           volume: {
               v: [8000, 0],
               interpolator: linearInterp,
           },
    };

    var tonic = 0;
    var freq = A4_FREQUENCY;

    var pianoKey = function(index, color) {
        if (color == 'twelve') {
            if (freq !== $('#frequency').val()) {
                freq = $('#frequency').val();
                tonic = Math.abs(Math.abs(freq) - MIN_TONIC) % (MAX_TONIC - MIN_TONIC) + MIN_TONIC;
            }
            params.frequency = tonic * Math.pow(TWELFTH_ROOT_OF_TWO, index);
            params.seconds = $('#length').val() % MAX_LENGTH;
            params.volume.v = [
                Math.abs(Math.abs($('#volume').val()) - MIN_VOLUME) % (MAX_VOLUME - MIN_VOLUME) + MIN_VOLUME,
                0,
            ];

            playTone(params);
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

var visualize = function() {
    return function(data) {
        for (var i = 0; i < data.length; ++i) {
        }
    }
}

var playWithHTML5 = function() {
    var i = 0;

    return function(dataURI) {
        i = ++i % 4;
        var id = 'output' + i;
        var output = document.getElementById(id);
        var parent = output.parentNode;
        var data = document.createElement('source');


        output.pause();
        parent.removeChild(output);

        output = document.createElement('audio');
        output.setAttribute('id', id);


        data.setAttribute('src', dataURI);
        output.setAttribute('autostart', true);
        output.appendChild(data);

        parent.appendChild(output);

        output.play();

    };
}();







////////////////////////////////////////////////////////////////////////////////
// Start stolen code ;)
////////////////////////////////////////////////////////////////////////////////
var playTone = function(params) {
        
    var channels = params.channels; 
    var sampleRate = params.sampleRate; 
    var bitsPerSample = params.bitsPerSample; 
    var seconds = params.seconds; 
    var frequency = params.frequency; 
    var showDump = params.showDump;

    var data = [];
    var samples = 0;
    
    // Generate the sine waveform
    for (var i = 0; i < sampleRate * seconds; i++) {
        for (var c = 0; c < channels; c++) {
            var v = params.volume;
            var volume = v.interpolator(v.v[0], v.v[1], i / (sampleRate * seconds));
            var phase = volume * Math.sin((2 * Math.PI) * (i / sampleRate) * frequency);
            data.push(pack("v", phase));
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

    playWithHTML5(dataURI);

    // visualize(out);
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


(function() {

  function escapeEnts(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
  }

  /*  This work is licensed under Creative Commons GNU LGPL License.
  
      License: http://creativecommons.org/licenses/LGPL/2.1/
      Version: 0.9
      Author:  Stefan Goessner/2006
      Web:     http://goessner.net/ 
  */
  function json2xml(o, tab) {
     var toXml = function(v, name, ind) {
        var xml = "";
        if (v instanceof Array) {
           for (var i=0, n=v.length; i<n; i++)
              xml += ind + toXml(v[i], name, ind+"\t") + "\n";
        }
        else if (typeof(v) == "object") {
           var hasChild = false;
           var m;
           xml += ind + "<" + name;
           for (m in v) {
              if (m.charAt(0) == "@")
                 xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
              else
                 hasChild = true;
           }
           xml += hasChild ? ">" : "/>";
           xml += '\n';
           if (hasChild) {
              for (m in v) {
                 if (m == "#text")
                    xml += v[m];
                 else if (m == "#cdata")
                    xml += "<![CDATA[" + v[m] + "]]>\n";
                 else if (m.charAt(0) != "@")
                    xml += toXml(v[m], m, ind+"\t");
              }
              xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">" + '\n';
           }
        }
        else {
           xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
        }
        return xml;
     }, xml="";
     for (var m in o)
        xml += toXml(o[m], m, "");
     return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
  }
  

  var colorTable = {
    colors: [ { 
        name: 'black',       rgb : [0x3f, 0x3f, 0x3f] 
      }, {                       
        name: 'red',         rgb : [0xaf, 0x64, 0x64] 
      }, {                                              
        name: 'green',       rgb : [0x00, 0x80, 0x00] 
      }, {                                               
        name: 'yelow',       rgb : [0x80, 0x80, 0x00] 
      }, {                                               
        name: 'blue',        rgb : [0x23, 0x23, 0x33] 
      }, {                                               
        name: 'pink',        rgb : [0xaa, 0x50, 0xaa] 
      }, {                                               
        name: 'cyan',        rgb : [0x00, 0xdc, 0xdc] 
      }, {                                               
        name: 'white',       rgb : [0xcc, 0xdc, 0xdc] 
      }, {                                               
        name: 'boldblack',   rgb : [0x80, 0x80, 0xc0] 
      }, {                                               
        name: 'boldred',     rgb : [0xff, 0xaf, 0xaf] 
      }, {                                               
        name: 'boldgreen',   rgb : [0x7f, 0x9f, 0x7f] 
      }, {                                               
        name: 'boldyellow',  rgb : [0xd3, 0xd0, 0x8c] 
      }, {                                               
        name: 'boldblue',    rgb : [0x70, 0x71, 0xe3] 
      }, {                                               
        name: 'boldpink',    rgb : [0xc8, 0x80, 0xc8] 
      }, {                                               
        name: 'boldcyan',    rgb : [0xaf, 0xdf, 0xf0] 
      }, {                                               
        name: 'boldwhite',   rgb : [0xff, 0xff, 0xff] 
      }
  ]};

  
  var rgb = function(r, g, b) {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  };
  var pad = function(n) {
    return (n < 10 ? '0' : '') + n;
  };
  
  var hex = function(r, g, b) {
    return pad(r.toString(16)) + pad(g.toString(16)) + pad(b.toString(16));
  };

  var plaintextport = function(head, func, foot) {
    return function(src) {
      var ret = '<pre>';
      
      if (head) ret += head;
      
      for (var i = 0; i < 16; ++i) {
        var c = src.colors[i];
        ret += func(i, c.name, c.r, c.g, c.b);
      }
      
      if (foot) ret += foot;
      
      return ret + '</pre>';
    };
  };
  
  var ports = {
    "Pretty Table" : {
      instructions: '1. Look\n2. Ooh\n3. Aah',
      generator : function(src) {
        return $('<table>')
          .css('border-collapse', 'separate')
          .css('border-spacing', '1px')
          .append($('<thead>')
            .append($('<td>').html('Name'))
            .append($('<td>').html('Red'))
            .append($('<td>').html('Green'))
            .append($('<td>').html('Blue'))
            .append($('<td>').html('Hex'))
            .append($('<td>').html('Swatch'))
            .css('background-color', '#f0f0f0')
          )
          .append($('<tbody>')).append(
            jQuery.map(src.colors, function(color) {
              return $('<tr>')
                .css('text-align', 'right')
                .append($('<td>').html(color.name))
                .append($('<td>').html(color.r))
                .append($('<td>').html(color.g))
                .append($('<td>').html(color.b))
                .append($('<td>').html(hex(color.r, color.g, color.b)))
                .append($('<td>').css('background-color', rgb(color.r, color.g, color.b)));
            })
         );
       }
    },

    'gtkrc' : {
      instructions : 'Locate your gtkrc (this could be anywhere, so I assume you know what you are doing)' + 
        ' and substitute this line ',
      generator : plaintextport(
        'gtk-color-scheme = "', 
        function() {
          var gtk_color_name = [
            'base_color',
            'fg_color',
            'selected_bg_color',
            'selected_fg_color',
            'text_color',
            'bg_color',
            'base_color',
            'base_color',
            'base_color',
          ];
          return function(index, name, r, g, b) {
            return gtk_color_name[index] + ':#' + hex(r, g, b ) + '\\n';
          };
        }(), 
        '"'
      )
    },

    "Xresources" : {
      instructions : 'Save to ~/.Xresources',
      generator : plaintextport( '', function(index, name, r, g, b) {
          return '*color' + index + ': #' + hex(r, g, b) + '\n';
      }, '')
    },
    
    "CMD, Powershell, etc." : {
      instructions: 'Save with a .reg extension, open file to import to Windows Registry.',
      generator : plaintextport(
        'Windows Registry Editor Version 5.00\n\n' + 
        '[HKEY_CURRENT_USER\\Console]\n', 
        function(index, name, r, g, b) {
          return '"ColorTable' + pad(index) + '"=dword:00' + hex(r, g, b) + '\n';
        },
        ''
      )
    },
    
    "PuTTY" : {
      instructions : 'Save with a .reg extension, import to Windows Registry.',
      generator : plaintextport(
        'Windows Registry Editor Version 5.00\n\n' + 
        '[HKEY_CURRENT_USER\\Software\\SimonTatham\\PuTTY\\Sessions\\Zenburn]\n', 
        function(index, name, r, g, b) {
          var ret = '"Colour' + (index + 6) + '"="' + r + ',' + g + ',' + b + '"\n';
          if (name == 'white') {
            ret += '"Colour0"="' + r + ',' + g + ',' + b + '"\n';
            ret += '"Colour1"="' + r + ',' + g + ',' + b + '"\n';
            ret += '"Colour5"="' + r + ',' + g + ',' + b + '"\n';
          } else if (name == 'black') {
            ret += '"Colour2"="' + r + ',' + g + ',' + b + '"\n';
            ret += '"Colour3"="' + r + ',' + g + ',' + b + '"\n';
            ret += '"Colour4"="' + r + ',' + g + ',' + b + '"\n';
          } 
          return ret;
        },
        ''
      )
    },
    
/*    
    "Code::Blocks" : {
      instructions: 'This is a weird one. It probably has bugs. Edit `%appdata%/CodeBlocks/default.conf`, add this node under `<colour_sets>`.',
      generator : function(src) {
        var object = {
          zenburn : {
            NAME : {
              str : {
                '#cdata' : 'Zenburn'
              }
            },
            cc : {
              // To be populated
            }
          }
        };
        var categories = [
          'Default',
          'Comment',
          'Line Comment',
          'Doc Comment',
          'Line Doc Comment',
          'Keyword',
          'Class',
          'String',
          'Character',
          'UUID',
          'Preprocessor',
          'Operator',
          'Selection',
          'Active Line',
          'Matching Brace',
          'Generated code'
        ];
        
        for (var c in src.colors) 
        for (var i = 0; i < 4; ++i) {
          var color = src.colors[c];
          var style = object.zenburn.cc['style' + (c * 4 + i)] = {
            FORE : {
              'colour': {
               '@r' : color.r,
               '@g' : color.g,
               '@b' : color.b
              }
            },
            NAME : {
              'str': {
                '#cdata' :  categories[c]
              }
            }
          };
          
          if (c == 0) style.BACK = {
            'colour' : {
              '@r' : color.r,
              '@g' : color.g,
              '@b' : color.b
            }
          };
        }
        
        var str = escapeEnts(json2xml(object, '  '));
        return '<pre>' + str + '</pre>';
      }
    },
*/    
    "Console2" : {
      instructions: 'Edit `console.xml`, add these entries under `<colors>`.',
      generator : plaintextport(
        '', 
        function(index, name, r, g, b) {
          var object = {
            color : {
              '@id' : index,
              '@r' : r,
              '@g' : g,
              '@b' : b
            }
          };
          return escapeEnts(json2xml(object, ' '));
        },
        ''
      )
    }
  };
  
  $(document).ready(function() {
    jQuery.map(colorTable.colors, function(color) {
      color.r = color.rgb[0];  
      color.g = color.rgb[1];  
      color.b = color.rgb[2];  
    });
  
    var divOutput = $('#output');
    for (var p in ports) {
      var f = ports[p];
      divOutput.append($('<hr>'))
        .append('<h3>' + p + '</h3>')
        .append(marked(f.instructions))
        .append(f.generator(colorTable));
      
    }

  });

})();


(function() {
  var sfr = {
    Veggies : {
      weight : 0.3,
      min : 3,
      list : [
        'carrots',
        'broccoli',
        'cauliflower',
        'cucumber',
        'green pepper',
        'onion',
        'spinach',
        'cilantro',
        'eggplant',
        'arugula',
        'tomato',
      ]
    },
    Meat : {
      weight : 0.2,
      min : 1,
      list : [
        'beef',
        'chicken',
        'turkey',
        'pork',
        'lamb',
        'venison',
      ]
    },
    'Oils' : {
      weight : 0.2,
      min : 1,
      list : [
        'pure olive oil',
        'vegetable oil',
        'coconut oil',
        'sunflower oil',
        'bacon grease',
        'butter'
      ]
    },
    'Spices' : {
      weight : 0.7,
      min : 4,
      list : [
        'garlic',
        'cayenne',
        'habanero',
        'basil',
        'saffron',
        'salt',
        'pepper',
        'cumin',
        'cloves',
        'cinnamon',
        'ginger'
      ]
    }
  };
    

  $(document).ready(function() {
    var text = "Ingredients:\n";

    for (var a in sfr) {
      console.log(a + ": " + sfr[a].list);
      text += "\n - **" + a + "**: ";
      var used = [];
      while (used.length < sfr[a].min) {
        for (var i = 0; i < sfr[a].list.length; ++i) {
          if (Math.random() < sfr[a].weight) {
             used.push(sfr[a].list[i]);
          }
        }
      }
      text += used.join(', ');
    }


    text += "\n";
    text += "\nDirections:";
    text += "\n";
    text += "\n1. Chop up veggies into reasonably-sized pieces. Best judgment.";
    text += "\n1. Coat frying pan generously in oil and put burner on medium.";
    text += "\n1. Sloppily chop meat into bite-sized chunks. Dump into pan.";
    text += "\n1. Use spatula to stir chunks in pan until almost cooked. Split chunk down the middle to check.";
    text += "\n1. Add veggies one by one, using spatula to mix them in real good";
    text += "\n1. Turn burner to low. Dump in your spices and stir them in sloppily.";
    text += "\n1. Don't mix the spices for too long. We want to leave concentrated delicious bursts of flavor here and there to keep things interesting.";

    text += "\n1. Dump your wondrous creation onto plate(s) and devour.";

    $('#stir-fry-output').append($('<p>').append(marked(text)));

  });
})();

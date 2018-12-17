# muddleMIND (aka Master Mind)

What's this? A mobile- and colorblind-friendly version of the classic game "Master Mind," featuring easy-to-distinguish shapes instead of color dots, and a color palette that skews toward blue and has functional contrast even if viewed monochrome. Also works well for folks with "normal" vision who are using iOS "Night Shift" mode, which can make it hard to distinguish colors in some games.

Why "muddle"? Maybe that's how I felt a few times while putting it together. Or maybe I just like how that word sounds and looks.

## Getting started

To play the game, simply follow this link in your browser: https://tam-en.github.io/mastermind/. Designed to fit on an iPhone5/SE screen, even with iOS Safari's rather real-estate-hungry browser menus. Touch screens make for easier play than mouse/trackpad. 


## How to play

### Objective
Behind the "muddleMIND" title, there's a randomly generated sequence of four shapes. Your job is to guess/deduce that sequence. You get eight attempts.

### First attempt
Start on row 1 near the bottom of the screen. Click on one of the large boxes to the right of the "1" and then, to add a shape, click on one of the six shapes at the bottom of the screen.

Repeat until all four boxes to the right of the "1" are filled. If you change your mind about what shape you want in a box, simply click that box and select a different shape.

When all four boxes in the row contain a shape, you'll be given the option to submit that sequence for scoring -- a "GO!" button will appear over the "1." Click on it to submit your sequence.

### Interpreting your score
Your score will be displayed to the left of the "1" in the form of black or white dots.

A black dot indicates an exact match—one of your shapes matches a shape in the solution sequence and is in the correct position.

A white dot indicates that one of your shapes matches a shape in the solution sequence, but isn't in the correct position.

### Subsequent attempts
Use your powers of deduction (and a dash of luck) to keep submitting guesses and using your scores to figure out the solution. If you get it right, the round will be over and the solution sequence will appear at the top to show you that you were right!

If you run out of turns without deducing the correct sequence, the solution will also appear to sate your curiosity.

## Colorblind- and vision-friendly features

The game play of muddleMIND is taken from the classic board game Master Mind, which I played as a kid. I loved the old game, but it had a few drawbacks. First, one player has to keep score, and if they make a mistake (which can easily happen), it can drive the other player absolutely nuts. The other problem with the classic game -- and digital versions that stay true to its design -- is that it's played with colored pegs, not shapes. Makes it a real challenge for people who can't see all colors, and those folks constitute a significant portion of the population.

According to the National Eye Institute (NEI), as many as 8 percent of men and 0.5 percent of women with Northern European ancestry have some form of "red-green" colorblindness. This category comprises four specific conditions, and the perception of reds, greens, oranges, and yellows varies among the conditions and indiviuals. The NEI's much more thorough explanation can be found at: https://nei.nih.gov/health/color_blindness/facts_about">

I used the Coolors website (https://coolors.co/) to vet the "muddleMIND" color palette to ensure it would be attractive for folks with red-green colorblindness and would be easy to navigate even for those who see no color or are viewing the game on a monochrome device. My palette is skewed toward blue because most of the people I know (all guys) who can't see red and green find blue especially appealing.

This game was designed to work well even on an iPhone 5/Se browser.

I created the shapes used in this game with Photoshop. My intent was to make them of similar visual "weight" and distinguishable even for people with slightly blurry vision -- e.g., a middle-aged person who has removed their reading glasses. I was my own guinea pig, playing muddleMIND in bed at 10 p.m. with "Night Shift" on and my glasses off.

## Development process

I decided to create a JavaScript-based version of Master Mind because I've always liked the game (I have a soft spot for elegant, untimed logic games) and because I thought it would be a great chance to practice CSS grids, basic JavaScript logic, and DOM manipulation. The chance to think through color and accessibility was another great opportunity.

### Thinking through the game logic

I unearthed an ancient, travel-size version of the game I've been hauling around since my teenage years, reminded myself how the game play works, and started imagining how to split the logic into functions and store the data in arrays. I knew I'd have to pay particular attention to the scoring function: It's important that the order of white and black "points" not correlate to the position of the guess sequence. Next I took a whack at pseudocoding it. 

### Planning and implementing the grid

I sketched the necessary grid in Adobe InDesign. Here's a screen shot: 

![grid_sketch](https://github.com/tam-en/mastermind/blob/master/grid_sketch.png)

My initial grid plan includes a left side column to hold the shape choices for deployment on desktop. Didn't get around to implementing that. Another departure from the original plan is the heading elements. I eventually discovered that although the gameboard as I first designed it fit well in the iPhone 5 viewport -- at least it did in the Chrome Inspector simulation of that viewport -- in real life the phone-based browsers chew up a significant portion of the vertical real estate with menus. I needed to shrink the height of the grid. I eliminated one of the header rows and made the remaining one do double-duty. A the beginning of game play it display the game title and a gear icon; at end of game play those items hide and the following appear in their place: the solution sequence, game lost/won message, and "play again" option.

### Tackling the JavaScript

Much JavaScripting ensued. Here are some of the head-scratchers I encountered.

My first big problem occured on about a day into coding. I thought I was trying to do something eminently reasonable -- elegant even -- and couldn't fathom why it wasn't working. My goal? Define array length locally (e.g., for the array of the shapes, the guess sequences, and the scoring sequences) based on global variables for the number of tries, number shapes, and sequence length. I had defined those at the global level in hopes of laying the groundwork to make the game scalable in the future, i.e., to give the user the option to up challenge by increasing sequence length to five, with correlating increases in other variables. And I was trying to keep magic numbers out of my code.

But it would. Not. Work. Eventually wiser coders weighed in to let me know that I was trying to do something not supported by JavaScript -- or at least not supported in the manner I was attempting. And so I defined the relevant arrays at the global level too, predefining their length to accomodate either an easy and a harder mode. 

My next round of deep frustration came when I spent many hours trying to use an anonymous function to conditionally turn off listeners that had been turned on by a different anonymous function. Again, it turned out I was trying to do something impossible. And it also turned out to be quite unncessary to turn the listeners off. Steven Peters suggested I leave the listeners on, but make the bulk of the function they call dependent on certain conditions being true. It took a lot of messy refactoring to make that happen, but it worked. 


## Wish list

I hope to make several improvements to this game. Top of the list is making the JavaScript more efficient, including refactoring several of the for loops with array methods. I may also want to implement a feature that will automatically highlight the next box in a row after the user has assigned a shape to the previous box (not really important for touch-screen play, but might be nice for mouse/trackpad users). 

While the game works fine on either mobile or desktop, I'd like to practice responsive design by adding media queries to make the gameboard a bit larger on desktop and move the title and shape options to the side of the gameboard to make better use of horizontal space.

Finally, I tried to write most of the JavaScript to make the game scalable. There are versions of MasterMind that allow you to deduce longer sequences with more shapes and more attempts, and I'd like to add that option to this someday, in all of my copious free time.


## Author

Tamis Nordling\

GitHub: https://github.com/tam-en
\
LinkedIn: https://www.linkedin.com/in/tamis-nordling/

## Tools & technologies used

HTML\
CSS\
JavaScript\
Adobe Photoshop\
Adobe InDesign (for mocking up the grid)\
Google Fonts (Coiny and Signika: 400, 600)\
Coolors (for considering different kinds of color blindness in my palette)


## Acknowledgments

Shout out to W3Schools, Stackoverflow for so many answers.

Special thanks to Taylor Darneille and Steven Peters at General Assembly for helping me figure out a few of the nastier technical problems. And thanks to Lemon Garrett for advice on CSS grids and the tip on using Coolors.

### One last word on the topic of colorblindness . . .
While it's true that there are several conditions that can affect perception of color, there is no medical condition that can render a person able to see most things except for racial features.

There are a lot of good resources on this topic, including a 2011 article published in Psychology Today, "Colorblindness Ideology is a Form of Racism," by Monica T. Williams, Ph.D. (see https://www.psychologytoday.com/us/blog/culturally-speaking/201112/colorblind-ideology-is-form-racism).



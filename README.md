# simonGame

The game of Simon from the 1980s. It is the last project from the FreeCodeCamp front end course.
It was completed in half the time it took for the Tic Tac Toe game. Lots learned with that project.

Play at https://codepen.io/Pherang/pen/dmGeoZ

A fun challenge with this project was getting the the computer to replay the sequence of button presses in order. I tried using setTimeout in a loop but because the computer queues up each call so quickly they all execute at the same time once the time has passed.
To get past this I changed the replay function to an **async function** which allowed me to use the **await** expression in side of it to properly pause the replay function's execution.

Another new thing I learned was how to use the **\<audio\>** element. The fun with this one was figuring out how to get the sound for the buttons to play once they were already played. I tried things like setting the currentTime property of the audio file to 0 but that didn't seem to work. The only thing that seemed to work was to use the load() method of the audio element to reset and reload it.
  
One small final thing I learned was how to get the pads to flash when played or pressed. This involved adding a class to the button element with a lighter colour, waiting about 500ms, and then removing that same class.

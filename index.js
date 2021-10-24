const fs = require("fs");
const inquirer = require("inquirer");

let songName = "In The End";
let bandName = "Linkin Park";

function capitalizeFirstLetter([ first, ...rest ], locale) {
  return [ first.toLocaleUpperCase(locale), ...rest ].join('');
}
const formatTitle = (element) => {
  let result = ''
  element.split(' ').map((letter, i) => {
    if (i === 0) result += letter.toLowerCase()
    else result += capitalizeFirstLetter(letter, 'tr')
  } )
  return(result)
}

const questions = [
  {
    type: "input",
    name: "song-name",
    message: "Song name:",
  },
  {
    type: "input",
    name: "band-name",
    message: "Band name:",
  },
];

inquirer.prompt(questions).then((answers) => {
  songName = answers["song-name"];
  bandName = answers["band-name"];

  const stream = fs.createWriteStream(`teplate-youtube-3-${songName}.txt`);

  stream.once("open", function (fd) {
    stream.write(`${songName} - Tradução and lyrics - ${bandName}\r\n\r\n`);

    stream.write(
      `${songName} - Tradução em português and lyrics on screen - ${bandName} \r\n \r\n`
    );

    stream.write(`All rights reserved to *${bandName}*. \r\n`);
    stream.write(
      "I have no rights to the music, I just made this video for Brazilian fans of the band, if you want me to remove the video from the air, just send me a message that I will immediately withdraw. \r\n \r\n"
    );

    stream.write(`#${formatTitle(bandName)} #${formatTitle(songName)} \r\n \r\n`)

    stream.write("--tags--\r\n");
    stream.write(
      `letra, tradução, legendado, lyrics, beijar um porco, ${songName}, ${bandName}, \r\n`
    );
    

    stream.end();
  });
});

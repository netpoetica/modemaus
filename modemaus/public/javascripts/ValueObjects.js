// TEMPORARILY ACTING LIKE THE DATA SIDE OF THIS APP
console.log("Loading ValueObjects.js...");
//////////
// This VO is used to house an indexable (from 0) list of of all the notes in the Chromatic Western scale.
//////////
ChromaticScaleVO = [ 
        "C",
        "C#/Db",
        "D",
        "D#/Eb",
        "E",
        "F",
        "F#/Gb",
        "G",
        "G#/Ab",
        "A",
        "A#/Bb",
        "B"
];

///////////
// This VO is used to house and indexable multidimensional array that contains recommended chords
// for use in the specified scale. It is done this way for dynamics purposes. The order 0-6 is
// in a major scale, and it's up to the builder function to decide what order this array will be 
// processed in. IE, Dorian is 1-6, then to 0 - Phrygian is 2-6, then 0-1.
//////////
ChordsVO = [	
        ["major", "major 7", "suspended 4", "add 6", "add 9", "major 9"], 
        ["minor", "minor 7", "minor 9", "minor 11", "minor 13"], 
        ["minor", "minor 7", "minor 11"], 
        ["major", "major 7", "add 9", "add 6", "major 9", "major 7#11"], 
        ["major", "dominant 7", "suspended 4", "add 9", "add 6", "dominant 7 suspended 4", "major 9", "major 11", "major 13"], 
        ["minor", "minor 7", "minor 9", "minor 11"], 
        ["diminished", "diminished 7"]		
];

/////////////
// This VO is used to house an indexable list of objects representing the name and
// STEPS:
// stepwise pattern of a mode (i.e. scale)
// 2 = whole step, 1 = half step (on a Chromatic western scale)
// CHORDER: (chord order)
// it also holds the order in which the chords will be applied to the note 
// depending on the position it serves in a scale.
///////////
ModesVO = [
        {	name: "Ionian/Major", 
                steps: [2,2,1,2,2,2,1],
                chorder: [0,1,2,3,4,5,6]
        },

        {	name: "Dorian",
                steps: [2,1,2,2,2,1,2],	
                chorder: [1,2,3,4,5,6,0]
        },

        {	name: "Phrygian",
                steps: [1,2,2,2,1,2,2],	
                chorder: [2,3,4,5,6,0,1]	
        },

        {	name: "Lydian", 
                steps: [2,2,2,1,2,2,1],	
                chorder: [3,4,5,6,0,1,2]		
        },

        {	name: "Mixolydian",
                steps: [2,2,1,2,2,1,2],
                chorder: [4,5,6,0,1,2,3]	
        },

        {	name: "Aeolian/Minor", 
                steps: [2,1,2,2,1,2,2],	
                chorder: [5,6,0,1,2,3,4]	
        },

        {	name: "Locrian", 
                steps: [1,2,2,1,2,2,2],	
                chorder: [6,0,1,2,3,4,5]	
        }
];

// Allows for the possibility of multiple tunings in the future. Maybe even allow users to create their own tunings,
// or to select from a list.
var TuningsVO = [
        {
                name: "Standard",
                noteSpelling: ["E", "A", "D", "G", "b", "e"],
                chromaticNumbering: ["4", "9", "2", "7", "11", "4"]
        }
];
// Validates fully with JSHint - http://www.jshint.com/ - using jQuery.
$(function(){
	"use strict";
	///////////
	// BuildScale Object - this is the bulk of the program. It stores a couple of value objects
	// and functions. The VOs store data that helps to automate the process of building the scales
	// for display, and the functions are used to harness these VOs and build the scale to be output.
	//////////
	var BuildScale = {
		//////////
		// This VO is used to house an indexable (from 0) list of of all the notes in the Chromatic Western scale.
		//////////
		ChromaticScaleVO: [ 
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
		],
		
		///////////
		// This VO is used to house and indexable multidimensional array that contains recommended chords
		// for use in the specified scale. It is done this way for dynamics purposes. The order 0-6 is
		// in a major scale, and it's up to the builder function to decide what order this array will be 
		// processed in. IE, Dorian is 1-6, then to 0 - Phrygian is 2-6, then 0-1.
		//////////
		ChordsVO: [	
			["major", "major 7", "suspended 4", "add 6", "add 9", "major 9"], 
			["minor", "minor 7", "minor 9", "minor 11", "minor 13"], 
			["minor", "minor 7", "minor 11"], 
			["major", "major 7", "add 9", "add 6", "major 9", "major 7#11"], 
			["major", "dominant 7", "suspended 4", "add 9", "add 6", "dominant 7 suspended 4", "major 9", "major 11", "major 13"], 
			["minor", "minor 7", "minor 9", "minor 11"], 
			["diminished", "diminished 7"]		
		],
		
		/////////////
		// This VO is used to house an indexable list of objects representing the name and
		// STEPS:
		// stepwise pattern of a mode (i.e. scale)
		// 2 = whole step, 1 = half step (on a Chromatic western scale)
		// CHORDER: (chord order)
		// it also holds the order in which the chords will be applied to the note 
		// depending on the position it serves in a scale.
		///////////
		ModesVO: [
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
		],
		
		//////////
		// This function builds the 7 notes of any mode/scale/key based on the pattern of the mode/scale
		// and the root note of the mode/scale. It returns an object with a root note, name of the mode,
		// and the final makeup (array) of the scale being searched for.
		///////////
		Build: function(root, mode){
			
			// root  MUST be a number, cannot be a string. Form elements, even if numbers
			// will be passed in as strings. Be sure to convert
			root = Number(root);
			
			var currentDegree = root;		//represents the addition of each modes whole or half step
			var finalScale = [];
			
			for(var i=0,j=mode.steps.length; i<j; i++){
				finalScale.push(BuildScale.ChromaticScaleVO[currentDegree]);			//get root first
				
				//if adding degrees causes the program to go to the 13th or higher note,
				//keep it in the 12-note chromatic scale range. Remembers, it's 11
				//because it's 0-11 (12 values)
				if(currentDegree + mode.steps[i] > 11){
					currentDegree -= 12;
				}
				currentDegree += mode.steps[i];				//move up whole or half step of scale
			}
			
			return {
				root: BuildScale.ChromaticScaleVO[root],
				name: mode.name,
				scale: finalScale,
				chorder: mode.chorder
			};
			
		}
			
	},
	//END BuildScale OBJECT
	
	////////
	//BEGIN FRETBOARD OBJECT
	//CONTROLS FRETBOARD FUNCTIONS AND RENDERING
	/////////
	Fretboard = {
		
		//////////////////
		//  Properties  //
		//////////////////
		// Create a jQuery factory reference to html element that will be used to represent the fretboard
		target: $('#fretboard'),
		
		// Allows for the possibility of multiple tunings in the future. Maybe even allow users to create their own tunings,
		// or to select from a list.
		TuningsVO: [
			{
				name: "Standard",
				noteSpelling: ["E", "A", "D", "G", "b", "e"],
				chromaticNumbering: ["4", "9", "2", "7", "11", "4"]
			}
		],
		
		///////
		// Returns an HTML string that represents the Fretboard table.
		///////
		Draw: function(tuning){
	
			//string to store the HTML table
			var tableString = "";
			
			//set up table header info (fret numbers)
			tableString += "<tr>";
			for (var n = 0; n < 12; n++){		//12 is number of guitar frets shown, 0 = open
				tableString += "<th>" + n + "</th>";
			}
			tableString += "</tr>";
			
			//table body
			for(var i = 0, ii = 6; i < ii; i++){	//6 is the number of guitar strings
				tableString += "<tr id='string" + i + "'>";
				//start at the first note of the tuning, and work your way to the last (0-5) for 6 strings
				for(var j = 0, jj = tuning.chromaticNumbering[i]; j < 12; j++){	//12 is number of frets shown, using Standard tuning, + j 
					tableString += "<td>" + BuildScale.ChromaticScaleVO[jj] + "</td>";
					if(jj >= 11){
						jj -= 11;
					}else{
						jj++;
					}
				}
				tableString += "</tr>";
			}
			
			Fretboard.target.html(String(tableString));
			
		},
		
		//////////
		// Once a scale is built, this function is used to highlight the fretboard appropriately.
		// targetTable is the target element to which the scale will be applied
		//////////
		ApplyMode: function(mode){
		
			Fretboard.target.find('td').each(function(){
				var text = $(this).text();
				
				if(text === mode[0]){
					$(this).addClass('rootOnFretboard');
				}
				else if(text === mode[3]){
					$(this).addClass('fourthOnFretboard');
				}
				else if(text === mode[4]){
					$(this).addClass('fifthOnFretboard');
				}
				else if(text === mode[1] || text === mode[2] || text === mode[5] || text === mode[6]){
					$(this).addClass('noteOnFretboard');
				}
				else {
					$(this).addClass('noteOnFretboard');
				}
			
			});

		}
	},
	
	// Display results of Modemaus submit
	showOutput = function(rootNote, scaleName, scale, chorder){
		
		//update contentHeader to display name of scale
		// add later : +'<p>Get the <a href="#">relative minor!</a></p>'
		$("#contentHeader").html('<h2>' + rootNote + ' ' + scaleName + '</h2>');
		
		//reference to the output Panel
		var output = $("#outputPanel"); 
	
		var html = "<table><tr><th>Note</th><th>Related Chords</th></tr>";
		for(var i=0,j = scale.length; i < j; i++){
			html += '<tr';
			if(i === 0){	
				//root note
				html += ' class="rootOnFretboard"';
			}
			else if(i === 3){
				//perfect fourth
				html += ' class="fourthOnFretboard"';
			}
			else if(i === 4){
				//perfect 5th
				html += ' class="fifthOnFretboard"';			
			}
			else {
				html += ' class="noteOnFretboard"';
			}
			html+='><td class="scaleDegree">'+ scale[i] + '</td><td class="relatedChords">';
			
			for(var k = 0, l = BuildScale.ChordsVO[chorder[i]].length; k < l; k++){
				html += "" + scale[i] + " " + BuildScale.ChordsVO[chorder[i]][k];	
				//prevent the comma from showing up on the end of the last chord :)
				if(k + 1 < l){ 
					html += ", ";
				}
			}
			html += '</td></tr>';
		}
		html+= "</table>";
		
		output.html(html);
		
	},
	
	// Complete all the routines required to update the fretboard to a new scale
	updateFretboard = function(root, scale){

		if(!root){
			root = $("#root").val();
		}
		if(!scale){
			scale = $("#scale").val();
		}

		var o = BuildScale.Build(root, BuildScale.ModesVO[Number(scale)]);
		
		Fretboard.Draw(Fretboard.TuningsVO[0]);
		Fretboard.ApplyMode(o.scale);
		
		showOutput(o.root, o.name, o.scale, o.chorder);
		
	},
	
	//////
	// This basic Search functions splits user input into an array. It looks for a 1 char value to represent the
	// root note, and any other value gets compared against a regular expression that checks for a case insensitive
	// match to the user input of a string over 1 char.
	//////
	searchScales = function(input, preventAddToHistory){
		if(!input){
			input = $("#txtSearch").val();
		}
		
		
		//search for a standalone letter as the root note, and a word to compare to scale names
		var arrInput = input.split(" ");
		var root, scale;
		
		for(var i = 0; i < arrInput.length; i++){
			if(arrInput[i].length === 1){
				//console.log(arrInput[i]);
				//probably the root note
				for(var j = 0; j < BuildScale.ChromaticScaleVO.length; j++){
					if(arrInput[i].toUpperCase() === BuildScale.ChromaticScaleVO[j] || arrInput[i].toLowerCase() === BuildScale.ChromaticScaleVO[j]){
						root = j;
						//console.log(root);
					}
				}
			}
			else if(arrInput[i].length > 1){
				//probably the scale name
				//console.log(arrInput[i]);
				var regex = new RegExp(arrInput[i], "i");
				//console.log(regex);
				for(var k = 0; k < BuildScale.ModesVO.length; k++){
					//console.log(BuildScale.ModesVO[k].name);
					//console.log("Match: " + BuildScale.ModesVO[k].name.match(regex));
					if(BuildScale.ModesVO[k].name.match(regex)){
						//alert("Found a match!");
						scale = k;
						//console.log(scale);
					}
				}
			}
		}
		
		//show the search history div, and add a new search to it
		if(BuildScale.ChromaticScaleVO[root]){
			root = BuildScale.ChromaticScaleVO[root];
		}
		if(BuildScale.ModesVO[scale].name){
			scale = BuildScale.ModesVO[scale].name;
		}
		if(!preventAddToHistory){
			var history = $("#searchHistory");
			history.slideDown('slow');
			$("<span class = '.prevSearch'><input type='button' value='" + root + " " + scale + "' /></span>").appendTo(history).bind("click", function(){
					searchScales($(this).find('input').val(), true);
			});
		}
		updateFretboard(root, scale);
	},
	
	// Initially build a selected scale
	init = function(){
		updateFretboard();
		
		// Binds a submit event to the submit button
		$('#selectorForm').submit(function(){
			updateFretboard();
			return false;
		});
		$('#fmSearch').submit(function(){
			searchScales();
			return false;
		});
	}();
});
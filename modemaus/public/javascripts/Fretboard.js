/* @name Fretboard.js
 * @version 1.0
 * @author Keith Rosenberg, kthrose@netpoetica.com
 * @description The Fretboard object for Modemaus.js.
 */
console.log("Loading Fretboard.js...");
var Fretboard = {

        //////////////////
        //  Properties  //
        //////////////////
        // Create a jQuery factory reference to html element that will be used to represent the fretboard
        target: $('#fretboard'),

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
                                tableString += "<td>" + ChromaticScaleVO[jj] + "</td>";
                                if(jj >= 11){
                                        jj -= 11;
                                }else{
                                        jj++;
                                }
                        }
                        tableString += "</tr>";
                }

                this.target.html(String(tableString));

        },

        //////////
        // Once a scale is built, this function is used to highlight the fretboard appropriately.
        // targetTable is the target element to which the scale will be applied
        //////////
        ApplyMode: function(mode){

                this.target.find('td').each(function(){
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

        },
        // Complete all the routines required to update the fretboard to a new scale
        update: function(root, scale){

                if(!root){
                        root = $("#root").val();
                }
                if(!scale){
                        scale = $("#scale").val();
                }

                var o = Build(root, ModesVO[Number(scale)]);

                this.Draw(TuningsVO[0]);
                this.ApplyMode(o.scale);

                showOutput(o.root, o.name, o.scale, o.chorder);

        }
};
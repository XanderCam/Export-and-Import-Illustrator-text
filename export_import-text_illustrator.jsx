// JSON Polyfill for ExtendScript
if (typeof JSON === "undefined") {
    JSON = {
        stringify: function (obj) {
            var t = typeof obj;
            if (t !== "object" || obj === null) {
                // simple data type
                if (t === "string") obj = '"' + obj + '"';
                return String(obj);
            } else {
                // recurse array or object
                var n, v, json = [], arr = (obj && obj.constructor === Array);
                for (n in obj) {
                    v = obj[n];
                    t = typeof v;
                    if (t === "string") v = '"' + v.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
                    else if (t === "object" && v !== null) v = JSON.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        },
        parse: function (text) {
            try {
                return eval("(" + text + ")");
            } catch (e) {
                throw new Error("Invalid JSON format: " + e.message);
            }
        }
    };
}

// Export all text in the document to a JSON file
function exportTextToJSON() {
    var doc = app.activeDocument; // Get the active document
    var textData = []; // Array to hold text data

    // Iterate through all text frames in the document
    for (var i = 0; i < doc.textFrames.length; i++) {
        var textFrame = doc.textFrames[i];
        textData.push({
            index: i,
            contents: textFrame.contents
        });
    }

    // Ask user for a file location to save the JSON
    var file = File.saveDialog("Save Text JSON File", "*.json");
    if (file) {
        file.open("w");
        try {
            file.write(JSON.stringify(textData, null, 2)); // Save data as JSON
            alert("Text exported to JSON file successfully!");
        } catch (e) {
            alert("Error exporting JSON: " + e.message);
        } finally {
            file.close();
        }
    } else {
        alert("File save cancelled.");
    }
}

// Import text from a JSON file and update the document
function importTextFromJSON() {
    var doc = app.activeDocument; // Get the active document

    // Ask user for a JSON file to import
    var file = File.openDialog("Select JSON File to Import", "*.json");
    if (file) {
        file.open("r");
        var rawData;
        try {
            rawData = file.read(); // Read file content
        } catch (e) {
            alert("Error reading file: " + e.message);
            file.close();
            return;
        }
        file.close();

        // Try parsing the JSON data
        var textData;
        try {
            textData = JSON.parse(rawData); // Parse JSON data
        } catch (e) {
            alert("Error parsing JSON: " + e.message);
            return;
        }

        // Update text frames with imported data
        try {
            for (var i = 0; i < textData.length; i++) {
                var index = textData[i].index;
                var contents = textData[i].contents;

                if (index < doc.textFrames.length) {
                    doc.textFrames[index].contents = contents;
                }
            }
            alert("Text imported from JSON file successfully!");
        } catch (e) {
            alert("Error updating text frames: " + e.message);
        }
    } else {
        alert("File open cancelled.");
    }
}

// Add a user interface for running the functions
function main() {
    var choice = confirm("Export text to JSON? Click Cancel to Import JSON.");
    if (choice) {
        exportTextToJSON();
    } else {
        importTextFromJSON();
    }
}

// Run the script
main();

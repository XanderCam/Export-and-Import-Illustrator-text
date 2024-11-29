// Illustrator Script: Export/Import All Text as JSON

function main() {
    var action = prompt("Choose an action: 'export' or 'import'", "export");

    if (action === "export") {
        exportTextToJSON();
    } else if (action === "import") {
        importTextFromJSON();
    } else {
        alert("Invalid action. Please select 'export' or 'import'.");
    }
}

function exportTextToJSON() {
    // Get user-defined file location
    var file = File.saveDialog("Choose a location to save your JSON file", "*.json");
    if (file) {
        var textItems = collectTextItems();
        var json = JSON.stringify(textItems, null, 2);
        saveUTF8(file, json);
    } else {
        alert("Export canceled.");
    }
}

function collectTextItems() {
    var items = [];
    var doc = app.activeDocument;

    for (var i = 0; i < doc.textFrames.length; i++) {
        var textFrame = doc.textFrames[i];
        var item = {
            contents: encodeUTF8(textFrame.contents),
            position: textFrame.position,
            font: textFrame.textRange.characterAttributes.textFont.name,
            size: textFrame.textRange.characterAttributes.size,
            leading: textFrame.textRange.characterAttributes.leading,
            fillColor: textFrame.textRange.characterAttributes.fillColor
        };
        items.push(item);
    }

    return items;
}

function saveUTF8(file, content) {
    file.encoding = "UTF-8"; // Set encoding
    file.open("w");
    try {
        file.write(content);
    } catch (error) {
        alert("Error saving file: " + error.message);
    } finally {
        file.close();
    }
}

function importTextFromJSON() {
    // Get user-defined file location
    var file = File.openDialog("Choose a JSON file to import", "*.json");
    if (file) {
        var content = loadUTF8(file);
        if (content) {
            try {
                var json = JSON.parse(content);

                for (var i = 0; i < json.length; i++) {
                    createTextFrame(json[i]);
                }
                alert("Import completed successfully!");
            } catch (error) {
                alert("Error parsing JSON: " + error.message);
            }
        } else {
            alert("Import canceled.");
        }
    } else {
        alert("Import canceled.");
    }
}

function loadUTF8(file) {
    file.encoding = "UTF-8"; // Set encoding
    file.open("r");
    var content = file.read();
    file.close();
    return content;
}

function createTextFrame(data) {
    var doc = app.activeDocument;
    var textFrame = doc.textFrames.add();
    
    textFrame.contents = decodeUTF8(data.contents);
    textFrame.position = data.position;
    textFrame.textRange.characterAttributes.textFont = app.textFonts.getByName(data.font);
    textFrame.textRange.characterAttributes.size = data.size;
    textFrame.textRange.characterAttributes.leading = data.leading;
    textFrame.textRange.characterAttributes.fillColor = data.fillColor;
}

function encodeUTF8(str) {
    return decodeURIComponent(escape(str));
}

function decodeUTF8(str) {
    return unescape(encodeURIComponent(str));
}

// Run the main function
main();

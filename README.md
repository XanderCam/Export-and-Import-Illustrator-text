# Export-and-Import-Illustrator-text
A script for importing and exporting text in an Illustrator document using JSON format. To ease translating or other external need to edit text.

The script will search for text in an Adobe Illustrator document and export it to JSON format.
The script will import JSON formatted text back into the Illustrator Document.

It was designed to help creating multilanguage documents in a quick and easy manner.
It is recommended to test the JSON file in an online validator (such as https://codebeautify.org/json-fixer) 
before importing it back into Illustrator to avoid import errors.

Script is public and use of it is at your own risk.
This contributor does not take any responsibility for any unwanted or unforseen results conected to the
use of this script. Feel free to tweak it or make your own version of it.

Place the file in your Adobe Illustrator Scripts folder.
Usually "C:\Program Files\Adobe\Adobe Illustrator[version]\Presets\en_US\Scripts"

Script Explanation
JSON Compatibility: Adds JSON support if unavailable.

Export Functionality:
Extracts text content from all text frames.
Encodes special characters and writes a UTF-8 JSON file.

Import Functionality:
Reads a JSON file and decodes text, applying it back to the document's text frames.
Handles parsing errors (unterminated strings).
Hidden Character Handling: Escapes problematic characters like line breaks (\n).

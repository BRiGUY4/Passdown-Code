// The onOpen function is executed automatically every time this Spreadsheet is loaded
// Implant Passdown Menu to update and send the passdown
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [];
  menuEntries.push({name: "Send Implant Passdown", functionName: "emailSpreadsheetAsPDF"});
  menuEntries.push({name: "Update Implant Info", functionName: "importInfoSheets"});

  // Main menu Name
  ss.addMenu("Implant Passdown", menuEntries);
}

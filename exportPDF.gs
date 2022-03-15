function emailSpreadsheetAsPDF() {
  DocumentApp.getActiveDocument();
  DriveApp.getFiles();

  //Declaring the spreadsheet we are seeding from
  const ss = SpreadsheetApp.openByUrl("GOOGLE SHEET URL WITH ID");


  //Seeding from UnderCONSTRUCT Cell S1 to provide shift day
  var ssS1 = SpreadsheetApp.openById("INPUT GOOGLE SHEET ID ONLY, HERE");
  var sheet = ssS1.getSheetByName('UnderCONSTRUCT'); 
  var range = sheet.getRange(1,19); 
  var dataS1 = range.getValue();


  //Clears the IMPLANT INFO Screen after update
  var sINFO = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IMPLANT INFO");
  sINFO.clear();



  //Email recipient(s)
  const email = 'EXAMPLEeMAIL@HERE.com';




  // Subject of the email message
  const subject = 'IMPLANT ' + dataS1+ " Shift " + "Maintenance Passdown " + Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd");

  // Email Text
  const body = "IMPLANT PASSDOWN ATTACHED";

  // URL of the Sheet
  const url = 'INPUT GOOGLE SHEET URL';


  //Sheet edits
  const exportOptions =
    'exportFormat=pdf&format=pdf' + // export as pdf
    '&portrait=true' + // orientation portal, use false for landscape
    '&fitw=true' + // fit to page width false, to get the actual size
    '&sheetnames=false&printtitle=false' + // hide optional headers and footers
    '&pagenumbers=false&gridlines=false' + // hide page numbers and gridlines
    '&fzr=false' + // do not repeat row headers (frozen rows) on each page
    '&gid=1937222491'; // Maintenacne
    //var gid1 = '&gid=1878094178'; // Rebuild
  
  //Authenticate file
  var params = {method:"GET",headers:{"authorization":"Bearer "+ ScriptApp.getOAuthToken()}};
  
  // Generate the PDF file
  //Maintenance Passdown
  var response = UrlFetchApp.fetch(url+exportOptions, params).getBlob();
  //Rebuild passdown -- If wanting to send another attachment with the passdown
  //var response1 = UrlFetchApp.fetch(url+exportOptions+gid1, params).getBlob();
  
  // Send the PDF file as an attachement 
    GmailApp.sendEmail(email, subject, body, {
      htmlBody: body,
      attachments: [{
            fileName: 'IMPLANT ' + dataS1+ " Shift " + "Maintenance Passdown " + Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd"),
            content: response.getBytes(),
            mimeType: "application/pdf"
        }]
    });
}

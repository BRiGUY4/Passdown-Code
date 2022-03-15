function importInfoSheets() {
  // Copy data from INFO SCREEN to MT....Values only!
  var sMT = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MAINTENANCE");
  var sINFO = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IMPLANT INFO");
  
// Verify IMPLANT INFO SCREEN is in cell 'A1'
  if (sINFO.getRange(1,1).getValue() != 'Implant Info Screen'){
    // var response = SpreadsheetApp.getUi().msgBox('Implant Info Screen data missing?', SpreadsheetApp.getUi().ButtonSet.OK);
    Browser.msgBox('Implant Info Screen data missing?', Browser.Buttons.OK);
    return;}

// Import all High Current data from IMPLANT INFO
  var MTrow = 16;   // Starting point on MT screen
  var MTcolumn = 3; // Starting point on MT screen
  var Irow = 3;  // E10 row IMPLANT INFO
  var Icolumn = 2; // E10 colum IMPLANT INFO


// Staring row on INFO Screen 
  var Ihome =1;  
  var Ie10 =1;       //   row  3
  var Ipfg = 1;      //   row 11
  var Isource = 1;   //   row 14
  

//  Find HC data
  var Crow = 1;    
  var Lrow = sINFO.getLastRow();
  var NEXTstage = 1  
  
  while (Crow <= Lrow){// Set row for Ie10, Ipfg & Isource
    Crow++;
    if (sINFO.getRange(Crow,1).getValue() == 'E10_State'){
      if (Ie10 != 1){
        NEXTstage = Crow;
        Crow = Lrow +1;}
        else{Ie10 = Crow;}
    }
    if (sINFO.getRange(Crow,1).getValue() == 'PFG Hot Time')
    {Ipfg = Crow;}
    if (sINFO.getRange(Crow,1).getValue() == 'Source Time')
    {Isource = Crow;}
  }
  
  //Counts in increments of two on the ending of the data to be copied over on MAINTENANCE from IMPLANT INFO
  for(Icolumn = 2; Icolumn < 44; Icolumn = Icolumn +2) {
     sMT.getRange(MTrow,MTcolumn).setValue(sINFO.getRange(Ie10,Icolumn).getValue());
     sMT.getRange(MTrow,MTcolumn+10).setValue(sINFO.getRange(Ipfg,Icolumn).getValue().toString().replace("Hrs", ""));// +2
     sMT.getRange(MTrow,MTcolumn+9).setValue(sINFO.getRange(Isource,Icolumn).getValue().toString().replace("Hrs", ""));// +1
  MTrow = MTrow + 1;}
  

//  Find MC data
  Crow = NEXTstage-1;    
  Ie10 = 1;    //  row 27
  Ipfg = 1;    //  row 38
  Isource = 1; //  row 40
  while (Crow <= Lrow){
    Crow++;
    if (sINFO.getRange(Crow,1).getValue() == 'E10_State'){
      if (Ie10 != 1){
        NEXTstage = Crow;
        Crow = Lrow +1;}
      else{Ie10 = Crow;}
    }
    if (sINFO.getRange(Crow,1).getValue() == 'PFG Hours')
    {Ipfg = Crow;}
    if (sINFO.getRange(Crow,1).getValue() == 'Source Life')
    {Isource = Crow;}
  } 
  

  // Import all Medium Current data from INFO SCREEN
  var MTmrow = 38   // Starting point on MT screen / 26
  var MTcolumn = 3 // Starting point on MT screen / 3
  var Irow = 26
  var Icolumn = 2
  

  //Count in increments of two
  for(Icolumn = 2; Icolumn < 20; Icolumn = Icolumn +2) {
     sMT.getRange(MTmrow,MTcolumn).setValue(sINFO.getRange(Ie10,Icolumn).getValue());
     sMT.getRange(MTmrow,MTcolumn+10).setValue(sINFO.getRange(Ipfg,Icolumn).getValue().toString().replace("Hrs", ""));
     sMT.getRange(MTmrow,MTcolumn+9).setValue(sINFO.getRange(Isource,Icolumn).getValue().toString().replace("Hrs", ""));
  MTmrow = MTmrow + 1;}
}

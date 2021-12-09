///////////////////////////////////////////////////////////////////////////////
let state=true;
let clickedElementsArray=["a","b","c","d","e","f"];
////////////////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){

    console.log("Message Received");

    
if (state==true){
    console.log("Tracking Started");
    console.log (state);
    document.addEventListener("click", clickListener2);
    state=false;
   

}
else if(state==false){
    console.log("Tracking Stopped");
    console.log(state);
    document.removeEventListener("click",clickListener2);
    exportArray(clickedElementsArray);
    state=true;

}    
});
//////////////////////////////////////////////////////////
function clickListener2(e) {
    var clickedElement = (window.event) ? window.event.srcElement :  e.target,
        tags = document.getElementsByTagName(clickedElement.tagName);
        console.log(clickedElement.tagName);
        clickedElementsArray.push( JSON.stringify(tags));
    
////////////////////////////////////
//here add logic to add the click array items to clicked elements store

}
//////////////////////////////////////////////////////////
function clickListener(e) {
    var clickedElement = (window.event) ? window.event.srcElement :  e.target,
        tags = document.getElementsByTagName(clickedElement.tagName);
        console.log(clickedElement.tagName);
        clickedElementsArray.push( JSON.stringify(tags));
    for (var i = 0; i < tags.length; ++i) {
        if (tags[i] == clickedElement) {
   
  
            if(tags[i].id){ console.log("driver.find_element_by_id("+tags[i].id+").click()");}
            else if(tags[i].className){ console.log("driver.find_element_by_class_name("+tags[i].className+").click()");}
        }
    }
////////////////////////////////////
//here add logic to add the click array items to clicked elements store

}
////////////////
function exportArray(arrayToBeExported){
    console.log(arrayToBeExported);
    var blob= new Blob(arrayToBeExported,  {type: "text/plain;charset=utf-8"});
    saveAs(blob,"arrayToText.txt");
    ////export array to file logic
}
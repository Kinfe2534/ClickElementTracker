///////////////////////////////////////////////////////////////////////////////
let state=true;
let clickedElementsArray=[
`from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
path="C:\Program Files (x86)\chromedriver\chromedriver.exe"
driver= webdriver.Chrome(path)
driver.get("https://www.google.com")
print(driver.title)
time.sleep(5)
search= driver.find_element_by_tag_name("input")
print(search)
search.send_keys("Life Quotes Images")
search.send_keys(Keys.RETURN)
#driver.close() `
];
////////////////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){

    console.log("Message Received");

    
if (state==true){
    console.log("Tracking Started");
    console.log (state);
    document.addEventListener("click", clickListener);
    document.addEventListener("keypress", keypressListener);
    state=false;
   

}
else if(state==false){
    console.log("Tracking Stopped");
    console.log(state);
    document.removeEventListener("click",clickListener);
    document.addEventListener("keypress", keypressListener);
    exportArray(clickedElementsArray);
    state=true;

}    
});
//////////////////////////////////////////////////////////
function clickListener(e) {
    var clickedElement = (window.event) ? window.event.srcElement :  e.target;
        tags = document.getElementsByTagName(clickedElement.tagName);
        console.log(clickedElement)
        // 1. track element by ID
        if(clickedElement.hasAttribute("id")){
            console.log("driver.find_element_by_id("+clickedElement.getAttribute("id")+").click()");
            clickedElementsArray.push(`
            driver.find_element_by_id("${clickedElement.getAttribute("id")}").click()
            `);            
        }
        // 2. track element by NAME ATTRIBUTE
        else if(clickedElement.hasAttribute("name")){
            console.log("driver.find_element_by_name("+clickedElement.getAttribute("name")+").click()");
            document.querySelectorAll('clickedElement.tagName[name =clickedElement.getAttribute("name")]');
            clickedElementsArray.push(`
            driver.find_element_by_name("${clickedElement.getAttribute("name")}").click()
            `);
        }
        // 3. track element by LINK TEXT
        else if(clickedElement.hasAttribute("href")){
            console.log("driver.find_element_by_link_text("+clickedElement.getAttribute("href")+").click()");
            clickedElementsArray.push(`
            driver.find_element_by_link_text("${clickedElement.getAttribute("href")}").click()
            `);

        }
        // 4. track element by PARTIAL LINK TEXT        
        else if(clickedElement.hasAttribute("partiallinktext")){
            console.log("driver.find_element_by_partial_link_text("+clickedElement.getAttribute("partiallinktext")+").click()");
            clickedElementsArray.push(`
            driver.find_element_by_partial_link_text("${clickedElement.getAttribute("partiallinktext")}").click()
            `);

        }
        // 5. track element by TAG NAME
        else if(clickedElement.hasAttribute("name")){
            console.log("driver.find_element_by_name("+clickedElement.getAttribute("name")+").click()");
            clickedElementsArray.push(`
            driver.find_element_by_name("${clickedElement.getAttribute("name")}").click()
            `);
        }
        // 6. track element by CLASS NAME
        else if(clickedElement.hasAttribute("name")){
            console.log("driver.find_element_by_name("+clickedElement.getAttribute("name")+").click()");
            clickedElementsArray.push(`
            driver.find_element_by_name("${clickedElement.getAttribute("name")}").click()
            `);
        }      
        // 7. track element by XPATH
        else if(clickedElement.hasAttribute("name")){
            console.log("driver.find_element_by_name("+clickedElement.getAttribute("name")+").click()");
            clickedElementsArray.push(`
            driver.find_element_by_name("${clickedElement.getAttribute("name")}").click()
            `);
        }
        // FINALLY IF ELEMENT CAN NOT BE UNIQUELY TRACKED
        else{console.log("driver.find_element_by_unknown("+"ID_CLASS_SOME_OTHER_ATTRIBUTE"+").click()")}
    
////////////////////////////////////
//here add logic to add the click array items to clicked elements store

}
function keypressListener(e){
    var pressedKey = (window.event) ? window.event.srcElement :  e.target;
    console.log(e.keyCode);
    console.log(e.which);
    console.log(e.key);
    if(e.key="ENTER"){clickedElementsArray.push(`
    driver.find_element_by_id("${clickedElement.getAttribute("id")}").click()
    `);}
    else{}

}
//////////////////////////////////////////////////////////
function clickListener_example_code(e) {
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
    saveAs(blob,"ClickedElementTrackerOutput.txt");
    ////export array to file logic
}

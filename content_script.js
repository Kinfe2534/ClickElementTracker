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
       
        // 1. track element by ID
        if(clickedElement.hasAttribute("id")){
            // log the criterion
            console.log("Clicked Element Has ----- ID--(1st criterion)----- attribute");
            // log the clicked element
            console.log(clickedElement)
            // update the clicked elements array
            clickedElementsArray.push(`
            #found by ID
            driver.find_element_by_id("${clickedElement.getAttribute("id")}").click()
            `);            
        }
        // 2. track element by NAME ATTRIBUTE
        else if(clickedElement.hasAttribute("name")){
            // log the criterion
            console.log("Clicked Element Has ----- NAME--(2nd criterion)----- attribute");
            // log the clicked element
            console.log(clickedElement)
            // get all elements with name attribute and this name value
            var name_tags=document.querySelectorAll(`${clickedElement.tagName}[name =${clickedElement.getAttribute("name")}]`);
            console.log(name_tags);
            console.log(name_tags.length);
            // iterate to get the index of the specific elements
            for(let i=0;i<name_tags.length;i++){
                if(name_tags[i]==clickedElement){
                    console.log(`the index of clicked element is ${i}`);

                    // update the clicked element array with 
            clickedElementsArray.push(`
            #found by NAME
            list=driver.find_elements_by_css_selector("css=${clickedElement.tagName}[name =${clickedElement.getAttribute("name")}]")
            list[${i}].click()
            `);

                }
            }
            
        }
        // 3. track element by LINK TEXT
        else  if(clickedElement.hasAttribute("href")){
            // log the criterion
            console.log("Clicked Element Has ----- href--(3rd criterion)----- attribute");
            // log the clicked element
            console.log(clickedElement);
            // find the clicked element by inner html
            var href_inner_html=clickedElement.innerHTML;
            console.log(href_inner_html);
            // get all elements with inner html similar to the above.. not possible with css selector but with jquery
            var href_list=$(`a:contains("${href_inner_html}")`);
            console.log(href_list.length);
            // update the clicked elemets array
           break_me: if(href_list.length!=1){
                // if there are more than 1 anchor elements with the same inner Html , stop and continue to the next condition
                console.log("Clicked element can not be uniquely identified by link text");
                continue;
           
            }
            else{ clickedElementsArray.push(`
            #found by LINK TEXT
            driver.find_element_by_link_text("${clickedElement.getAttribute("href")}").click()
            `);}

        }
        // 4. track element by PARTIAL LINK TEXT        
        else  if(clickedElement.hasAttribute("partiallinktext")){
            console.log("Clicked Element Has ----- partial text--(4th criterion)----- attribute");
            console.log(clickedElement)
            clickedElementsArray.push(`
            driver.find_element_by_partial_link_text("${clickedElement.getAttribute("partiallinktext")}").click()
            `);

        }
        // 5. track element by TAG NAME
        else if(clickedElement.hasAttribute("name")){
            console.log("Clicked Element Has ----- --(2nd criterion)----- attribute");
            console.log(clickedElement)
            clickedElementsArray.push(`
            driver.find_element_by_name("${clickedElement.getAttribute("name")}").click()
            `);
        }
        // 6. track element by CLASS NAME
        else if(clickedElement.hasAttribute("name")){
            console.log("driver.find_element_by_name("+clickedElement.getAttribute("name")+").click()");
            console.log(clickedElement)
            clickedElementsArray.push(`
            driver.find_element_by_name("${clickedElement.getAttribute("name")}").click()
            `);
        }      
        // 7. track element by XPATH
        else if(clickedElement.hasAttribute("name")){
            console.log("driver.find_element_by_name("+clickedElement.getAttribute("name")+").click()");
            console.log(clickedElement)
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

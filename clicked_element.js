function clickListener(e) {
    var clickedElement = (window.event) ? window.event.srcElement :  e.target,
       tags = document.getElementsByTagName(clickedElement.tagName);
 
    for (var i = 0; i < tags.length; ++i) {
       if (tags[i] == clickedElement) {
 
         if(tags[i].id){ console.log("driver.find_element_by_id("+tags[i].id+").click()");}
         else if(tags[i].className){ console.log("driver.find_element_by_class_name("+tags[i].className+").click()");}
       }
    }
 }
 
 document.onclick = clickListener;
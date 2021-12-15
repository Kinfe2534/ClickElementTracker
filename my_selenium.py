from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
path="C:\Program Files (x86)\chromedriver\chromedriver.exe"
driver= webdriver.Chrome(path)
driver.get("https://www.google.com")
print(driver.title)
time.sleep(5)
search= driver.find_element_by_tag_name("input")
searchBy= driver.find_element_by_link_text("")
list=driver.find_elements_by_css_selector(css="DIV[name =nameOfDivElement]")
indexed_list=list[2].click()
print(search)
search.send_keys("Life Quotes Images")
search.send_keys(Keys.RETURN)
#driver.close() 
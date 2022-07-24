from bs4 import BeautifulSoup
import selenium
from selenium import webdriver
import pandas as pd
import sys
import xlwt
import os

def search_keyword() :
    driver.find_element_by_link_text("뉴스").click()
        
def sections():
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    try :
        driver.find_element_by_class_name("cluster_more_inner").click()
    except :
        pass
    
    headlines = soup.find_all("div","cluster_text")

    for i in headlines :
        
        title = i.find("a","cluster_text_headline").text
        title1.append(title)
        print("제목 : ",title)

        try :
            content = i.find("div","cluster_text_lede").text
        except:
            pass
        else :
            content1.append(content)
            print("내용 : ",content)

        source = i.find("div","cluster_text_press").text
        source1.append(source)
        print("언론사 :",source)

        link = "https://news.naver.com/" + i.a.attrs.get("href")
        link1.append(link)
        print("링크 : ",link)
        print("\n")

def crawler() :
    input_txt = input("크롤링을 시작합니까? (Y/N) : ")

    if input_txt == "Y" or input_txt == "y" :
        print("\n")
        print("========== 크롤링을 시작합니다 ==========")
        sections()
        print("========== 크롤링이 끝났습니다 ==========")
        print("\n")
        time.sleep(2)
        save()

    if input_txt == "N" or input_txt == "n" :
        print("번호 선택으로 되돌아갑니다")
        category()
            
    else :
        print("(Y/N)를 정확히 입력해주세요")
        crawler()        
        
def category() :
    while True :
        search = int(input("1.정치 2.경제 3.사회 4.생활/문화 5.IT/과학 6.세계 0.종료 : "))
        if search == 1 :
            driver.find_element_by_link_text("정치").click()
            time.sleep(2)
            crawler()

        if search == 2 :
            driver.find_element_by_link_text("경제").click()
            time.sleep(2)
            crawler()

        if search == 3 :
            driver.find_element_by_link_text("사회").click()
            time.sleep(2)
            crawler()

        if search == 4 :
            driver.find_element_by_link_text("생활/문화").click()
            time.sleep(2)
            crawler()

        if search == 5 :
            driver.find_element_by_link_text("IT/과학").click()
            time.sleep(2)
            crawler()

        if search == 6 :
            driver.find_element_by_link_text("세계").click()
            time.sleep(2)
            crawler()

        if search == 0 :
            break
            print("========== 크롤러를 종료합니다 ==========")
            driver.close()
            
        else :
            print("0~6 사이의 숫자를 입력해주세요")
            category()
            
def txt_save() :         
    f_dir = input("저장할 폴더의 실존 유무를 판단합니다 (예 : C:/python_temp/data) : ")
    print(os.path.isdir(f_dir))

    if os.path.isdir(f_dir) :
        os.chdir(f_dir)
        print("입력한 경로가 존재하여 %s 폴더에 저장하겠습니다" %f_dir)
    else :
        os.makedirs(f_dir)
        os.chdir(f_dir)
        print("경로가 존재하지 않아 %s 폴더에 저장하겠습니다" %f_dir)
        
    f_name = input('검색결과를 저장할 파일경로와 이름을 지정하세요.\n(예 : C:/python_temp/data/test.txt) : ')    
    f.write(str(title1))
    f.write(str(content1))
    f.write(str(source1))
    f.write(str(link1))
    f.close()
    print("txt 파일 저장 경로 : %s" %f_name)
    print("txt 파일 저장이 완료되었습니다")
    save2()
    
def csv_save() :
    f_dir = input("저장할 폴더의 실존 유무를 판단합니다 (예 : C:/python_temp/data) : ")
    print(os.path.isdir(f_dir))

    if os.path.isdir(f_dir) :
        os.chdir(f_dir)
        print("입력한 경로가 존재하여 %s 폴더에 저장하겠습니다" %f_dir)
    else :
        os.makedirs(f_dir)
        os.chdir(f_dir)
        print("입력한 경로가 존재하지 않아 %s 폴더에 저장하겠습니다" %f_dir)
        
    fc_name = input('검색결과를 저장할 파일경로와 이름을 지정하세요.\n(예 : C:/python_temp/data/test.csv) : ')
    naver_news.to_csv(fc_name, encoding = "utf-8-sig")
    print("csv 파일 저장 경로 : %s" %fc_name)
    print("csv 파일 저장이 완료되었습니다")
    save2()
        
def xls_save() :
    f_dir = input("저장할 폴더의 실존 유무를 판단합니다 (예 : C:/python_temp/data) : ")
    print(os.path.isdir(f_dir))

    if os.path.isdir(f_dir) :
        os.chdir(f_dir)
        print("입력한 경로가 존재하여 %s 폴더에 저장하겠습니다" %f_dir)
    else :
        os.makedirs(f_dir)
        os.chdir(f_dir)
        print("입력한 경로가 존재하지 않아 %s 폴더에 저장하겠습니다" %f_dir)
        
    fx_name = input('검색결과를 저장할 파일경로와 이름을 지정하세요.\n(예 : C:/python_temp/data/test.xls) : ')
    naver_news.to_excel(fx_name)
    print("xls 파일 저장 경로 : %s" %fx_name)
    print("xls 파일 저장이 완료되었습니다")
    save2()
    
def save() :
    input_txt = input("저장하시겠습니까? (Y/N) : ")
        
    if input_txt == "Y" or input_txt == "y" :
        print("저장 선택지로 이동합니다")
        save2()

    if input_txt == "N" or input_txt == "n" :
        print("뉴스 주제 선택지로 이동합니다")
        category()
        
def save2():
    input_txt2 = int(input("1.txt 2.csv 3.xls 0.종료 : "))
        
    if input_txt2 == 1 :
        txt_save()
    if input_txt2 == 2 :
        csv_save()
    if input_txt2 == 3 :
        xls_save()
    if input_txt2 == 0 :
        print("종료하고 이전으로 돌아가겠습니다")
        save()
    else :
        print("0~3 사이의 숫자를 입력해주세요")
        
title1 = []
content1 = []
source1 = []
link1 = []
        
naver_news = pd.DataFrame()
naver_news["제목"] = title1
naver_news["내용"] = content1
naver_news["언론사"] = source1        
naver_news["링크"] = link1

path = "C:/web_driver/chromedriver.exe"
driver = webdriver.Chrome(path)
driver.get("https://www.naver.com/")
time.sleep(1)

search_keyword()
category()
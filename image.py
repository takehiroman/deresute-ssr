# -*- coding: utf-8 -*- 

import urllib
import urllib2
import os.path
import sys
from HTMLParser import HTMLParser

def download(url):
    img = urllib.urlopen(url)
    localfile = open(os.path.basename(url), 'wb')
    localfile.write(img.read())
    img.close()
    localfile.close()

def get_url_root(url):
    if("http://" in url):
        url_delet_http = url.lstrip("http://")
        if("/" in url_delet_http):
            url_root = "http://" + url_delet_http[0:url_delet_http.find("/")]
            return url_root
    elif("https://" in url):
        url_delet_http = url.lstrip("https://")
        if("/" in url_delet_http):
            url_root = "http://" + url_delet_http[0:url_delet_http.find("/")]
            return url_root
    return 0

class imgParser(HTMLParser):

    def __init__(self):
        HTMLParser.__init__(self)

    def handle_starttag(self,tagname,attribute):
        if tagname.lower() == "img":
            for i in attribute:
                if i[0].lower() == "src":
                    img_url=i[1]
                    # 取得した写真のURLを集めたファイルの作成
                    f = open("collection_url.txt","a")
                    f.write("%s\t"%img_url)
                    f.close()

if __name__ == "__main__":

    print('写真を取得したいサイトのURLを入力してください。')
    input_url = raw_input('>>>  ')
    serch_url = input_url
    htmldata = urllib2.urlopen(serch_url)

    print('現在画像ファイルを取得中です...')

    parser = imgParser()
    parser.feed(htmldata.read())

    parser.close()
    htmldata.close()

    # 生成したファイルの読み込み
    f = open("collection_url.txt","r")
    for row in f:
        row_url = row.split('\t')
        len_url = len(row_url)
    f.close()

    number_url = []

    for i in range(0,(len_url-1)):
        number_url.append(row_url[i])

    for j in range(0,(len_url-1)):
        url = number_url[j]
        print (url)
        if("../" in url):
            root_url = get_url_root(serch_url)
            if(root_url!=0):
                url = url.replace("..",root_url)
                print url
                download(url)
        elif("http://" in url):
            download(url)
        elif("https://" in url):
            download(url)
        else:
            download(input_url + url)

    print('画像のダウンロードが終了しました。')

    # ファイルの削除
    os.remove("collection_url.txt")
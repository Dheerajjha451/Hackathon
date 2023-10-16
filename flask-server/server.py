from flask import Flask,jsonify
import requests
import pandas
import json
import jsonpickle
from bs4 import BeautifulSoup
from pymongo import MongoClient
# import flask_cors import CORS
new_data_api="pub_307633ead925a313254975dc49bc599c99606"
app=Flask(__name__)

#MongoDB CONNECTION
client=MongoClient('mongodb+srv://mridultiwari:iH19Mm1c7XxEBnpz@news.tov5byl.mongodb.net/?retryWrites=true&w=majority')
db=client['News']
collection=db['Recommend']
cur=db['current']

# CORS(app)
def writetoJSONfile(path,fileName,data):
    filePathNameWExt='../'+path+'/'+fileName+'.json'
    with open(filePathNameWExt,'w') as fp:
        json.dump(data,fp)
#Route

@app.route("/search",methods=['GET'])
def search():
    keywrd='MLdata'

    # Specify the URL of the ResearchGate search page you want to scrape.
    url = "https://www.researchgate.net/search/publication?q=MLdata"

    # Send an HTTP GET request to the URL.
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        articles = soup.find_all("div", id="page-container")

        # for article in articles:
        #     news_Article={
        #         "title": article.find("h2", class_="nova-std-page-header-title nova-std-page-header-title--top nova-v-publication-item__title").text,

        #         "description": article.find("div", class_="nova-std-publication-item__description nova-std-publication-item__description--clamp-3").text,

        #         "link": article.find("a", class_="nova-e-link nova-e-link--color-inherit nova-e-link--theme-bare").get("href"),

        #         "image": article.find("img", class_="nova-c-image nova-c-image--size-l nova-c-image--ratio-16x9")["src"],
        #     }
        # writetoJSONfile('client/public/list','search',news_Article)
        
    else:
        print("Failed to retrieve the web page.")


    return articles


@app.route("/recommended",methods=['GET'])
def index():
    req=requests.get('https://newsdata.io/api/1/news?apikey='+new_data_api+'&q=research&language=en')
    data=req.json()
    # print(data)
    # json_data=json.loads(data)
    collection.delete_many({})
    for article in data["results"]:
        news_article = {
            "title": article["title"],
            "description": article["description"],
            "publishedAt": article["pubDate"],
            "url": article["link"],
            "imageUrl": article["image_url"],
            "author": article["source_id"] if "source_id" in article else None
        }

        
        collection.insert_one(news_article)

    print("Data inserted successfully.")
    # writetoJSONfile('client/public/list','recommend',json_data)
    return data

# Current

@app.route("/current",methods=['GET'])
def current():
    
    url = ('https://api.currentsapi.services/v1/search?latest-news?'
    'keywords=Student&language=en&'
    'apiKey=DXYj7nZ3yGbqcll2li1ppcFmntJn3cRCZCXu4fmZosPdwZf0')
    header={"Content-Type":"application/json","Accept-Encoding":"deflate"}
    response = requests.get(url,headers=header)
    data=response.json()
    # print(data)
    # json_data=json.loads(data)
    cur.delete_many({})
    for article in data["news"]:
        news_article = {
            "title": article["title"],
            "description": article["description"],
            "publishedAt": article["published"],
            "url": article["url"],
            "imageUrl": article["image"],
            "author": article["author"] if "author" in article else None
        }

        
        cur.insert_one(news_article)

    print("Data inserted successfully.")
    # writetoJSONfile('client/public/list','recommend',json_data)
    return data

if __name__=="__main__":
    app.run(debug=True)
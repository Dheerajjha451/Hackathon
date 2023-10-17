from flask import Flask,jsonify,request
import requests
import pandas
import json
import jsonpickle
from pymongo import MongoClient
# import flask_cors import CORS
new_data_api="pub_307633ead925a313254975dc49bc599c99606"
app=Flask(__name__)
#MongoDB CONNECTION
client=MongoClient('mongodb+srv://mridultiwari:iH19Mm1c7XxEBnpz@news.tov5byl.mongodb.net/?retryWrites=true&w=majority')
db=client['News']
collection=db['Recommend']
cur=db['current']
least=db['least']
# Function
from transformers import pipeline

def summarize_news_transformer(news_content, max_length=150, min_length=50):
 
    summarizer = pipeline("summarization")
    
    try:
        summary = summarizer(news_content, max_length=max_length, min_length=min_length, max_time=120)[0]['summary_text']
        return summary
    except Exception as e:
        return f"Error during summarization: {str(e)}"

# CORS(app)
def writetoJSONfile(path,fileName,data):
    filePathNameWExt='../'+path+'/'+fileName+'.json'
    with open(filePathNameWExt,'w') as fp:
        json.dump(data,fp)
#Route

@app.route("/search",methods=['GET'])
def search():
    keywrd="research"
    # keywrd=request.args.query

    apikey = "64df0ff2ec4f5e5563265ebebffba11f"
    url=f"https://gnews.io/api/v4/search?q={keywrd}&apikey={apikey}"

    req = requests.get(url)
    data=req.json()
    writetoJSONfile('client/public/list','search',data)
    
    return data

@app.route("/recommend",methods=['GET'])
def recom():
    keyword="research"
    req=requests.get("https://newsapi.org/v2/top-headlines?q="+keyword+"&country=in&apiKey=5fa7fea02e704a4894aa8b0189d08027")
    data=req.json()
    print(data)
    collection.delete_many({})
    for article in data["articles"]:
        news_article = {
            "title": article["title"],
            "description": article["description"],
            "publishedAt": article["publishedAt"],
            "url": article["url"],
            "imageUrl": article["urlToImage"],
            "author": article["source"]["name"]
        }

        
        collection.insert_one(news_article)

    print("Data inserted successfully.")
    # writetoJSONfile('client/public/list','recommend',json_data)
    return data
@app.route("/least",methods=['GET'])
def index():
    req=requests.get('https://newsdata.io/api/1/news?apikey='+new_data_api+'&q=research&language=en')
    data=req.json()
    # print(data)
    # json_data=json.loads(data)
    least.delete_many({})
    for article in data["results"]:
        news_article = {
            "title": article["title"],
            "description": article["description"],
            "publishedAt": article["pubDate"],
            "url": article["link"],
            "imageUrl": article["image_url"],
            "author": article["source_id"] if "source_id" in article else None,
            "summary":summarize_news_transformer(article["content"])
        }

        
        least.insert_one(news_article)

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
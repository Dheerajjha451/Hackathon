from flask import Flask,jsonify,request
from flask_cors import CORS
import requests
import pandas
import json
import jsonpickle
# from pymongo import MongoClient
new_data_api="pub_307633ead925a313254975dc49bc599c99606"
app=Flask(__name__)
CORS(app)

#MongoDB CONNECTION
# client=MongoClient('mongodb+srv://mridultiwari:iH19Mm1c7XxEBnpz@news.tov5byl.mongodb.net/?retryWrites=true&w=majority')
# db=client['News']
# collection=db['Recommend']
# cur=db['current']
# least=db['least']



# Function
from transformers import pipeline
def summarize(transformer_model,news_content,max_length=150, min_length=50):
    # transformer_model='t5-small'
    # news_content=request.json['content']
    summarizer = pipeline("summarization", model=transformer_model)
    
    try:
        summary = summarizer(news_content, max_length=max_length, min_length=min_length, max_time=120)[0]['summary_text']
        return summary
    except Exception as e:
        return f"Error during summarization: {str(e)}"
@app.route("/api/summarize",methods=['GET',"POST"])
def summarize_text(max_length=150, min_length=90):
    transformer_model='t5-small'
    news_content=request.args.get('content')
    summarizer = pipeline("summarization", model=transformer_model)
    
    try:
        summary = summarizer(news_content, max_length=max_length, min_length=min_length, max_time=120)[0]['summary_text']
        return summary
    except Exception as e:
        return f"Error during summarization: {str(e)}"


def writetoJSONfile(path,fileName,data):
    filePathNameWExt='../'+path+'/'+fileName+'.json'
    with open(filePathNameWExt,'w') as fp:
        json.dump(data,fp)
#Route
@app.route("/",methods=['GET'])
def multi_routes():
    result1=recom()
    result2=current()
    result3=least()
    result4=daily()
    # result1=recom()
    combined_result={'res1':result1,'res2':result2,'res3':result3,'res4':result4}
    return jsonify({'result':combined_result})

@app.route("/search",methods=['GET'])
def search():
    # keywrd="IOT"
    keywrd=request.args.get('query')
    print(keywrd)
    param={'max':20}
    header={"Content-Type":"application/json"}

    apikey = "64df0ff2ec4f5e5563265ebebffba11f"
    url=f"https://gnews.io/api/v4/search?q={keywrd}&apikey={apikey}&lang=en"

    req = requests.get(url,params=param)
    data=req.json()
    news_data=[]
    for article in data['articles']:
        news_article={
            "title": article["title"],
            "description": article["description"],
            "content": article["content"],
            "publishedAt": article["publishedAt"],
            "url": article["url"],
            # "imageUrl": article["image_url"],
            "author": article["source"]["name"],
            # "summary":summarize("t5-small",article['content'])
        }
        news_data.append(news_article)
        # print(news_article)
    # writetoJSONfile('client/public/list','search',news_data)
    
    return news_data

@app.route("/recommend",methods=['GET'])
def recom():
    keyword="study"
    req=requests.get("https://newsapi.org/v2/top-headlines?q="+keyword+"&apiKey=5fa7fea02e704a4894aa8b0189d08027&language=en")
    data=req.json()
    # print(data)
    news_data=[]
    # collection.delete_many({})
    for article in data["articles"]:
        news_article = {
            "title": article["title"],
            "description": article["description"],
            "publishedAt": article["publishedAt"],
            "content":article["content"],
            "url": article["url"],
            "imageUrl": article["urlToImage"],
            "author": article["source"]["name"]
        }
        news_data.append(news_article)
        
        # collection.insert_one(news_article)
    writetoJSONfile('client/public/list','recommend',news_data)

    print("Data inserted successfully.")
    return news_data
@app.route("/least",methods=['GET'])
def least():
    param={'size':6}
    req=requests.get('https://newsdata.io/api/1/news?apikey='+new_data_api+'&q=research&language=en',params=param)
    data=req.json()
   
    news_data=[]
    for article in data["results"]:
        news_article = {
            "title": article["title"],
            "description": article["description"],
            "publishedAt": article["pubDate"],
            # "content":article["content"],
            "url": article["link"],
            "imageUrl": article["image_url"],
            "author": article["source_id"] if "source_id" in article else None,
            # "summary":summarize("t5-small",article['content'])
        }
        news_data.append(news_article)
        # print(news_article)
    writetoJSONfile('client/public/list','least',news_data)
    print("Data inserted successfully.")
    # writetoJSONfile('client/public/list','recommend',json_data)
    return news_data

# Latest RSS
@app.route("/daily",methods=['GET'])
def daily():
    rssfile="https://www.thehindu.com/sci-tech/science/feeder/default.rss"
    url="https://rss-to-json-serverless-api.vercel.app/api?feedURL="+rssfile
    response=requests.get(url)
    data=response.json()
    news_data=[]
    j=0
    for i in data['items']:
        if(j==10):
            break
        news_data.append(i)
        j+=1
    writetoJSONfile('client/public/list','daily',news_data)
    print("Data inserted successfully")
    return news_data
# Current

@app.route("/current",methods=['GET'])
def current():
    
    url = ('https://api.currentsapi.services/v1/search?latest-news?'
    'keywords=Student&language=en&'
    'apiKey=DXYj7nZ3yGbqcll2li1ppcFmntJn3cRCZCXu4fmZosPdwZf0')
    header={"Content-Type":"application/json","Accept-Encoding":"deflate"}
    param={'limit':10}
    response = requests.get(url,headers=header,params=param)
    data=response.json()
    # print(data)
    # json_data=json.loads(data)
    # cur.delete_many({})
    news_data=[]
    for article in data["news"]:
        news_article = {
            "title": article["title"],
            "description": article["description"],
            "publishedAt": article["published"],
            "url": article["url"],
            "imageUrl": article["image"],
            "author": article["author"] if "author" in article else None
        }
        news_data.append(news_article)
        # print(news_article)
    writetoJSONfile('client/public/list','current',news_data)
        
        # cur.insert_one(news_article)

    print("Data inserted successfully.")
    # writetoJSONfile('client/public/list','recommend',json_data)
    return news_data

if __name__=="__main__":
    app.run(debug=True)
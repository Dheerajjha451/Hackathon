from flask import Flask,jsonify,request
from flask_cors import CORS
import requests
import json
new_data_api="pub_307633ead925a313254975dc49bc599c99606"
app=Flask(__name__)
CORS(app)

# Function
#Summary function using Transformer library and t5-small model
from transformers import pipeline
def summarize(transformer_model,news_content,max_length=150, min_length=50):
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

# writing data to JSON FILE (Done earlier to improve the speed of data later removed.)
def writetoJSONfile(path,fileName,data):
    filePathNameWExt='../'+path+'/'+fileName+'.json'
    with open(filePathNameWExt,'w') as fp:
        json.dump(data,fp)

# Function for Recommended section
def recom():
    keyword="study"
    req=requests.get("https://newsapi.org/v2/top-headlines?q="+keyword+"&apiKey=5fa7fea02e704a4894aa8b0189d08027&language=en")
    data=req.json()
    
    news_data=[]
    
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
    
    

    print("Data inserted successfully.")
    return news_data
# Function for Latest Article Section
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
            
            "url": article["link"],
            "imageUrl": article["image_url"],
            "author": article["creator"]
        }
        news_data.append(news_article)
   

    print("Data inserted successfully.")
    return news_data
# Function for Daily Feed Section used RSS TO JSON
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
    
    print("Data inserted successfully")
    return news_data
# Function for Fetching Breaking news and Featured Content
def current():
    
    url = ('https://api.currentsapi.services/v1/search?latest-news?'
    'keywords=Student&language=en&'
    'apiKey=DXYj7nZ3yGbqcll2li1ppcFmntJn3cRCZCXu4fmZosPdwZf0')
    header={"Content-Type":"application/json","Accept-Encoding":"deflate"}
    response = requests.get(url,headers=header)
    data=response.json()
   
    news_data=[]
    j=0
    for article in data["news"]:
        if(j==10):
            break
        news_article = {
            "title": article["title"],
            "description": article["description"],
            "publishedAt": article["published"],
            "url": article["url"],
            "imageUrl": article["image"],
            "author": article["author"] if "author" in article else None
        }
        news_data.append(news_article)
        j+=1
        

    print("Data inserted successfully.")
    
    return news_data

#Route Section
@app.route("/",methods=['GET'])
def multi_routes():
    result1=recom()
    result2=current()
    result3=least()
    result4=daily()
    
    combined_result={'res1':result1,'res2':result2,'res3':result3,'res4':result4}
    return jsonify({'result':combined_result})
# Search Route for the Search bar which will ask this fucntion for fetch information from.
@app.route("/search",methods=['GET'])
def search():
    
    keywrd=request.args.get('query')
    print(keywrd)
    param={'max':20}
    

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
            
            "author": article["source"]["name"],
            
        }
        news_data.append(news_article)

    return news_data

if __name__=="__main__":
    app.run(debug=True)
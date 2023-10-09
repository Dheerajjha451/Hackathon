from flask import Flask,jsonify
import requests
import json
import jsonpickle
# import flask_cors import CORS
new_data_api="pub_307633ead925a313254975dc49bc599c99606"
app=Flask(__name__)
# CORS(app)
def writetoJSONfile(path,fileName,data):
    filePathNameWExt='../'+path+'/'+fileName+'.json'
    with open(filePathNameWExt,'w') as fp:
        json.dump(data,fp)
#Route
@app.route("/recommended",methods=['GET'])
def index():
    req=requests.get('https://newsdata.io/api/1/news?apikey='+new_data_api+'&q=research&language=en')
    data=req.content
    # print(data)
    json_data=json.loads(data)
    writetoJSONfile('client/public/list','recommend',json_data)
    return json_data

# Current
@app.route("/current",methods=['GET'])
def current():
    
    url = ('https://api.currentsapi.services/v1/search?latest-news?'
    'keywords=Student&language=en&'
    'apiKey=DXYj7nZ3yGbqcll2li1ppcFmntJn3cRCZCXu4fmZosPdwZf0')

    response = requests.get(url)
    writetoJSONfile('client/public/list','current',response.json())
    return(response.json())
if __name__=="__main__":
    app.run(debug=True)
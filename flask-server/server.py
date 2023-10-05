from flask import Flask
import requests
import json
# import flask_cors import CORS

app=Flask(__name__)
# CORS(app)
def writetoJSONfile(path,fileName,data):
    filePathNameWExt='../'+path+'/'+fileName+'.json'
    with open(filePathNameWExt,'w') as fp:
        json.dump(data,fp)
#Route
@app.route("/recommended",methods=['GET'])
def index():
    req=requests.get('https://newsapi.org/v2/everything?q=academics&apiKey=5fa7fea02e704a4894aa8b0189d08027')
    data=req.content
    json_data=json.loads(data)
    writetoJSONfile('clients/public/list','recommend',json_data)
    return json_data
if __name__=="__main__":
    app.run(debug=True)
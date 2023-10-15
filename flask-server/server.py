from flask import Flask,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from flask_mysqldb import MySQL
import requests
import pandas
import json
import jsonpickle
# import flask_cors import CORS
new_data_api="pub_307633ead925a313254975dc49bc599c99606"
app=Flask(__name__)
app.config["MYSQL_USER"]="mridul"
app.config["MySQL_PASSWORD"]="#mridultiwari"
app.config["MYSQL_DB"]="NEWS"

mysql=MYSQL(app)

@app.route("/")
def users():
    cur=mysql.connection.cursor()
    cur.execute("""SELECT * from NEWS;""")
    rv=cur.fetchall()
    return str(rv)



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
    header={"Content-Type":"application/json","Accept-Encoding":"deflate"}
    response = requests.get(url,headers=header)
    json_file=response.json()
    # writetoJSONfile('client/public/list','current',response.json())
    df=pandas.json_normalize(json_file,'news')
    engine=create_engine('sqlite:///news.db')
    df.to_sql(name="Current",con=engine,index=False,if_exists='replace')
    return

if __name__=="__main__":
    app.run(debug=True)
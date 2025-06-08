from flask import Flask,request,make_response
import json
import os
import time

app = Flask(__name__)


@app.route("/yobi", methods = ["GET"])
def save_json():
    json_data = {'alphabet':request.args.get('alphabet'),
                'num':request.args.get('num'),
                'color':request.args.get('color')}
        
        
    with open("/var/www/hk/works/yobidashi/demo/info/num.json", mode="r") as fr:
        dict = json.load(fr)
        dict[request.args.get('all')] = json_data

    with open("/var/www/hk/works/yobidashi/demo/info/num.json", mode="w") as f:
        json.dump(dict, f, indent=2)


    res = make_response("ok")
    return res, 200

@app.route("/yobi-del", methods = ["GET"])
def del_json():
    if request.args.get("del"):
        with open("/var/www/hk/works/yobidashi/demo/info/num.json", mode="r") as fr:
            dict = json.load(fr)
        with open("/var/www/hk/works/yobidashi/demo/info/num.json", mode="w") as f:
            try:
                del dict[request.args.get("del")]
            except:
                print("Error")
            json.dump(dict, f, indent=2)
    
    res = make_response("ok")
    return res, 200


if __name__ == "__main__":
   app.run()

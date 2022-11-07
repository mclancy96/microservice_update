import requests
import json


def test():
    url = 'http://localhost:3005'
    route = "/zip"
    obj = {
        "zipcode": "98101"
    }
    objddd = json.dumps(obj)
    print(json.dumps(obj))
    res = requests.post(url+route, json={"zipcode": 98101})
    parse = json.loads(res.text)
    print(parse["officials"]["representatives"][0]["name"])


test()

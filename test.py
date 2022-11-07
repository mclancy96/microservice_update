import requests
import json


def test():
    url = 'http://localhost:3005'
    route = "/zip"
    obj = {
        "zipcode": "98101"
    }
    res = requests.post(url+route, data=obj)
    parse = json.loads(res.text)
    print(parse["officials"]["representatives"][0]["name"])


test()

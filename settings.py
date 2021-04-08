import json

try:
    with open("config.json", "r+") as dbfile:
        configdata = json.load(dbfile)
except:
    print("[x] Couldn't load config.json.")
    exit()
access_key = "5XzccSrCpPAEdOTeLVxHfgVtWpQQTPNivHWAEVk4r3Q"
import json
import requests

# import itertools


def get_img_url(query, h=400, w=400, page=1, per_page=1):
    url = f"https://api.unsplash.com/search/photos/?client_id={access_key}"

    response = requests.get(
        url, params={"query": query, "per_page": per_page, "w": w, "h": h}
    )
    # data = response.json()["urls"]["raw"]
    res = response.json()

    #

    return res["results"]


# url = f"https://api.unsplash.com/photos/random/?client_id={access_key}"


#

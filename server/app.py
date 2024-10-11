from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from mercor_api import MercorAPI
from pydantic import ValidationError

app = Flask(__name__)
CORS(
    app,
    supports_credentials=True,
    resources={r"/*": {"origins": ["http://localhost:3000"]}},
)

HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'authorization': 'Bearer',
    'content-type': 'application/json',
    'origin': 'https://team.mercor.com',
    'priority': 'u=1, i',
    'referer': 'https://team.mercor.com/',
    'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'x-company-id': '',
}

api = MercorAPI(headers=HEADERS)

@app.route('/search', methods=['POST'])
def search_profiles():
    """
    Search profiles based on search criteria and return the result
    Example usage: POST to /search with JSON body { "search_string": "python developer", "count": 5 }
    """
    data = request.json
    search_string = data.get("search_string", "")
    budget = data.get("budget", 7500)
    experience = data.get("experience", 0)

    try:
        profiles = api.search_profiles(search_string=search_string, monthly_budget_dollars=budget, experience=experience, count=50)
        # return jsonify([MercorAPI.profile_pretty(profile) for profile in profiles])
        return [profile.model_dump_json() for profile in profiles]
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/profile/<user_id>', methods=['GET'])
def get_profile(user_id):
    """
    Get the full profile of a user based on their user_id
    Example usage: GET /profile/<user_id>
    """
    try:
        profile = api.profile(user_id=user_id)
        return jsonify(MercorAPI.profile_pretty(profile))
    except ValidationError as ve:
        return jsonify({"error": "Invalid data", "details": ve.errors()}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)

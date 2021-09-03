# from flask import Blueprint, jsonify, session, request, Flask, redirect, url_for
# from flask_dance.contrib.google import make_google_blueprint, google

# google_routes = make_google_blueprint(client_id='', client_secret='', offline=True, scope=['profile', 'email'])


# @google_routes.route('/login/google')
# def loginGoogle():
#     if not google.authorized:
#         return redirect(url_for('google.login'))
#     response = google.get('/plus/v1/people/me')
#     assert response.ok, response.text
#     return "You are {email} on Google".format(email=response.json()["emails"][0]["value"])
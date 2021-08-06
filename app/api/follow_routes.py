from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import User, db
from app.models.user import follows

follow_routes = Blueprint('follow', __name__)


@follow_routes.route('/user/<int:id>/follower', methods=['POST'])
def create_follower(id):
    user = User.query.get(id)
    # follower_id = request.json['follower_id']
    request_json = request.get_json()
    follower_id = request_json['follower_id']
    print('#############################', follower_id)
    follower = User.query.get(follower_id)
    print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@', follower)
    
    user.followers.append(follower)
    print('**************************', user.followers)
    db.session.commit()
    return user.to_dict_user_info()
    
@follow_routes.route('/user/<int:id>/follower/delete', methods=['DELETE'])
def delete_follower(id):
    # follower_id = request.json['follower_id']
    request_json = request.get_json()
    follower_id = request_json['follower_id']
    print('#############################', follower_id)
    follower = User.query.get(follower_id)
    print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@', follower)
    user = User.query.get(id)
    user.followers.remove(follower)
    print('**************************', user.followers)
    db.session.commit()
    return user.to_dict_user_info()
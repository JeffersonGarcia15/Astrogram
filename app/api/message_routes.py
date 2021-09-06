# from flask import Blueprint, jsonify, request
# from app.models import db, Message
# from flask_login import current_user

# message_routes = Blueprint('messages', __name__)


# @message_routes.route('/')  
# def get_messages():
#     sent_messages = Message.query.filter(Message.sender_id == current_user.id).all()
#     received_messages = Message.query.filter(Message.recipient_id == current_user.id).all()
#     users = []
#     for user in sent_messages:
#         # if user.recipient not in users and user.recipient_id 
#     # messages = Message.query.all()
#     # return {message.id: message.to_dict() for message in messages}

# @message_routes.route('/<int:id>')
# def message(id):
#     message = Message.query.get_or_404(id)
#     return message.to_dict()

# @message_routes.route('/<int:message_id>', methods=['PATCH'])
# def edit_message(message_id):
#     # message_id = request.get_json()['message_id']
#     # body = request.get_json()['body']
#     # updated_at = request.get_json()['updated_at']
    
#     # edit_message = Message.query.get(message_id)
#     # edit_message.body = body
#     # edit_message.updated_at = updated_at

#     # db.session.commit()
#     # return edit_message.to_dict()
#     Message.query.get(message_id).update({'message': "<<Message removed>>"}, synchronize_session=False)
#     db.session.commit()
#     modified_message = Message.query.get(message_id)
#     return modified_message.to_dict()

# @message_routes.route('/<int:id>', methods=['DELETE'])
# def delete_message(id):

#     message = Message.query.filter_by(id = id).delete()
#     db.session.commit()
#     return {"Message": "Success"}
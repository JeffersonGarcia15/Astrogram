from flask_socketio import SocketIO, emit
import datetime
import os
from app.models import db, Message


if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://astrogram-jeff.herokuapp.com/',
        'https://astrogram-jeff.herokuapp.com/',
    ]
else:
    origins = '*'

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# Handle a chat message
@socketio.on("dm")
def handle_dm(data):
    message = Message(**data)
    db.session.add(message)
    db.session.commit()

    emit('message', message.to_dict())
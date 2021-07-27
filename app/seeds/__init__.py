from flask.cli import AppGroup
from .users import seed_users, undo_users
from .media import seed_media, undo_media
from .albums import seed_albums, undo_albums
from .locations import seed_locations, undo_locations
from .posts import seed_posts, undo_posts


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_albums()
    seed_locations()
    seed_posts()
    seed_media()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_albums()
    undo_locations()
    undo_posts()
    undo_media()
    # Add other undo functions here

# Welcome to Astrogram

## Live link: [Astrogram](https://astrogram-jeff.herokuapp.com)

[Astrogram](https://astrogram-jeff.herokuapp.com), inspired by [instagram](https://www.instagram.com/), is a web application that allows users to post pictures of their favorite Astrophysics related topics, galaxy, or anything universe/space related and even casual photos. As a registered user you can post photos give likes to posts, remove likes in posts, edit a post description, delete posts, create comments, like and dislike likes in comments, edit comments, remove comments, follow and unfollow users, and also make use of a search bar feature.

#

## Quick tour part 1

<video width="320" height="240" controls>
  <source src="https://astrogram.s3.us-east-2.amazonaws.com/Screen+Recording+2021-08-09+at+1.53.17+AM.mov" type="video/mp4">
  <!-- <source src="movie.ogg" type="video/ogg"> -->
Your browser does not support the video tag.
</video>

<!-- [Validations and likes](https://astrogram.s3.us-east-2.amazonaws.com/Screen+Recording+2021-08-09+at+1.53.17+AM.mov) -->

## Quick tour part 2

[posts, search bar and more](https://astrogram.s3.us-east-2.amazonaws.com/Screen+Recording+2021-08-09+at+1.56.42+AM.mov)

## Table of content

1. [Getting Started](https://github.com/JeffersonGarcia15/Astrogram#getting-started)
2. [Technologies Used](https://github.com/JeffersonGarcia15/Astrogram#technologies-used)
3. [Key Features](https://github.com/JeffersonGarcia15/Astrogram#key-features)
4. [Code Snippets](https://github.com/JeffersonGarcia15/Astrogram#code-snippets)
5. [Wiki](https://github.com/JeffersonGarcia15/Astrogram#wikii)
6. [Future Goals](https://github.com/JeffersonGarcia15/Astrogram#future-goals)

#

## Getting Started

1. Clone this repository
2. Install dependencies (`npm install`)
3. Create a `.env` file based on the `.env.example` and replace the value of `SESSION_SECRET` with your own `SESSION_SECRET` value. You can generate a value by using [UUID](https://www.npmjs.com/package/uuid) to have a more secure value.
4. Set up your PostgreSQL astrogram_user user, a password and database and make sure it matches the `.env` file. Make sure to give CREATEDB privileges to your astrogram_user user.
5. Enter the following commands:

```
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
pipenv shell
flask db upgrade
flask seed all
flask run
```

#

## Technologies Used

**Front End**

- JavaScript
- HTML
- CSS
- [Favicon.io](https://favicon.io)
- Material UI
- React
- Redux
- Heroku

**Back End**

- Python
- SQLAlchemy
- Flask
- Node.js
- Docker
- PostgreSQL and Postbird
- Postman
- AWS

#

## Key Features

- Users can view, upload, edit and delete posts
- Users can view, post, edit and delete comments
- Users can create and destroy likes in comments and posts
- Users can create and destroy follows
- Users can edit their profile
- Users can make use of a search bar feature

#

## Code Snippets

- First, I filtered for the likes that belong to one user, and then I use the `.find` method to look and see if one of those likes belong to that specific post. The `.some` method returns a boolean which was useful when changing the color of the heart icon.

```js
const handlePostLike = (post) => async (e) => {
  const likesInPostFunction = Object.values(postLikes)?.filter(
    (like) => like?.post_id === post.id
  ); // likes => postLikes has user_id, post_id
  const isPostLikedFunction = likesInPostFunction?.some(
    (like) => like.user_id === sessionUser.id
  );
  setPostId(post?.id);
  if (isPostLikedFunction) {
    let singlePostLike = likesInPostFunction.find(
      (like) => like.user_id === sessionUser.id && like.post_id === post.id
    );

    await dispatch(deleteAPostLike(singlePostLike?.id));
    setDeleteSwitch((prev) => !prev);
  } else {
    await dispatch(
      createPostLike({ user_id: sessionUser.id, post_id: post?.id })
    );
  }
};

function heartColor(postId) {
  const likesInPostFunction = Object.values(postLikes)?.filter(
    (like) => like?.post_id === postId
  ); // likes => postLikes has user_id, post_id
  const isPostLikedFunction = likesInPostFunction?.some(
    (like) => like.user_id === sessionUser.id
  );

  return isPostLikedFunction;
}

<FavoriteIcon
  onClick={handlePostLike(post)}
  style={{ color: heartColor(post.id) ? "red" : "gray" }}
  className="icon"
></FavoriteIcon>;
```

- For the followers, I started by creating a variable that would hold a boolean value. And all it does is to check, for a given profile user, which depends on the username passed in the url, and see if the current user, the one that is signed in, is part of the array of followers. If it is, I enabled the `Follow` option, else the `Unfollow` one.

```js
let Following = profiles?.user?.followers?.includes(user?.username)
  ? true
  : false;
async function followButton() {
  if (Following === false) {
    await dispatch(createFollower(follower_id, profiles?.user?.id));
    Following = true;
  } else {
    await dispatch(deleteFollower(follower_id, profiles?.user?.id));
    Following = false;
  }
}
{
  user?.id !== profiles?.user?.id && (
    <div>
      <button
        className={Following ? "btn-unfollow" : "btn-follow"}
        onClick={followButton}
      >
        {Following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}
```

- I decided to include this code snippet, as I was kind of ignoring the fact that awsS3 will give you issues if you do NOT upload a new photo when changing a user's info as it is looking for a unique file(`get_unique_filename`) so all I did was to put some conditionals to check if we are asking our app to actually change our photo or not. This might also be useful for other people that might be interested on implementing awsS3 ion their projects as I actually helped a few people with awsS3. Hopefully, this code snippet will help clarify whatever questions they have.

```py
@user_routes.route('/<int:id>', methods=['PUT'])
def update(id):
    user = User.query.get(id)
    if "image" not in request.files:
        url = request.form['image']
    else:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": ["file type not permitted"]}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return {'errors': [upload]}, 400

        url = upload["url"]
    user.username = request.form['username']
    user.full_name = request.form['full_name']
    user.website = request.form['website']
    user.bio = request.form['bio']
    user.phone = request.form['phone']
    user.gender = request.form['gender']
    user.profile_image = url

    db.session.commit()
    return user.to_dict()

```

#

## Wiki

[Wire Frame](https://github.com/JeffersonGarcia15/Astrogram/wiki/Wire-Frame)

[Feature List](https://github.com/JeffersonGarcia15/Astrogram/wiki/Feature-List)

[API Routes](https://github.com/JeffersonGarcia15/Astrogram/wiki/API-Routes)

[Schema](https://github.com/JeffersonGarcia15/Astrogram/wiki/Database-Schema)

![Database Schema](https://i.ibb.co/9qwRk85/Screen-Shot-2021-07-26-at-12-06-57-PM.png)

#

## Future Goals

- Full CRUD for Google Map/Location for post locations
- Messages using websockets
- Hashtags
- Albums/MultiUpload
- Saved Posts
- Ability to 'send' money to friends just like Facebook does

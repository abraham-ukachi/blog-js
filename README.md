# `blog-js`
> IMPORTANT: This is a working progress and subject to major changes until the specified deadline below.

A school project to create a **blog** web app using `JavaScript` with a fully functioning `MySQL` database.

As this project is to be done by a group of 2, my partner for the next two weeks is [Hajar Aslan](github.com/hajar-aslan). 

So, we've decided to name our blog 🥁... "**`peace-n-love`**" (✌🏾❤️), and created a MySQL Database named **`db_peace-n-love`**. 

Fed up with static `.php` files 😤😡, we'll be trying – as a personal challenge – to turn it into a bit of a [progressive web app](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/App_structure) **without**\* third-party libraries like [*`redux`*](https://redux.js.org/), [*`pwa-helpers`*](https://www.npmjs.com/package/pwa-helpers) or [*`lit`*](https://lit.dev/docs/)

**Why `peace-n-love` you might ask?** #GoodQuestion😜 !-: With everything that's going on in the world today, especially the recent [intense fighting in Ukraine 🇺🇦](https://www.theguardian.com/world/live/2023/mar/06/russia-ukraine-war-live-ukraine-likely-making-limited-tactical-withdrawal-in-bakhmut-analysts-say), we've never needed some **peace** ✌🏾,and **love**❤️, moooore. Therefore, our blog will serve as an outlet for peaceful and loving articles that can hopefully change the world for the better. 🤞🏽🙏


The following tables (including a couple of TRIGGERS) were created in our **`db_peace-n-love`** database:

- [*`users`*](#users---MySQL-Table): All currently registered users.
- [*`groups`*](#groups---MySQL-Table): All supported user groups (i.e. `admin`, `publisher`, `moderator`, `staff`, ...)
- [*`avatars`*](#avatars---MySQL-Table): All avatars of registered users.
- [*`images`*](#images---MySQL-Table): All images used by this blog.
- [*`articles`*](#articles---MySQL-Table): All articles created by publishers or administrators.
- [*`articles_trending`*](#articles_trending---MySQL-Table): All trending articles.
- [*`articles_likes`*](#articles_likes---MySQL-Table): All users who liked an article.
- [*`categories`*](#categories---MySQL-Table): All categories of corresponding articles.
- [*`tags`*](#tags---MySQL-Table): All tags created by registered users for published articles.
- [*`saves`*](#saves---MySQL-Table): All articles saved by registered users.
- [*`comments`*](#comments---MySQL-Table): All comments made by registered users.
- [*`comments_likes`*](#comments_likes---MySQL-Table): All users who liked a comment.
- [*`streaks`*](#streaks---MySQL-Table): All daily streaks of registered users. "You miss a day, you break the streak #LOL"
- [*`priv`*](#priv---MySQL-Table) (Global Privileges) : All privileges currently supported by our `peace-n-love` blog (e.g. **CREATE ACCOUNT**, **READ ACCOUNT**, **UPDATE ACCOUNT**, **DELETE ACCOUNT**, **CREATE USER**, **CREATE GROUPS**, **CREATE ARTICLES**, **CREATE COMMENTS**, etc).

> NOTE: For more info, [read the Database section](#Database) of this *README*. 

>   \*: [markdown-it](https://markdown-it.github.io/markdown-it/) and [mocha](https://www.npmjs.com/package/mocha) npm libraries were used for markdown parsing and testing respectively.


## Description 
> Original text in French: Vous décidez de créer un blog afin de publier des articles personnels et d’échanger avec vos visiteurs. Vous êtes complètement libre sur le choix du thème du blog. Alors amusez-vous, rendez le intéressant à utiliser et travaillez l’esthétique de celui-ci pour avoir le rendu le plus professionnel possible.

You decide to create a blog in order to publish personal articles and exchange with your visitors. You are completely free to choose the theme of the blog. So have fun, make it interesting to use and work on the aesthetics of it to have the most professional look possible.


## Requirements

These are a couple of the main requirements for this school project:

1. **A home page**: It contains the latest articles put online and some *call-to-actions*.

2. A page allowing **users** to authenticate. On this page you must bring up a **login and registration form** at the click of a button. Registration must be done with an **asynchronous request** and form checks must be done front and back.

3. Once registered and logged in, you are redirected to a page displaying **profile information**. The user must be able to modify his information **without reloading the page**.

4. A page that presents the **different articles** of the blog. The page presents a limited number of articles (between 5 and 20) with pagination to see the other articles. This pagination must be done with a GET parameter in the request (example: ?page=1).

5. A page that allows you to create articles: The page is only accessible to people who have the roles to write an article (moderators and administrators). Each article is linked to a category.

6. A page that displays the **content of an article** and the **corresponding comments**: The retrieval of the article is managed via a parameter in the GET request (ex:?article=1). This page is therefore a template filled with the information of the corresponding article each time.

7. **An admin page**: This admin panel allows administrators of your site to manage all `users`, `articles`, `comments`, `categories`, `rights`, etc.

> NOTE:  

## Target Skills

- Database architecture: MCD / MLD / MPD
- Backend architecture in class
- Responsive interface
- Javascript asynchronous programming
- Use of URL parameters


## Jobs
> MOTTO: We'll always do [**more**](#More) 😜

The official deadline of the jobs below - according to [intra](https://intra.laplateforme.io) - is **20-03-2023 at 11:10 A.M**. Here is a list of all the specific files to be submitted as well as their corresponding / current **status** for this project:

| No. | Name | File | Status |
|:----|:-----|:-----|:-------|
| 1 | *`Default / Index - Page`* | **index.php** | *_In progress_* |
| 2 | *`Peace & Love - Database - SQL`* | **db_peace-n-love.sql** | Pending |

> NOTE: (\*) = still needs to be updated


## Structure

The folder & file structure of this project:

- [**api**](./api/)
- - [**database**](./api/database/)
- - * *Database.php*
- - * *ResponseHandler.php*
- - * ...
- - [**user**](./api/user/)
- - * *User.php*
- - * *auth.php*
- - * ...
- - [**article**](./api/article/)
- - * *Article.php*
- - * ...
- - [**comment**](./api/comment/)
- - * *Comment.php*
- - * ...
- [**assets**](./assets/)
- - [**logos**](./assets/logos/)
- - [**images**](./assets/images/)
- - ...
- - [**animations**](./assets/animations/)
- - * *fade-in-animation.css*
- - * *pop-in-animation.css*
- - * *slide-from-down-animation.css*
- - [**theme**](./assets/theme/)
- - * *color.css*
- - * *typography.css*
- - * *styles.css*
- - [**stylesheets**](./assets/stylesheets/)
- - * *home-styles.css*
- - * *splash-screen-styles.css*
- - * *login-styles.css*
- - * *register-styles.css*
- - * *profile-styles.css*
- [**src**](./src/)
- - *App.js*
- - *Screen.js*
- - *Page.js*
- - *View.js*
- - ...
- - [**components**](./src/components/)
- - [**helpers**](./src/helpers/)
- - * *starter.js*
- - * *resizer.js*
- - * *router.js*
- - [**screens**](./src/screens/)
- - * *splash-screen.js*
- - * *welcome-screen.js*
- - * ...
- - [**pages**](./src/pages/)
- - * *home-page.js*
- - * *login-page.js*
- - * *register-page.js*
- - * ...
- - [**views**](./src/views/)
- - * *default-home-view.js*
- - * *default-login-view.js*
- - * *default-register-view.js*
- - ...
- LICENSE
- README.md
- manifest.json
- package.json
- ...
- **index.php**
- **db_peace-n-love.sql**


> NOTE: This is just a looong snippet ;)


## More 

These are some of the things we did or plan to do, in addition to this project's [job requirements](#Requirements):

| No. | Name | File | Status |
|:----|:-----|:-----|:-------|
| 1 | *`Register - Page`* | **register-page.js** | Pending |
| 2 | *`Login - Page`* | **login-page.js** | Pending |
| 3 | *`Profile - Page`* | **profile-page.js** | Pending |
| 4 | *`Admin - Page`* | **admin-page.js** | Pending | 
| 5 | *`Splash - Screen`* | **splash-screen.js** | Pending |
| 6 | *`Logout - Page`* | **logout-page.js** | Pending |
| 7 | *`Database - API`* | **Database.php** | Pending |
| 8 | *`User - API`* | **User.php** | Pending |
| 9 | *`ResponseHandler - API`* | **ResponseHandler.php** | Pending |
| 10 | *`Articles - API`* | **Articles.php** | Pending |
| 11 | *`Pop In - Animation`* | **pop-in-animation.css** | Pending |
| 12 | *`Fade In - Animation`* | **fade-in-animation.css** | Pending |
| 13 | *`Slide From Down - Animation`* | **slide-from-down-animation.css** | Pending |
| 14 | *`Language Update - API`* | **lang_update.php** | Pending |
| 15 | *`Theme Update - API`* | **theme_update.php** | Pending |
| 16 | *`Internationalization - API`* | **Internationalization.php** | Pending |
| 17 | *`Settings - Page`* | **settings-page.js** | Pending |
| 18 | *`Welcome - Screen`* | **welcome-screen.js** | Pending |
| 19 | *`Goodbye - Page`* | **goodbye-page.js** | Pending |
| 20 | *`Slide From Up - Animation`* | **slide-from-up-animation.css** | Pending |
| 21 | *`Welcome - Stylesheet`* | **welcome-styles.css** | Pending |
| 22 | *`Home - Stylesheet`* | **home-styles.css** | Pending |
| 23 | *`App - Class`* | **App.js** | Pending |
| 24 | *`Screen- Class`* | **Screen.js** | Pending |
| 25 | *`Page - Class`* | **Page.js** | Pending |
| 26 | *`View - Class`* | **View.js** | Pending |
| 27 | *`Starter - Helper`* | **starter.js** | Pending |
| 28 | *`Router - Helper`* | **router.js** | Pending |
| 29 | *`Default Home - View`* | **default-home-view.js** | Pending |
| 30 | *`Default Login - View`* | **default-login-view.js** | Pending |
| 31 | *`Default Register - View`* | **default-register-view.js** | Pending |

> NOTE: (\*) = still needs to be updated. <br>
> There's certainly a couple of file we must've forgot or not added yet, so we'll keep the above list updated obv. :)

## Database
> HEADS-UP: We do love me some TRIGGERS, so do not be shocked to see a couple in this database #LOL

The following tables were created in a MySQL database named **`db_peace-n-love`** via [PDO](https://www.php.net/manual/en/class.pdo.php) on [phpmyadmin](http://localhost/phpmyadmin):


> NOTE: **`⨁`** = _FOREIGN_KEY_

### `users` - MySQL Table

This table has a [**one-to-many**](https://www.metabase.com/learn/databases/table-relationships#one-to-many-relationship) relationship with [*`articles`*](#`todolists`---MySQL-Table), [*`avatars`*](#`avatars`---MySQL-Table) tables.

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑 | **INT** | 255 | No | None | **AUTO_INCREMENT** | 
| 2 | *`username`* | **VARCHAR** | 30 | No | None | - | 
| 3 | *`email`* | **VARCHAR** | 60 | No | None | - | 
| 4 | *`password`* | **VARCHAR** | 255 | No | None | - | 
| 5 | *`firstname`* | **VARCHAR** | 30 | No | None | - | 
| 6 | *`lastname`* | **VARCHAR** | 30 | No | None | - | 
| 7 | *`group_id`* ⨁ | **TINYINT** | 10 | Yes | NULL | - |  
| 8 | *`avatar_id`* ⨁ | **INT** | 255 | Yes | NULL | - |  
| 9 | *`bio`* | **TINYTEXT** | 255 | Yes | NULL | - |  
| 10 | *`created_at`* | **DATETIME** | - | Yes | NULL | - |  


> NOTE: 


### `groups` - MySQL Table

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **TINYINT** | 10 | No | None | **AUTO_INCREMENT** |
| 2 | *`name`* | **VARCHAR** | 30 | No | None | - |
| 3 | *`rights`* | **VARCHAR** | 255 | No | None | - |



### `avatars` - MySQL Table

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 255 | No | None | **AUTO_INCREMENT** |
| 2 | *`label`* | **VARCHAR** | 30 | Yes | NULL | - |
| 3 | *`placeholder`* | **BOOLEAN** | 1 | Yes | 0 | - |
| 4 | *`image_id`* ⨁  | **INT** | 255 | No | None | - |



### `images` - MySQL Table

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 255 | No | None | **AUTO_INCREMENT** |
| 2 | *`width`* | **TINYINT** | 5 | No | None | - |
| 3 | *`height`* | **TINYINT** | 5 | No | None | - |
| 4 | *`type`* | **VARCHAR** | 10 | No | None | - |
| 5 | *`blob`* | **MEDIUMBLOB** | 2000000 | No | None | - |


### `articles` - MySQL Table

This table has a [**many-to-one**](https://www.metabase.com/learn/databases/table-relationships#many-to-one-relationship) relationship with [*`users`*](#`users`---MySQL-Table) table.

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **VARCHAR** | 30 | No | None | - |
| 2 | *`category_id`* ⨁ | **TINYINT** | 10 | No | None | - |
| 3 | *`author_id`* ⨁ | **INT** | 255 | No | None | - |
| 4 | *`cover_image_id`* ⨁ | **INT** | 255 | No | None | - |
| 5 | *`title`* | **VARCHAR** | 60 | No | None | - |
| 6 | *`text`* | **TEXT** | 2000 | No | None | - |
| 7 | *`likes`* | **INT** | 10 | Yes | NULL | - |
| 8 | *`published_at`*   | **DATETIME** | - | Yes | NULL | - |
| 9 | *`edited_at`*   | **DATETIME** | - | Yes | NULL | - |

> NOTE:

### `articles_trending` - MySQL Table
> ⚠️  WARNING: This table may contain one or more TRIGGERs

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 255 | No | None | **AUTO_INCREMENT** |
| 2 | *`article_id`* ⨁ | **VARCHAR** | 30 | No | None | - |
| 3 | *`author_id`* ⨁ | **INT** | 255 | No | None | - |
| 4 | *`start`* | **DATETIME** | - | Yes | NULL | - |
| 5 | *`end`* | **DATETIME** | - | Yes | NULL | - |

> NOTE: 


### `articles_likes` - MySQL Table
> ⚠️  WARNING: This table may contain one or more TRIGGERs

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 255 | No | None | **AUTO_INCREMENT** |
| 2 | *`article_id`* ⨁ | **VARCHAR** | 30 | No | None | - |
| 3 | *`user_id`* ⨁ | **INT** | 255 | No | None | - |
| 4 | *`liked_at`* | **DATETIME** | - | Yes | NULL | - |

> NOTE:


### `categories` - MySQL Table
> ⚠️  WARNING: This table may be used by one or more TRIGGERs from the `articles` table.

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **TINYINT** | 10 | No | None | **AUTO_INCREMENT** |
| 2 | *`name`* ⨁ | **INT** | 255 | No | None | - |
| 3 | *`image_id`* ⨁ | **INT** | 255 | Yes | NULL | - |

> NOTE:


### `tags` - MySQL Table
> ⚠️  WARNING: This table may contain one or more TRIGGERs

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 255 | No | None | **AUTO_INCREMENT** |
| 2 | *`name`* ⨁ | **INT** | 255 | No | None | - |
| 3 | *`article_id`* ⨁ | **VARCHAR** | 30 | No | None | - |

> NOTE:


### `saves` - MySQL Table
> ⚠️  WARNING: This table may contain one or more TRIGGERs

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 255 | No | None | **AUTO_INCREMENT** |
| 2 | *`user_id`* ⨁ | **INT** | 255 | No | None | - |
| 3 | *`article_id`* ⨁ | **VARCHAR** | 30 | No | None | - |
| 4 | *`saved_at`* | **DATETIME** | - | Yes | NULL | - |

> NOTE:


### `comments` - MySQL Table
> ⚠️  WARNING: This table may contain one or more TRIGGERs

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 255 | No | None | **AUTO_INCREMENT** |
| 2 | *`user_id`* ⨁ | **INT** | 255 | No | None | - |
| 3 | *`text`* | **TEXT** | 500 | No | None | - |
| 4 | *`article_id`* ⨁ | **VARCHAR** | 30 | No | None | - |
| 5 | *`created_at`* | **DATETIME** | - | Yes | NULL | - |
| 6 | *`edited_at`*   | **DATETIME** | - | Yes | NULL | - |

> NOTE:


### `comments_likes` - MySQL Table
> ⚠️  WARNING: This table may contain one or more TRIGGERs

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 255 | No | None | **AUTO_INCREMENT** |
| 2 | *`comment_id`* ⨁ | **INT** | 255 | No | None | - |
| 3 | *`user_id`* ⨁ | **INT** | 255 | No | None | - |
| 4 | *`liked_at`* | **DATETIME** | - | Yes | NULL | - |

> NOTE:


### `streaks` - MySQL Table
> ⚠️  WARNING: This table may contain one or more TRIGGERs

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`user_id`* ⨁ | **INT** | 255 | No | None | - |
| 2 | *`days`* | **INT** | 255 | No | None | - |
| 3 | *`weeks`* | **INT** | 255 | No | None | - |
| 4 | *`months`* | **INT** | 255 | No | None | - |
| 5 | *`start`* | **DATETIME** | - | Yes | NULL | - |
| 6 | *`end`* | **DATETIME** | - | Yes | NULL | - |

> NOTE:


### `priv` - MySQL Table
> ⚠️  WARNING: This table may contain one or more TRIGGERs

| No. | Name | Type | Length | Null | Default | Extra |
|:----|:-----|:-----|:-------|:-----|:--------|:-------|
| 1 | *`id`* 🔑  | **INT** | 255 | No | None | **AUTO_INCREMENT** |
| 2 | *`name`* | **VARCHAR** | 30 | No | None | - |
| 3 | *`level`* | **TINYINT** | 3 | No | 0 | - |

> NOTE:

---

## Installation
> IMPORTANT: Make sure you have [`XAMPP`](https://www.apachefriends.org/) already installed on your computer before proceeding.

1. Clone this project's repository
```sh
git clone https://github.com/abraham-ukachi/blog-js.git
```

> NOTE: There's no need to change the current working directory to **blog-js**


2. Now, create a symbolic link of **blog-js** in the `XAMPP`'s **htdocs** folder:

-   **On Mac**

```sh
ln -s "$(pwd)/blog-js" /Applications/XAMPP/htdocs/blog-js
```

-   **On Linux**

```sh
ln -s "$(pwd)/blog-js" /opt/lampp/htdocs/blog-js
```

3. Open the **blog-js** folder in your default browser:

```sh
open http://localhost/blog-js
```



---

## Testing

| Browser | Version | Status | Date | Time
|:--------|:--------|:-------|:-----|:-----
| *`Brave`* | **-** | *Pending* | - | -
| *`Chrome`* | **-** | *Pending* | - | -
| *`Firefox`* | **-** | *Pending* | - | -
| *`Safari`* | **-** | *Pending* | - | -
| *`Opera`* | **-** | *Pending* | - | -
| *`Edge`* | **-** | *Pending* | - | -
| *`IE`* | **-** | *Pending* | - | -

> NOTE: *`IE`* = Internet Explorer = 👎🏽


## TODOs

- [ ] ? Rename `priv` table to `global_privileges`
- [ ] Add a **login with Google** Button on the *`Login - Page`*
- [ ] Implement **Service Workers** to provide offline functionality
- [ ] ? Rename this project from `blog-js` to `peace-n-love`
- [ ] Add a **log out button** in the **narrow layout** of *`Settings - Page`* 
- [ ] Show a toast after a preference change or settings update.
- [ ] Apply the **slide-from-up** animation to dialogs.
- [ ] Change the default input text & background color for Brave's autocomplete
- [ ] Create a project-specific logo 
- [ ] Add localization / internationalization (at least: **english** & **french**)
- [ ] Add mobile compatibility to all pages (i.e. make it responsive)
- [ ] Optimize `.svg` doodles
- [ ] Optimize all `.php` files
- [ ] Optimize all `.css` files
- [ ] Optimize all `.js` files
- [ ] Remove unnecessary comments
- [ ] Add screenshots

---

## Some Random Screenshots


### On Mobile

| Classic Mode | Light Mode | Dark Mode |
|:-------------|:-----------|:----------|
| N/A | N/A | N/A |


### On Laptop

| Classic Mode | Light Mode | Dark Mode |
|:-------------|:-----------|:----------|
| N/A | N/A | N/A |

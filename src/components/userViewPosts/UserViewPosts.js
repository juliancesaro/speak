import React from 'react'
import Posts from '../posts/Posts'

const UserViewPosts = ({
  allUsers,
  user,
  setUser,
  userAccount,
  userLikes,
  setUserLikes,
  posts,
  setPosts,
  toggleLoginForm,
  activeUserItem,
}) => {
  const userAccountPosts = posts.filter(
    (post) => post.user.id === userAccount.id
  )

  const userLikedPosts = posts.filter((post) =>
    userAccount.likedPosts.some((userLikedPost) => userLikedPost === post.id)
  )

  return (
    <div className="useritems">
      {activeUserItem === 'Posts' ? (
        <Posts
          allPosts={posts}
          allUsers={allUsers}
          user={user}
          setUser={setUser}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          setPosts={setPosts}
          postsToShow={userAccountPosts}
          toggleLoginForm={toggleLoginForm}
        />
      ) : (
        <Posts
          allPosts={posts}
          allUsers={allUsers}
          user={user}
          setUser={setUser}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          setPosts={setPosts}
          postsToShow={userLikedPosts}
          toggleLoginForm={toggleLoginForm}
        />
      )}
    </div>
  )
}

export default UserViewPosts

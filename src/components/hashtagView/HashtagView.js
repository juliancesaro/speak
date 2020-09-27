import React from 'react'
import './HashtagView.css'
import { useParams } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import Posts from '../posts/Posts'
import Loading from '../loading/Loading'

const HashtagView = ({
  allPosts,
  allUsers,
  user,
  setUser,
  userLikes,
  setUserLikes,
  setPosts,
  toggleLoginForm,
}) => {
  const hashtag = useParams().hashtag

  const hashtagPosts = allPosts
    ? allPosts.filter((post) => post.content.includes(`#${hashtag}`))
    : null

  return (
    <div className={`hashtagview-wrapper${isMobile ? '-mobile' : ''}`}>
      <div className={`hashtagview${isMobile ? '-mobile' : ''}`}>
        <h1>{hashtag}</h1>
        {hashtagPosts ? (
          <Posts
            allPosts={allPosts}
            allUsers={allUsers}
            user={user}
            setUser={setUser}
            userLikes={userLikes}
            setUserLikes={setUserLikes}
            setPosts={setPosts}
            postsToShow={hashtagPosts}
            toggleLoginForm={toggleLoginForm}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default HashtagView

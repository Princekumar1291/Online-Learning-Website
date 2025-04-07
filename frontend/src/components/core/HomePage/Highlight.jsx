import React from 'react'

const Highlight = ({ text }) => {
  return (
    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
      {" " + text}
    </span>
  )
}

export default Highlight


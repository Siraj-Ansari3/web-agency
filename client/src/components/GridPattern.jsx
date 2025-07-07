import React from 'react'

const GridPattern = () => {
  return ( <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
  )
}

export default GridPattern
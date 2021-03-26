import React from 'react'
import Spinner from '../../_helpers/Spinner'

const LogButton = ({ onClick, animation, goText, canClick = () => true, loading = false }) => (
  <button type='submit' className={`btn ${animation}`} onClick={(e) => canClick() && onClick(e)} style={{ maxHeight: '33px' }}>
    {!loading ? goText : <div> <Spinner color='#fff' width={17} height={17} /> </div>}
  </button>
)

export default LogButton

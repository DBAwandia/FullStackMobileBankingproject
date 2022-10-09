import React from 'react'
import "./SpinnerLoading.css"
function SpinnerLoading() {
  return (
    <div className='SpinnerLoading'>
        <div className='SpinnerLoading_container'>
            <div className='outer_circle'>
                <div className='inner_circle'>
                    <p>L</p>
                    <p>O</p>
                    <p>A</p>
                    <p>D</p>
                    <p>I</p>
                    <p>N</p>
                    <p>G</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpinnerLoading
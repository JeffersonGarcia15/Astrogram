import React from 'react'
import './Search.css'

function Search({ results }) {
    return (
        <div>
            {results[0]?.length >= 1 ? (
                <div>
                    {/* <button onClick={() => console.log('results', results)}>ifdjifj</button> */}
                    {
                        results.map((user, idx) => (
                            <div key={idx}>
                                <div className='search'>
                                    <h4>The results from the search were the following: </h4>
                                    {user.map(singleUser => (
                                        <div className="user-search" key={singleUser.id}>
                                            <img className='user-photo-search' src={singleUser?.profile_image} />
                                            <a className="username-search"href={`/users/${singleUser?.username}`}>
                                                <h1>{singleUser.username}</h1>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                                <div>

                                </div>
                            </div>
                        ))}
                </div>

            ) : (
                <div>
                    <p>The name you entered does not exist. Please try again</p>
                </div>
            )
            }
        </div>
    )
}

export default Search
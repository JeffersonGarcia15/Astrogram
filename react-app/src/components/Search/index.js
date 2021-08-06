import React from 'react'

function Search({ results }) {
    return (
        <div>
            <button onClick={() => console.log('results prop', results)}>Click</button>
            {results[0]?.length >= 1 ? (
                <div>
                    {/* <button onClick={() => console.log('results', results)}>ifdjifj</button> */}
                    {
                        results.map((user, idx) => (
                            <div key={idx}>
                                <button onClick={() => console.log('efffdsfasde', user)}>user</button>
                                <div >
                                    <h4>The results from the search were the following: </h4>
                                    {user.map(singleUser => (
                                        <div key={singleUser.id}>
                                            <h1>{singleUser.username}</h1>
                                            <a href={`/users/${singleUser?.username}`}>
                                                <img src={singleUser?.profile_image} />
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
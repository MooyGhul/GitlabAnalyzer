import React from 'react';

function UrlToken {
    const [urlToken, setUrlToken] = useState({url:'', token:''});


    return(
        <div>
            <form>
                <label>
                    Enter URL
                    <input type ='url' onChange={e=> setUrlToken({...urlToken, url: e.target.value})} />
                </label>
                <label>
                    Enter Token
                    <input type ='text' onChange={e=> setUrlToken({...urlToken, token: e.target.value})}
                </label>
                <button className={styles.button} type ='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}
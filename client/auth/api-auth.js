const signin = (user) => {
    return fetch('auth/signin/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    })
    .then((res) => {
        res.json()
    }).catch((err) => console.log(err))
}

const signout = () => {
    return fetch('auth/signout/', {
        method: 'GET'
    })
    .then((res) => {
        res.json()
    }).catch((err) => console.log(err))
}

export {signin, signout}
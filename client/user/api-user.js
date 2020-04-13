const create = (user) => {
    return fetch('api/users/', {
        method: 'POST',
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(user)
    })
    .then((res) => {
        return res.json()
    }).catch((err) => console.log(err))
}

const list = () => {
    return fetch('api/users/', {
        method: 'GET'
    })
    .then((res) => {
        return res.json()
    }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
    return fetch('api/users/' + params.userId, {
        method: 'GET',
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + credentials.t
        }
    })
    .then((res) => {
        return res.json()
    }).catch((err) => console.log(err))
}

const update = (params, credentials, user) => {
    return fetch('api/users/' + params.userId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(user)
    })
    .then((res) => {
        return res.json()
    }).catch((err) => console.log(err))
}

const remove = (params, credentials) => {
    return fetch('api/users/' + params.userId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + credentials.t
        }
    })
    .then((res) => {
        return res.json()
    }).catch((err) => console.log(err))
}

export {create, list, read, update, remove}
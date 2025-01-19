const host= "https://wedev-api.sky.pro/api/v1/katya-arkhipova"

export const fetchComments = () => {
    return fetch(host + '/comments')
    .then((res) => {
        return res.json()
    })
    .then((responseData) => {
        const appComments = responseData.comments.map(comment => {
            return {
                name: comment.author.name,
                date: new Date(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            }
        })
        return appComments
    })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            author: { 
                name: name
            },
            date: new Date().toISOString(),
            text: text,
        }),
    }).then(() => {
        return fetchComments()
    })
}
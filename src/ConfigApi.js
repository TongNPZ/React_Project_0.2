const GetRequst = async (host, method, body) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        var requestOptions = {
            method: method,
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        if (body !== null) {
            if (body instanceof FormData) {
                myHeaders.delete("Content-Type")
                requestOptions.body = body
            } else {
                requestOptions.body = JSON.stringify(body)
            }
        }

        const response = await fetch(host, requestOptions)
        
        if (!response.ok) {
            throw new Error('Network response was not OK!')
        }

        return response.json()

    } catch (error) {
        console.error('Error Calling API: ', error)
        throw error;
    }
}

export default GetRequst
errorHandlerAxios = (error) => {
    try {
        return { reason: `Graph Database error: ${error.response.data}`, status: error.response.status }
    } catch (error) {
        console.log('error', error)
        return {reason: 'Internal server error', status: 500}
    }
}

module.exports = errorHandlerAxios
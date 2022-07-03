module.exports.editNewFileURL = (path, text = "") => {
    const scheme = "iawriter://"

    const command = "new"
    
    let queryParams = []
    
    queryParams.push(param("path", path))
    queryParams.push(param("text", text))
    queryParams.push(param("edit", "true"))
    
    const url = scheme + command + "?" + queryParams.join("&")
    
    return encodeURI(url)
}

function param (name, value) {
    return name + "=" + value
}
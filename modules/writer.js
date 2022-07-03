const scheme = "iawriter://"

function param (name, value) {
    return name + "=" + value
}

// Returns an URL that, when opened, creates a new file at the given path containing the optionally given text.
module.exports.editNewFileURL = (path, text = "") => {

    const command = "new"
    
    let queryParams = [
        param("path", path),
        param("text", text),
        param("edit", "true")
    ] 
    
    const url = scheme + command + "?" + queryParams.join("&")
    
    return encodeURI(url)
}
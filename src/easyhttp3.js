class EasyHTTP {
  // make a http get request
  async get(url) {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  }

  // make a http post request
  async post(url, dataToSend) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    });
    
    const data = await res.json();
    
    return data;
  }

  async put(url, dataToSend) {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    });
    
    const data = await res.json();

    return data;
  }

  // make a http delete request
  async delete(url) {
    const res = await fetch(url, {
      method: "DELETE"
    });

    const data = "Delete Success";
    
    return data;
  }
}

export const easyHttp = new EasyHTTP();
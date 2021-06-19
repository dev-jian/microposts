class EasyHTTP {
  // make a http get request
  async get(url) {
    const res = await fetch(url);

    let data = null;

    if (res.ok) {
      data = await res.json();
    }

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
    
    let data = null;

    if (res.ok) {
      data = await res.json();
    }

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
    
    let data = null;

    if (res.ok) {
      data = await res.json();
    }

    return data;
  }

  // make a http delete request
  async delete(url) {
    const res = await fetch(url, {
      method: "DELETE"
    });

    let data = null;

    if (res.ok) {
      data = "Delete Success";
    }

    return data;
  }
}

export const easyHttp = new EasyHTTP();
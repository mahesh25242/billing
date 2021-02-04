const config = {
    apiUrl: `https://agoranature.com/api/public/v1`, //`http://localhost/cart/api/public/v1`,
    ajax:{
        header:{
            'Content-Type': 'application/json',              
            'IsApps': 1            
        },
        signBody:{
            "grant_type": "password",
            "client_id": 2,            
            'client_secret' : 'K6IlhS1oZBgxNQciIEtCoXzlHRGu0MefIkNkp68b',
            "scope":"", 
            "recaptcha":null,
        }
    }
}

export default config;
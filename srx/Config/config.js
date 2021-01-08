const config = {
    apiUrl: `http://localhost/cart/api/public/v1`,
    ajax:{
        header:{
            'Content-Type': 'application/json',              
            'shopKey': '3d9f5a8eec71764c7c2df5a56496c8a1320dd921',            
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
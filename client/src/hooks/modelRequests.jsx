// token for SketchFab
const sfKey = import.meta.env.VITE_KEY_SF;

// Preset API requests
async function handlePreset(param) {
    // const url = `https://api.sketchfab.com/v3/models?q=${params}&count=${count}&cursor=${cursor}&restricted=false`;
    const url = `https://api.sketchfab.com/v3/search?q=${param}`;
    try {
        const response = await axios.get(url);
        const results = response.data.results.models;
        console.log(results);
        setSFData(results);
    } catch (error) {
        console.warn(error);
    }
}

// Search bar API request
async function handleSearch(e, input) {
    e.preventDefault(); 
    let count = 10;
    let cursor = null;
    // const url = `https://api.sketchfab.com/v3/models?q=${input}&count=${count}&cursor=${cursor}&restricted=false`;
    const url = `https://api.sketchfab.com/v3/search?q=${input}&restricted=false`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        // SF data is deeply nested {results:{models:[...]}}
        setSFData(data.results);
    } catch (error) {
        console.warn(error);
    }
}

export { handleSearch, handlePreset }
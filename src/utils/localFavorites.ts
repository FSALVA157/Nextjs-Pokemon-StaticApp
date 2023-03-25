
const toggleFavorite = (id: number)=>{
    console.log("Id para Favorite: ", id)

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    if(favorites.includes(id)){
        //favorites.splice(favorites.indexOf(id), 1)
        favorites = favorites.filter(item => item != id)
    }else{
        favorites.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const isFavorite= (id: number): boolean  => {
    if(typeof window === 'undefined') {        
        return false
    }
    

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')    
    return favorites.includes(id)
}

let obj = {
    toggleFavorite,
    isFavorite
}

export default obj

function checkNumber(number) {
    return new Promise((resolve, reject) => {
        if (number > 0) {
            resolve (`Muvaffaqiyatli: ${number} - musbat son!`);
        }else {
            reject(`Xatolik: ${number} musbat son emas!`);
        } 
    } );
}

checkNumber(10)
    .then((result) =>{
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

checkNumber(-5)
    .then((result) =>{
        console.log(result);
    })
    .catch((error) =>{
        console.error(error);
    });
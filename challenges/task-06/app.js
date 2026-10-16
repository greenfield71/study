function getStudent() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const student = {
                name: "Ali",
                age: 20,
                course: "Computer Science"
            };
            resolve(student);
        }, 1000); 
    });
}

async function main() {
    console.log("Talaba ma'lumotlari yuklanmoqda...");

    
    const student = await getStudent();

    console.log("Ma'lumotlar olindi:");
    console.log(`Ismi: ${student.name}`);
    console.log(`Yoshi: ${student.age}`);
    console.log(`Yo'nalishi: ${student.course}`);
}

main();
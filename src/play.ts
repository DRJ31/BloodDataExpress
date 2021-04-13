interface User {
    name: string
    age: number
}

function greeter(user: User): string {
    return `Hello ${user.name}`;
}

const user = {name: "Renjie Deng", age: 23};
console.log(greeter(user));
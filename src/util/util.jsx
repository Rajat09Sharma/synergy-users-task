

function validateUser(user) {
    let promise = new Promise((resolve, reject) => {
        if (user.name.length < 3) {
            reject(new Error('Name must be at least 3 characters long.'));

        }
        if (user.phone.length < 10 || user.phone.length > 10 || !/^\d{10}$/.test(user.phone)) {

            reject(new Error('Phone number must be 10 digits.'));
        }
        resolve({ message: "ok" });
    })
    return promise
}

export async function createNewUser(userObject) {

    try {
        const validate = await validateUser(userObject);
        if (validate.message == "ok") {
            const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                method: 'POST',
                body: JSON.stringify(userObject),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (!response.ok) {
                throw new Error("Failed to create user, please try again later.")
            }
            // const result = await response.json();            
            return { message: "User created successfully.", result: userObject };
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message)

    }
}

export async function editUser(userObject) {
    console.log("edit userobject", userObject);

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            method: 'POST',
            body: JSON.stringify(userObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error("Failed to edit user details, please try again later.")
        }
        // const result = await response.json();
        return { message: "Updated successfully.", result: userObject };
    } catch (error) {
        console.log(error);
        throw new Error("Failed to edit user details, please try again later.")

    }
}

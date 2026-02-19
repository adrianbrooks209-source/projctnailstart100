// SIGN-UP FUNCTIONALITY
document.getElementById('signupBtn').addEventListener('click', async () => {
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const isMember = document.getElementById('isMember').checked;
    const signupMessage = document.getElementById('signupMessage');

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password, isMember })
        });

        const data = await response.json();

        if (response.ok) {
            signupMessage.style.color = 'green';
            signupMessage.textContent = `Sign-up successful! Welcome ${data.userId}`;
        } else {
            signupMessage.style.color = 'red';
            signupMessage.textContent = data.error || 'Error signing up';
        }
    } catch (error) {
        signupMessage.style.color = 'red';
        signupMessage.textContent = 'Server error';
        console.error(error);
    }
});

// PLACE ORDER FUNCTIONALITY
document.getElementById('placeOrderBtn').addEventListener('click', async () => {
    const items = Array.from(document.getElementById('itemsSelect').selectedOptions).map(opt => opt.value);
    const services = Array.from(document.getElementById('servicesSelect').selectedOptions).map(opt => opt.value);
    const userId = document.getElementById('userId').value; // assuming signed in
    const orderMessage = document.getElementById('orderMessage');

    if (!userId) {
        orderMessage.style.color = 'red';
        orderMessage.textContent = 'Please sign up or login first.';
        return;
    }

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'order',
                name: userId,
                dateTime: new Date(),
                items,
                services,
                userId
            })
        });

        const data = await response.json();

        if (response.ok) {
            orderMessage.style.color = 'green';
            orderMessage.textContent = 'Order placed successfully!';
        } else {
            orderMessage.style.color = 'red';
            orderMessage.textContent = data.error || 'Error placing order';
        }
    } catch (error) {
        orderMessage.style.color = 'red';
        orderMessage.textContent = 'Server error';
        console.error(error);
    }
});